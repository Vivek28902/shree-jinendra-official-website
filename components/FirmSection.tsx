import React from 'react';
import { Shield, Settings, Infinity } from 'lucide-react';
import { useSiteData } from '../AdminContext';

interface SectionProps {
  id: string;
}

const pillarIcons = [Shield, Settings, Infinity];

const FirmSection: React.FC<SectionProps> = ({ id }) => {
  const { siteData } = useSiteData();
  const firm = siteData.firmInfo;

  return (
    <section id={id} className="py-16 md:py-32 px-6 md:px-12 bg-white w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">

        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="h-[1px] w-12 bg-brand-red"></span>
                    <span className="text-brand-red font-serif uppercase tracking-widest text-sm md:text-base font-medium">Firm Profile</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-brand-grey leading-tight">
                    Vision & Leadership
                </h2>
            </div>
        </div>

        {/* Part 1: The Master Architect Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            
            {/* Left Column: Visual */}
            <div className="md:col-span-5 relative aspect-[3/4] md:aspect-[4/5] lg:aspect-square bg-brand-grey/5 overflow-hidden shadow-sm group">
                 <img 
                    src={firm.architectImage} 
                    alt={firm.architectName} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" 
                 />
                 <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
            </div>

            {/* Right Column: Narrative */}
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center h-full space-y-10 pt-4">
                <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-brand-grey tracking-tight whitespace-nowrap">
                        {firm.architectName}
                    </h3>
                    <p className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-brand-red font-semibold">
                        {firm.architectTitle}
                    </p>
                </div>

                <div className="space-y-8">
                    <p className="text-base md:text-lg font-sans font-light text-brand-grey leading-relaxed text-justify md:text-left">
                        {firm.description}
                    </p>

                    <div className="border-l-4 border-brand-red/30 pl-8 py-2">
                        <p className="text-xl md:text-2xl font-serif italic text-brand-grey/70 leading-relaxed">
                            {firm.quote}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Part 2: The Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            {firm.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] || Shield;
              return (
                <div key={index} className="md:col-span-4 p-8 border border-brand-grey/10 bg-white hover:border-brand-red/30 hover:shadow-sm transition-all duration-500 group flex flex-col h-full">
                    <div className="mb-8 text-brand-red group-hover:scale-110 transition-transform duration-500 origin-left">
                        <Icon size={40} strokeWidth={1.2} />
                    </div>
                    <h4 className="text-lg font-serif text-brand-red mb-4 uppercase tracking-wide">{pillar.title}</h4>
                    <p className="text-base font-sans text-brand-grey font-light leading-relaxed">
                        {pillar.description}
                    </p>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
};

export default FirmSection;