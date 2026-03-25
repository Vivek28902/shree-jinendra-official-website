import React from 'react';

interface SectionProps {
  id: string;
}

const services = [
  { id: 1, title: 'Township & Master Planning', icon: 'fa-city' },
  { id: 2, title: 'Group Housing & Apartments', icon: 'fa-building' },
  { id: 3, title: 'Hospitality & Resorts', icon: 'fa-hotel' },
  { id: 4, title: 'Institutional & Healthcare', icon: 'fa-hospital' },
  { id: 5, title: 'Luxury Residences', subtitle: '& Farm Houses', icon: 'fa-house-chimney' },
  { id: 6, title: 'Landscape Specialists', subtitle: '(Terrace Gardens, Streetscapes, Temples)', icon: 'fa-tree' },
];

const ServicesSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 px-6 md:px-12 bg-brand-light w-full border-t border-brand-grey/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-brand-red"></span>
              <span className="text-brand-red uppercase tracking-widest text-sm font-medium">Expertise</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-brand-grey">
              Services & Capabilities
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center group p-6 hover:bg-white hover:shadow-sm transition-all duration-300 rounded-sm">
              <div className="mb-6 text-brand-red opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <i className={`fa-solid ${service.icon} text-4xl`}></i>
              </div>
              <h4 className="text-sm uppercase tracking-widest font-medium text-brand-grey">
                {service.title}
              </h4>
              {service.subtitle && (
                <span className="text-xs uppercase tracking-wider text-brand-grey/70 mt-2 font-light">
                  {service.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;