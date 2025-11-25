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
  github?: string; // Kept in interface but not used in main buttons as per request
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
    <section className="py-12 min-h-[80vh] flex flex-col justify-center">
      <motion.h1 
        className="text-4xl font-extrabold text-gray-900 text-center mb-12 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <MdOutlineHeadsetMic /> Get In Touch
      </motion.h1>
      
      {/* --- Box Container --- */}
      <motion.div 
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-16 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        
        {/* Left Column: Illustration */}
        <motion.div
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image 
            src="/contact.svg"
            alt="Contact me" 
            width={400} 
            height={400} 
            className="w-full h-auto max-w-xs"
            priority 
          />
        </motion.div>

        {/* Right Column: Direct Action Buttons */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Connect directly:
          </h2>

          {/* 1. Email Button */}
          <motion.a
            href={`mailto:${contact?.email}`}
            custom={0}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="group flex items-center justify-between p-5 bg-blue-50 hover:bg-blue-600 rounded-xl border border-blue-100 transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white">Email Me</h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-100">{contact?.email || "Send an email"}</p>
              </div>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-white" />
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
              className="group flex items-center justify-between p-5 bg-indigo-50 hover:bg-indigo-600 rounded-xl border border-indigo-100 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                  <FaLinkedin />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white">LinkedIn Profile</h3>
                  <p className="text-sm text-gray-500 group-hover:text-indigo-100">Let's connect professionally</p>
                </div>
              </div>
              <FaExternalLinkAlt className="text-gray-400 group-hover:text-white" />
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
              className="group flex items-center justify-between p-5 bg-green-50 hover:bg-green-600 rounded-xl border border-green-100 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl group-hover:bg-white group-hover:text-green-600 transition-colors">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white">Call Me</h3>
                  <p className="text-sm text-gray-500 group-hover:text-green-100">{contact.phone}</p>
                </div>
              </div>
              <FaExternalLinkAlt className="text-gray-400 group-hover:text-white" />
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