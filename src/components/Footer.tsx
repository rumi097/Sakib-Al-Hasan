// src/components/Footer.tsx
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaGithub, FaGoogle } from 'react-icons/fa';
import { SiResearchgate } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Portfolio Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-white mb-2">Md. Sakib Al Hasan</h3>
          <p className="text-sm mb-3 max-w-xs md:max-w-none mx-auto md:mx-0">
            Thank you for visiting my portfolio. Connect with me over socials.
          </p>
            <div className="flex space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/sakib-al-h-353236216/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://scholar.google.com/citations?user=2UhUtNsAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaGoogle size={20} />
            </a>
            <a
              href="https://www.researchgate.net/profile/Md-Sakib-Al-Hasan-2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              <SiResearchgate size={20} />
            </a>
            </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link href="/#about" className="hover:text-indigo-400 transition-colors">About</Link></li>
            <li><Link href="/skills" className="hover:text-indigo-400 transition-colors">Skills</Link></li>
            <li><Link href="/education" className="hover:text-indigo-400 transition-colors">Education</Link></li>
            <li><Link href="/experience" className="hover:text-indigo-400 transition-colors">Experience</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-md font-semibold text-white mb-3">Contact Info</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <span>📞</span>
              <span>+8801627009760</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <span>📧</span>
              <span>mdsakibalhasan192412@gmail.com</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <span>📍</span>
              <span>Gopalganj Sadar, Bangladesh</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="text-center text-xs mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Md. Sakib Al Hasan. All rights reserved.
      </div>
    </footer>
  );
};