import { motion } from 'framer-motion';
import React from 'react';

interface RichButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
  className?: string;
}

export default function RichButton({
  children,
  variant = 'filled',
  className = '',
  ...props
}: RichButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.09, boxShadow: variant === 'filled' ? '0 0 24px 6px #FFD70088' : undefined }}
      whileTap={{ scale: 0.97 }}
      className={`
        px-6 py-3
        font-semibold uppercase tracking-wider
        transition-all duration-300
        rounded-lg
        focus:outline-none
        ${variant === 'filled' ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-2 border-amber-400 shadow-lg' : ''}
        ${variant === 'outline' ? 'bg-transparent border-2 border-amber-400 text-amber-950 hover:bg-amber-50/40' : ''}
        shimmer relative overflow-hidden z-10
        ${className}
      `}
      style={{
        backgroundClip: 'padding-box',
      }}
      {...props}
    >
      <span className="relative z-20">{children}</span>
      {/* Gold shimmer effect */}
      {variant === 'filled' && (
        <span className="absolute inset-0 opacity-30 z-0 shimmer-block" style={{
          background: 'linear-gradient(120deg, rgba(254,243,199,0.7) 0%, rgba(253,230,138,0.35) 60%, rgba(252,211,77,0.4) 100%)',
          pointerEvents: 'none',
          animation: 'gradient-x 2.6s linear infinite',
        }} />
      )}
    </motion.button>
  );
}




