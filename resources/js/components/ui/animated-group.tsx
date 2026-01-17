'use client';
import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';
import React from 'react';
import { cn } from '@/lib/utils';

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
};

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function AnimatedGroup({
  children,
  className,
  variants,
}: AnimatedGroupProps) {
  const containerVariants =
    variants?.container ?? defaultContainerVariants;

  const itemVariants =
    variants?.item ?? defaultItemVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}