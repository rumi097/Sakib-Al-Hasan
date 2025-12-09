// src/pages/experience.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';

// --- Interfaces for "Experience" (Timeline) ---
interface ExperienceEntry {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: any[];
}

// --- Interfaces for "Experience Activities" (Gallery) ---
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

interface ExpActivitySection {
  _id: string;
  title: string;
  description: string;
  activityGroups: ActivityGroup[];
}

// --- Interfaces for "Training & Certifications" (Standalone) ---
interface TrainingCertification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
  file?: {
    asset: {
      url: string;
    };
  };
}

// --- Main Page Props (Contains BOTH data types) ---
interface ExperienceProps {
  experience: ExperienceEntry[];
  activitySections: ExpActivitySection[];
  trainingCertifications: TrainingCertification[];
}

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const galleryVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const imageItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const ExperiencePage: React.FC<ExperienceProps> = ({ experience, activitySections, trainingCertifications }) => {
  return (
    <section className="py-8">
      <motion.h1
        className="text-4xl font-extrabold text-gray-900 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h1>

      {/* --- SECTION 1: COMPACT EXPERIENCE TIMELINE --- */}
      <div className="relative max-w-2xl mx-auto border-l-4 border-indigo-300 pl-6 space-y-8 mb-16">
        {(experience || []).map((entry, index) => (
          <motion.div
            key={entry._id}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* The dot on the timeline */}
            <div className="absolute -left-[30px] top-1 w-5 h-5 bg-indigo-600 rounded-full ring-4 ring-white"></div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                {new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
                {entry.endDate
                  ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                  : 'Present'}
              </p>
              <h2 className="text-xl font-bold text-indigo-700 mt-1">{entry.title}</h2>
              <p className="text-lg font-semibold text-gray-800">{entry.company} • {entry.location}</p>
              
              {entry.description && (
                <div className="prose prose-indigo max-w-none mt-2 text-sm text-gray-700">
                  <PortableText value={entry.description} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- SECTION 2: TRAINING & CERTIFICATIONS --- */}
      {trainingCertifications && trainingCertifications.length > 0 && (
        <>
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Training & Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingCertifications.map((cert, idx) => (
                <motion.div
                  key={cert._id}
                  className="group bg-white/80 backdrop-blur-sm border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-indigo-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17l-5 2 1-5-4-4 5-.7L12 4l3 5.3 5 .7-4 4 1 5-5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {cert.issuer}
                        <span className="mx-1">•</span>
                        {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                  
                  {cert.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{cert.description}</p>
                  )}
                  
                  <div className="flex gap-2 mt-auto">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
                        aria-label={`View certificate for ${cert.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 3h7v7m0-7L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View Certificate
                      </a>
                    )}
                    {cert.file?.asset?.url && (
                      <a
                        href={cert.file.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        aria-label={`View PDF certificate for ${cert.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 3h6l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 3v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View PDF
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- Horizontal Divider --- */}
          <hr className="max-w-4xl mx-auto border-t-2 border-gray-200 mb-16" />
        </>
      )}

      {/* --- Horizontal Divider (fallback if no certifications) --- */}
      {(!trainingCertifications || trainingCertifications.length === 0) && (
        <hr className="max-w-4xl mx-auto border-t-2 border-gray-200 mb-16" />
      )}

      {/* --- SECTION 3: NEXTGEN-STYLE ACTIVITY SECTION --- */}
      
      {/* --- "JUMP TO SECTION" BOX --- */}
      <motion.div
        className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap justify-center gap-2">
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
      </motion.div>
      
      {/* --- Activity Sections List --- */}
      <div className="space-y-12">
        {(activitySections || []).map((section) => (
          <motion.section
            key={section._id}
            id={section._id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-indigo-700">{section.title}</h2>
              <p className="mt-2 text-md text-gray-600 max-w-2xl mx-auto">{section.description}</p>
            </div>

            {/* Masonry Layout for Subsections */}
            <div className="columns-1 lg:columns-2 gap-8">
              {(section.activityGroups || []).map((group) => (
                <motion.div
                  key={group._key}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col break-inside-avoid mb-8"
                  variants={groupVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Activity Group Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">{group.groupTitle}</h3>
                    <p className="mt-1 text-sm text-gray-600">{group.groupDescription}</p>
                  </div>

                  {/* Image Gallery Grid */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={galleryVariants}
                    initial="hidden"
                    whileInView="show"
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
        ))}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Query 1: Fetch the original experience timeline
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

  // Query 2: Fetch the new activity sections
  const activitySections = await sanityClient.fetch(`
    *[_type == "expActivitySection"] | order(title asc) {
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

  // Query 3: Fetch training certifications
  const trainingCertifications = await sanityClient.fetch(`
    *[_type == "trainingCertification"] | order(date desc) {
      _id,
      name,
      issuer,
      date,
      description,
      link,
      file {
        asset-> {
          url
        }
      }
    }
  `);

  return {
    props: {
      experience: experience || [],
      activitySections: activitySections || [],
      trainingCertifications: trainingCertifications || [],
    },
    revalidate: 60,
  };
};

export default ExperiencePage;