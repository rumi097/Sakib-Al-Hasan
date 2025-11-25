// src/pages/nextgen.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

interface NextGenSection {
  _id: string;
  title: string;
  description: string;
  activityGroups: ActivityGroup[];
}

interface NextGenProps {
  sections: NextGenSection[];
}

// Standard animation for cards
const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const galleryVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const imageItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const NextGenPage: React.FC<NextGenProps> = ({ sections }) => {
  return (
    <section className="py-8">
      
      {/* --- HEADER: Plain HTML to ensure it is ALWAYS visible --- */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        NextGen Activities
      </h1>

      {/* --- JUMP BOX: Plain HTML to ensure it is ALWAYS visible --- */}
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {(sections || []).map((section) => (
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

      <div className="space-y-12">
        {(sections || []).map((section, index) => {
          // FIX: If it's the FIRST section (index === 0), show it immediately.
          // Otherwise, wait for scroll.
          const isFirst = index === 0;

          return (
            <motion.section
              key={section._id}
              id={section._id}
              initial={isFirst ? "show" : "hidden"} // Force 'show' if first
              whileInView={isFirst ? undefined : "show"} // Only use whileInView if NOT first
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
                    // Same logic for cards: show immediately if in first section
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
  // FIX: Sort by creation date (Oldest first). 
  // If you want NEWEST sections at the bottom, use 'asc'. 
  // If you want NEWEST sections at the top, use 'desc'.
  const sections = await sanityClient.fetch(`
    *[_type == "nextGenSection"] | order(_createdAt asc) {
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
      sections: sections || [],
    },
    revalidate: 60,
  };
};

export default NextGenPage;