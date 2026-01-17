'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { cn } from '@/lib/utils';

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  containerVariants?: Variants;
  itemVariants?: Variants;
};

const defaultContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedGroup({
  children,
  className,
  containerVariants = defaultContainerVariants,
  itemVariants = defaultItemVariants,
}: AnimatedGroupProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
