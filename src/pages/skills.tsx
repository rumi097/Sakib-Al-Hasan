// src/pages/skills.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react'; // Import React for grouping

interface Skill {
  _id: string;
  title: string;
  icon: any;
  category: 'software' | 'academic' | 'soft';
}

interface SkillsProps {
  skills: Skill[];
}

// Helper to group skills
interface GroupedSkills {
  software: Skill[];
  academic: Skill[];
  soft: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {

  // Group the skills by category
  const groupedSkills = React.useMemo(() => {
    const groups: GroupedSkills = {
      software: [],
      academic: [],
      soft: [],
    };
    skills.forEach((skill) => {
      if (groups[skill.category]) {
        groups[skill.category].push(skill);
      }
    });
    return groups;
  }, [skills]);

  // Animation for the container (staggered children)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each skill fades in 0.1s after the previous
      },
    },
  };

  // Animation for each skill card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        Skills & Abilities
      </h1>

      {/* --- Software Skills --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Software Skills</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {groupedSkills.software.map((skill) => (
            <motion.div
              key={skill._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {skill.icon && (
                <div className="w-16 h-16 relative mb-3">
                  <Image
                    src={urlFor(skill.icon).url()}
                    alt={skill.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Academic Skills --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Academic Skills</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {groupedSkills.academic.map((skill) => (
            <motion.div
              key={skill._id}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- Soft Skills --- */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Soft Skills</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {groupedSkills.soft.map((skill) => (
            <motion.div
              key={skill._id}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const skills = await sanityClient.fetch(`
    *[_type == "skill"]{
      _id,
      title,
      icon,
      category
    }
  `);

  return {
    props: {
      skills: skills || [],
    },
    revalidate: 60,
  };
};

export default Skills;