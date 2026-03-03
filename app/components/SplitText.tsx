import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  tag: Tag = 'p',
  delay = 50,
  duration = 1.0,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.15,
  rootMargin = '0px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const units: HTMLElement[] = [];

    // Build spans
    el.innerHTML = '';
    if (splitType === 'words') {
      text.split(' ').forEach((word, wi, arr) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        el.appendChild(span);
        units.push(span);
        if (wi < arr.length - 1) el.appendChild(document.createTextNode('\u00a0'));
      });
    } else {
      Array.from(text).forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00a0' : char;
        span.style.display = 'inline-block';
        el.appendChild(span);
        units.push(span);
      });
    }

    // Set initial (hidden) state
    gsap.set(units, from);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            gsap.killTweensOf(units);
            gsap.to(units, {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              onComplete: onLetterAnimationComplete,
            });
          } else {
            // Reset to hidden state so it re-animates next time
            gsap.killTweensOf(units);
            gsap.set(units, from);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(units);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={containerRef as RefObject<HTMLParagraphElement & HTMLHeadingElement>}
      className={className}
      style={{ textAlign: textAlign as CSSProperties['textAlign'] }}
    />
  );
}
