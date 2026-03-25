import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause } from 'lucide-react';

interface ProjectDetailProps {
  project: any;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-brand-grey hover:text-brand-red transition-colors"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform"/>
          <span className="font-sans uppercase tracking-widest text-xs font-medium">Back to Works</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="flex items-center gap-4 mb-6">
               <span className="h-[1px] w-12 bg-brand-red"></span>
               <span className="text-brand-red font-sans uppercase tracking-widest text-xs font-medium">{project.category} &mdash; {project.subCategory}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-tight mb-8">
              {project.title}
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end pb-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-sans uppercase tracking-widest text-[10px] text-brand-grey/70 mb-1">Location</h4>
                <p className="font-sans text-sm text-[#1A1A1A]">{project.location}</p>
              </div>
              <div>
                <h4 className="font-sans uppercase tracking-widest text-[10px] text-brand-grey/70 mb-1">Status</h4>
                <p className="font-sans text-sm text-[#1A1A1A]">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Description */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-3">
            <p className="font-sans text-lg md:text-xl text-brand-grey font-light leading-relaxed">
              {project.title} represents a harmonious integration of built form and natural landscape. 
              The design philosophy centers on creating a seamless transition between interior spaces and the surrounding environment, 
              utilizing local materials and sustainable practices to anchor the project in its context.
            </p>
          </div>
        </div>
      </div>

      {/* Project Film (Full-Width Video Player) */}
      <div className="w-full relative group mb-32 bg-black">
        <div className="relative aspect-video w-full max-h-[85vh] overflow-hidden">
          <video
            ref={videoRef}
            src={project.video || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />
          
          {/* Custom Ultra-Minimalist Controls */}
          <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            
            {/* Center Play/Pause Button (Large) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button 
                onClick={togglePlay}
                className="w-20 h-20 flex items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm hover:bg-white/10 transition-colors pointer-events-auto"
              >
                {isPlaying ? <Pause size={32} strokeWidth={1} /> : <Play size={32} strokeWidth={1} className="ml-2" />}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="w-full px-8 pb-8 flex items-center gap-6">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-brand-red transition-colors"
              >
                {isPlaying ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} />}
              </button>
              
              {/* Thin Progress Line */}
              <div 
                className="flex-grow h-[2px] bg-white/20 cursor-pointer relative group/progress"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear group-hover/progress:bg-brand-red"
                  style={{ width: `${progress}%` }}
                />
                {/* Hover handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content (Gallery/Details) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="aspect-[4/5] bg-brand-grey/5">
            <img src={project.image} alt={`${project.title} Detail 1`} className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[4/5] bg-brand-grey/5 md:mt-24">
            <img src={project.image} alt={`${project.title} Detail 2`} className="w-full h-full object-cover grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
