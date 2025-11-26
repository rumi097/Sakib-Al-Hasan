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

interface PersonalDocument {
  hasDocument: boolean;
  file?: {
    asset: {
      url: string;
    };
  };
  image?: any;
  number?: string;
  expiryDate?: string;
  lastUpdated?: string;
}

interface AdditionalDocument {
  _key: string;
  title: string;
  file?: {
    asset: {
      url: string;
    };
  };
  image?: any;
  icon?: string;
  description?: string;
}

interface PersonalInfo {
  passport?: PersonalDocument;
  nid?: PersonalDocument;
  birthCertificate?: PersonalDocument;
  resume?: PersonalDocument;
  additionalDocuments?: AdditionalDocument[];
}

// Preview interfaces
interface SelectedSkill {
  _key: string;
  skillGroup: {
    _id: string;
    categoryTitle: string;
    skillsList: {
      _key: string;
      name: string;
      icon?: any;
    }[];
  };
  skillIndex: number;
}

interface PublicationItem {
  _id: string;
  title: string;
  journalName: string;
  year: number;
  journalCover?: any;
  doi?: string;
}

// Activity group interfaces
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

interface SelectedGroup {
  _key: string;
  section: {
    _id: string;
    title: string;
    activityGroups: ActivityGroup[];
  };
  groupIndex: number;
}

interface HomePagePreviews {
  showcaseSkills?: {
    enabled: boolean;
    title: string;
    selectedSkills: SelectedSkill[];
  };
  showcaseExperience?: {
    enabled: boolean;
    title: string;
    selectedGroups: SelectedGroup[];
  };
  showcaseOrganizations?: {
    enabled: boolean;
    title: string;
    selectedGroups: SelectedGroup[];
  };
  showcaseNextGen?: {
    enabled: boolean;
    title: string;
    selectedGroups: SelectedGroup[];
  };
  showcasePublications?: {
    enabled: boolean;
    title: string;
    selectedPublications: PublicationItem[];
  };
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
  personalInfo: PersonalInfo | null;
  previews: HomePagePreviews | null;
}

