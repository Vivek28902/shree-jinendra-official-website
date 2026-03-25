import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSiteData } from '../AdminContext';

export interface Publication {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  content?: string;
}

const categories = ['ALL', 'AWARDS', 'COMPETITIONS', 'ARTICLES', 'PRESS'];

interface PublicationsSectionProps {
  id: string;
  onPublicationClick: (pub: Publication) => void;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ id, onPublicationClick }) => {
  const { siteData } = useSiteData();
  const publicationsData = siteData.publications;

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPublications = activeCategory === 'ALL' 
    ? publicationsData 
    : publicationsData.filter(pub => pub.category === activeCategory);

  const displayedPublications = filteredPublications.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPublications.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  return (
    <section id={id} className="py-16 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Publications</h2>
            <div className="w-12 h-[1px] bg-brand-red"></div>
          </div>
          
          {/* Filtering System */}
          <div className="md:col-span-8 flex flex-wrap gap-6 md:justify-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 pb-1 border-b ${
                  activeCategory === category 
                    ? 'text-[#1A1A1A] border-[#1A1A1A] font-medium' 
                    : 'text-brand-grey/70 border-transparent hover:text-brand-red'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex flex-nowrap overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:-mx-12 md:px-12">
          {displayedPublications.map((pub) => (
            <a 
              key={pub.id} 
              href={`#publication-${pub.id}`}
              onClick={(e) => {
                e.preventDefault();
                onPublicationClick(pub);
              }}
              className="block shrink-0 snap-start group flex flex-col min-w-[300px] w-[85vw] md:min-w-[350px] md:w-[28vw] text-left"
            >
              {/* High-resolution thumbnail image space */}
              <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-brand-grey/5">
                <img 
                  src={pub.image} 
                  alt={pub.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Date & Category */}
              <div className="flex items-center gap-4 mb-3">
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-red font-medium">
                  {pub.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-brand-grey/30"></span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-grey/70">
                  {pub.date}
                </span>
              </div>
              
              {/* Bold serif headline */}
              <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-3 leading-tight group-hover:text-brand-red transition-colors duration-300">
                {pub.title}
              </h3>
              
              {/* Brief two-line sans-serif description */}
              <p className="font-sans text-sm text-brand-grey font-light leading-relaxed line-clamp-2">
                {pub.description}
              </p>
            </a>
          ))}

          {/* Load More Card */}
          {hasMore && (
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="shrink-0 snap-start flex flex-col justify-center items-center min-w-[300px] w-[85vw] md:min-w-[350px] md:w-[28vw] aspect-[4/3] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors duration-300 group cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <span className="font-sans text-sm tracking-[0.2em] uppercase font-light group-hover:text-brand-red transition-colors duration-300">
                    Load More
                  </span>
                  <ArrowRight className="w-6 h-6 text-white group-hover:text-brand-red group-hover:translate-x-2 transition-all duration-300" />
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
