// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

// --- Imports for Particles ---
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

// --- 1. IMPORT YOUR NEW FOOTER COMPONENT ---
import { Footer } from '../components/Footer';
import FloatingNav from '../components/FloatingNav';

// This is the Navbar component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Skills', href: '/skills' },
    { name: 'Education', href: '/education' },
    { name: 'Experience', href: '/experience' },
    { name: 'Publication', href: '/publication' },
    { name: 'Achievement', href: '/achievement' },
    { name: 'Organization', href: '/organization' },
    { name: 'NextGen', href: '/nextgen' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          Md. Sakib Al Hasan
        </Link>
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative font-medium transition-colors duration-200
                  ${isActive 
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                  }
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-0.5
                  after:w-full
                  after:bg-indigo-600
                  after:transition-transform
                  after:duration-300
                  ${isActive 
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white mt-2 pb-2 border-t border-gray-100"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-indigo-700 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

// This is your main App component
export default function MyApp({ Component, pageProps }: AppProps) {
  
  // --- Particle.js Setup ---
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container);
  }, []);
  // --- End Particle.js Setup ---

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      
      {/* --- PARTICLE BACKGROUND --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute top-0 left-0 w-full h-full z-0" // <-- Puts it in the background
        options={{
          background: {
            color: {
              value: "#f9fafb", // Match your bg-gray-50
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#aaaaaa", // Light gray particles
            },
            links: {
              color: "#aaaaaa", // Light gray links
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      {/* --- 2. YOUR MAIN CONTENT --- */}
      {/* This 'relative z-10' ensures your content is ON TOP of the particles */}
      {/* We add 'flex flex-col' to make the footer sticky */}
      <div className="relative z-10 flex flex-col min-h-screen"> 
        <Navbar />
        
        {/* Floating Navigation Menu */}
        <FloatingNav />
        
        {/* 'flex-grow' makes the main content fill the available space */}
        <main className="container mx-auto py-8 px-4 grow">
          <Component {...pageProps} />
        </main>
        
        {/* --- 3. REPLACE THE OLD FOOTER WITH THE NEW COMPONENT --- */}
        <Footer />

      </div>

    </div>
  );
}