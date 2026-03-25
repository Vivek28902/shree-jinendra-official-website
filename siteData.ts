// ============================================================
// SITE DATA — Single source of truth for all editable content
// ============================================================

export interface HeroSlide {
  image: string;
  alt: string;
}

export interface Project {
  title: string;
  location: string;
  category: string;
  subCategory: string;
  image: string;
  video: string;
}

export interface SignatureElement {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  gallery: string[];
}

export interface Partner {
  logo: string;
  quote: string;
  name: string;
  role: string;
  firm: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  project: string;
}

export interface Publication {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  content?: string;
}

export interface ContactInfo {
  address: string;
  mobile: string;
  telephone: string;
  email: string;
  jobEmail: string;
  internshipEmail: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
}

export interface FirmInfo {
  architectName: string;
  architectTitle: string;
  architectImage: string;
  description: string;
  quote: string;
  pillars: {
    title: string;
    description: string;
  }[];
}

export interface HeroInfo {
  logoSrc: string;
  tagline: string;
}

export interface SiteData {
  heroInfo: HeroInfo;
  heroSlides: HeroSlide[];
  firmInfo: FirmInfo;
  projects: Project[];
  signatureElements: SignatureElement[];
  partners: Partner[];
  testimonials: Testimonial[];
  publications: Publication[];
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
}

// --- DEFAULT DATA ---

