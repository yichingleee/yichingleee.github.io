import React, { useEffect, useRef } from 'react';

type Ribbon = {
  points: { x: number; y: number }[];
  phase: number;
  strokeWidth: number;
  opacity: number;
  isAccent: boolean;
};

const seedFromString = (value: string) => {
  let hash = 7;
  for (let i = 0; i < value.length; i += 1) {
    hash = hash * 31 + value.charCodeAt(i);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let t = seed + 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

// Improved noise using sine-based pseudo-random for smooth, non-grid-aligned results
const smoothNoise = (x: number, y: number, seed: number): number => {
  // Use multiple sine waves at irrational frequencies to avoid grid patterns
  const n1 = Math.sin(x * 0.8731 + y * 0.5723 + seed * 0.1) * 0.5;
  const n2 = Math.sin(x * 0.3511 - y * 0.9217 + seed * 0.2) * 0.3;
  const n3 = Math.sin(x * 0.6127 + y * 0.2918 + seed * 0.3) * 0.2;
  return n1 + n2 + n3;
};

// Get flow field angle - produces smooth, organic curves without axis alignment
const getFlowAngle = (x: number, y: number, width: number, height: number, seed: number): number => {
  const scale = 0.002;

  // Layer multiple noise octaves for organic flow
  const n1 = smoothNoise(x * scale, y * scale, seed);
  const n2 = smoothNoise(x * scale * 0.5, y * scale * 0.5, seed + 500) * 0.5;
  const n3 = smoothNoise(x * scale * 0.25, y * scale * 0.25, seed + 1000) * 0.25;

  // Add slight diagonal bias to avoid horizontal/vertical tendencies
  const diagonalBias = Math.sin((x + y) * 0.001) * 0.3;

  // Combine for smooth, flowing angle (avoid multiples of π/2)
  return (n1 + n2 + n3 + diagonalBias) * Math.PI * 1.5 + Math.PI * 0.25;
};

const buildRibbons = (width: number, height: number, seed: number): Ribbon[] => {
  const rand = mulberry32(seed);
  const ribbons: Ribbon[] = [];
  const count = 10;  // More curves (some may be short without wrapping)

  for (let i = 0; i < count; i++) {
    const points: { x: number; y: number }[] = [];

    // Distribute starting points across entire viewport
    let x = rand() * width;
    let y = rand() * height;

    const segmentCount = 150;  // Much longer curves
    const stepSize = 22;       // Larger steps for extended reach

    for (let j = 0; j < segmentCount; j++) {
      points.push({ x, y });

      const angle = getFlowAngle(x, y, width, height, seed + i * 100);
      x += Math.cos(angle) * stepSize;
      y += Math.sin(angle) * stepSize;

      // Stop if curve goes too far off-screen (no wrapping)
      if (x < -200 || x > width + 200 || y < -200 || y > height + 200) {
        break;
      }
    }

    ribbons.push({
      points,
      phase: rand() * Math.PI * 2,
      strokeWidth: 1.2 + rand() * 0.8,  // Slightly thicker
      opacity: 0.35 + rand() * 0.25,    // More vivid
      isAccent: i % 3 === 0             // More blue accents
    });
  }

  return ribbons;
};

const GenerativeBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ribbonsRef = useRef<Ribbon[]>([]);
  const frameRef = useRef<number>();
  const lastRenderRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Random seed each page load for unique patterns
    const seed = Date.now();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ribbonsRef.current = buildRibbons(width, height, seed);
    };

    resize();
    window.addEventListener('resize', resize);

    const renderFrame = (time: number) => {
      const { innerWidth: width, innerHeight: height } = window;
      const elapsed = time * 0.0006;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const strokeColor = 'rgba(10, 10, 10, 0.30)';      // More vivid dark
      const accentColor = 'rgba(37, 99, 235, 0.55)';     // More vivid blue

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ribbonsRef.current.forEach((ribbon) => {
        const points = ribbon.points;
        if (points.length < 4) return;

        ctx.beginPath();
        ctx.strokeStyle = ribbon.isAccent ? accentColor : strokeColor;
        ctx.lineWidth = ribbon.strokeWidth;
        ctx.globalAlpha = ribbon.opacity;

        // Animate points with flowing wave displacement
        const animatedPoints = points.map((p, idx) => {
          const waveOffset = Math.sin(elapsed + ribbon.phase + idx * 0.1) * 18;   // More flowing
          const waveOffsetY = Math.cos(elapsed * 0.6 + ribbon.phase + idx * 0.08) * 14;
          return {
            x: p.x + waveOffset,
            y: p.y + waveOffsetY
          };
        });

        // Draw smooth bezier curve through points
        ctx.moveTo(animatedPoints[0].x, animatedPoints[0].y);

        for (let i = 1; i < animatedPoints.length - 2; i++) {
          const p0 = animatedPoints[i - 1];
          const p1 = animatedPoints[i];
          const p2 = animatedPoints[i + 1];
          const p3 = animatedPoints[i + 2];

          // Catmull-Rom to Bezier conversion for smooth curves
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    };

    if (prefersReducedMotion) {
      renderFrame(0);
    } else {
      const draw = (time: number) => {
        if (time - lastRenderRef.current < 50) {
          frameRef.current = requestAnimationFrame(draw);
          return;
        }
        lastRenderRef.current = time;
        renderFrame(time);
        frameRef.current = requestAnimationFrame(draw);
      };
      frameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="generative-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GenerativeBackdrop;
