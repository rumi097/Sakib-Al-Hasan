// pages/organization.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Organization {
  _id: string;
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
  logo?: any;
}

interface OrganizationProps {
  organizations: Organization[];
}

const OrganizationPage: React.FC<OrganizationProps> = ({ organizations }) => {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        Organizations & Affiliations
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {organizations.map((org, index) => (
          <motion.div
            key={org._id}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {org.logo && (
              <div className="shrink-0 w-24 h-24 relative mb-4 md:mb-0 md:mr-6">
                <Image
                  src={urlFor(org.logo).url()}
                  alt={`${org.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            )}
            <div className="grow">
              <h2 className="text-2xl font-bold text-indigo-700">{org.name}</h2>
              <p className="text-xl font-semibold text-gray-800 mt-1">{org.role}</p>
              <p className="text-gray-600 mt-2">
                {new Date(org.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
                {org.endDate
                  ? new Date(org.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                  : 'Present'}
              </p>
              {org.description && (
                <p className="text-gray-700 mt-4 leading-relaxed">{org.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // We sort by startDate descending to show the most recent first
  const organizations = await sanityClient.fetch(`
    *[_type == "organization"] | order(startDate desc) {
      _id,
      name,
      role,
      startDate,
      endDate,
      description,
      logo
    }
  `);

  return {
    props: {
      organizations,
    },
    revalidate: 60,
  };
};

export default OrganizationPage;