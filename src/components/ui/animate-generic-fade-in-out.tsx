'use client';

import React from 'react';

import { motion } from 'framer-motion';

type AnimateGenericFadeInOutProps = {
  children: React.ReactNode;
  className?: string;
  motionKey?: string;
};

export const AnimateGenericFadeInOut = ({
  children,
  className,
  motionKey,
}: AnimateGenericFadeInOutProps) => {
  return (
    <motion.section
      key={motionKey}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
