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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`
        px-4 sm:px-6 py-3 sm:py-3.5
        text-sm sm:text-base font-semibold uppercase tracking-wider
        transition-all duration-300
        rounded-lg
        focus:outline-none
        min-h-[48px]
        ${variant === 'filled' ? 'bg-gold text-white border-none shadow-md hover:bg-gold-dark' : ''}
        ${variant === 'outline' ? 'bg-transparent border border-gold text-gold hover:bg-gold/5' : ''}
        relative overflow-hidden z-10
        ${className}
      `}
      style={{
        backgroundClip: 'padding-box',
      }}
      {...props}
    >
      <span className="relative z-20">{children}</span>
      {/* Gold shimmer effect - simplified */}
      {variant === 'filled' && (
        <span className="absolute inset-0 opacity-20 z-0 bg-gold-light" />
      )}
    </motion.button>
  );
}




