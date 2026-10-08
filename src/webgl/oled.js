/*
  A WebGL fragment shader pretending to be an SSD1306 OLED.

  The canvas is literally 128×64 pixels, like the two-colour module on my
  ESP32 breadboard: the top 16 rows are the yellow status band (drawn by a
  2D canvas with a hand-made 3×5 pixel font) and the bottom 48 rows are the
  blue zone, where a raymarched shape is Bayer-dithered down to 1 bit.
*/

export const OLED_W = 128;
export const OLED_H = 64;
const BAND = 16; // yellow rows at the top

export const SHAPES = ["TORUS", "CUBE", "OCTA", "BLOB"];

const vertexSource = `
  attribute vec2 aPos;
  void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const fragmentSource = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uRot;
  uniform float uShapeA;
  uniform float uShapeB;
  uniform float uMix;
  uniform float uReveal;

  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  float sdTorus(vec3 p) { vec2 q = vec2(length(p.xz) - 0.62, p.y); return length(q) - 0.25; }
  float sdBox(vec3 p) { vec3 q = abs(p) - vec3(0.5); return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - 0.08; }
  float sdOcta(vec3 p) { p = abs(p); return (p.x + p.y + p.z - 0.92) * 0.57735; }
  float sdBlob(vec3 p) {
    float t = uTime * 1.6;
    return length(p) - 0.66 + 0.08 * sin(5.0 * p.x + t) * sin(5.0 * p.y + t * 1.3) * sin(5.0 * p.z + t * 0.7);
  }

  float shape(vec3 p, float id) {
    if (id < 0.5) return sdTorus(p);
    if (id < 1.5) return sdBox(p);
    if (id < 2.5) return sdOcta(p);
    return sdBlob(p);
  }

  float map(vec3 p) {
    p.yz *= rot(uRot.y);
    p.xz *= rot(uRot.x);
    return mix(shape(p, uShapeA), shape(p, uShapeB), uMix);
  }

  vec3 normal(vec3 p) {
    vec2 e = vec2(0.002, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }

  void main() {
    vec2 fc = gl_FragCoord.xy;
    float fromTop = ${OLED_H.toFixed(1)} - fc.y;
    vec3 off = vec3(0.008, 0.016, 0.03);

    /* Yellow band belongs to the 2D overlay; row 16 is the real gap row. */
    if (fromTop < ${(BAND + 1).toFixed(1)}) { gl_FragColor = vec4(off, 1.0); return; }

    /* Boot wipe: rows appear top to bottom. */
    if (fromTop - ${BAND.toFixed(1)} > uReveal * ${(OLED_H - BAND).toFixed(1)}) { gl_FragColor = vec4(off, 1.0); return; }

    vec2 uv = (fc - vec2(64.0, 23.5)) / 24.0;
    vec3 ro = vec3(0.0, 0.0, 2.45);
    vec3 rd = normalize(vec3(uv, -2.3));

    float t = 0.0;
    float hit = 0.0;
    for (int i = 0; i < 64; i++) {
      float d = map(ro + rd * t);
      if (d < 0.002) { hit = 1.0; break; }
      t += d;
      if (t > 6.0) break;
    }

    float b = 0.0;
    if (hit > 0.5) {
      vec3 p = ro + rd * t;
      vec3 n = normal(p);
      vec3 l = normalize(vec3(0.6, 0.75, 0.55));
      float dif = max(dot(n, l), 0.0);
      float rim = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
      b = 0.22 + 0.85 * dif + 0.5 * rim;
    } else {
      /* Sparse twinkling stars so the blue zone never looks dead. */
      float s = hash(floor(fc));
      if (s > 0.986) b = 0.55 + 0.45 * sin(uTime * 3.0 + s * 80.0);
      /* Dithered floor glow under the shape. */
      float floorGlow = smoothstep(0.75, 0.0, length(vec2(uv.x * 0.55, (uv.y + 0.92) * 2.2)));
      b = max(b, floorGlow * 0.28);
    }

    float on = step(bayer4(fc) + 0.03, b);
    vec3 cyan = vec3(0.50, 0.86, 1.0);
    gl_FragColor = vec4(mix(off, cyan, on), 1.0);
  }
`;

/* 3×5 pixel font. Each glyph is 5 rows of 3 bits, top row first. */
const FONT = {
  A: "010101111101101", B: "110101110101110", C: "011100100100011", D: "110101101101110",
  E: "111100110100111", F: "111100110100100", G: "011100101101011", H: "101101111101101",
  I: "111010010010111", J: "001001001101010", K: "101101110101101", L: "100100100100111",
  M: "101111101101101", N: "110101101101101", O: "010101101101010", P: "110101110100100",
  Q: "010101101110011", R: "110101110101101", S: "011100010001110", T: "111010010010010",
  U: "101101101101111", V: "101101101101010", W: "101101111111101", X: "101101010101101",
  Y: "101101010010010", Z: "111001010100111",
  0: "111101101101111", 1: "010110010010111", 2: "110001010100111", 3: "110001010001110",
  4: "101101111001001", 5: "111100110001110", 6: "011100111101111", 7: "111001010010010",
  8: "111101111101111", 9: "111101111001110",
  ".": "000000000000010", ":": "000010000010000", "-": "000000111000000", "/": "001001010100100",
  ">": "100010001010100", "+": "000010111010000", "%": "101001010100101", " ": "000000000000000",
};

const textWidth = (str) => str.length * 4 - 1;

