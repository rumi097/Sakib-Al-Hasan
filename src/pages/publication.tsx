// src/pages/publication.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaGoogle, FaResearchgate, FaQuoteRight, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaFileAlt } from 'react-icons/fa';

// --- TYPES ---
interface ResearchProfile {
  googleScholarUrl: string;
  researchGateUrl: string;
}

interface Publication {
  _id: string;
  title: string;
  category: string;
  abstract: string;
  journalCover: any;
  authors: string[];
  journalName: string;
  year: number;
  doi: string;
  manualCitationCount?: number;
}

interface PageProps {
  profile: ResearchProfile;
  publications: Publication[];
}

// --- HELPER: Citation Counter ---
const CitationCounter = ({ doi, manualCount }: { doi: string, manualCount?: number }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!doi) return;
    const cleanDoi = doi.replace('https://doi.org/', '').replace('http://doi.org/', '');
    fetch(`https://api.openalex.org/works/doi:${cleanDoi}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.cited_by_count !== undefined) setCount(data.cited_by_count);
      })
      .catch(() => {});
  }, [doi]);

  return <span>{count !== null ? count : (manualCount || 0)}</span>;
};

// --- COMPONENT: Single Publication Card ---
const PublicationCard = ({ pub, index }: { pub: Publication, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout 
      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors shadow-sm hover:shadow-xl flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.01, y: -3 }}
    >
      
      {/* Journal Cover Image */}
      <div className="shrink-0 w-full md:w-32 h-48 md:h-40 relative bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex items-center justify-center">
        {pub.journalCover ? (
          <Image 
            src={urlFor(pub.journalCover).url()} 
            alt="Journal Cover" 
            layout="fill" 
            objectFit="contain" // <--- FIX: 'contain' ensures the whole image is visible
            className="p-2" // Adds breathing room so it looks like a document
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <FaFileAlt className="text-4xl opacity-20" />
          </div>
        )}
      </div>

      {/* Paper Details */}
      <div className="grow">
        <motion.h4 layout="position" className="text-lg font-bold text-gray-900 leading-tight mb-2">
          {pub.title}
        </motion.h4>
        <motion.p layout="position" className="text-sm text-gray-600 mb-3 italic">
          {pub.authors?.join(', ')}
        </motion.p>
        <motion.div layout="position" className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4 font-medium">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {pub.journalName || "Journal"}
          </span>
          <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
            {pub.year}
          </span>
        </motion.div>
        
        {/* --- ABSTRACT SECTION --- */}
        {pub.abstract && (
          <motion.div layout="position" className="mb-4">
            <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
              <span className="font-semibold text-gray-900">Abstract: </span> 
              {pub.abstract}
            </p>
            
            {/* The Toggle Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-indigo-600 mt-2 hover:text-indigo-800 focus:outline-none flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>Show Less <FaChevronUp size={10} /></>
              ) : (
                <>Read More <FaChevronDown size={10} /></>
              )}
            </button>
          </motion.div>
        )}

        {pub.doi && (
          <motion.div layout="position">
            <a 
              href={pub.doi} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Read Full Paper <FaExternalLinkAlt size={12} />
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const PublicationPage: React.FC<PageProps> = ({ profile, publications }) => {
  
  const totalPublications = publications.length;

  // 1. Group publications by Topic
  const groupedPubs = (publications || []).reduce((acc, pub) => {
    const topic = pub.category || "Uncategorized";
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  // 2. Sort Topics by Count
  const topics = Object.keys(groupedPubs).sort((a, b) => {
    return groupedPubs[b].length - groupedPubs[a].length;
  });

  const [expandedTopic, setExpandedTopic] = useState<string | null>(topics[0] || null);

  const toggleTopic = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      
      {/* --- SECTION 1: RESEARCH PROFILES --- */}
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Research Profiles</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
          
          {/* Left Card: Google Scholar */}
          <motion.a 
            href={profile?.googleScholarUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500 hover:shadow-xl transition-all group flex flex-col items-center text-center h-48 justify-center"
            whileHover={{ y: -5 }}
          >
            <FaGoogle className="text-blue-500 text-5xl mb-3" />
            <h2 className="text-2xl font-bold text-gray-800">Google Scholar</h2>
            <p className="text-xs text-gray-400 mt-2 group-hover:text-blue-500 transition-colors">View Profile &rarr;</p>
          </motion.a>

          {/* CENTER CIRCLE */}
          <div className="z-10 bg-white rounded-full w-24 h-24 shadow-xl border-4 border-indigo-50 flex flex-col items-center justify-center text-center shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <span className="text-3xl font-extrabold text-indigo-600 leading-none">
              {totalPublications}
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">
              Papers
            </span>
          </div>

          {/* Right Card: ResearchGate */}
          <motion.a 
            href={profile?.researchGateUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-8 border-t-4 border-teal-500 hover:shadow-xl transition-all group flex flex-col items-center text-center h-48 justify-center"
            whileHover={{ y: -5 }}
          >
            <FaResearchgate className="text-teal-500 text-5xl mb-3" />
            <h2 className="text-2xl font-bold text-gray-800">ResearchGate</h2>
            <p className="text-xs text-gray-400 mt-2 group-hover:text-teal-500 transition-colors">View Profile &rarr;</p>
          </motion.a>

        </div>
      </div>


      {/* --- SECTION 2: TOPIC PUBLICATIONS --- */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4">
          Publications by Topic
        </h2>

        <div className="space-y-4">
          {topics.map((topic) => {
            const isOpen = expandedTopic === topic;
            return (
              <div key={topic} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button 
                  onClick={() => toggleTopic(topic)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${isOpen ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-2 h-8 rounded-full ${isOpen ? 'bg-indigo-600' : 'bg-gray-300'}`}></span>
                    <h3 className={`text-xl font-bold ${isOpen ? 'text-indigo-700' : 'text-gray-700'}`}>
                      {topic}
                    </h3>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                      {groupedPubs[topic].length} Papers
                    </span>
                  </div>
                  {isOpen ? <FaChevronUp className="text-indigo-500" /> : <FaChevronDown className="text-gray-400" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/50">
                        <div className="space-y-6 mt-6">
                          {groupedPubs[topic].map((pub, index) => (
                            <PublicationCard key={pub._id} pub={pub} index={index} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const profileData = await sanityClient.fetch(`
    *[_type == "researchProfile"][0]
  `);

  const publicationsData = await sanityClient.fetch(`
    *[_type == "publication"] | order(year asc) {
      _id,
      title,
      category,
      abstract,
      journalCover,
      authors,
      journalName,
      year,
      doi,
      manualCitationCount
    }
  `);

  return {
    props: {
      profile: profileData || {},
      publications: publicationsData || [],
    },
    revalidate: 60,
  };
};

export default PublicationPage;