// src/pages/organization.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- Interfaces ---
interface Organization {
  _id: string;
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  logo?: any;
}

interface GalleryImage {
  _key: string;
  image: any;
  heading: string;
  description: string;
}

interface ActivityGroup {
  _key: string;
  groupTitle: string;
  groupDescription: string;
  gallery: GalleryImage[];
}

interface OrgActivitySection {
  _id: string;
  title: string;
  description: string;
  activityGroups: ActivityGroup[];
}

interface OrganizationProps {
  organizations: Organization[];
  activitySections: OrgActivitySection[];
}

// --- Animation Variants ---
// We use these for the inner items
const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
};

const galleryVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const imageItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};


const OrganizationPage: React.FC<OrganizationProps> = ({ organizations, activitySections }) => {
  return (
    <section className="py-8">
      
      {/* --- FIX 1: PLAIN HTML TITLE (Guarantees visibility) --- */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Organizations & Affiliations
      </h1>

      {/* --- SECTION 1: COMPACT ORGANIZATION BOXES --- */}
      {/* FIX 2: Plain div container, children animate immediately */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {(organizations || []).map((org, index) => (
          <motion.div
            key={org._id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
            // Force immediate animation (no scroll trigger needed for top items)
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            {org.logo && (
              <div className="shrink-0 w-16 h-16 relative">
                <Image
                  src={urlFor(org.logo).url()}
                  alt={`${org.name} logo`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <div className="grow">
              <h2 className="text-lg font-bold text-indigo-700">{org.name}</h2>
              <p className="text-md font-semibold text-gray-800">{org.role}</p>
              <p className="text-sm text-gray-600">
                {new Date(org.startDate).toLocaleDateString(
                  'en-US', { month: 'short', year: 'numeric' }
                )} -{' '}
                {org.endDate
                  ? new Date(org.endDate).toLocaleDateString(
                      'en-US', { month: 'short', year: 'numeric' }
                    )
                  : 'Present'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Horizontal Divider --- */}
      <hr className="max-w-4xl mx-auto border-t-2 border-gray-200 mb-16" />

      {/* --- SECTION 2: NEXTGEN-STYLE ACTIVITY SECTION --- */}
      
      {/* --- FIX 3: PLAIN HTML JUMP BOX (Guarantees visibility) --- */}
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {/* Hardcoded Title inside the box if needed, or just links */}
          <h3 className="w-full text-center font-semibold text-gray-700 mb-3">Jump to Activity Section</h3>
          {(activitySections || []).map((section) => (
            <a
              key={section._id}
              href={`#${section._id}`}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>
      
      {/* --- Activity Sections List --- */}
      <div className="space-y-12">
        {(activitySections || []).map((section, index) => {
          
          // --- FIX 4: "First Section" Logic ---
          // If it's the first activity section, show it immediately.
          // Otherwise, wait for scroll.
          const isFirst = index === 0;

          return (
            <motion.section
              key={section._id}
              id={section._id}
              initial={isFirst ? "show" : "hidden"} 
              whileInView={isFirst ? undefined : "show"}
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {/* Section Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-indigo-700">{section.title}</h2>
                <p className="mt-2 text-md text-gray-600 max-w-2xl mx-auto">{section.description}</p>
              </div>

              {/* Masonry Layout */}
              <div className="columns-1 lg:columns-2 gap-8">
                {(section.activityGroups || []).map((group) => (
                  <motion.div
                    key={group._key}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col break-inside-avoid mb-8"
                    variants={groupVariants}
                    // Apply same logic to inner cards
                    initial={isFirst ? "show" : "hidden"}
                    whileInView={isFirst ? undefined : "show"}
                    viewport={{ once: true }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">{group.groupTitle}</h3>
                      <p className="mt-1 text-sm text-gray-600">{group.groupDescription}</p>
                    </div>

                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      variants={galleryVariants}
                      initial={isFirst ? "show" : "hidden"}
                      whileInView={isFirst ? undefined : "show"}
                      viewport={{ once: true }}
                    >
                      {(group.gallery || []).map((item) => (
                        <motion.div
                          key={item._key}
                          className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                          variants={imageItemVariants}
                          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="relative w-full h-40">
                            <Image
                              src={urlFor(item.image).url()}
                              alt={item.heading}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-gray-900">{item.heading}</h4>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const organizations = await sanityClient.fetch(`
    *[_type == "organization"] | order(startDate desc) {
      _id,
      name,
      role,
      startDate,
      endDate,
      logo
    }
  `);

  const activitySections = await sanityClient.fetch(`
    *[_type == "orgActivitySection"] | order(title asc) {
      _id,
      title,
      description,
      activityGroups[] {
        _key,
        groupTitle,
        groupDescription,
        gallery[] {
          _key,
          image,
          heading,
          description
        }
      }
    }
  `);

  return {
    props: {
      organizations: organizations || [],
      activitySections: activitySections || [],
    },
    revalidate: 60,
  };
};

export default OrganizationPage;