import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteData } from '../AdminContext';

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.21.046-.39-.03-.54-.075-.15-.673-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.273-.21-.57-.36z"/>
    <path d="M20.52 3.449A11.964 11.964 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.163 1.605 5.97L0 24l6.188-1.62A11.964 11.964 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.204-1.248-6.213-3.48-8.551zM12 22.016c-1.795 0-3.553-.483-5.09-1.395l-.365-.215-3.784.99.99-3.69-.236-.375A9.964 9.964 0 0 1 2.016 12c0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10s-4.486 10-10 10z"/>
  </svg>
);

interface SectionProps {
  id: string;
}

const ContactSection: React.FC<SectionProps> = ({ id }) => {
  const { siteData } = useSiteData();
  const contact = siteData.contactInfo;
  
  const [isTypologyOpen, setIsTypologyOpen] = useState(false);
  const [selectedTypology, setSelectedTypology] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const typologies = [
    "Luxury Residential",
    "Hospitality & Wellness",
    "Commercial & Institutional",
    "Housing & Townships",
    "Other"
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTypologyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Parse phone numbers for tel: links
  const mobileRaw = contact.mobile.replace(/\s/g, '');
  const telephoneRaw = contact.telephone.replace(/\s/g, '');

  return (
    <section id={id} className="py-16 md:py-32 px-6 md:px-12 bg-brand-grey text-white w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Column: Form */}
        <div className="col-span-12 md:col-span-6 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Start a <br/> Dialogue.
            </h2>
            <p className="font-sans text-white/70 font-light max-w-md text-base tracking-wide leading-relaxed">
              We engage with visionary clients seeking to create legacy projects. Tell us about your aspirations.
            </p>
          </div>

          <form className="space-y-8 max-w-md">
            <div className="space-y-2">
              <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest text-brand-red font-medium block">Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base md:text-lg font-light focus:outline-none focus:border-white transition-colors placeholder-white/30 rounded-none"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest text-brand-red font-medium block">Email Address</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base md:text-lg font-light focus:outline-none focus:border-white transition-colors placeholder-white/30 rounded-none"
                placeholder="yourname@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="font-sans text-xs uppercase tracking-widest text-brand-red font-medium block">Phone</label>
              <input 
                type="tel" 
                id="phone"
                className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base md:text-lg font-light focus:outline-none focus:border-white transition-colors placeholder-white/30 rounded-none"
                placeholder="+91 00000 00000"
              />
            </div>

            <div className="space-y-2">
               <label htmlFor="projectType" className="font-sans text-xs uppercase tracking-widest text-brand-red font-medium block">Project Typology</label>
               <div className="relative" ref={dropdownRef}>
                  <div 
                    className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base md:text-lg font-light cursor-pointer flex justify-between items-center transition-colors hover:border-white focus:border-white"
                    onClick={() => setIsTypologyOpen(!isTypologyOpen)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsTypologyOpen(!isTypologyOpen);
                      }
                    }}
                  >
                    <span className={selectedTypology ? "text-white" : "text-white/30"}>
                      {selectedTypology || "Select typology..."}
                    </span>
                    <ChevronDown size={20} className={`text-white/50 transition-transform duration-300 ${isTypologyOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isTypologyOpen && (
                    <div className="absolute top-full left-0 w-full mt-0 bg-brand-grey border border-white/10 shadow-2xl z-50">
                      {typologies.map((typology, index) => (
                        <div 
                          key={index}
                          className="px-4 py-4 font-sans text-base text-white/80 hover:text-white hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                          onClick={() => {
                            setSelectedTypology(typology);
                            setIsTypologyOpen(false);
                          }}
                        >
                          {typology}
                        </div>
                      ))}
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="font-sans text-xs uppercase tracking-widest text-brand-red font-medium block">Project Details</label>
              <textarea 
                id="details"
                rows={3}
                className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base md:text-lg font-light focus:outline-none focus:border-white transition-colors resize-none placeholder-white/30 rounded-none"
                placeholder="Briefly describe your site and design aspirations..."
              ></textarea>
            </div>

            <button type="submit" className="group flex items-center gap-4 text-white pt-6 hover:text-brand-red transition-colors">
              <span className="font-sans uppercase tracking-widest text-sm font-medium">Initiate Dialogue</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info & Careers */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-end space-y-12 md:pl-12">
          <div className="border-t border-white/10 pt-8">
             <h4 className="font-sans uppercase tracking-widest text-xs text-brand-red mb-4 font-bold">Studio</h4>
             <p className="font-sans font-light text-lg leading-relaxed text-white/70"
                dangerouslySetInnerHTML={{ __html: contact.address.replace(/\n/g, '<br/>') }}
             />
          </div>
          
          <div className="border-t border-white/10 pt-8">
             <h4 className="font-sans uppercase tracking-widest text-xs text-brand-red mb-4 font-bold">Contact</h4>
             <div className="space-y-3">
               <div className="font-sans font-light text-lg text-white/70 flex flex-col gap-2">
                 <a 
                   href={`tel:${mobileRaw}`} 
                   className="flex items-center gap-3 hover:opacity-70 transition-opacity py-1 w-fit"
                 >
                   <span className="text-white/50 text-sm">M:</span> 
                   <span>{contact.mobile}</span>
                 </a>
                 <a 
                   href={`tel:${telephoneRaw}`} 
                   className="flex items-center gap-3 hover:opacity-70 transition-opacity py-1 w-fit"
                 >
                   <span className="text-white/50 text-sm">T:</span> 
                   <span>{contact.telephone}</span>
                 </a>
                 <a 
                   href={`mailto:${contact.email}`} 
                   className="flex items-center gap-3 hover:opacity-70 transition-opacity py-1 w-fit"
                 >
                   <span className="text-white/50 text-sm">E:</span> 
                   <span>{contact.email}</span>
                 </a>
               </div>
             </div>
          </div>

          <div className="border-t border-white/10 pt-8">
             <h4 className="font-sans uppercase tracking-widest text-xs text-brand-red mb-4 font-bold">Careers</h4>
             <p className="font-sans font-light text-base text-white/70 mb-4">We are always looking for exceptional talent.</p>
             <div className="flex flex-col items-start gap-3">
                <a href={`mailto:${contact.jobEmail}?subject=Job Application`} className="font-sans text-white hover:text-brand-red transition-colors border-b border-white/30 hover:border-brand-red pb-1 text-base font-light">
                    Apply for Job
                </a>
                <a href={`mailto:${contact.internshipEmail}?subject=Internship Application`} className="font-sans text-white hover:text-brand-red transition-colors border-b border-white/30 hover:border-brand-red pb-1 text-base font-light">
                    Apply for Internship
                </a>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;