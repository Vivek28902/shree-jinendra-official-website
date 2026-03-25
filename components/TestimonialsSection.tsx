import React from 'react';
import { useSiteData } from '../AdminContext';

interface SectionProps {
  id: string;
}

const TestimonialsSection: React.FC<SectionProps> = ({ id }) => {
  const { siteData } = useSiteData();
  const testimonials = siteData.testimonials;

  return (
    <section id={id} className="py-16 md:py-32 px-6 md:px-12 bg-brand-light w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 text-center">
           <div className="md:col-span-12">
             <h2 className="text-3xl md:text-5xl font-serif text-brand-grey leading-tight">
              Client Experiences
            </h2>
           </div>
        </div>

        <div className="flex flex-nowrap overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:-mx-12 md:px-12 cursor-ew-resize">
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className="shrink-0 snap-start w-[85vw] md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1.333rem)] flex flex-col items-center justify-center text-center group"
            >
              <div className="mb-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <i className="fa-solid fa-quote-left text-brand-grey text-2xl"></i>
              </div>
              <p className="font-serif font-light text-xl md:text-2xl text-brand-grey leading-relaxed mb-10">
                "{t.quote}"
              </p>
              <div className="border-t border-brand-red/20 pt-4 w-12 group-hover:w-24 transition-all duration-500 mt-auto">
                <p className="text-xs font-sans uppercase tracking-[0.1em] font-medium text-brand-red mb-1">
                  {t.author}
                </p>
                <p className="text-xs font-sans uppercase tracking-[0.1em] font-medium text-brand-grey/70">
                  {t.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;