// pages/contact.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

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
  if (!formspreeId) {
    console.error("Formspree ID is not set in environment variables.");
    // You could return a message to the user here
  }
  
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
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Contact Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
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
                className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-indigo-600">📧</span>
              <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-indigo-600 text-lg">
                {contact.email}
              </a>
            </div>
            {contact.phone && (
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">📞</span>
                <span className="text-gray-700 text-lg">{contact.phone}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">💼</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-lg">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {contact.github && (
              <div className="flex items-center space-x-3">
                <span className="text-indigo-600">💻</span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-lg">
                  GitHub Profile
                </a>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch the first document of type 'contact'
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
      contact: contact || { email: 'your-default@email.com' }, // Provide a fallback
    },
    revalidate: 60,
  };
};

export default ContactPage;