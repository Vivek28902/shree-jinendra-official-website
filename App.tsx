import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FirmSection from './components/FirmSection';
import ProjectsSection from './components/ProjectsSection';
import SignatureElementsSection from './components/SignatureElementsSection';
import CollaborationsSection from './components/CollaborationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PublicationsSection, { Publication } from './components/PublicationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import PublicationDetail from './components/PublicationDetail';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { useSiteData } from './AdminContext';

const App: React.FC = () => {
  const { isAdmin } = useSiteData();
  // Search State
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const matchesRef = useRef<HTMLElement[]>([]);
  const toastRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Project Detail State
  const [activeProject, setActiveProject] = useState<any | null>(null);
  
  // Publication Detail State
  const [activePublication, setActivePublication] = useState<Publication | null>(null);

  // Admin Panel State
  const [showAdmin, setShowAdmin] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    if (showAdmin) {
      setShowAdmin(false);
    }
    if (activeProject || activePublication) {
      setActiveProject(null);
      setActivePublication(null);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Helper: Escape Regex characters
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Helper: Unwrap existing highlights
  const clearHighlights = () => {
    const highlights = document.querySelectorAll('.app-highlight');
    highlights.forEach(span => {
        const parent = span.parentNode;
        if (parent) {
             parent.replaceChild(document.createTextNode(span.textContent || ''), span);
             parent.normalize(); 
        }
    });
    matchesRef.current = [];
    setTotalMatches(0);
    setCurrentMatchIndex(0);
  };

  // Show Toast
  const showToast = (message: string) => {
    if (toastRef.current) {
      toastRef.current.textContent = message;
      toastRef.current.classList.add('show');
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = window.setTimeout(() => {
        if (toastRef.current) toastRef.current.classList.remove('show');
      }, 3000);
    }
  };

  // Highlight the current match
  const highlightCurrentMatch = (index: number) => {
    matchesRef.current.forEach(el => el.classList.remove('active-match'));
    
    if (matchesRef.current.length > 0 && matchesRef.current[index]) {
      const current = matchesRef.current[index];
      current.classList.add('active-match');
      
      const headerOffset = 120;
      const elementPosition = current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Search Logic
  const performSearch = (term: string) => {
    clearHighlights();
    
    if (!term || term.trim() === '') return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
          if (
            node.parentElement && 
            (node.parentElement.tagName === 'SCRIPT' || 
             node.parentElement.tagName === 'STYLE' || 
             node.parentElement.closest('header'))
          ) {
              return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodesToProcess: Node[] = [];
    while(walker.nextNode()) {
        nodesToProcess.push(walker.currentNode);
    }

    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    const newMatches: HTMLElement[] = [];

    nodesToProcess.forEach(node => {
      const text = node.nodeValue || '';
      if (regex.test(text)) {
         const fragment = document.createDocumentFragment();
         let lastIdx = 0;
         
         text.replace(regex, (match, p1, offset) => {
             if (offset > lastIdx) {
                fragment.appendChild(document.createTextNode(text.slice(lastIdx, offset)));
             }
             
             const span = document.createElement('span');
             span.className = 'app-highlight';
             span.textContent = match;
             fragment.appendChild(span);
             newMatches.push(span);
             
             lastIdx = offset + match.length;
             return match;
         });
         
         if (lastIdx < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIdx)));
         }
         
         if (node.parentNode) {
            node.parentNode.replaceChild(fragment, node);
         }
      }
    });

    matchesRef.current = newMatches;
    setTotalMatches(newMatches.length);

    if (newMatches.length > 0) {
      setCurrentMatchIndex(1);
      highlightCurrentMatch(0);
    } else {
      showToast("No matches found.");
    }
  };

  const handleNext = () => {
    if (matchesRef.current.length === 0) return;
    const nextIndex = (currentMatchIndex % matchesRef.current.length);
    setCurrentMatchIndex(nextIndex + 1);
    highlightCurrentMatch(nextIndex);
  };

  const handlePrev = () => {
    if (matchesRef.current.length === 0) return;
    let prevIndex = (currentMatchIndex - 2 + matchesRef.current.length) % matchesRef.current.length;
    setCurrentMatchIndex(prevIndex + 1);
    highlightCurrentMatch(prevIndex);
  };

  const handleClear = () => {
    clearHighlights();
  };

  const handleAdminToggle = () => {
    setShowAdmin(!showAdmin);
    if (!showAdmin) {
      setActiveProject(null);
      setActivePublication(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header 
        onNavigate={scrollToSection} 
        onSearch={performSearch}
        onNext={handleNext}
        onPrev={handlePrev}
        onClear={handleClear}
        currentMatch={currentMatchIndex}
        totalMatches={totalMatches}
        onAdminToggle={handleAdminToggle}
        isAdminView={showAdmin}
      />
      
      {/* Toast Notification Element */}
      <div id="search-toast" ref={toastRef}>No matches found on page.</div>

      <main className="flex-grow pt-24">
        {showAdmin ? (
          isAdmin ? (
            <AdminPanel onBack={() => setShowAdmin(false)} />
          ) : (
            <AdminLogin />
          )
        ) : activeProject ? (
          <ProjectDetail 
            project={activeProject} 
            onBack={() => setActiveProject(null)} 
          />
        ) : activePublication ? (
          <PublicationDetail 
            publication={activePublication}
            onBack={() => setActivePublication(null)}
          />
        ) : (
          <>
            <Hero id="home" />
            <FirmSection id="firm" />
            <ProjectsSection id="projects" onProjectClick={setActiveProject} />
            <SignatureElementsSection id="elements" />
            <CollaborationsSection id="collaborations" />
            <TestimonialsSection id="testimonials" />
            <PublicationsSection id="publications" onPublicationClick={setActivePublication} />
            <ContactSection id="contact" />
          </>
        )}
      </main>
      {!showAdmin && <Footer />}
    </div>
  );
};

export default App;