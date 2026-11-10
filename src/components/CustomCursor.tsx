import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on precise pointer devices (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaQuery.matches || prefersReducedMotion.matches) {
      return;
    }

    setIsPointerDevice(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp trailing animation for the cursor ring
  useEffect(() => {
    if (!isPointerDevice) return;
    let animId: number;

    const animateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(animateTrailing);
    };

    animId = requestAnimationFrame(animateTrailing);
    return () => cancelAnimationFrame(animId);
  }, [position, isPointerDevice]);

  if (!isPointerDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Central pinpoint dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C7FF41] shadow-[0_0_10px_#C7FF41] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0 : 1})`,
        }}
      />
      {/* Outer fluid halo ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-12 h-12 bg-[#C7FF41]/15 border-[#C7FF41] backdrop-blur-[1px]'
            : 'w-8 h-8 border-[#C7FF41]/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
        }}
      />
    </div>
  );
}
