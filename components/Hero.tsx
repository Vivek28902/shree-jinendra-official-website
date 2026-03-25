import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteData } from '../AdminContext';

interface HeroProps {
  id: string;
}

const Hero: React.FC<HeroProps> = ({ id }) => {
  const { siteData } = useSiteData();
  const heroSlides = siteData.heroSlides;
  const heroInfo = siteData.heroInfo;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <section id={id} className="w-full h-screen md:h-[calc(100vh-6rem)] overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        {/* Left Column (Brand Anchor) */}
        <div className="col-span-12 md:col-span-5 h-[40vh] md:h-full bg-white flex flex-col justify-center items-center p-8 md:p-12 relative z-20 border-b md:border-b-0 md:border-r border-brand-grey/10 order-1">
          <div className="flex flex-col items-center text-center w-full max-w-lg mx-auto h-full justify-center">
              
              {/* High Impact Logo Anchor - Enlarged */}
              <div className="flex-grow flex items-center justify-center w-full">
                  <img 
                      src={heroInfo.logoSrc} 
                      alt="SJAA Logo" 
                      className="w-auto h-[60%] md:h-[70%] object-contain drop-shadow-sm max-h-[60vh]" 
                  />
              </div>

              {/* Tagline */}
              <div className="flex-shrink-0 pt-8 pb-4">
                  <p className="font-sans text-brand-grey text-lg md:text-xl font-light opacity-80 leading-relaxed tracking-wide"
                     dangerouslySetInnerHTML={{ __html: heroInfo.tagline.replace(/\n/g, '<br/>') }}
                  />
              </div>
          </div>
        </div>

        {/* Right Column (Visuals) */}
        <div className="col-span-12 md:col-span-7 h-[60vh] md:h-full relative overflow-hidden bg-brand-grey/5 order-2">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover"
              />
              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}

          {/* Navigation Arrows (Desktop Only) */}
          <button 
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300 hidden md:block p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
              aria-label="Previous slide"
          >
              <ChevronLeft size={32} strokeWidth={1} />
          </button>

          <button 
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300 hidden md:block p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
              aria-label="Next slide"
          >
              <ChevronRight size={32} strokeWidth={1} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
              {heroSlides.map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all duration-700 ${
                  index === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
              />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;