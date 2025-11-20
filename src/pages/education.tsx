// src/pages/education.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Interface for a single certificate
interface Certificate {
  _key: string;
  name?: string;
  image?: any;
  link?: string;
}

// Interface for a single education entry
interface EducationEntry {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  certificates?: Certificate[]; // This is the array of certificates
}

interface EducationProps {
  educationEntries: EducationEntry[];
}

const Education: React.FC<EducationProps> = ({ educationEntries }) => {
  if (!educationEntries || educationEntries.length === 0) {
    return (
      <section className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900">Education</h1>
        <p className="text-gray-700 mt-4">
          No education history found. Please add content in the Sanity Studio.
        </p>
      </section>
    );
  }
  
  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Education</h1>
      <div className="space-y-10 max-w-4xl mx-auto">
        {educationEntries.map((entry, index) => (
          <motion.div
            key={entry._id}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-indigo-700">{entry.degree}</h2>
            <p className="text-xl font-semibold text-gray-800 mt-1">{entry.institution}, {entry.location}</p>
            <p className="text-gray-600 mt-2">
              {new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
              {entry.endDate
                ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                : 'Present'}
            </p>
            {entry.description && <p className="text-gray-700 mt-4 leading-relaxed">{entry.description}</p>}

            {/* --- THIS IS THE NEW SECTION --- */}
            {entry.certificates && entry.certificates.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Certificates & Documents:</h4>
                <div className="flex flex-wrap gap-4">
                  
                  {entry.certificates.map((cert) => (
                    <div key={cert._key} className="p-4 border rounded-md bg-gray-50 flex-1 min-w-[200px] max-w-xs">
                      
                      {cert.image && (
                        <div className="relative w-full h-32 mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src={urlFor(cert.image).width(300).url()}
                            alt={cert.name || 'Certificate Screenshot'}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      
                      <p className="font-medium text-gray-900 wrap-break-word">
                        {cert.name || 'Certificate'}
                      </p>
                      
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          View Link
                        </a>
                      )}
                    </div>
                  ))}
                  
                </div>
              </div>
            )}
            {/* --- END OF NEW SECTION --- */}

          </motion.div>
        ))}
      </div>
       
       {/* Your Timeline Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Education Journey Timeline</h3>
        <p className="text-gray-600 mb-8">This section illustrates the educational progression from your design sketch. </p>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // The query MUST fetch the certificates array
  const educationEntries = await sanityClient.fetch(`
    *[_type == "education"] | order(startDate desc) {
      _id,
      degree,
      institution,
      location,
      startDate,
      endDate,
      description,
      certificates // <-- Fetches the array
    }
  `);

  return {
    props: {
      educationEntries: educationEntries || null,
    },
    revalidate: 60,
  };
};

export default Education;