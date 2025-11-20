// src/pages/index.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

// --- Import Icons ---
import { FaLinkedin, FaGithub, FaGoogle } from 'react-icons/fa';
import { SiResearchgate } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

// --- Social Icon Component ---
const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedin className="w-5 h-5" />;
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'google-scholar':
      return <FaGoogle className="w-5 h-5" />;
    case 'research-gate':
      return <SiResearchgate className="w-5 h-5" />;
    case 'email':
      return <MdEmail className="w-5 h-5" />;
    default:
      return <span>?</span>;
  }
};

interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

interface HomeContent {
  introText: string;
  name: string;
  shortDescription: string;
  profileImage: any;
  resumeFile: any;
  socialLinks: SocialLink[];
  aboutMeImage: any;
  aboutMe: string;
  researchInterests: string[];
}

interface HomeProps {
  homeContent: HomeContent | null;
}

const Home: React.FC<HomeProps> = ({ homeContent }) => {
  if (!homeContent) {
    return (
      <section className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-600">Error: 'Home' content not found.</h1>
        <p className="text-gray-700 mt-4">
          Please log in to the Sanity Studio and publish the 'Home' page document.
        </p>
      </section>
    );
  }

  const {
    introText,
    name,
    shortDescription,
    profileImage,
    socialLinks,
    aboutMe,
    aboutMeImage,
    researchInterests
  } = homeContent;

  const roles = shortDescription ? shortDescription.split(',').map(role => role.trim()) : ["Research Enthusiast"];
  const typeAnimationSequence = roles.flatMap((role) => [role, 2000]);

  return (
    <div>
      {/* --- HERO SECTION --- */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between py-16 min-h-screen" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column: Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-2xl text-indigo-600 font-medium mb-2">{introText}</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            I'm {name}
          </h1>

          <div className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 h-10">
            <TypeAnimation
              sequence={typeAnimationSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <div className="flex justify-center md:justify-start items-center space-x-4">
            <a
              href="#about"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
            >
              About Me
            </a>
            <div className="flex space-x-2">
              {socialLinks && socialLinks.map((link) => (
                <a
                  key={link._key}
                  href={link.url.startsWith('mailto:') ? link.url : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {profileImage && (
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-50"></div>
              <Image
                src={urlFor(profileImage).url()}
                alt={name}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-full shadow-2xl z-10"
              />
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* --- NEW "ABOUT ME" SECTION (FIXED DESIGN) --- */}
      <motion.section
        id="about"
        className="py-24 bg-white" // Clean white background for the whole section
      >
        {/* Centered Title */}
        <motion.h2 
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        {/* The "Box" container with off-white bg */}
        <motion.div 
          className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-gray-50 p-10 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Left Column: About Me Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutMeImage && (
              <Image
                src={urlFor(aboutMeImage).url()}
                alt="About Me Image"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            )}
          </motion.div>

          {/* Right Column: About Me Text (now with dark text) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {aboutMe}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Interests</h3>
            <ul className="list-disc list-inside space-y-2">
              {researchInterests && researchInterests.map((interest, index) => (
                <li key={index} className="text-lg text-gray-700">{interest}</li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </motion.section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(`
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
      socialLinks[] {
        _key,
        platform,
        url
      },
      aboutMeImage,
      aboutMe,
      researchInterests
    }
  `);

  return {
    props: {
      homeContent: data || null,
    },
    revalidate: 60,
  };
};

export default Home;