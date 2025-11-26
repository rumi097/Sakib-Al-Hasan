// src/components/FloatingNav.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  bgGradient: string;
}

const navItems: NavItem[] = [
  { 
    name: 'Home', 
    href: '/', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    bgGradient: 'from-blue-500 to-indigo-600'
  },
  { 
    name: 'About', 
    href: '/#about', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgGradient: 'from-purple-500 to-purple-700'
  },
  { 
    name: 'Skills', 
    href: '/skills', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    bgGradient: 'from-green-500 to-emerald-600'
  },
  { 
    name: 'Experience', 
    href: '/experience', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bgGradient: 'from-orange-500 to-orange-600'
  },
  { 
    name: 'Publication', 
    href: '/publication', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    bgGradient: 'from-pink-500 to-rose-600'
  },
  { 
    name: 'Organization', 
    href: '/organization', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bgGradient: 'from-red-500 to-red-600'
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bgGradient: 'from-indigo-500 to-blue-600'
  },
];

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed right-2 md:right-4 bottom-4 md:bottom-6 z-50">
      {/* Navigation Icons */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="flex flex-col-reverse items-center space-y-reverse space-y-1.5 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => {
                const isActive = router.pathname === item.href || 
                  (item.href === '/#about' && router.pathname === '/' && router.asPath.includes('#about'));
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ scale: 0, x: 100, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    exit={{ scale: 0, x: 100, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.08,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                    className="relative group"
                  >
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${item.bgGradient} bg-opacity-80 backdrop-blur-md text-white shadow-md cursor-pointer relative overflow-hidden ${
                          isActive ? 'ring-2 ring-white ring-opacity-60 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : ''
                        }`}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        {/* Icon */}
                        <span className="relative z-10 scale-[0.65]">{item.icon}</span>
                        
                        {/* Pulse effect for active page */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-white"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                    
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg"
                    >
                      {item.name}
                      <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-gray-900" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        className={`w-11 h-11 flex items-center justify-center rounded-full shadow-lg relative overflow-hidden ${
          isOpen 
            ? 'bg-gradient-to-br from-cyan-400 via-blue-400 to-teal-400' 
            : 'bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500'
        } text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 90 : 0,
        }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/60"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingNav;
