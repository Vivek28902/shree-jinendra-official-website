import React from 'react';
import { useSiteData } from '../AdminContext';

interface SectionProps {
  id: string;
}

const CollaborationsSection: React.FC<SectionProps> = ({ id }) => {
  const { siteData } = useSiteData();
  const partners = siteData.partners;

  return (
    <section id={id} className="py-16 md:py-32 px-6 md:px-12 bg-white w-full border-t border-brand-grey/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 text-center">
          <div className="md:col-span-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-grey leading-tight">
              Integrated Design Alliances
            </h2>
            <p className="max-w-2xl mx-auto font-sans text-brand-grey font-light leading-relaxed text-base">
              Collaborating with top-tier architects, designers, and developers to deliver complex master plans, bringing technical rigor and ecological expertise to the table.
            </p>
          </div>
        </div>
        
        {/* Partner Cards Horizontal Track */}
        <div className="flex flex-nowrap overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:-mx-12 md:px-12 cursor-ew-resize">
            {partners.map((partner, index) => (
                <div key={index} className="shrink-0 snap-start flex flex-col items-center text-center w-[85vw] md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1.333rem)] group">
                    {/* Logo/Icon Area */}
                    <div className="h-16 mb-8 flex items-center justify-center">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.firm} Logo`} 
                          className="max-h-[45px] object-contain grayscale opacity-80 transition-opacity group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                    </div>

                    {/* Quote */}
                    <p className="font-serif font-light text-brand-grey leading-relaxed mb-8 text-xl md:text-2xl mt-auto">
                        "{partner.quote}"
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-[1px] bg-brand-grey/20 group-hover:bg-brand-red/50 transition-colors mb-6"></div>

                    {/* Sign-off */}
                    <div className="space-y-1">
                        <h5 className="text-sm font-sans font-medium uppercase tracking-[0.1em] text-brand-grey">
                            {partner.name}
                        </h5>
                        <p className="text-xs font-sans uppercase tracking-[0.1em] text-brand-grey/70 font-medium">
                            {partner.role}, {partner.firm}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationsSection;