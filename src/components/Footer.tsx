// src/components/Footer.tsx
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaGithub, FaGoogle } from 'react-icons/fa';
import { SiResearchgate } from 'react-icons/si';

export const Footer = () => {
  return (
    // --- Reduced padding from py-16 to py-10 ---
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Portfolio Info */}
        <div>
          {/* --- Reduced margin from mb-4 to mb-2 --- */}
          <h3 className="text-lg font-bold text-white mb-2">Md. Sakib Al Hasan</h3>
          <p className="text-sm mb-3">
            Thank you for visiting my portfolio. Connect with me over socials.
          </p>
          <div className="flex space-x-3">
            {/* Add your actual social links here */}
            <a href="#" className="hover:text-indigo-400 transition-colors"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><FaGoogle size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><SiResearchgate size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link href="/#about" className="hover:text-indigo-400 transition-colors">About</Link></li>
            <li><Link href="/skills" className="hover:text-indigo-400 transition-colors">Skills</Link></li>
            <li><Link href="/education" className="hover:text-indigo-400 transition-colors">Education</Link></li>
            <li><Link href="/experience" className="hover:text-indigo-400 transition-colors">Experience</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="text-md font-semibold text-white mb-2">Contact Info</h4>
          <ul className="space-y-1 text-sm">
            {/* You must update these details from your CV */}
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+8801627009760</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <span>mdsakibalhasan192412@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>Gopalganj Sadar, Bangladesh</span>
            </li>
          </ul>
        </div>

      </div>
      <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Md. Sakib Al Hasan. All rights reserved.
      </div>
    </footer>
  );
};