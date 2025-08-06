import React from 'react';
import { useIntersectionObserver } from '../../../hooks';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const getTransformValue = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)';
      case 'down':
        return 'translateY(-30px)';
      case 'left':
        return 'translateX(30px)';
      case 'right':
        return 'translateX(-30px)';
      default:
        return 'none';
    }
  };

  const baseClasses = 'transition-all ease-out';
  const transformClasses = isIntersecting
    ? 'translate-y-0 translate-x-0 opacity-100'
    : `opacity-0 ${direction !== 'none' ? 'transform' : ''}`;

  const style = {
    transform: isIntersecting ? 'none' : getTransformValue(),
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <section
      ref={ref}
      className={`${baseClasses} ${transformClasses} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}; 