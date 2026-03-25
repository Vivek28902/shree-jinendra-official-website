import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Publication } from './PublicationsSection';

interface PublicationDetailProps {
  publication: Publication;
  onBack: () => void;
}

const PublicationDetail: React.FC<PublicationDetailProps> = ({ publication, onBack }) => {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white min-h-screen pb-24 animate-fade-in">
      {/* Hero Section */}
      <div className="w-full h-[60vh] md:h-[80vh] relative bg-brand-grey/5">
        <img 
          src={publication.image} 
          alt={publication.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Back Button Overlay */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-6 md:left-12 z-10 flex items-center gap-2 text-white hover:text-white/80 transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-sans text-xs tracking-widest uppercase font-medium">Back to Publications</span>
        </button>
      </div>

      {/* Article Content */}
      <div className="max-w-[800px] mx-auto px-6 md:px-12 mt-16 md:mt-24">
        {/* Article Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-red font-medium">
              {publication.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-grey/30"></span>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-grey/70">
              {publication.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight mb-8">
            {publication.title}
          </h1>
          
          <div className="w-16 h-[1px] bg-brand-red mx-auto"></div>
        </div>

        {/* Reading Column */}
        <div className="prose prose-lg max-w-none">
          <p className="font-sans text-lg md:text-[1.125rem] text-brand-grey font-light leading-[1.8] mb-8">
            {publication.description}
          </p>
          
          <p className="font-sans text-lg md:text-[1.125rem] text-brand-grey font-light leading-[1.8] mb-8">
            {publication.content || "Full article content goes here. This would typically be populated from a Rich Text Editor in the CMS, allowing for multiple paragraphs, inline images, and pull-quotes."}
          </p>
          
          {/* Simulated additional content for visual weight */}
          <p className="font-sans text-lg md:text-[1.125rem] text-brand-grey font-light leading-[1.8] mb-8">
            The integration of these elements requires a delicate balance between aesthetic vision and technical reality. Our approach ensures that every design decision serves both the overarching narrative of the space and the practical needs of its inhabitants. By prioritizing sustainable materials and local craftsmanship, we create environments that are not only beautiful but also deeply rooted in their context.
          </p>
          
          <blockquote className="border-l-2 border-brand-red pl-6 my-12 italic font-serif text-2xl text-brand-grey leading-relaxed">
            "Architecture is not just about building structures; it's about crafting the spaces where life unfolds."
          </blockquote>
          
          <p className="font-sans text-lg md:text-[1.125rem] text-brand-grey font-light leading-[1.8] mb-16">
            Looking ahead, we remain committed to pushing the boundaries of what is possible in architectural design. We believe that the best spaces are those that inspire, comfort, and endure. As we continue to explore new materials and methodologies, our core philosophy remains unchanged: to design with purpose, passion, and precision.
          </p>
        </div>

        {/* Footer Action */}
        <div className="border-t border-brand-grey/20 pt-12 mt-12 flex justify-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 text-[#1A1A1A] hover:text-brand-red transition-colors duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-sans text-sm tracking-[0.2em] uppercase font-medium">Back to Publications</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;
