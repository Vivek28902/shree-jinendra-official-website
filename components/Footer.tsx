import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-6 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6 text-center">
        <p className="font-sans text-sm text-white/50 font-light tracking-wide">
          &copy; 2008&ndash;2026 Shree Jinendra Architect &amp; Associates. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;