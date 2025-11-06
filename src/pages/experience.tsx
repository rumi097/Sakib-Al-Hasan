// pages/experience.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react'; // For rich text blocks

interface ExperienceEntry {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: any[]; // Sanity Portable Text
}

interface ExperienceProps {
  experience: ExperienceEntry[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Experience</h1>
      <div className="relative border-l-4 border-indigo-600 pl-8">
        {experience.map((entry, index) => (
          <motion.div
            key={entry._id}
            className="mb-10 p-6 bg-white rounded-lg shadow-md relative group hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-10 top-6 w-5 h-5 bg-indigo-600 rounded-full ring-4 ring-indigo-200 group-hover:ring-indigo-400 transition-all duration-300"></div>

            <h2 className="text-2xl font-bold text-indigo-700">{entry.title}</h2>
            <p className="text-xl font-semibold text-gray-800 mt-1">{entry.company}, {entry.location}</p>
            <p className="text-gray-600 mt-2">
              {new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
              {entry.endDate
                ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                : 'Present'}
            </p>
            {entry.description && (
              <div className="prose prose-indigo max-w-none mt-4 text-gray-700 leading-relaxed">
                <PortableText value={entry.description} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Visual Representation */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience Timeline Visual</h3>
        <p className="text-gray-600 mb-8">This visual represents the structure for experience details, as depicted in your sketch.</p>
        
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const experience = await sanityClient.fetch(`
    *[_type == "experience"] | order(startDate desc) {
      _id,
      title,
      company,
      location,
      startDate,
      endDate,
      description
    }
  `);

  return {
    props: {
      experience,
    },
    revalidate: 60,
  };
};

export default Experience;