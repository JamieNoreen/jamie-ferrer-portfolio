/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Home, 
  User, 
  Award, 
  FileCheck, 
  Users, 
  Layers, 
  Mail
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const isHomepage = currentPath === '#/' || currentPath === '' || currentPath === '#';

  const navItems = [
    { label: 'Home', path: '#/', icon: Home },
    { label: 'About', path: '#/about', icon: User },
    { label: 'Awards', path: '#/achievements', icon: Award },
    { label: 'Certs', path: '#/certificates', icon: FileCheck },
    { label: 'Leadership', path: '#/leadership', icon: Users },
    { label: 'Skills', path: '#/tech-stacks', icon: Layers },
    { label: 'Contact', path: '#/contact', icon: Mail },
  ];

  // Helper to determine active status
  const isActive = (path: string) => {
    if (path === '#/#projects-section') {
      return currentPath === '#/' && window.location.hash.includes('projects');
    }
    if (path === '#/') {
      return currentPath === '#/' && !window.location.hash.includes('projects');
    }
    return currentPath === path;
  };

  const handleNavClick = (path: string) => {
    if (path === '#/#projects-section') {
      onNavigate('#/');
      // Scroll to projects card grid
      setTimeout(() => {
        const el = document.getElementById('featured-work-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      onNavigate(path);
    }
  };

  return (
    <aside 
      id="portfolio-sidebar"
      className={`fixed ${isHomepage ? 'top-0 h-screen' : 'top-[52px] h-[calc(100vh-52px)]'} bg-white border-r border-[#E8E8E6] z-40 flex flex-col items-center py-4 select-none transition-all duration-200 w-14 md:w-[72px] overflow-hidden`}
    >
      {/* Navigation middle list */}
      <div className="flex-1 w-full overflow-hidden px-1 space-y-2 pt-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.label}
              id={`nav-item-${item.label.toLowerCase()}`}
              onClick={() => handleNavClick(item.path)}
              className="w-full flex flex-col items-center justify-center py-2 px-1 group relative select-none cursor-pointer outline-none transition-all duration-120"
            >
                {/* Icon Container with active gradient design or gray-beige hover pill background */}
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 relative ${
                  active
                    ? 'text-white shadow-sm shadow-indigo-500/10 bg-major-canvas-gradient' // Active custom color gradient
                    : 'text-gray-500 group-hover:bg-gray-100/80 group-hover:text-gray-900' // Smooth gray outline hover
                }`}
              >
                <IconComponent 
                  size={16} 
                  strokeWidth={active ? 2.5 : 2.0} 
                  className={`shrink-0 transition-transform ${!active && 'group-hover:scale-105'}`} 
                />
              </div>
              
              {/* Text Label on Bottom (Centered, uppercase/lowercase, extremely tiny, spaced, elegant) */}
              <span className={`text-[9px] font-sans font-bold tracking-normal text-center select-none truncate max-w-[56px] mt-1.5 leading-none transition-colors duration-120 ${
                active ? 'text-black font-extrabold' : 'text-gray-400 group-hover:text-gray-800'
              }`}>
                {item.label}
              </span>

              {/* Tooltip on hover (always helpful) */}
              <span className="absolute left-[70px] bg-gray-950 text-white text-[9px] font-semibold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-55 shadow-lg max-w-[120px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Year indicators */}
      <div className="pt-2 border-t border-gray-100 flex flex-col justify-center text-center items-center shrink-0 w-full px-1">
        <p className="font-mono text-[9px] text-gray-300 font-black leading-none py-1">
          '26
        </p>
      </div>
    </aside>
  );
}
