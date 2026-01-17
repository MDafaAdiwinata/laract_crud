'use client';

import * as React from 'react';
import { motion, Variants } from 'motion/react';
import { cn } from '@/lib/utils';

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const defaultContainer: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const defaultItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedGroup({
  children,
  className,
  variants,
}: AnimatedGroupProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants?.container ?? defaultContainer}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={variants?.item ?? defaultItem}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
