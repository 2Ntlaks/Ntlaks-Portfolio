export const vertexShaderSource = `
  attribute vec2 aPosition;

  void main(void) {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const fragmentShaderSource = `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uMotionIntensity;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  void main(void) {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

    float time = uTime * 0.45 * uMotionIntensity;
    float pointerDistance = distance(uv, uPointer);
    float pointerGlow = exp(-9.0 * pointerDistance);

    vec2 flow = vec2(
      sin((p.y + time) * 5.2),
      cos((p.x - time * 0.8) * 4.6)
    );

    p += flow * (0.09 + pointerGlow * 0.18);
    p += vec2(
      fbm(p * 1.6 + vec2(time, -time * 0.8)),
      fbm(p * 1.6 + vec2(-time * 0.4, time))
    ) * 0.12;

    float structure = fbm(p * 2.4 + vec2(time * 1.4, -time * 0.6));
    float waves = sin(9.0 * (p.x * 0.82 + p.y * 0.38 + structure * 0.85) + time * 8.0);
    float filaments = smoothstep(0.2, 0.95, waves * 0.5 + 0.5);
    float sparks = pow(max(0.0, 1.0 - abs(fract((structure + time) * 14.0) - 0.5) * 2.0), 28.0);

    vec3 base = vec3(0.024, 0.063, 0.106);
    vec3 draftBlue = vec3(0.42, 0.64, 0.84);
    vec3 amber = vec3(1.00, 0.65, 0.26);

    vec3 color = base;
    color += draftBlue * (filaments * 0.50 + pointerGlow * 0.25);
    color += amber * (pow(structure, 2.2) * 0.42 + pointerGlow * 0.24);
    color += mix(draftBlue, amber, 0.5 + 0.5 * sin(time + structure * 9.0)) * sparks * 0.16;

    float vignette = smoothstep(1.5, 0.25, length(p));
    color *= vignette;

    float glowLines = smoothstep(0.72, 0.98, filaments) * 0.25;
    color += vec3(0.10, 0.13, 0.17) * glowLines;

    gl_FragColor = vec4(color, 1.0);
  }
`;
