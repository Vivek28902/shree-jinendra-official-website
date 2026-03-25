import React, { useState, useEffect } from 'react';
import { useSiteData } from '../AdminContext';
import { SiteData, HeroSlide, Project, SignatureElement, Partner, Testimonial, Publication } from '../siteData';
import { 
  ArrowLeft, Save, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, 
  Image, FileText, Users, MessageSquare, BookOpen, Phone, Link2, 
  Home, Building2, Sparkles, X, Check, AlertTriangle, Eye, LogOut, Upload, Loader2
} from 'lucide-react';

// ============================================================
// ADMIN PANEL COMPONENT
// ============================================================

interface AdminPanelProps {
  onBack: () => void;
}

type TabKey = 'hero' | 'firm' | 'projects' | 'elements' | 'partners' | 'testimonials' | 'publications' | 'contact' | 'social';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'hero', label: 'Hero Section', icon: <Home size={18} /> },
  { key: 'firm', label: 'Firm Profile', icon: <Building2 size={18} /> },
  { key: 'projects', label: 'Projects', icon: <Image size={18} /> },
  { key: 'elements', label: 'Signature Elements', icon: <Sparkles size={18} /> },
  { key: 'partners', label: 'Collaborations', icon: <Users size={18} /> },
  { key: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
  { key: 'publications', label: 'Publications', icon: <BookOpen size={18} /> },
  { key: 'contact', label: 'Contact Info', icon: <Phone size={18} /> },
  { key: 'social', label: 'Social Links', icon: <Link2 size={18} /> },
];

// ---- Toast ----
const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onDismiss: () => void }> = ({ message, type, onDismiss }) => {
  useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t); }, [onDismiss]);
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-500' };
  return (
    <div className={`fixed bottom-6 right-6 z-[200] ${colors[type]} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in`}>
      {type === 'success' && <Check size={18} />}
      {type === 'error' && <AlertTriangle size={18} />}
      <span className="font-sans text-sm font-medium">{message}</span>
      <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100"><X size={16} /></button>
    </div>
  );
};

// ---- Collapsible Card ----
const CollapsibleCard: React.FC<{ title: string; index: number; children: React.ReactNode; onDelete?: () => void; defaultOpen?: boolean }> = 
  ({ title, index, children, onDelete, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03] backdrop-blur-sm transition-all hover:border-white/20">
      <div className="flex items-center justify-between px-5 py-4 cursor-pointer select-none" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red/80 to-brand-red/40 flex items-center justify-center text-white text-xs font-bold font-sans">{index + 1}</span>
          <span className="font-sans text-sm text-white/90 font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
              <Trash2 size={16} />
            </button>
          )}
          {open ? <ChevronUp size={18} className="text-white/50" /> : <ChevronDown size={18} className="text-white/50" />}
        </div>
      </div>
      {open && <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">{children}</div>}
    </div>
  );
};

// ---- Field Components ----
const InputField: React.FC<{ label: string; value: string; onChange: (val: string) => void; placeholder?: string; type?: string }> = 
  ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/90 font-sans font-light placeholder-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.07] transition-all"
    />
  </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (val: string) => void; placeholder?: string; rows?: number }> = 
  ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium block">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/90 font-sans font-light placeholder-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.07] transition-all resize-none"
    />
  </div>
);

const ImagePreview: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => (
  <div className="w-20 h-14 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
    <img src={src} alt={alt || ''} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
  </div>
);

const FileField: React.FC<{ label: string; value: string; onChange: (val: string) => void; placeholder?: string }> = 
  ({ label, value, onChange, placeholder }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for Base64 storage
        alert("File is too large! Please choose an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium block">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "https://... or upload"}
          className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/90 font-sans font-light placeholder-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.07] transition-all"
        />
        <label className="flex-shrink-0 cursor-pointer flex items-center justify-center w-10 h-10 bg-brand-red/10 hover:bg-brand-red/20 border border-brand-red/20 rounded-lg text-brand-red transition-all" title="Upload Image">
          <Upload size={18} />
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
      {value.startsWith('data:image') && (
        <p className="text-[10px] text-emerald-400/70 font-sans italic border-l border-emerald-500/30 pl-2">Local image uploaded (stored in browser memory)</p>
      )}
    </div>
  );
};


