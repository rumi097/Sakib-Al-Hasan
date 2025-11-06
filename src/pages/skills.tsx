// pages/skills.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Skill {
  _id: string;
  title: string;
  proficiency: string;
  icon: any;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">My Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          >
            {skill.icon && (
              <div className="shrink-0 w-12 h-12 relative">
                <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{skill.title}</h2>
              <p className="text-indigo-600">{skill.proficiency}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const skills = await sanityClient.fetch(`
    *[_type == "skill"] | order(title asc) {
      _id,
      title,
      proficiency,
      icon
    }
  `);

  return {
    props: {
      skills,
    },
    revalidate: 60,
  };
};

export default Skills;