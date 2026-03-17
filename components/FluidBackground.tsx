import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector2, ShaderMaterial } from 'three';

const FluidShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new Vector2() },
    uColor1: { value: new Color('#e0e7ff') }, // indigo-100
    uColor2: { value: new Color('#f0f9ff') }, // sky-50
    uColor3: { value: new Color('#fae8ff') }, // fuchsia-100
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Slow moving time
      float t = uTime * 0.15;
      
      // Creating fluid distortion
      float n1 = snoise(uv * 3.0 + vec2(t, t * 0.5));
      float n2 = snoise(uv * 2.0 - vec2(t * 0.2, t));
      
      // Mixing noise layers
      float pattern = (n1 + n2) * 0.5;
      
      // Color mixing based on pattern and position
      vec3 color = mix(uColor1, uColor2, uv.y + pattern * 0.2);
      color = mix(color, uColor3, (sin(uv.x * 4.0 + t) * 0.5 + 0.5) * pattern);
      
      // Add a subtle grain for texture
      float grain = fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453);
      color += grain * 0.03;

      // Soft white overlay for brightness
      color = mix(color, vec3(1.0), 0.2);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const GradientPlane = () => {
  const mesh = useRef<any>(null);
  const material = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uColor1: { value: new Color('#eef2ff') }, // very light indigo
    uColor2: { value: new Color('#f0f9ff') }, // very light sky
    uColor3: { value: new Color('#faf5ff') }, // very light purple
  }), []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} scale={[20, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={material}
        attach="material"
        args={[FluidShaderMaterial]}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GradientPlane />
      </Canvas>
    </div>
  );
};