// components/ShaderBackground.tsx
"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec4 a_position;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = a_position;
    v_texCoord = (a_position.xy + 1.0) / 2.0;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;

  void main() {
    vec2 uv = v_texCoord;
    float noise = sin(uv.x * 10.0 + u_time * 0.5) * cos(uv.y * 10.0 + u_time * 0.5);
    noise += sin(uv.x * 20.0 - u_time * 0.8) * cos(uv.y * 15.0 + u_time * 0.3);

    vec3 color1 = vec3(0.031, 0.035, 0.051); // primary-dark #08090D
    vec3 color2 = vec3(0.082, 0.075, 0.122); // secondary-dark #15131F
    vec3 accent = vec3(0.937, 0.624, 0.153); // primary-heading-dark #EF9F27

    vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
    finalColor = mix(finalColor, accent, clamp(noise * 0.1, 0.0, 0.05));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

interface ShaderBackgroundProps {
  /** "fixed" covers the whole viewport, "absolute" scopes to the parent (needs `relative` on parent) */
  variant?: "fixed" | "absolute";
  opacity?: number;
  className?: string;
}

export default function ShaderBackground({
  variant = "fixed",
  opacity = 0.8,
  className = "",
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const program = gl.createProgram();
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!program || !vertexShader || !fragmentShader) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    let animationId: number;
    let resizeObserver: ResizeObserver | null = null;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const width = variant === "fixed" ? window.innerWidth : parent?.clientWidth ?? window.innerWidth;
      const height = variant === "fixed" ? window.innerHeight : parent?.clientHeight ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function render(time: number) {
      if (!canvas || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    }

    resize();
    animationId = requestAnimationFrame(render);

    if (variant === "absolute" && canvas.parentElement) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`${variant === "fixed" ? "fixed" : "absolute"} inset-0 w-full h-full -z-10 pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}