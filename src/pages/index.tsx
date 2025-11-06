// pages/index.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HomeContent {
  introText: string;
  name: string;
  shortDescription: string;
  profileImage: any; // Sanity image object
  resumeFile: any; // Sanity file object
  socialLinks: string[];
}

interface HomeProps {
  homeContent: HomeContent;
}

const Home: React.FC<HomeProps> = ({ homeContent }) => {
  const { introText, name, shortDescription, profileImage, resumeFile, socialLinks } = homeContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="text-center py-16"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {profileImage && (
        <motion.div variants={itemVariants} className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-8 shadow-lg">
          <Image
            src={urlFor(profileImage).url()}
            alt={name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      )}
      <motion.p variants={itemVariants} className="text-xl text-indigo-600 mb-2">{introText}</motion.p>
      <motion.h1 variants={itemVariants} className="text-5xl font-extrabold text-gray-900 mb-4">{name}</motion.h1>
      <motion.p variants={itemVariants} className="text-lg max-w-2xl mx-auto text-gray-700 mb-8">
        {shortDescription}
      </motion.p>

      <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-8">
        {resumeFile && (
          <a
            href={resumeFile.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Download CV
          </a>
        )}
        {socialLinks && socialLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors duration-300"
          >
            Social Link {index + 1}
          </a>
        ))}
      </motion.div>

      {/* Placeholder for About Me section, could be pulled from Sanity as well */}
      <motion.div variants={itemVariants} className="mt-12 p-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          {/* Your client can fill this in via Sanity as part of the Home schema or a dedicated About schema */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </motion.div>
    </motion.section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const homeContent = await sanityClient.fetch(`
    *[_type == "home"][0]{
      introText,
      name,
      shortDescription,
      profileImage,
      resumeFile {
        asset -> {
          url
        }
      },
      socialLinks
    }
  `);

  return {
    props: {
      homeContent,
    },
    revalidate: 60, // Re-generate page every 60 seconds
  };
};

export default Home;