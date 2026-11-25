import type { CSSProperties } from 'react';

export function Halftone({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <div className={`halftone ${className}`} style={style} aria-hidden="true" />;
}

export function Burst({
  children,
  className = '',
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`burst ${className}`} style={style} aria-hidden={children ? undefined : true}>
      <span>{children}</span>
    </div>
  );
}

export function Tape({ className = '' }: { className?: string }) {
  return <span className={`tape ${className}`} aria-hidden="true" />;
}

export function Flower({ className = '', tone = 'rose' }: { className?: string; tone?: 'rose' | 'teal' }) {
  return (
    <svg className={`flower ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <g fill={tone === 'rose' ? 'var(--accent)' : 'var(--accent-2)'} opacity="0.92">
        <ellipse cx="32" cy="14" rx="9" ry="13" />
        <ellipse cx="32" cy="50" rx="9" ry="13" />
        <ellipse cx="14" cy="32" rx="13" ry="9" />
        <ellipse cx="50" cy="32" rx="13" ry="9" />
        <ellipse cx="19" cy="19" rx="10" ry="8" transform="rotate(-45 19 19)" />
        <ellipse cx="45" cy="45" rx="10" ry="8" transform="rotate(-45 45 45)" />
        <ellipse cx="45" cy="19" rx="10" ry="8" transform="rotate(45 45 19)" />
        <ellipse cx="19" cy="45" rx="10" ry="8" transform="rotate(45 19 45)" />
      </g>
      <circle cx="32" cy="32" r="8" fill="var(--pop)" stroke="var(--ink)" strokeWidth="1.6" />
    </svg>
  );
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1.5 14.1 9 21.5 12 14.1 15 12 22.5 9.9 15 2.5 12 9.9 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BellIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9a6 6 0 1 1 12 0c0 4 1.4 5.3 2 6H4c.6-.7 2-2 2-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9.5 19a2.6 2.6 0 0 0 5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ dir = 'right', className = '' }: { dir?: 'left' | 'right'; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === 'right' ? 'M4 12h15M13 6l6 6-6 6' : 'M20 12H5M11 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" fill="currentColor" />
    </svg>
  );
}
