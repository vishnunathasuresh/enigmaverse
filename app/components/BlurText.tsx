import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  delay?: number;
  stepDuration?: number;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  className = '',
  animateBy = 'words',
  direction = 'top',
  delay = 200,
  stepDuration = 0.35,
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: rootMargin as `${number}px` });

  const units = animateBy === 'words' ? text.split(' ') : text.split('');

  const yFrom = direction === 'top' ? -20 : 20;

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(8px)', y: yFrom }}
          animate={
            isInView
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: 'blur(8px)', y: yFrom }
          }
          transition={{
            duration: stepDuration,
            delay: (i * delay) / 1000,
            ease: 'easeOut',
          }}
          onAnimationComplete={i === units.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {unit}{animateBy === 'words' && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}
