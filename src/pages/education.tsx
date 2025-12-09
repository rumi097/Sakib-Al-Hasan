// src/pages/education.tsx
import { sanityClient, urlFor } from '../sanity/lib/sanity';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Interface for a single certificate
interface Certificate {
  _key: string;
  name?: string;
  image?: any;
  link?: string;
  file?: { asset?: { url?: string } };
}

interface SemesterDocument {
  _key?: string;
  name?: string;
  link?: string;
  file?: { asset?: { url?: string } };
}

interface SemesterEntry {
  _key: string;
  label: string;
  title?: string;
  result?: string;
  documents?: SemesterDocument[];
}

// Interface for a single education entry
interface EducationEntry {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  section?: string;
  certificates?: Certificate[]; // This is the array of certificates
  semesters?: SemesterEntry[];
}

interface EducationProps {
  educationEntries: EducationEntry[];
}

const Education: React.FC<EducationProps> = ({ educationEntries }) => {
  if (!educationEntries || educationEntries.length === 0) {
    return (
      <section className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900">Education</h1>
        <p className="text-gray-700 mt-4">
          No education history found. Please add content in the Sanity Studio.
        </p>
      </section>
    );
  }
  
  // Sort entries by startDate desc and group by section
  const sorted = [...educationEntries].sort((a, b) => {
    const at = a.startDate ? new Date(a.startDate).getTime() : 0;
    const bt = b.startDate ? new Date(b.startDate).getTime() : 0;
    return bt - at;
  });

  const grouped: Record<string, EducationEntry[]> = {};
  const sectionOrder: string[] = [];
  sorted.forEach((e) => {
    const key = e.section?.trim() || 'General';
    if (!grouped[key]) {
      grouped[key] = [];
      sectionOrder.push(key);
    }
    grouped[key].push(e);
  });

  return (
    <section className="py-12">
      <motion.h1 
        className="text-4xl font-extrabold text-gray-900 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Education
      </motion.h1>
      <div className="space-y-12 max-w-4xl mx-auto">
        {sectionOrder.map((sectionName, sIdx) => (
          <div key={sectionName}>
            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: sIdx * 0.05 }}
            >
              {sectionName}
            </motion.h2>
            <div className="space-y-10">
              {grouped[sectionName].map((entry, index) => (
          <motion.div
            key={entry._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: index * 0.05, duration: 0.25, type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ y: -3 }}
          >
            <h2 className="text-2xl font-bold text-indigo-700">{entry.degree}</h2>
            <p className="text-xl font-semibold text-gray-800 mt-1">{entry.institution}, {entry.location}</p>
            <p className="text-gray-600 mt-2">
              {new Date(entry.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -{' '}
              {entry.endDate
                ? new Date(entry.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                : 'Present'}
            </p>
            {entry.description && <p className="text-gray-700 mt-4 leading-relaxed">{entry.description}</p>}

            {/* --- THIS IS THE NEW SECTION --- */}
            {entry.certificates && entry.certificates.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Certificates & Documents:</h4>
                <div className="flex flex-wrap gap-4">
                  
                  {entry.certificates.map((cert) => (
                    <div key={cert._key} className="p-4 border rounded-md bg-gray-50 flex-1 min-w-[220px] max-w-xs">
                      
                      {cert.image && (
                        <div className="relative w-full h-32 mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src={urlFor(cert.image).width(300).url()}
                            alt={cert.name || 'Certificate Screenshot'}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      
                      <p className="font-medium text-gray-900 wrap-break-word">
                        {cert.name || 'Certificate'}
                      </p>
                      
                      <div className="mt-2 flex items-center gap-3">
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Link
                          </a>
                        )}
                        {cert.file?.asset?.url && (
                          <a
                            href={cert.file.asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            )}
            {/* --- END OF NEW SECTION --- */}

            {/* Semesters */}
            {entry.semesters && entry.semesters.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Semesters</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {entry.semesters.map((sem) => (
                    <div key={sem._key} className="p-4 rounded-md border bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-sm font-semibold">
                          {sem.label}
                        </span>
                        {sem.result && (
                          <span className="text-gray-800 text-sm font-medium">{sem.result}</span>
                        )}
                      </div>
                      {sem.title && <p className="mt-1 text-gray-700 text-sm">{sem.title}</p>}
                      {sem.documents && sem.documents.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {sem.documents.map((doc, idx) => (
                            <div key={(doc._key || '') + idx} className="flex items-center gap-2">
                              <span className="text-gray-900 text-sm font-medium">{doc.name || 'Document'}:</span>
                              {doc.link && (
                                <a
                                  href={doc.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                  Link
                                </a>
                              )}
                              {doc.file?.asset?.url && (
                                <a
                                  href={doc.file.asset.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  PDF
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
       
       {/* Your Timeline Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Education Journey Timeline</h3>
        <p className="text-gray-600 mb-8">This section illustrates the educational progression from your design sketch. </p>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // The query MUST fetch the certificates array
  const educationEntries = await sanityClient.fetch(`
    *[_type == "education"] | order(startDate desc) {
      _id,
      degree,
      institution,
      location,
      startDate,
      endDate,
      description,
      section,
      certificates[]{
        _key,
        name,
        image,
        link,
        file{asset->{url}}
      },
      semesters[]{
        _key,
        label,
        title,
        result,
        documents[]{
          _key,
          name,
          link,
          file{asset->{url}}
        }
      }
    }
  `);

  return {
    props: {
      educationEntries: educationEntries || null,
    },
    revalidate: 60,
  };
};

export default Education;