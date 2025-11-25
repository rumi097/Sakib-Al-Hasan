// src/pages/skills.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the structure of a single skill item inside the list
interface SkillItem {
  _key: string;
  name: string;
  icon: any;
}

// Define the structure of the Group Document
interface SkillGroup {
  _id: string;
  categoryTitle: string;
  skillsList: SkillItem[];
}

interface SkillsProps {
  skillGroups: SkillGroup[];
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const Skills: React.FC<SkillsProps> = ({ skillGroups }) => {
  return (
    <section className="py-12 min-h-screen bg-gray-50">
      {/* PLAIN HTML TITLE (No animation to ensure visibility) */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
        Skills & Abilities
      </h1>

      <div className="space-y-16">
        {skillGroups.map((group, index) => {
          // Check if this is the "Software" category
          const isSoftware = group.categoryTitle.toLowerCase().includes('software');
          
          // Fix for top section visibility
          const isFirst = index === 0;

          return (
            <div key={group._id} className="max-w-7xl mx-auto px-4">
              {/* Category Title */}
              <div className="mb-8 flex items-center justify-center">
                 <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 px-4 inline-block">
                  {group.categoryTitle}
                </h2>
              </div>

              {/* LAYOUT LOGIC */}
              <motion.div 
                className={
                  isSoftware 
                    ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6' // Software: Original Grid
                    : 'columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4' // Others: Professional List Columns
                }
                variants={containerVariants}
                
                // Fix: Ensure first section loads immediately
                initial={isFirst ? "show" : "hidden"}
                whileInView={isFirst ? undefined : "show"}
                viewport={{ once: true, margin: "-50px" }}
              >
                {(group.skillsList || []).map((skill) => (
                  <motion.div
                    key={skill._key}
                    // Conditional Styling
                    className={`
                      bg-white rounded-lg shadow-sm transition-all duration-200
                      ${isSoftware 
                        ? 'p-6 flex flex-col items-center justify-center text-center h-full border border-gray-200' 
                        : 'p-4 inline-block w-full break-inside-avoid mb-0 border border-gray-200 border-l-4 border-l-indigo-500' 
                      }
                    `}
                    variants={itemVariants}
                    
                    // Hover Logic
                    whileHover={isSoftware ? { 
                      scale: 1.05, 
                      y: -5, 
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      borderColor: '#818cf8' 
                    } : { 
                      scale: 1, 
                      y: 0, 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      backgroundColor: '#f8fafc' 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    
                    {/* --- SOFTWARE SKILLS DESIGN (Icon + Text) --- */}
                    {isSoftware && (
                      <>
                        <div className="w-14 h-14 relative mb-3">
                          {skill.icon ? (
                            <Image
                              src={urlFor(skill.icon).url()}
                              alt={skill.name}
                              layout="fill"
                              objectFit="contain"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                              ✨
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-700 leading-snug text-md">
                          {skill.name}
                        </h3>
                      </>
                    )}

                    {/* --- PROFESSIONAL TEXT SKILLS DESIGN (Text Only) --- */}
                    {!isSoftware && (
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800 text-sm md:text-base leading-snug text-left">
                          {skill.name}
                        </h3>
                      </div>
                    )}

                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const skillGroups = await sanityClient.fetch(`
    *[_type == "skill"] | order(categoryTitle desc) {
      _id,
      categoryTitle,
      skillsList[] {
        _key,
        name,
        icon
      }
    }
  `);

  return {
    props: {
      skillGroups: skillGroups || [],
    },
    revalidate: 60,
  };
};

export default Skills;