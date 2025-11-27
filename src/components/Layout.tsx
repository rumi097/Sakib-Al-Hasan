// components/Layout.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingNav from './FloatingNav';

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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Floating Navigation */}
      <FloatingNav />
      
      <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-700">
            {/* Replace with client's name or logo */}
            [Client Name] Portfolio
          </Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-indigo-700 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
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
      <main className="container mx-auto py-8 px-4">{children}</main>
      <footer className="text-center py-6 text-gray-500 text-sm bg-white shadow-inner mt-8">
        &copy; {new Date().getFullYear()} {`[Client Name]'s Portfolio. All rights reserved.`}
      </footer>
    </div>
  );
};

export default Layout;