const Home: React.FC<HomeProps> = ({ homeContent, personalInfo, previews }) => {
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
    <div className="overflow-hidden">
      {/* --- HERO SECTION WITH ENHANCED ANIMATIONS --- */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between py-16 min-h-screen relative" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Left Column: Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.p 
            className="text-2xl text-indigo-600 font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {introText}
          </motion.p>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I'm <motion.span
              className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {name}
            </motion.span>
          </motion.h1>

          <div className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 h-10">
            <TypeAnimation
              sequence={typeAnimationSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.div 
            className="flex justify-center md:justify-start items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a
              href="#about"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </motion.a>
            <div className="flex space-x-2">
              {socialLinks && socialLinks.map((link, index) => (
                <motion.a
                  key={link._key}
                  href={link.url.startsWith('mailto:') ? link.url : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SocialIcon platform={link.platform} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Image with Enhanced Animation */}
        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center z-10"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
        >
          {profileImage && (
            <motion.div 
              className="relative w-80 h-80 md:w-96 md:h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              animate={{
                y: [0, -10, 0],
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <Image
                src={urlFor(profileImage).url()}
                alt={name}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-full shadow-2xl z-10 relative"
              />
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* --- COMPACT ABOUT ME SECTION --- */}
      <motion.section
        id="about"
        className="py-16 bg-white"
      >
        {/* Centered Title */}
        <motion.h2 
          className="text-3xl font-extrabold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        {/* Compact Container */}
        <motion.div 
          className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Left Column: Image */}
          <motion.div
            className="flex justify-center md:col-span-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutMeImage && (
              <Image
                src={urlFor(aboutMeImage).url()}
                alt="About Me Image"
                width={280}
                height={280}
                className="rounded-lg shadow-lg object-cover"
              />
            )}
          </motion.div>

          {/* Middle Column: About Me Text */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              {aboutMe}
            </p>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Research Interests</h3>
              <ul className="list-disc list-inside space-y-1">
                {researchInterests && researchInterests.map((interest, index) => (
                  <motion.li 
                    key={index} 
                    className="text-sm text-gray-700"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {interest}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </motion.div>

        {/* Personal Information Section */}
        <motion.div
          className="container mx-auto mt-8 bg-linear-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Personal Documents</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Passport */}
            {personalInfo?.passport?.hasDocument && (
              <motion.a
                href={personalInfo.passport.file?.asset?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                {personalInfo.passport.image ? (
                  <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                    <Image
                      src={urlFor(personalInfo.passport.image).url()}
                      alt="Passport"
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="text-4xl text-center mb-2">🛂</div>
                )}
                <p className="text-center text-sm font-semibold text-gray-800">Passport</p>
                <p className="text-center text-xs text-gray-600 mt-1">Click to view</p>
              </motion.a>
            )}

            {/* NID */}
            {personalInfo?.nid?.hasDocument && (
              <motion.a
                href={personalInfo.nid.file?.asset?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-100 hover:bg-green-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ y: -5 }}
              >
                {personalInfo.nid.image ? (
                  <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                    <Image
                      src={urlFor(personalInfo.nid.image).url()}
                      alt="NID"
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="text-4xl text-center mb-2">🪪</div>
                )}
                <p className="text-center text-sm font-semibold text-gray-800">NID</p>
                <p className="text-center text-xs text-gray-600 mt-1">Click to view</p>
              </motion.a>
            )}

            {/* Birth Certificate */}
            {personalInfo?.birthCertificate?.hasDocument && (
              <motion.a
                href={personalInfo.birthCertificate.file?.asset?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ y: -5 }}
              >
                {personalInfo.birthCertificate.image ? (
                  <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                    <Image
                      src={urlFor(personalInfo.birthCertificate.image).url()}
                      alt="Birth Certificate"
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="text-4xl text-center mb-2">📜</div>
                )}
                <p className="text-center text-sm font-semibold text-gray-800">Birth Certificate</p>
                <p className="text-center text-xs text-gray-600 mt-1">Click to view</p>
              </motion.a>
            )}

            {/* Resume */}
            {personalInfo?.resume?.hasDocument && (
              <motion.a
                href={personalInfo.resume.file?.asset?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl text-center mb-2">📄</div>
                <p className="text-center text-sm font-semibold text-gray-800">CV/Resume</p>
                <p className="text-center text-xs text-gray-600 mt-1">Click to download</p>
              </motion.a>
            )}

            {/* Additional Documents */}
            {personalInfo?.additionalDocuments?.map((doc, index) => (
              <motion.a
                key={doc._key}
                href={doc.file?.asset?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {doc.image ? (
                  <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                    <Image
                      src={urlFor(doc.image).url()}
                      alt={doc.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <div className="text-4xl text-center mb-2">{doc.icon || '📎'}</div>
                )}
                <p className="text-center text-sm font-semibold text-gray-800">{doc.title}</p>
                {doc.description && (
                  <p className="text-center text-xs text-gray-600 mt-1">{doc.description}</p>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* --- SHOWCASE PREVIEWS FROM OTHER PAGES --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 space-y-16">
          
          {/* Skills Preview - Single Row */}
          {previews?.showcaseSkills?.enabled && previews.showcaseSkills.selectedSkills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {previews.showcaseSkills.title}
              </motion.h2>
              
              {/* Single row of selected skills */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-7xl mx-auto">
                {previews.showcaseSkills.selectedSkills.map((selectedSkill, index) => {
                  const skill = selectedSkill.skillGroup?.skillsList?.[selectedSkill.skillIndex - 1];
                  if (!skill) return null;
                  
                  return (
                    <motion.div
                      key={selectedSkill._key}
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center group overflow-hidden"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                    >
                      {skill.icon ? (
                        // Image-based skill
                        <>
                          <div className="relative w-full h-20 mb-2 rounded-lg overflow-hidden">
                            <Image
                              src={urlFor(skill.icon).url()}
                              alt={skill.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <p className="text-xs text-center font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {skill.name}
                          </p>
                        </>
                      ) : (
                        // Text-based skill
                        <div className="flex items-center justify-center h-full py-6">
                          <p className="text-sm text-center font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {skill.name}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <Link href="/skills">
                  <motion.span
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer text-lg"
                    whileHover={{ x: 5 }}
                  >
                    View All Skills →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Publications Preview */}
          {previews?.showcasePublications?.enabled && previews.showcasePublications.selectedPublications?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {previews.showcasePublications.title}
              </motion.h2>
              
              {/* Horizontal scrolling container */}
              <div className="relative max-w-7xl mx-auto mb-8">
                <div className="overflow-x-auto scrollbar-hide pb-4 publications-scroll">
                  <div className="flex gap-6 px-4">
                    {previews.showcasePublications.selectedPublications.map((pub, index) => (
                      <motion.a
                        key={pub._id}
                        href={pub.doi || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-64 bg-linear-to-br from-indigo-50/80 via-white to-purple-50/30 border border-indigo-100/60 backdrop-blur-xl p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -12px rgba(99, 102, 241, 0.2)" }}
                      >
                        {/* Animated gradient overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-linear-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        {pub.journalCover && (
                          <div className="w-full h-40 relative bg-linear-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden mb-4 ring-1 ring-indigo-100/50">
                            <Image
                              src={urlFor(pub.journalCover).url()}
                              alt={pub.title}
                              layout="fill"
                              objectFit="contain"
                              className="group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 relative z-10">{pub.title}</h3>
                        <p className="text-xs text-indigo-600 font-semibold relative z-10">{pub.journalName}</p>
                        <p className="text-xs text-gray-500 mt-1 relative z-10">{pub.year}</p>
                        
                        {/* Read Full Paper badge */}
                        {pub.doi && (
                          <div className="mt-3 pt-3 border-t border-indigo-100/50">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-linear-to-r from-indigo-50 to-purple-50 px-3 py-1.5 rounded-full border border-indigo-100 group-hover:bg-indigo-100 transition-colors relative z-10">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              Read Paper
                            </span>
                          </div>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {/* Clickable scroll navigation arrows */}
                <button
                  onClick={() => {
                    const container = document.querySelector('.publications-scroll');
                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-50 text-indigo-600 w-10 h-10 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-10 hover:scale-110"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    const container = document.querySelector('.publications-scroll');
                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-indigo-50 text-indigo-600 w-10 h-10 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 z-10 hover:scale-110"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              
              <div className="text-center mt-8">
                <Link href="/publication">
                  <motion.span
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer text-lg"
                    whileHover={{ x: 5 }}
                  >
                    View All Publications →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Experience Activity Groups Preview */}
          {previews?.showcaseExperience?.enabled && previews.showcaseExperience.selectedGroups?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {previews.showcaseExperience.title}
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {previews.showcaseExperience.selectedGroups.map((selectedGroup, index) => {
                  const group = selectedGroup.section.activityGroups[selectedGroup.groupIndex - 1];
                  if (!group) return null;
                  
                  return (
                    <motion.div
                      key={selectedGroup._key}
                      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-linear-to-br from-yellow-50/80 via-white to-amber-50/30 border border-yellow-100/60 backdrop-blur-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -12px rgba(234, 179, 8, 0.15)" }}
                    >
                      <div className="p-5 relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-sm font-bold text-gray-900 flex-1">{group.groupTitle}</h4>
                          <span className="text-xs text-yellow-700 font-semibold ml-2 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-100">{group.gallery.length} photos</span>
                        </div>
                        
                        {/* Horizontal scrolling gallery */}
                        <div className="relative h-32 mb-3 overflow-hidden rounded-lg bg-black/30">
                          <motion.div
                            className="flex gap-2 absolute"
                            animate={{
                              x: ['0%', '-50%']
                            }}
                            transition={{
                              duration: 15 + index * 2,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          >
                            {/* Duplicate images for seamless loop */}
                            {[...group.gallery, ...group.gallery].map((img, imgIndex) => (
                              <motion.div 
                                key={`${img._key}-${imgIndex}`}
                                className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Image
                                  src={urlFor(img.image).url()}
                                  alt={img.heading}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                        
                        <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{group.groupDescription}</p>
                        
                        {/* Category badge */}
                        <div className="mt-3 pt-3 border-t border-yellow-100/50">
                          <span className="text-xs font-bold text-yellow-700 bg-linear-to-r from-yellow-50 to-amber-50 px-3 py-1.5 rounded-full border border-yellow-100">
                            {selectedGroup.section.title}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Link href="/experience">
                  <motion.span
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer text-lg"
                    whileHover={{ x: 5 }}
                  >
                    View All Experience →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Organization Activity Groups Preview */}
          {previews?.showcaseOrganizations?.enabled && previews.showcaseOrganizations.selectedGroups?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {previews.showcaseOrganizations.title}
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {previews.showcaseOrganizations.selectedGroups.map((selectedGroup, index) => {
                  const group = selectedGroup.section.activityGroups[selectedGroup.groupIndex - 1];
                  if (!group) return null;
                  
                  return (
                    <motion.div
                      key={selectedGroup._key}
                      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-linear-to-br from-teal-50/80 via-white to-cyan-50/30 border border-teal-100/60 backdrop-blur-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -12px rgba(20, 184, 166, 0.15)" }}
                    >
                      <div className="p-5 relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-sm font-bold text-gray-900 flex-1">{group.groupTitle}</h4>
                          <span className="text-xs text-teal-700 font-semibold ml-2 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">{group.gallery.length} photos</span>
                        </div>
                        
                        {/* Horizontal scrolling gallery */}
                        <div className="relative h-32 mb-3 overflow-hidden rounded-xl bg-linear-to-r from-teal-50/50 to-cyan-50/50 ring-1 ring-teal-100/50">
                          <motion.div
                            className="flex gap-2 absolute"
                            animate={{
                              x: ['0%', '-50%']
                            }}
                            transition={{
                              duration: 18 + index * 2,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          >
                            {[...group.gallery, ...group.gallery].map((img, imgIndex) => (
                              <motion.div 
                                key={`${img._key}-${imgIndex}`}
                                className="relative w-40 h-32 shrink-0 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Image
                                  src={urlFor(img.image).url()}
                                  alt={img.heading}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                        
                        <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{group.groupDescription}</p>
                        
                        <div className="mt-3 pt-3 border-t border-teal-100/50">
                          <span className="text-xs font-bold text-teal-700 bg-linear-to-r from-teal-50 to-cyan-50 px-3 py-1.5 rounded-full border border-teal-100">
                            {selectedGroup.section.title}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Link href="/organization">
                  <motion.span
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer text-lg"
                    whileHover={{ x: 5 }}
                  >
                    View All Organizations →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* NextGen Activity Groups Preview */}
          {previews?.showcaseNextGen?.enabled && previews.showcaseNextGen.selectedGroups?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {previews.showcaseNextGen.title}
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {previews.showcaseNextGen.selectedGroups.map((selectedGroup, index) => {
                  const group = selectedGroup.section.activityGroups[selectedGroup.groupIndex - 1];
                  if (!group) return null;
                  
                  return (
                    <motion.div
                      key={selectedGroup._key}
                      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-linear-to-br from-blue-50/80 via-white to-sky-50/30 border border-blue-100/60 backdrop-blur-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.15)" }}
                    >
                      <div className="p-5 relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-sm font-bold text-gray-900 flex-1">{group.groupTitle}</h4>
                          <span className="text-xs text-blue-700 font-semibold ml-2 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{group.gallery.length} photos</span>
                        </div>
                        
                        {/* Horizontal scrolling gallery */}
                        <div className="relative h-32 mb-3 overflow-hidden rounded-xl bg-linear-to-r from-blue-50/50 to-sky-50/50 ring-1 ring-blue-100/50">
                          <motion.div
                            className="flex gap-2 absolute"
                            animate={{
                              x: ['0%', '-50%']
                            }}
                            transition={{
                              duration: 20 + index * 2,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          >
                            {[...group.gallery, ...group.gallery].map((img, imgIndex) => (
                              <motion.div 
                                key={`${img._key}-${imgIndex}`}
                                className="relative w-40 h-32 shrink-0 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Image
                                  src={urlFor(img.image).url()}
                                  alt={img.heading}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                        
                        <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">{group.groupDescription}</p>
                        
                        <div className="mt-3 pt-3 border-t border-blue-100/50">
                          <span className="text-xs font-bold text-blue-700 bg-linear-to-r from-blue-50 to-sky-50 px-3 py-1.5 rounded-full border border-blue-100">
                            {selectedGroup.section.title}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Link href="/nextgen">
                  <motion.span
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer text-lg"
                    whileHover={{ x: 5 }}
                  >
                    View All NextGen →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </section>
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

  const personalInfo = await sanityClient.fetch(`
    *[_type == "personalInfo"][0]{
      passport {
        hasDocument,
        file {
          asset -> {
            url
          }
        },
        image,
        number,
        expiryDate
      },
      nid {
        hasDocument,
        file {
          asset -> {
            url
          }
        },
        image,
        number
      },
      birthCertificate {
        hasDocument,
        file {
          asset -> {
            url
          }
        },
        image,
        number
      },
      resume {
        hasDocument,
        file {
          asset -> {
            url
          }
        },
        lastUpdated
      },
      additionalDocuments[] {
        _key,
        title,
        file {
          asset -> {
            url
          }
        },
        image,
        icon,
        description
      }
    }
  `);

  const previews = await sanityClient.fetch(`
    *[_type == "homePagePreviews"][0]{
      showcaseSkills {
        enabled,
        title,
        selectedSkills[] {
          _key,
          skillGroup-> {
            _id,
            categoryTitle,
            skillsList[] {
              _key,
              name,
              icon
            }
          },
          skillIndex
        }
      },
      showcaseExperience {
        enabled,
        title,
        selectedGroups[] {
          _key,
          section-> {
            _id,
            title,
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
          },
          groupIndex
        }
      },
      showcaseOrganizations {
        enabled,
        title,
        selectedGroups[] {
          _key,
          section-> {
            _id,
            title,
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
          },
          groupIndex
        }
      },
      showcaseNextGen {
        enabled,
        title,
        selectedGroups[] {
          _key,
          section-> {
            _id,
            title,
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
          },
          groupIndex
        }
      },
      showcasePublications {
        enabled,
        title,
        selectedPublications[]-> {
          _id,
          title,
          journalName,
          year,
          journalCover,
          doi
        }
      }
    }
  `);

  return {
    props: {
      homeContent: data || null,
      personalInfo: personalInfo || null,
      previews: previews || null,
    },
    revalidate: 60,
  };
};

export default Home;