function drawText(ctx, str, x, y) {
  for (let i = 0; i < str.length; i++) {
    const glyph = FONT[str[i]] || FONT[" "];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        if (glyph[r * 3 + c] === "1") ctx.fillRect(x + i * 4 + c, y + r, 1, 1);
      }
    }
  }
}

export class OledRenderer {
  constructor(glCanvas, textCanvas, { reducedMotion = false } = {}) {
    this.glCanvas = glCanvas;
    this.textCanvas = textCanvas;
    this.reducedMotion = reducedMotion;
    glCanvas.width = textCanvas.width = OLED_W;
    glCanvas.height = textCanvas.height = OLED_H;

    this.ctx = textCanvas.getContext("2d");
    this.gl = glCanvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: false });
    this.isReady = Boolean(this.gl && this.ctx);

    this.shape = 0;
    this.nextShape = 0;
    this.mix = 0;
    this.morphStart = -1;
    this.rot = { x: 0.6, y: 0.5 };
    this.spin = reducedMotion ? 0 : 0.55; // rad/s auto-rotate
    this.dragging = false;
    this.lastFrame = 0;
    this.fps = 60;
    this.bootStart = -1;
    this.bootDone = reducedMotion;

    if (!this.isReady) return;
    this.initGL();
  }

  initGL() {
    const gl = this.gl;
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`OLED shader failed to compile: ${log}`);
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, vertexSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(`OLED program failed to link: ${gl.getProgramInfoLog(prog)}`);
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(prog);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.program = prog;
    this.u = {};
    ["uTime", "uRot", "uShapeA", "uShapeB", "uMix", "uReveal"].forEach((name) => {
      this.u[name] = gl.getUniformLocation(prog, name);
    });
    gl.viewport(0, 0, OLED_W, OLED_H);
  }

  /* Advance to the next shape with a short SDF morph. */
  cycle(now) {
    if (this.morphStart >= 0) {
      this.shape = this.nextShape;
    }
    this.nextShape = (this.shape + 1) % SHAPES.length;
    this.morphStart = now;
    if (this.reducedMotion) {
      this.shape = this.nextShape;
      this.morphStart = -1;
      this.mix = 0;
    }
  }

  drag(dx, dy) {
    this.rot.x += dx * 0.012;
    this.rot.y = Math.max(-1.3, Math.min(1.3, this.rot.y + dy * 0.012));
  }

  setDragging(value) {
    this.dragging = value;
  }

  render(now) {
    if (!this.isReady) return;
    if (this.bootStart < 0) this.bootStart = now;
    const dt = this.lastFrame ? Math.min(0.1, (now - this.lastFrame) / 1000) : 0;
    if (dt > 0) this.fps += (1 / dt - this.fps) * 0.05;
    this.lastFrame = now;

    if (!this.dragging) this.rot.x += this.spin * dt;

    if (this.morphStart >= 0) {
      const p = Math.min(1, (now - this.morphStart) / 650);
      this.mix = p * p * (3 - 2 * p);
      if (p >= 1) {
        this.shape = this.nextShape;
        this.mix = 0;
        this.morphStart = -1;
      }
    }

    const bootT = (now - this.bootStart) / 1000;
    const reveal = this.bootDone ? 1 : Math.max(0, Math.min(1, (bootT - 0.9) / 0.5));
    if (reveal >= 1) this.bootDone = true;

    const gl = this.gl;
    gl.uniform1f(this.u.uTime, now / 1000);
    gl.uniform2f(this.u.uRot, this.rot.x, this.rot.y);
    gl.uniform1f(this.u.uShapeA, this.shape);
    gl.uniform1f(this.u.uShapeB, this.morphStart >= 0 ? this.nextShape : this.shape);
    gl.uniform1f(this.u.uMix, this.mix);
    gl.uniform1f(this.u.uReveal, reveal);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.drawOverlay(bootT, reveal);
  }

  drawOverlay(bootT, reveal) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, OLED_W, OLED_H);

    // Yellow status band
    ctx.fillStyle = "#ffd23f";
    drawText(ctx, "NTLAKS.DEV", 2, 2);
    const fps = `${Math.round(Math.min(99, this.fps))}FPS`;
    drawText(ctx, this.bootDone ? fps : "--FPS", OLED_W - 2 - textWidth(this.bootDone ? fps : "--FPS"), 2);
    const shapeName = SHAPES[this.morphStart >= 0 ? this.nextShape : this.shape];
    drawText(ctx, `> ${shapeName}`, 2, 9);
    const hint = "SW1: NEXT";
    drawText(ctx, hint, OLED_W - 2 - textWidth(hint), 9);

    // Boot log in the blue zone until the shader takes over
    if (reveal < 1) {
      ctx.fillStyle = "#80dbff";
      const lines = ["BOOT WEBGL...", "COMPILE SHADER  OK", "DITHER 4X4      OK", "128X64 1-BIT    OK"];
      const shown = Math.min(lines.length, Math.floor(bootT / 0.2) + 1);
      for (let i = 0; i < shown; i++) {
        const y = 20 + i * 7 + Math.floor(reveal * 48);
        if (y < OLED_H - 5) drawText(ctx, lines[i], 2, y);
      }
    }
  }

  destroy() {
    if (!this.gl) return;
    this.gl.deleteBuffer(this.buffer);
    this.gl.deleteProgram(this.program);
    const ext = this.gl.getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
  }
}
