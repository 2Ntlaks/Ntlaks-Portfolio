import { vertexShaderSource, fragmentShaderSource } from "./shaders";

export class WebGLRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = {
      reducedMotion: Boolean(options.reducedMotion),
      isMobile: Boolean(options.isMobile),
    };

    this.gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: !this.options.isMobile,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });

    this.isReady = Boolean(this.gl);
    if (!this.isReady) {
      console.error("Unable to initialize WebGL.");
      return;
    }

    this.pointer = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    this.timeOffset = Math.random() * 100.0;
    this.startTime = 0;
    this.motionIntensity = this.options.reducedMotion ? 0.2 : 1.0;
    this.pixelRatioCap = this.options.isMobile ? 1.2 : 1.75;
    this.uniformScale = this.options.isMobile ? 0.86 : 1.0;

    this.initProgram();
    this.initBuffers();
  }

  initProgram() {
    const gl = this.gl;
    const program = this.createProgram(vertexShaderSource, fragmentShaderSource);

    this.programInfo = {
      program,
      attribLocations: {
        position: gl.getAttribLocation(program, "aPosition"),
      },
      uniformLocations: {
        time: gl.getUniformLocation(program, "uTime"),
        resolution: gl.getUniformLocation(program, "uResolution"),
        pointer: gl.getUniformLocation(program, "uPointer"),
        motionIntensity: gl.getUniformLocation(program, "uMotionIntensity"),
      },
    };
  }

  createProgram(vertexSource, fragmentSource) {
    const gl = this.gl;
    const vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Failed to link shader program: ${message}`);
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
  }

  loadShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Failed to compile shader: ${message}`);
    }

    return shader;
  }

  initBuffers() {
    const gl = this.gl;
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      1.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    this.positionBuffer = positionBuffer;
  }

  setReducedMotion(enabled) {
    this.motionIntensity = enabled ? 0.2 : 1.0;
  }

  setPointer(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = (clientX - rect.left) / rect.width;
    const y = 1.0 - (clientY - rect.top) / rect.height;

    this.pointer.targetX = Math.min(Math.max(x, 0.0), 1.0);
    this.pointer.targetY = Math.min(Math.max(y, 0.0), 1.0);
  }

  clearPointer() {
    this.pointer.targetX = 0.5;
    this.pointer.targetY = 0.5;
  }

  resize() {
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    if (displayWidth <= 0 || displayHeight <= 0) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap);
    const width = Math.floor(displayWidth * pixelRatio);
    const height = Math.floor(displayHeight * pixelRatio);

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  render(nowMs) {
    if (!this.isReady) {
      return;
    }

    const gl = this.gl;
    if (this.startTime === 0) {
      this.startTime = nowMs * 0.001;
    }

    const now = nowMs * 0.001;
    const time = (now - this.startTime) * this.uniformScale + this.timeOffset;

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.08;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.08;

    this.resize();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.programInfo.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.programInfo.attribLocations.position);
    gl.vertexAttribPointer(
      this.programInfo.attribLocations.position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.uniform1f(this.programInfo.uniformLocations.time, time);
    gl.uniform2f(
      this.programInfo.uniformLocations.resolution,
      gl.canvas.width,
      gl.canvas.height
    );
    gl.uniform2f(
      this.programInfo.uniformLocations.pointer,
      this.pointer.x,
      this.pointer.y
    );
    gl.uniform1f(this.programInfo.uniformLocations.motionIntensity, this.motionIntensity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  destroy() {
    if (!this.isReady) {
      return;
    }

    const gl = this.gl;
    gl.deleteBuffer(this.positionBuffer);
    gl.deleteProgram(this.programInfo.program);
    this.positionBuffer = null;
    this.programInfo = null;
  }
}