// ============================================================
// MAIN ADMIN PANEL
// ============================================================
const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const { siteData, isLoading, updateSiteData, resetSiteData, logout } = useSiteData();
  const [draft, setDraft] = useState<SiteData>(JSON.parse(JSON.stringify(siteData)));
  const [activeTab, setActiveTab] = useState<TabKey>('hero');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync draft with siteData when siteData is loaded from Supabase
  useEffect(() => {
    if (!isLoading) {
      setDraft(JSON.parse(JSON.stringify(siteData)));
    }
  }, [isLoading, siteData]);

  useEffect(() => {
    setHasChanges(JSON.stringify(draft) !== JSON.stringify(siteData));
  }, [draft, siteData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handleSave = async () => {
    if (!hasChanges || isSaving) return;
    setIsSaving(true);
    const success = await updateSiteData(draft);
    setIsSaving(false);
    if (success) {
      showToast('All changes saved to Supabase!', 'success');
    } else {
      showToast('Failed to save to Supabase. Local changes kept.', 'error');
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    await resetSiteData();
    setIsSaving(false);
    setDraft(JSON.parse(JSON.stringify(siteData)));
    setShowResetConfirm(false);
    showToast('All content reset to defaults.', 'info');
    // Reload to pick up defaults
    setTimeout(() => window.location.reload(), 500);
  };

  // ---- Helper updaters ----
  const updateDraft = (path: string, value: any) => {
    setDraft(prev => {
      const newDraft = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = newDraft;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        obj = obj[key];
      }
      const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[lastKey] = value;
      return newDraft;
    });
  };

  const addItem = (arrayPath: string, newItem: any) => {
    setDraft(prev => {
      const newDraft = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let obj = newDraft;
      for (const key of keys) {
        obj = obj[isNaN(Number(key)) ? key : Number(key)];
      }
      obj.push(newItem);
      return newDraft;
    });
  };

  const removeItem = (arrayPath: string, index: number) => {
    setDraft(prev => {
      const newDraft = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split('.');
      let obj = newDraft;
      for (const key of keys) {
        obj = obj[isNaN(Number(key)) ? key : Number(key)];
      }
      obj.splice(index, 1);
      return newDraft;
    });
  };

  // ============================================================
  // TAB RENDERERS
  // ============================================================

  const renderHero = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Hero Section</h3>
        <p className="text-sm font-sans text-white/50 font-light">Manage the hero slider images and tagline.</p>
      </div>

      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
        <FileField label="Logo Source" value={draft.heroInfo.logoSrc} onChange={(v) => updateDraft('heroInfo.logoSrc', v)} placeholder="LOGO.png" />
        <TextAreaField label="Tagline" value={draft.heroInfo.tagline} onChange={(v) => updateDraft('heroInfo.tagline', v)} />
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-sans text-white/70 uppercase tracking-widest font-medium">Slider Images</h4>
        <button onClick={() => addItem('heroSlides', { image: '', alt: 'New Slide' })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {draft.heroSlides.map((slide, i) => (
          <CollapsibleCard key={i} title={slide.alt || `Slide ${i + 1}`} index={i} onDelete={() => removeItem('heroSlides', i)}>
            <div className="flex gap-4 items-start">
              {slide.image && <ImagePreview src={slide.image} alt={slide.alt} />}
              <div className="flex-grow space-y-3">
                <FileField label="Image" value={slide.image} onChange={(v) => updateDraft(`heroSlides.${i}.image`, v)} placeholder="https://..." />
                <InputField label="Alt Text" value={slide.alt} onChange={(v) => updateDraft(`heroSlides.${i}.alt`, v)} placeholder="Description" />
              </div>
            </div>
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderFirm = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Firm Profile</h3>
        <p className="text-sm font-sans text-white/50 font-light">Edit the architect info, description, and philosophy pillars.</p>
      </div>

      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="flex gap-4 items-start">
          {draft.firmInfo.architectImage && <ImagePreview src={draft.firmInfo.architectImage} />}
          <div className="flex-grow">
            <FileField label="Architect Image" value={draft.firmInfo.architectImage} onChange={(v) => updateDraft('firmInfo.architectImage', v)} />
          </div>
        </div>
        <InputField label="Architect Name" value={draft.firmInfo.architectName} onChange={(v) => updateDraft('firmInfo.architectName', v)} />
        <InputField label="Title" value={draft.firmInfo.architectTitle} onChange={(v) => updateDraft('firmInfo.architectTitle', v)} />
        <TextAreaField label="Description" value={draft.firmInfo.description} onChange={(v) => updateDraft('firmInfo.description', v)} rows={5} />
        <InputField label="Quote" value={draft.firmInfo.quote} onChange={(v) => updateDraft('firmInfo.quote', v)} />
      </div>

      <h4 className="text-sm font-sans text-white/70 uppercase tracking-widest font-medium">Philosophy Pillars</h4>
      <div className="space-y-3">
        {draft.firmInfo.pillars.map((pillar, i) => (
          <CollapsibleCard key={i} title={pillar.title || `Pillar ${i + 1}`} index={i}>
            <InputField label="Title" value={pillar.title} onChange={(v) => updateDraft(`firmInfo.pillars.${i}.title`, v)} />
            <TextAreaField label="Description" value={pillar.description} onChange={(v) => updateDraft(`firmInfo.pillars.${i}.description`, v)} />
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Projects</h3>
        <p className="text-sm font-sans text-white/50 font-light">Manage your portfolio of projects. Add, edit, or remove entries.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-sans text-white/50">{draft.projects.length} projects</span>
        <button onClick={() => addItem('projects', { title: 'New Project', location: '', category: 'Residential', subCategory: 'High-End Residential', image: '', video: '' })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {draft.projects.map((project, i) => (
          <CollapsibleCard key={i} title={`${project.title} — ${project.location}`} index={i} onDelete={() => removeItem('projects', i)}>
            <div className="flex gap-4 items-start">
              {project.image && <ImagePreview src={project.image} alt={project.title} />}
              <div className="flex-grow space-y-3">
                <InputField label="Title" value={project.title} onChange={(v) => updateDraft(`projects.${i}.title`, v)} />
                <InputField label="Location" value={project.location} onChange={(v) => updateDraft(`projects.${i}.location`, v)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <InputField label="Category" value={project.category} onChange={(v) => updateDraft(`projects.${i}.category`, v)} />
              <InputField label="Sub-Category" value={project.subCategory} onChange={(v) => updateDraft(`projects.${i}.subCategory`, v)} />
            </div>
            <FileField label="Project Image" value={project.image} onChange={(v) => updateDraft(`projects.${i}.image`, v)} />
            <InputField label="Video URL" value={project.video} onChange={(v) => updateDraft(`projects.${i}.video`, v)} />
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderElements = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Signature Elements</h3>
        <p className="text-sm font-sans text-white/50 font-light">Edit the design articulation cards and their gallery images.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-sans text-white/50">{draft.signatureElements.length} elements</span>
        <button onClick={() => addItem('signatureElements', { title: 'New Element', subtitle: '', desc: '', image: '', gallery: ['', '', ''] })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Element
        </button>
      </div>

      <div className="space-y-3">
        {draft.signatureElements.map((el, i) => (
          <CollapsibleCard key={i} title={el.title} index={i} onDelete={() => removeItem('signatureElements', i)}>
            <InputField label="Title" value={el.title} onChange={(v) => updateDraft(`signatureElements.${i}.title`, v)} />
            <InputField label="Subtitle" value={el.subtitle} onChange={(v) => updateDraft(`signatureElements.${i}.subtitle`, v)} />
            <TextAreaField label="Description" value={el.desc} onChange={(v) => updateDraft(`signatureElements.${i}.desc`, v)} />
            <FileField label="Main Image" value={el.image} onChange={(v) => updateDraft(`signatureElements.${i}.image`, v)} />
            <div className="space-y-2 mt-2">
              <label className="text-[11px] font-sans uppercase tracking-[0.15em] text-white/50 font-medium block">Gallery Images</label>
              {el.gallery.map((img, gi) => (
                <div key={gi} className="flex gap-2 items-center">
                  <FileField
                    label={`Gallery Image ${gi + 1}`}
                    value={img}
                    onChange={(v) => updateDraft(`signatureElements.${i}.gallery.${gi}`, v)}
                    placeholder={`Gallery image ${gi + 1}`}
                  />
                </div>
              ))}
            </div>
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderPartners = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Collaborations</h3>
        <p className="text-sm font-sans text-white/50 font-light">Manage partner quotes, logos, and information.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-sans text-white/50">{draft.partners.length} partners</span>
        <button onClick={() => addItem('partners', { logo: '', quote: '', name: '', role: '', firm: '' })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Partner
        </button>
      </div>

      <div className="space-y-3">
        {draft.partners.map((partner, i) => (
          <CollapsibleCard key={i} title={partner.name || `Partner ${i + 1}`} index={i} onDelete={() => removeItem('partners', i)}>
            <InputField label="Name" value={partner.name} onChange={(v) => updateDraft(`partners.${i}.name`, v)} />
            <InputField label="Role" value={partner.role} onChange={(v) => updateDraft(`partners.${i}.role`, v)} />
            <InputField label="Firm" value={partner.firm} onChange={(v) => updateDraft(`partners.${i}.firm`, v)} />
            <FileField label="Logo" value={partner.logo} onChange={(v) => updateDraft(`partners.${i}.logo`, v)} />
            <TextAreaField label="Quote" value={partner.quote} onChange={(v) => updateDraft(`partners.${i}.quote`, v)} />
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Testimonials</h3>
        <p className="text-sm font-sans text-white/50 font-light">Client experiences and reviews.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-sans text-white/50">{draft.testimonials.length} testimonials</span>
        <button onClick={() => addItem('testimonials', { quote: '', author: '', project: '' })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-3">
        {draft.testimonials.map((t, i) => (
          <CollapsibleCard key={i} title={`${t.author} — ${t.project}`} index={i} onDelete={() => removeItem('testimonials', i)}>
            <TextAreaField label="Quote" value={t.quote} onChange={(v) => updateDraft(`testimonials.${i}.quote`, v)} />
            <InputField label="Author" value={t.author} onChange={(v) => updateDraft(`testimonials.${i}.author`, v)} />
            <InputField label="Project" value={t.project} onChange={(v) => updateDraft(`testimonials.${i}.project`, v)} />
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderPublications = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Publications</h3>
        <p className="text-sm font-sans text-white/50 font-light">Articles, awards, competitions, and press.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-sans text-white/50">{draft.publications.length} publications</span>
        <button onClick={() => addItem('publications', { id: String(Date.now()), title: 'New Publication', category: 'ARTICLES', date: '', description: '', image: '', content: '' })} className="flex items-center gap-2 text-xs font-sans text-brand-red hover:text-white bg-brand-red/10 hover:bg-brand-red/20 px-3 py-2 rounded-lg transition-all">
          <Plus size={14} /> Add Publication
        </button>
      </div>

      <div className="space-y-3">
        {draft.publications.map((pub, i) => (
          <CollapsibleCard key={i} title={pub.title} index={i} onDelete={() => removeItem('publications', i)}>
            <InputField label="Title" value={pub.title} onChange={(v) => updateDraft(`publications.${i}.title`, v)} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Category" value={pub.category} onChange={(v) => updateDraft(`publications.${i}.category`, v)} placeholder="ARTICLES / AWARDS / PRESS" />
              <InputField label="Date" value={pub.date} onChange={(v) => updateDraft(`publications.${i}.date`, v)} placeholder="October 2025" />
            </div>
            <TextAreaField label="Description" value={pub.description} onChange={(v) => updateDraft(`publications.${i}.description`, v)} />
            <FileField label="Feature Image" value={pub.image} onChange={(v) => updateDraft(`publications.${i}.image`, v)} />
            <TextAreaField label="Full Content" value={pub.content || ''} onChange={(v) => updateDraft(`publications.${i}.content`, v)} rows={5} />
          </CollapsibleCard>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Contact Information</h3>
        <p className="text-sm font-sans text-white/50 font-light">Update studio address, phone numbers, and email.</p>
      </div>

      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
        <TextAreaField label="Studio Address" value={draft.contactInfo.address} onChange={(v) => updateDraft('contactInfo.address', v)} rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Mobile" value={draft.contactInfo.mobile} onChange={(v) => updateDraft('contactInfo.mobile', v)} />
          <InputField label="Telephone" value={draft.contactInfo.telephone} onChange={(v) => updateDraft('contactInfo.telephone', v)} />
        </div>
        <InputField label="Email" value={draft.contactInfo.email} onChange={(v) => updateDraft('contactInfo.email', v)} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Job Application Email" value={draft.contactInfo.jobEmail} onChange={(v) => updateDraft('contactInfo.jobEmail', v)} />
          <InputField label="Internship Email" value={draft.contactInfo.internshipEmail} onChange={(v) => updateDraft('contactInfo.internshipEmail', v)} />
        </div>
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-8">
      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-serif text-white">Social Links</h3>
        <p className="text-sm font-sans text-white/50 font-light">Update your social media URLs.</p>
      </div>

      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
        <InputField label="Instagram" value={draft.socialLinks.instagram} onChange={(v) => updateDraft('socialLinks.instagram', v)} />
        <InputField label="LinkedIn" value={draft.socialLinks.linkedin} onChange={(v) => updateDraft('socialLinks.linkedin', v)} />
        <InputField label="YouTube" value={draft.socialLinks.youtube} onChange={(v) => updateDraft('socialLinks.youtube', v)} />
        <InputField label="WhatsApp" value={draft.socialLinks.whatsapp} onChange={(v) => updateDraft('socialLinks.whatsapp', v)} />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero': return renderHero();
      case 'firm': return renderFirm();
      case 'projects': return renderProjects();
      case 'elements': return renderElements();
      case 'partners': return renderPartners();
      case 'testimonials': return renderTestimonials();
      case 'publications': return renderPublications();
      case 'contact': return renderContact();
      case 'social': return renderSocial();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Loading Overlay */}
      {(isLoading || isSaving) && (
        <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-[2px] flex items-center justify-center animate-fade-in">
          <div className="flex flex-col items-center gap-4 bg-[#141420] border border-white/10 p-8 rounded-2xl shadow-2xl">
            <Loader2 size={32} className="text-brand-red animate-spin" />
            <p className="text-sm font-sans font-medium text-white/70">
              {isSaving ? 'Saving to Supabase...' : 'Loading site data...'}
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141420] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <h3 className="text-lg font-serif text-white">Reset All Content?</h3>
            </div>
            <p className="text-sm font-sans text-white/60 font-light mb-6 leading-relaxed">
              This will permanently revert all content to the original defaults. All your custom edits will be lost. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowResetConfirm(false)} className="px-5 py-2 text-sm font-sans text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all">Cancel</button>
              <button onClick={handleReset} className="px-5 py-2 text-sm font-sans text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all font-medium">Reset Everything</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full z-30 bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-white/60 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                <img src={siteData.heroInfo.logoSrc} alt="S" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-sm font-serif text-white leading-none">SJAA Admin</h1>
                <span className="text-[10px] font-sans text-white/40 uppercase tracking-wider">Content Manager</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={logout} className="flex items-center gap-2 text-xs font-sans text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all" title="Logout">
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button onClick={onBack} className="flex items-center gap-2 text-xs font-sans text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all">
              <Eye size={14} />
              <span className="hidden sm:inline">View Site</span>
            </button>
            <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-2 text-xs font-sans text-white/60 hover:text-red-400 bg-white/5 hover:bg-red-400/10 px-3 py-2 rounded-lg transition-all">
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`flex items-center gap-2 text-sm font-sans font-semibold px-6 py-2.5 rounded-xl transition-all ${
                hasChanges 
                  ? 'text-white bg-brand-red hover:bg-brand-red/80 shadow-[0_0_20px_rgba(227,24,55,0.4)]' 
                  : 'text-white/30 bg-white/5 border border-white/5 cursor-not-allowed'
              } ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? 'Saving...' : (hasChanges ? 'Apply All Changes' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0E0E15] border-r border-white/5 overflow-y-auto z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-4 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === tab.key 
                    ? 'bg-brand-red/10 text-brand-red border border-brand-red/20' 
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={activeTab === tab.key ? 'text-brand-red' : 'text-white/40 group-hover:text-white/60'}>{tab.icon}</span>
                <span className="text-sm font-sans font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Unsaved changes indicator */}
          {hasChanges && (
            <div className="mx-4 mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-[11px] font-sans text-amber-400/80 leading-relaxed">
                You have unsaved changes. Click <strong className="text-amber-400">Save Changes</strong> to apply.
              </p>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow min-h-[calc(100vh-4rem)] lg:ml-0 p-6 lg:p-10 max-w-4xl">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
