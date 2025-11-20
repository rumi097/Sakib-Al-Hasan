// src/pages/publication.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Publication {
  _id: string;
  title: string;
  authors: string[];
  journalConference: string;
  year: number;
  publicationLink: string;
  documentLink?: string;
  category: string;
}

interface PublicationProps {
  publications: Publication[];
  contactInfo: {
    googleScholar?: string;
    researchGate?: string;
  }
}

// Helper to group publications by category
interface GroupedPublications {
  [category: string]: Publication[];
}

// Animation for the container (staggered children)
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each pub fades in 0.2s after the previous
    },
  },
};

// Animation for each publication card
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const PublicationPage: React.FC<PublicationProps> = ({ publications, contactInfo }) => {
  
  // Group publications by their category
  const grouped = (publications || []).reduce((acc, pub) => {
    const category = pub.category || 'General'; // Default category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(pub);
    return acc;
  }, {} as GroupedPublications);

  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Publications</h1>

      {/* Links from your sketch */}
      <motion.div 
        className="flex justify-center flex-wrap gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {contactInfo?.googleScholar && (
          <a
            href={contactInfo.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Google Scholar
          </a>
        )}
        {contactInfo?.researchGate && (
          <a
            href={contactInfo.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors duration-300"
          >
            ResearchGate
          </a>
        )}
      </motion.div>

      <div className="space-y-16">
        {Object.entries(grouped).map(([category, pubs], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">
              {category}
            </h2>
            <motion.div 
              className="space-y-8"
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {pubs.map((pub) => (
                <motion.div
                  key={pub._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants} // <-- Staggered item animation
                  whileHover={{ scale: 1.02, y: -4 }} // <-- Hover lift effect
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900">{pub.title}</h3>
                  <p className="text-gray-600 mt-2">
                    {pub.authors && pub.authors.join(', ')}
                  </p>
                  <p className="text-gray-800 italic mt-2">
                    {pub.journalConference} ({pub.year})
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {pub.publicationLink && (
                      <a
                        href={pub.publicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                      >
                        View Publication (DOI)
                      </a>
                    )}
                    {pub.documentLink && (
                      <a
                        href={pub.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                      >
                        View Document
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const publications = await sanityClient.fetch(`
    *[_type == "publication"] | order(year desc) {
      _id,
      title,
      authors,
      journalConference,
      year,
      publicationLink,
      documentLink,
      category
    }
  `);

  // Fetch the Google Scholar/ResearchGate links from the 'contact' doc
  const contactInfo = await sanityClient.fetch(`
    *[_type == "contact"][0] {
      googleScholar,
      researchGate
    }
  `);

  return {
    props: {
      publications: publications || [],
      contactInfo: contactInfo || {},
    },
    revalidate: 60,
  };
};

export default PublicationPage;