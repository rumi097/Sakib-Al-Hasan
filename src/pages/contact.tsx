// src/pages/contact.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import Image from 'next/image';

// --- Import Icons ---
import { FaUser, FaEnvelope, FaCommentDots, FaPhone, FaPaperPlane } from 'react-icons/fa';
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
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [state, handleSubmit] = useForm(formspreeId || '');

  if (state.succeeded) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-green-600">Thanks for your message!</h2>
        <p className="text-gray-700 mt-4">I'll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <section className="py-12">
      <motion.h1 
        className="text-4xl font-extrabold text-gray-900 text-center mb-12 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MdOutlineHeadsetMic /> Get In Touch
      </motion.h1>
      
      {/* --- This is the new "Box" from the video --- */}
      <motion.div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white p-8 md:p-12 rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        
        {/* Left Column: Illustration */}
        <motion.div
          className="hidden md:block" // Hides on mobile
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image 
            src="/contact.svg" // This is the file you must add to '/public'
            alt="Contact me" 
            width={500} 
            height={500} 
            className="w-full h-auto"
          />
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- Name Field --- */}
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  className="mt-1 block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* --- Email Field --- */}
            <div>
              <label htmlFor="email" className="sr-only">Your Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="mt-1 block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* --- Phone Field (NEW) --- */}
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  className="mt-1 block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* --- Message Field --- */}
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCommentDots className="text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                  className="mt-1 block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 shadow-lg"
              >
                Submit
                <FaPaperPlane className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
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