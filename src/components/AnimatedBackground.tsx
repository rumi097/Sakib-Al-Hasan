// src/components/AnimatedBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'minimal' | 'dense';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const particleCount = variant === 'dense' ? 8 : variant === 'minimal' ? 3 : 5;
  
  const colors = [
    'bg-purple-300',
    'bg-blue-300',
    'bg-pink-300',
    'bg-indigo-300',
    'bg-teal-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-red-300',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, index) => (
        <motion.div
          key={index}
          className={`absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 ${
            colors[index % colors.length]
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
