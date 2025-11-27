// src/pages/achievement.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useCallback } from 'react';

// --- Types ---
interface Achievement {
  _id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  organization?: string;
  images?: any[];
  certificateLink?: string;
  certificatePDF?: {
    asset: {
      url: string;
    };
  };
  highlights?: string[];
  featured: boolean;
}

interface AchievementProps {
  achievements: Achievement[];
}

// --- Category Colors Configuration ---
const categoryColors: { [key: string]: { bg: string; badge: string; border: string } } = {
  academic: {
    bg: 'bg-blue-50/30',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    border: 'border-blue-200'
  },
  research: {
    bg: 'bg-purple-50/30',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    border: 'border-purple-200'
  },
  professional: {
    bg: 'bg-emerald-50/30',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    border: 'border-emerald-200'
  },
  competition: {
    bg: 'bg-orange-50/30',
    badge: 'bg-orange-100 text-orange-700 border-orange-200',
    border: 'border-orange-200'
  },
  award: {
    bg: 'bg-yellow-50/30',
    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    border: 'border-yellow-200'
  },
  certification: {
    bg: 'bg-cyan-50/30',
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    border: 'border-cyan-200'
  },
  other: {
    bg: 'bg-gray-50/30',
    badge: 'bg-gray-100 text-gray-700 border-gray-200',
    border: 'border-gray-200'
  }
};

// --- Main Component ---
const Achievement: React.FC<AchievementProps> = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  
  // --- New Lightbox State ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Lightbox Functions ---
  const openLightbox = (achievement: Achievement, index: number) => {
    setCurrentAchievement(achievement);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentAchievement(null);
    setCurrentImageIndex(0);
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentAchievement?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % currentAchievement.images!.length);
  }, [currentAchievement]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentAchievement?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + currentAchievement.images!.length) % currentAchievement.images!.length);
  }, [currentAchievement]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);


  const categories = useMemo(() => ['all', ...Array.from(new Set(achievements.map(a => a.category)))], [achievements]);

  const filteredAchievements = useMemo(() => {
    return achievements
      .filter(achievement => selectedCategory === 'all' || achievement.category === selectedCategory)
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [achievements, selectedCategory, sortBy]);

  const featuredAchievements = useMemo(() => achievements.filter(a => a.featured).slice(0, 3), [achievements]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- Image Modal (Lightbox with Arrows) --- */}
      <AnimatePresence>
        {lightboxOpen && currentAchievement && currentAchievement.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] aspect-video flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <Image
                src={urlFor(currentAchievement.images[currentImageIndex]).url()}
                alt="Full size view"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />

              {/* Close Button */}
              <button 
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {/* Navigation Arrows (Only if > 1 image) */}
              {currentAchievement.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all border border-white/20"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all border border-white/20"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-4 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {currentAchievement.images.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              My <span className="text-indigo-600">Achievements</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milestones and recognitions from my journey.
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'timeline' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Timeline View
                </button>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-12">
        
        {viewMode === 'grid' ? (
          /* --- GRID VIEW --- */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence mode='popLayout'>
              {filteredAchievements.map((achievement, index) => {
                const colors = categoryColors[achievement.category] || categoryColors.other;
                return (
                  <motion.div
                    layout
                    key={achievement._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group flex flex-col h-full bg-white rounded-2xl border ${colors.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                  >
                    
                    {/* --- IMAGE GALLERY SECTION --- */}
                    {achievement.images && achievement.images.length > 0 ? (
                      <div className="w-full bg-gray-100 border-b border-gray-100">
                        {/* 1. If only 1 image */}
                        {achievement.images.length === 1 ? (
                          <div 
                            className="relative w-full h-64 cursor-zoom-in group-hover:brightness-105 transition-all"
                            onClick={() => openLightbox(achievement, 0)}
                          >
                            <Image
                              src={urlFor(achievement.images![0]).url()}
                              alt={achievement.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        ) : (
                          /* 2. If multiple images */
                          <div className="grid grid-cols-2 gap-[1px]">
                            {achievement.images.slice(0, 2).map((img, i) => (
                              <div 
                                key={i} 
                                className="relative w-full h-40 cursor-zoom-in hover:opacity-90 transition-opacity"
                                onClick={() => openLightbox(achievement, i)}
                              >
                                <Image
                                  src={urlFor(img).url()}
                                  alt={`${achievement.title} ${i + 1}`}
                                  layout="fill"
                                  objectFit="cover"
                                />
                                {/* Counter Overlay */}
                                {i === 1 && achievement.images!.length > 2 && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg backdrop-blur-[2px]">
                                    +{achievement.images!.length - 2}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors.badge}`}>
                          {achievement.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          {new Date(achievement.date).getFullYear()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {achievement.title}
                      </h3>
                      
                      {achievement.organization && (
                        <p className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          {achievement.organization}
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {achievement.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex gap-4">
                         {achievement.certificateLink && (
                          <a href={achievement.certificateLink} target="_blank" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1">
                            View Link ↗
                          </a>
                        )}
                         {achievement.certificatePDF && (
                          <a href={achievement.certificatePDF.asset.url} target="_blank" className="text-sm font-bold text-red-600 hover:text-red-800 hover:underline flex items-center gap-1">
                            View PDF ↓
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* --- TIMELINE VIEW --- */
          <div className="max-w-4xl mx-auto space-y-12">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 md:gap-10"
              >
                {/* Date Column */}
                <div className="flex flex-col items-center w-24 shrink-0 pt-2">
                  <span className="text-lg font-bold text-gray-400">{new Date(achievement.date).getFullYear()}</span>
                  <div className="w-px h-full bg-gray-200 mt-2 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pb-12 w-full">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                      
                      {/* Image on Timeline */}
                      {achievement.images && achievement.images[0] && (
                        <div 
                          className="w-full md:w-48 h-32 relative shrink-0 rounded-lg overflow-hidden cursor-zoom-in"
                          onClick={() => openLightbox(achievement, 0)}
                        >
                          <Image
                            src={urlFor(achievement.images![0]).url()}
                            alt={achievement.title}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                        <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const achievements = await sanityClient.fetch(`
    *[_type == "achievement"] | order(date desc) {
      _id,
      title,
      category,
      description,
      date,
      organization,
      images,
      certificateLink,
      certificatePDF {
        asset-> {
          url
        }
      },
      highlights,
      featured
    }
  `);

  return {
    props: {
      achievements: achievements || [],
    },
    revalidate: 60,
  };
};

export default Achievement;