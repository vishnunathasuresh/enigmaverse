import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#22d3ee', '#818cf8', '#38bdf8', '#06b6d4'],
  animationSpeed = 8,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
  showBorder = false,
}: GradientTextProps) {
  const gradientDir =
    direction === 'vertical'
      ? 'to bottom'
      : direction === 'diagonal'
      ? '135deg'
      : 'to right';

  const gradientColors = [...colors, ...colors].join(', ');
  const bgSize = '300% 300%';
  const animName = `gradient-shift-${direction}`;

  const keyframesStyle = `
    @keyframes ${animName} {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <span
        className={className}
        style={{
          backgroundImage: `linear-gradient(${gradientDir}, ${gradientColors})`,
          backgroundSize: bgSize,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: `${animName} ${animationSpeed}s ease ${yoyo ? 'alternate' : 'normal'} infinite`,
          display: 'inline-block',
          border: showBorder ? `2px solid transparent` : undefined,
        }}
      >
        {children}
      </span>
    </>
  );
}
