import { useEffect, useRef, useState } from 'react';
import { soundFx } from '../utils/sound';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Geodesic 3D polyhedron vertices (Truncated Icosahedron / Sacred Geometry Wireframe)
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },

      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },

      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Inner core vertices for double-layered depth
    const innerVertices: Point3D[] = rawVertices.map((v) => ({
      x: v.x * 0.45,
      y: v.y * 0.45,
      z: v.z * 0.45,
    }));

    // Find edges based on standard icosahedron distance
    const edges: [number, number][] = [];
    const threshold = 2.05;
    for (let i = 0; i < rawVertices.length; i++) {
      for (let j = i + 1; j < rawVertices.length; j++) {
        const dx = rawVertices[i].x - rawVertices[j].x;
        const dy = rawVertices[i].y - rawVertices[j].y;
        const dz = rawVertices[i].z - rawVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          edges.push([i, j]);
        }
      }
    }

    // Outer orbiting micro-particles for atmospheric depth
    const particles: (Point3D & { speed: number; orbitRadius: number; angle: number })[] = Array.from(
      { length: 36 },
      (_, idx) => {
        const theta = (idx / 36) * Math.PI * 2;
        const r = 2.2 + Math.random() * 0.8;
        return {
          x: Math.cos(theta) * r,
          y: (Math.random() - 0.5) * 1.6,
          z: Math.sin(theta) * r,
          speed: (Math.random() * 0.008 + 0.004) * (idx % 2 === 0 ? 1 : -1),
          orbitRadius: r,
          angle: theta,
        };
      }
    );

    // Rotation angles and velocities
    let rotX = 0.3;
    let rotY = 0.4;
    let targetRotX = 0.3;
    let targetRotY = 0.4;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isMouseDown) {
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        lastMouseX = clientX;
        lastMouseY = clientY;
      } else {
        mouseX = (clientX / width - 0.5) * 2;
        mouseY = (clientY / height - 0.5) * 2;
        targetRotY += mouseX * 0.004;
        targetRotX += mouseY * 0.004;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      isMouseDown = true;
      setIsInteracting(true);
      lastMouseX = e.clientX - rect.left;
      lastMouseY = e.clientY - rect.top;
      soundFx.playHover();
    };

    const onPointerUp = () => {
      isMouseDown = false;
      setIsInteracting(false);
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // Render loop
    const render = () => {
      // Natural continuous rotation
      targetRotY += 0.005;
      targetRotX += 0.002;

      // Smooth interpolation (damping)
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const fov = Math.min(width, height) * 0.48;
      const cameraZ = 4.2;

      // 3D rotation transform function
      const project = (p: Point3D): { x: number; y: number; z: number; scale: number } => {
        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY + p.z * sinY;
        const y1 = p.y;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const depth = z2 + cameraZ;
        const scale = fov / Math.max(0.1, depth);

        return {
          x: width / 2 + x2 * scale,
          y: height / 2 + y2 * scale,
          z: z2,
          scale,
        };
      };

      // Draw subtle orbital ring backdrop
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.42, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      // Project outer and inner vertices
      const projectedOuter = rawVertices.map(project);
      const projectedInner = innerVertices.map(project);

      // Render wireframe edges
      edges.forEach(([i, j]) => {
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];
        const avgZ = (p1.z + p2.z) / 2;

        // Depth based opacity
        const alpha = Math.max(0.1, Math.min(0.85, (avgZ + 1.8) / 3.6));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(199, 255, 65, ${alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Connected spokes to inner core
        const ip1 = projectedInner[i];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(ip1.x, ip1.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Render vertices / glowing nodes
      projectedOuter.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 1.8) / 3.6);
        const radius = Math.max(2, 4.5 * (p.scale / 120));

        // Vertex glow aura
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5);
        gradient.addColorStop(0, 'rgba(199, 255, 65, 0.6)');
        gradient.addColorStop(1, 'rgba(199, 255, 65, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core solid vertex
        ctx.fillStyle = '#C7FF41';
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // White core highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and render orbiting particles
      particles.forEach((pt) => {
        pt.angle += pt.speed;
        pt.x = Math.cos(pt.angle) * pt.orbitRadius;
        pt.z = Math.sin(pt.angle) * pt.orbitRadius;

        const proj = project(pt);
        const pAlpha = Math.max(0.1, (proj.z + 2.5) / 5);

        ctx.fillStyle = `rgba(245, 243, 239, ${pAlpha * 0.55})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[360px] md:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="Click and drag to explore abstract 3D object"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      {/* Interaction helper tag */}
      <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#858585] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 pointer-events-none transition-opacity duration-300">
        {isInteracting ? '3D ORBIT ACTIVE' : 'DRAG TO ROTATE 3D MESH'}
      </div>
    </div>
  );
}
