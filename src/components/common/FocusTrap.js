import { useEffect, useRef } from 'react';

const FocusTrap = ({ children, isActive, onEscape }) => {
  const containerRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (isActive) {
      previousFocus.current = document.activeElement;
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && onEscape) {
          onEscape();
          return;
        }

        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previousFocus.current?.focus();
      };
    }
  }, [isActive, onEscape]);

  return (
    <div ref={containerRef} role="presentation">
      {children}
    </div>
  );
};

export default FocusTrap;