const SAMPLE_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const defaultSiteData: SiteData = {
  heroInfo: {
    logoSrc: "LOGO.png",
    tagline: "\"Sculpting habitats. Curating the human experience.\""
  },

  heroSlides: [
    { image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2574&auto=format&fit=crop", alt: "Modern Landscape Architecture" },
    { image: "https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669&auto=format&fit=crop", alt: "Luxury Villa Garden" },
    { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop", alt: "Minimalist Courtyard" },
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop", alt: "Resort Landscape" },
    { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop", alt: "Seamless Integration" },
    { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop", alt: "Estate Grounds" }
  ],

  firmInfo: {
    architectName: "Ar. Abhishek Chandaliya",
    architectTitle: "Design Principal & Founder",
    architectImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    description: "Established in 2008 to dissolve the boundaries between the built and the biotic, SJAA approaches every commission with a singular conviction. Under the leadership of Ar. Abhishek Chandaliya, the practice orchestrates environments where rigorous spatial planning meets the fluidity of the natural world, creating habitats that are not merely constructed, but cultivated.",
    quote: "\"Landscape and Architecture are one continuous discipline.\"",
    pillars: [
      { title: "Curated Living", description: "We sculpt spaces that elevate daily rituals. Prioritizing proportion and scale, we curate environments that foster mental well-being and timeless elegance." },
      { title: "Technical Precision", description: "Bridging the void between vision and reality. We orchestrate complex construction systems with absolute rigor, ensuring that design intent translates flawlessly." },
      { title: "Biophilic Fusion", description: "A seamless synthesis of soil, climate, and architecture. We engineer ecosystems that function as living, breathing extensions of the human experience." }
    ]
  },

  projects: [
    { title: 'Rajasthali Resort', location: 'Jaipur', category: 'Hospitality', subCategory: 'Resort', image: './assets/rajasthali-resort.jpg', video: SAMPLE_VIDEO },
    { title: 'Elysian Heaven', location: 'Jaipur', category: 'Residential', subCategory: 'High-End Residential', image: './assets/elysian-heaven.jpg', video: SAMPLE_VIDEO },
    { title: 'Fateh Hills', location: 'Jalore', category: 'Township', subCategory: 'Township', image: './assets/fateh-hills.jpg', video: SAMPLE_VIDEO },
    { title: 'Nowal Naturecure', location: 'Jaipur', category: 'Hospitality', subCategory: 'Wellness Resort', image: './assets/nowal-naturecure.jpg', video: SAMPLE_VIDEO },
    { title: 'Sand Dunes Resort', location: 'Pushkar', category: 'Hospitality', subCategory: 'Resort', image: './assets/sand-dunes-resort.jpg', video: SAMPLE_VIDEO },
    { title: 'Vrindavan Township', location: 'Jaipur', category: 'Township', subCategory: 'Township', image: './assets/vrindavan-township.jpg', video: SAMPLE_VIDEO },
    { title: 'CLC Campus', location: 'Sikar', category: 'Institutional', subCategory: 'Educational', image: './assets/clc-campus.jpg', video: SAMPLE_VIDEO },
    { title: "Archi's Castle", location: 'Ajmer', category: 'Hospitality', subCategory: 'Resort', image: './assets/archis-castle.jpg', video: SAMPLE_VIDEO },
    { title: 'Opulent Nest', location: 'Jaipur', category: 'Residential', subCategory: 'High-End Residential', image: './assets/opulent-nest.jpg', video: SAMPLE_VIDEO },
    { title: 'The Crown', location: 'Jaipur', category: 'Residential', subCategory: 'Group Housing', image: './assets/the-crown.jpg', video: SAMPLE_VIDEO },
    { title: 'The Crest', location: 'Jaipur', category: 'Residential', subCategory: 'Group Housing', image: './assets/the-crest.jpg', video: SAMPLE_VIDEO },
    { title: 'Classic Oasis', location: 'Jaipur', category: 'Residential', subCategory: 'Farm House', image: './assets/classic-oasis.jpg', video: SAMPLE_VIDEO },
    { title: 'Cultural Elegance', location: 'Bikaner', category: 'Residential', subCategory: 'Farm House', image: './assets/cultural-elegance.jpg', video: SAMPLE_VIDEO },
    { title: 'Classical Grandeur', location: 'Jaipur', category: 'Residential', subCategory: 'High-End Residential', image: './assets/classical-grandeur.jpg', video: SAMPLE_VIDEO },
    { title: 'Blossom Ridge', location: 'Jaipur', category: 'Residential', subCategory: 'Out House', image: './assets/blossom-ridge.jpg', video: SAMPLE_VIDEO },
    { title: 'Regalia Oasis', location: 'Jaipur', category: 'Residential', subCategory: 'Out House', image: './assets/regalia-oasis.jpg', video: SAMPLE_VIDEO },
    { title: 'Imperial Garden', location: 'Jaipur', category: 'Residential', subCategory: 'Group Housing', image: './assets/imperial-garden.jpg', video: SAMPLE_VIDEO },
    { title: 'Navkar City', location: 'Jodhpur', category: 'Township', subCategory: 'Township', image: './assets/navkar-city.jpg', video: SAMPLE_VIDEO },
    { title: 'Samurai Valley', location: 'Jaipur', category: 'Township', subCategory: 'Township', image: './assets/samurai-valley.jpg', video: SAMPLE_VIDEO },
    { title: 'Shitla Township', location: 'Jaipur', category: 'Township', subCategory: 'Township', image: './assets/shitla-township.jpg', video: SAMPLE_VIDEO },
    { title: 'Navkar Nilay', location: 'Bhilwara', category: 'Residential', subCategory: 'Group Housing', image: './assets/navkar-nilay.jpg', video: SAMPLE_VIDEO },
    { title: 'Dev Vidhyalya', location: 'Sikar', category: 'Institutional', subCategory: 'Educational', image: './assets/dev-vidhyalya.jpg', video: SAMPLE_VIDEO },
    { title: 'Onir Ceramics', location: 'Jaipur', category: 'Commercial', subCategory: 'Commercial', image: './assets/onir-ceramics.jpg', video: SAMPLE_VIDEO },
    { title: 'Laxmi Poddar Seva', location: 'Salasar', category: 'Commercial', subCategory: 'Community', image: './assets/laxmi-poddar-seva.jpg', video: SAMPLE_VIDEO },
    { title: 'Skyline Veranda', location: 'Jaipur', category: 'Residential', subCategory: 'Terrace Garden', image: 'https://images.unsplash.com/photo-1598337586548-26168537574b?q=80&w=800&auto=format&fit=crop', video: SAMPLE_VIDEO }
  ],

  signatureElements: [
    { title: "Vertical Ecosystems", subtitle: "The Living Skin", desc: "Breathing green planes that soften the built form and purify the air.", image: "./assets/vertical-ecosystems.jpg", gallery: ["./assets/vertical-ecosystems-1.jpg", "./assets/vertical-ecosystems-2.jpg", "./assets/vertical-ecosystems-3.jpg"] },
    { title: "Spatial Artifacts", subtitle: "The Visual Anchor", desc: "Curated forms that punctuate space, holding the gaze in moments of stillness.", image: "./assets/spatial-artifacts.jpg", gallery: ["./assets/spatial-artifacts-1.jpg", "./assets/spatial-artifacts-2.jpg", "./assets/spatial-artifacts-3.jpg"] },
    { title: "Aquatic Voids", subtitle: "The Still Reflection", desc: "Expanses of water mirroring the sky, merging luxury with deep tranquility.", image: "./assets/aquatic-voids.jpg", gallery: ["./assets/aquatic-voids-1.jpg", "./assets/aquatic-voids-2.jpg", "./assets/aquatic-voids-3.jpg"] },
    { title: "Native Softscape", subtitle: "The Breath", desc: "A curated palette of indigenous flora ensuring seasonal rhythm and biodiversity.", image: "./assets/native-softscape.jpg", gallery: ["./assets/native-softscape-1.jpg", "./assets/native-softscape-2.jpg", "./assets/native-softscape-3.jpg"] },
    { title: "Privacy Veils", subtitle: "The Light Filter", desc: "Intricate screens offering seclusion while sculpting light into geometric poetry.", image: "./assets/privacy-veils.jpg", gallery: ["./assets/privacy-veils-1.jpg", "./assets/privacy-veils-2.jpg", "./assets/privacy-veils-3.jpg"] },
    { title: "Shadow Frames", subtitle: "The Geometric Interplay", desc: "Structural lattices that invite nature to climb, casting dancing shadows below.", image: "./assets/shadow-frames.jpg", gallery: ["./assets/shadow-frames-1.jpg", "./assets/shadow-frames-2.jpg", "./assets/shadow-frames-3.jpg"] },
    { title: "Aquatic Elements", subtitle: "The Reflection", desc: "Fluid surfaces mirroring the sky, grounding the built form in a state of calm.", image: "./assets/aquatic-elements.jpg", gallery: ["./assets/aquatic-elements-1.jpg", "./assets/aquatic-elements-2.jpg", "./assets/aquatic-elements-3.jpg"] },
    { title: "Material Textures", subtitle: "The Tactility", desc: "Raw, tactile surfaces that age gracefully, inviting touch and grounding the sensory experience.", image: "./assets/material-textures.jpg", gallery: ["./assets/material-textures-1.jpg", "./assets/material-textures-2.jpg", "./assets/material-textures-3.jpg"] },
    { title: "Pavilions", subtitle: "The Sanctuary", desc: "Floating shelters that frame the horizon, dissolving boundaries between protection and the open landscape.", image: "./assets/pavilions.jpg", gallery: ["./assets/pavilions-1.jpg", "./assets/pavilions-2.jpg", "./assets/pavilions-3.jpg"] },
    { title: "Canopies", subtitle: "The Light Play", desc: "Overhead planes filtering sunlight into ephemeral patterns, creating a dynamic dance of shadow.", image: "./assets/canopies.jpg", gallery: ["./assets/canopies-1.jpg", "./assets/canopies-2.jpg", "./assets/canopies-3.jpg"] }
  ],

  partners: [
    { logo: "https://picsum.photos/seed/partner1/200/100", quote: "For our high-end villas, detailing is everything. SJAA's hardscape and water body details are flawless and execution-friendly.", name: "Ar. Rajkumar Kumawat", role: "Principal Architect", firm: "Rajkumar Architects" },
    { logo: "https://picsum.photos/seed/partner2/200/100", quote: "Designing a township requires a macro vision. SJAA delivered a master plan that perfectly balanced green cover with infrastructure.", name: "Dr. Shashikant Sharma", role: "Director", firm: "Genesis Design Studio" },
    { logo: "https://picsum.photos/seed/partner3/200/100", quote: "SJAA's understanding of contours and native planting turned our resort concept into a thriving ecosystem. A true technical partner.", name: "Ar. Sheetal Agarwal", role: "Principal Architect", firm: "Insight Studios" },
    { logo: "https://picsum.photos/seed/partner4/200/100", quote: "Their approach to urban integration is unparalleled. They don't just design landscapes; they curate experiences that elevate the entire development.", name: "Vikram Singh", role: "Managing Director", firm: "Apex Developers" },
    { logo: "https://picsum.photos/seed/partner5/200/100", quote: "We rely on SJAA for their rigorous technical expertise. Their sustainable water management strategies have been a game-changer for our projects.", name: "Priya Desai", role: "Lead Urban Planner", firm: "EcoCity Planners" }
  ],

  testimonials: [
    { quote: "SJAA transformed our resort vision into a breathing ecosystem. Their understanding of Aesthetics, Design and Detailing is unmatched.", author: "Director", project: "Nowal Naturecure" },
    { quote: "A team that balances luxury with sustainability perfectly. The detailing on our township project was flawless.", author: "Developer", project: "Fateh Hills" },
    { quote: "Professional, creative, and deeply technical. The best landscape partners we have worked with.", author: "Owner", project: "Glass Haven" },
    { quote: "Their master planning capabilities are exceptional. They seamlessly integrated our commercial requirements with ecological sensitivity.", author: "CEO", project: "Horizon Tech Park" },
    { quote: "From concept to execution, SJAA demonstrated an unwavering commitment to quality. The final result exceeded our expectations.", author: "Managing Partner", project: "The Oasis Villas" }
  ],

  publications: [
    { id: '1', title: 'The Modern Courtyard: A Paradigm Shift', category: 'ARTICLES', date: 'October 2025', description: 'An in-depth exploration of how traditional courtyard spaces are being reimagined for contemporary urban living.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop', content: 'The courtyard has long been a staple of traditional architecture...' },
    { id: '2', title: 'Excellence in Sustainable Design', category: 'AWARDS', date: 'August 2025', description: 'Recognized by the Global Architecture Council for our innovative approach to passive cooling systems.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop', content: 'We are honored to receive the Excellence in Sustainable Design award...' },
    { id: '3', title: 'National Museum Extension', category: 'COMPETITIONS', date: 'May 2025', description: 'First prize winning entry for the proposed extension of the National Arts Museum, focusing on seamless integration.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop', content: 'Our firm has been awarded first prize in the international competition...' },
    { id: '4', title: 'SJAA Featured in Architectural Digest', category: 'PRESS', date: 'March 2025', description: 'Our recent coastal villa project was featured as the cover story in the spring edition of Architectural Digest.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop', content: 'We are thrilled to announce that our Coastal Villa project has been featured...' },
    { id: '5', title: 'Rethinking Urban Density', category: 'ARTICLES', date: 'January 2025', description: 'A comprehensive study on vertical living and the integration of green spaces in high-density environments.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2574&auto=format&fit=crop', content: 'As cities continue to grow, the challenge of urban density becomes increasingly pressing...' },
    { id: '6', title: 'Best Residential Project 2024', category: 'AWARDS', date: 'November 2024', description: 'Awarded the prestigious Golden Arch for the design of the Serenity Estate, blending luxury with nature.', image: 'https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669&auto=format&fit=crop', content: 'We are proud to announce that the Serenity Estate has been awarded the Best Residential Project...' },
    { id: '7', title: 'The Future of Workspaces', category: 'ARTICLES', date: 'September 2024', description: 'How post-pandemic office designs are prioritizing employee well-being and collaborative environments.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop', content: 'The pandemic has fundamentally changed how we view the workspace...' },
    { id: '8', title: 'Urban Integration Award', category: 'AWARDS', date: 'July 2024', description: 'Honored for our seamless integration of the Metro Hub into the existing historical urban fabric.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop', content: 'Our firm has been honored with the Urban Integration Award...' }
  ],

  contactInfo: {
    address: "C-86C, Nandkishore Pareek Marg,\nnear Kanoria College, Bapu Nagar,\nJaipur (Rajasthan) 302015",
    mobile: "+91 93146 22669",
    telephone: "+91 141 3173720",
    email: "sjaa@shreejinendra.com",
    jobEmail: "info@shreejinendra.com",
    internshipEmail: "info@shreejinendra.com"
  },

  socialLinks: {
    instagram: "https://www.instagram.com/shreejinendra/?hl=en",
    linkedin: "https://www.linkedin.com/company/shreejinendra",
    youtube: "#",
    whatsapp: "https://wa.me/919314622669"
  }
};
