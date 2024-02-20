"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}


export const AnimatedTooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const x = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.6 }}  // Adjusted initial position
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: -20, scale: 0.6 }}  // Adjusted exit position
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: 'nowrap',
              position: 'absolute',
              top: '-180%',  // Adjusted top position
              left: '50%',
              transform: 'translateX(-50%)',
              z: '1000'
            }}
          >
            <div className="flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2">
              {/* Your tooltip content here */}
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
              <div className="font-bold text-white relative z-30 text-base">{text}</div>
              {/* <div className="text-white text-xs">{text}</div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
