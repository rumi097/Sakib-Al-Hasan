// pages/education.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface EducationEntry {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  certificateImage?: any;
  certificateLink?: string;
}

interface EducationProps {
  education: EducationEntry[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Education</h1>
      <div className="space-y-10">
        {education.map((entry, index) => (
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

            {(entry.certificateImage || entry.certificateLink) && (
              <div className="mt-6 flex items-center space-x-4">
                {entry.certificateImage && (
                  <motion.a
                    href={urlFor(entry.certificateImage).url()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-32 h-24 overflow-hidden rounded-md shadow-sm border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={urlFor(entry.certificateImage).width(200).height(150).url()}
                      alt={`${entry.degree} certificate`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm">View Image</span>
                    </div>
                  </motion.a>
                )}
                {entry.certificateLink && (
                  <a
                    href={entry.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    View Certificate
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
       {/* Visual Representation */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Education Journey Timeline</h3>
        <p className="text-gray-600 mb-8">This section illustrates the educational progression from your design sketch. </p>
        
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const education = await sanityClient.fetch(`
    *[_type == "education"] | order(startDate desc) {
      _id,
      degree,
      institution,
      location,
      startDate,
      endDate,
      description,
      certificateImage,
      certificateLink,
    }
  `);

  return {
    props: {
      education,
    },
    revalidate: 60,
  };
};

export default Education;