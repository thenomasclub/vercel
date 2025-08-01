import { useEffect } from 'react';

export default function useClassBasedAutoScroll(className = 'auto-scroll', speed = 0.5) {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${className}`);
    const scrollState = new Map();

    elements.forEach((el) => {
      let scrollX = 0;
      let frameId;
      let isPaused = false;

      const animate = () => {
        if (!isPaused) {
          scrollX += speed;
          if (scrollX >= el.scrollWidth / 2) {
            scrollX = 0;
          }
          el.style.transform = `translateX(-${scrollX}px)`;
        }
        frameId = requestAnimationFrame(animate);
      };

      // Add hover listeners
      const onEnter = () => (isPaused = true);
      const onLeave = () => (isPaused = false);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      animate();

      // Save frame ID and listeners for cleanup
      scrollState.set(el, {
        frameId,
        onEnter,
        onLeave,
      });
    });

    // Cleanup on unmount
    return () => {
      scrollState.forEach(({ frameId, onEnter, onLeave }, el) => {
        cancelAnimationFrame(frameId);
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [className, speed]);
}
