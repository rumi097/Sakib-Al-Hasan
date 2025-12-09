// src/pages/contact.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Import Icons ---
import { FaEnvelope, FaPhone, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlineHeadsetMic } from 'react-icons/md';

interface ContactInfo {
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
}

interface ContactProps {
  contact: ContactInfo;
}

const ContactPage: React.FC<ContactProps> = ({ contact }) => {
  
  // Animation variants for the buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggered animation
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="py-16 min-h-[85vh] flex flex-col justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <MdOutlineHeadsetMic className="text-white text-3xl" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
          Get In Touch
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
          Let's connect and discuss how we can work together
        </p>
      </motion.div>
      
      {/* --- Box Container --- */}
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center bg-white/80 backdrop-blur-sm p-6 md:p-12 lg:p-16 rounded-3xl shadow-2xl border border-white/20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        
        {/* Left Column: Illustration */}
        <motion.div
          className="hidden lg:flex justify-center items-center relative"
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl blur-2xl opacity-20" />
            <img 
              src={`/contact-modern.svg?v=${Date.now()}`}
              alt="Contact illustration"
              className="w-full h-auto max-w-lg relative z-10 drop-shadow-2xl"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Direct Action Buttons */}
        <div className="flex flex-col space-y-5">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Connect Directly
          </motion.h2>
          <p className="text-gray-500 text-sm mb-4 text-center lg:text-left">Choose your preferred way to reach out</p>

          {/* 1. Email Button */}
          <motion.a
            href={`mailto:${contact?.email}`}
            custom={0}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-600 hover:to-blue-700 rounded-2xl border border-blue-200 hover:border-blue-600 transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 group-hover:via-blue-400/20 transition-all duration-500" />
            <div className="flex items-center gap-4 min-w-0 flex-1 relative z-10">
              <motion.div 
                className="shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-white group-hover:to-blue-50 text-white group-hover:text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FaEnvelope />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">Email Me</h3>
                <p className="text-xs md:text-sm text-gray-600 group-hover:text-blue-100 break-all transition-colors">
                  {contact?.email || "Send an email"}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaExternalLinkAlt className="shrink-0 text-gray-400 group-hover:text-white ml-2 transition-colors" />
            </motion.div>
          </motion.a>

          {/* 2. LinkedIn Button */}
          {contact?.linkedin && (
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              custom={1}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-between p-6 bg-gradient-to-br from-indigo-50 to-purple-100 hover:from-indigo-600 hover:to-purple-700 rounded-2xl border border-indigo-200 hover:border-indigo-600 transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 group-hover:via-indigo-400/20 transition-all duration-500" />
              <div className="flex items-center gap-4 min-w-0 flex-1 relative z-10">
                <motion.div 
                  className="shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:from-white group-hover:to-indigo-50 text-white group-hover:text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaLinkedin />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">LinkedIn Profile</h3>
                  <p className="text-xs md:text-sm text-gray-600 group-hover:text-indigo-100 transition-colors">
                    Let's connect professionally
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <FaExternalLinkAlt className="shrink-0 text-gray-400 group-hover:text-white ml-2 transition-colors" />
              </motion.div>
            </motion.a>
          )}

          {/* 3. Phone Button */}
          {contact?.phone && (
            <motion.a
              href={`tel:${contact.phone}`}
              custom={2}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-between p-6 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-600 hover:to-emerald-700 rounded-2xl border border-green-200 hover:border-green-600 transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 group-hover:via-green-400/20 transition-all duration-500" />
              <div className="flex items-center gap-4 min-w-0 flex-1 relative z-10">
                <motion.div 
                  className="shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 group-hover:from-white group-hover:to-green-50 text-white group-hover:text-green-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPhone />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">Call Me</h3>
                  <p className="text-xs md:text-sm text-gray-600 group-hover:text-green-100 break-all transition-colors">
                    {contact.phone}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                <FaExternalLinkAlt className="shrink-0 text-gray-400 group-hover:text-white ml-2 transition-colors" />
              </motion.div>
            </motion.a>
          )}

        </div>
      </motion.div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contact = await sanityClient.fetch(`
    *[_type == "contact"][0] {
      email,
      phone,
      github,
      linkedin
    }
  `);
  return {
    props: {
      contact: contact || {},
    },
    revalidate: 60,
  };
};

export default ContactPage;