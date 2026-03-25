import React, { useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useSiteData } from '../AdminContext';

interface SectionProps {
  id: string;
  onProjectClick?: (project: any) => void;
}

type FilterCategory = 
  | 'All'
  | 'Luxury Residences'
  | 'Hospitality'
  | 'Private Estates'
  | 'Housing & Townships'
  | 'Institutional & Commercial'
  | 'Terrace & Rooftops';

const ProjectCard = ({ project, style, onClick }: { project: any, style: any, onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video play failed", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className={`group cursor-pointer flex flex-col fade-in-up ${style.colSpan}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden mb-4 bg-brand-grey/5 w-full ${style.aspectRatio}`}>
        {/* Static Image */}
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:opacity-0 grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        
        {/* Video Layer */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            muted
            loop
            playsInline
          />
        )}
        
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Overlay Badge for Subcategory */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-sans uppercase tracking-wider text-brand-grey opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none">
          {project.subCategory}
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-2 px-1">
        <div>
          <h4 className={`font-serif text-brand-grey group-hover:text-brand-red transition-colors duration-300 ${
            style.isLarge ? 'text-2xl' : 'text-xl'
          }`}>
            {project.title}
          </h4>
          <p className="text-sm font-sans text-brand-grey mt-1 font-light tracking-wide flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-brand-red/50"></span>
            {project.location}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC<SectionProps> = ({ id, onProjectClick }) => {
  const { siteData } = useSiteData();
  const projectData = siteData.projects;

  const [activeTab, setActiveTab] = useState<FilterCategory>('All');
  const [displayCount, setDisplayCount] = useState(5);
  
  const tabs: FilterCategory[] = [
    'All',
    'Luxury Residences',
    'Hospitality',
    'Private Estates',
    'Housing & Townships',
    'Institutional & Commercial',
    'Terrace & Rooftops'
  ];

  const handleTabChange = (tab: FilterCategory) => {
    setActiveTab(tab);
    setDisplayCount(5);
  };

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 5);
  };

  const handleShowLess = () => {
    setDisplayCount(prev => {
      const newCount = Math.max(5, prev - 5);
      // Smooth scroll up slightly
      window.scrollBy({ top: -800, behavior: 'smooth' });
      return newCount;
    });
  };

  const filteredProjects = projectData.filter(project => {
    switch (activeTab) {
      case 'All': 
        return true;
      case 'Luxury Residences': 
        return project.subCategory === 'High-End Residential';
      case 'Hospitality': 
        return project.category === 'Hospitality';
      case 'Private Estates': 
        return project.subCategory === 'Farm House' || project.subCategory === 'Out House';
      case 'Housing & Townships': 
        return project.category === 'Township' || project.subCategory === 'Group Housing';
      case 'Institutional & Commercial': 
        return project.category === 'Institutional' || project.category === 'Commercial';
      case 'Terrace & Rooftops': 
        return project.subCategory === 'Terrace Garden' || project.subCategory === 'Penthouse';
      default: 
        return true;
    }
  });

  const displayedProjects = filteredProjects.slice(0, displayCount);

  const getCardStyle = (index: number) => {
    const positionInBlock = index % 5;
    
    if (positionInBlock === 0) {
      return {
        colSpan: 'col-span-12 md:col-span-8',
        aspectRatio: 'aspect-[4/3] md:aspect-[16/9]',
        isLarge: true
      };
    } else {
      return {
        colSpan: 'col-span-12 md:col-span-4',
        aspectRatio: 'aspect-[4/3]',
        isLarge: false
      };
    }
  };

  return (
    <section id={id} className="py-16 md:py-32 px-6 md:px-12 bg-white w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12">
            <div className="flex items-center gap-4">
               <span className="h-[1px] w-12 bg-brand-red"></span>
               <span className="text-brand-red font-serif uppercase tracking-widest text-sm md:text-base font-medium">Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-grey leading-tight mt-4">
              Selected Works
            </h2>
            <p className="text-base font-sans text-brand-grey font-light max-w-2xl leading-relaxed mt-4">
              A curation of our specialized landscape interventions. Shaping the void between the built and the biotic.
            </p>
          </div>
        </div>

        {/* Filters - Multi-Line Centered Layout */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 w-full max-w-5xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isAll = tab === 'All';
            
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`
                  relative text-xs md:text-sm font-sans uppercase tracking-widest py-2 px-1 transition-all duration-300
                  ${isActive 
                    ? 'text-brand-red font-medium' 
                    : isAll 
                      ? 'text-brand-grey font-medium'
                      : 'text-brand-grey/50 hover:text-brand-grey font-light'
                  }
                `}
              >
                {tab}
                {/* Underline indicator */}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] bg-brand-red transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0'
                }`}></span>
              </button>
            );
          })}
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 auto-dense">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, index) => {
              const style = getCardStyle(index);
              return <ProjectCard key={project.title} project={project} style={style} onClick={() => onProjectClick && onProjectClick(project)} />;
            })
          ) : (
            <div className="col-span-full py-12 text-center font-sans text-brand-grey font-light">
              No projects found in this category.
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-20 gap-12 w-full">
          {displayCount > 5 && (
            <button 
                onClick={handleShowLess}
                className="font-sans text-xs uppercase tracking-widest text-brand-grey hover:text-brand-red transition-colors duration-300 border-b border-transparent hover:border-brand-red pb-1"
            >
                Show Less
            </button>
          )}
          
          {displayCount < filteredProjects.length && (
            <button 
                onClick={handleShowMore}
                className="font-sans text-xs uppercase tracking-widest text-brand-grey hover:text-brand-red transition-colors duration-300 border-b border-transparent hover:border-brand-red pb-1"
            >
                Show More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;