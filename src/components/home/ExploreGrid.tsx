/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  User, 
  FolderKanban, 
  Award, 
  FileCheck, 
  Users, 
  Layers, 
  Mail,
  Sparkles
} from 'lucide-react';

interface ExploreGridProps {
  onNavigate: (path: string) => void;
}

export default function ExploreGrid({ onNavigate }: ExploreGridProps) {
  // Canva Style Colors for each circle with subtle gradients
  const items = [
    { label: 'About', path: '/about', icon: User, gradient: 'linear-gradient(135deg, #FF7A45, #FF5F6D)' },
    { label: 'Achievements', path: '/achievements', icon: Award, gradient: 'linear-gradient(135deg, #FFB300, #FF9800)' },
    { label: 'Certificates', path: '/certificates', icon: FileCheck, gradient: 'linear-gradient(135deg, #3DDC84, #2ECC71)' },
    { label: 'Leadership', path: '/leadership', icon: Users, gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' },
    { label: 'Tech Stacks', path: '/tech-stacks', icon: Layers, gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
    { label: 'Contact', path: '/contact', icon: Mail, gradient: 'linear-gradient(135deg, #FB7185, #F43F5E)' },
  ];

  const handleCardClick = (path: string) => {
    if (path === '/#projects-section') {
      const el = document.getElementById('featured-work-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        onNavigate('/');
        setTimeout(() => {
          const innerEl = document.getElementById('featured-work-section');
          if (innerEl) {
            innerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      onNavigate(path);
    }
  };

  // Stagger Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  return (
    <section 
      id="explore-grid-section"
      className="py-5 px-4 md:px-6 w-full flex flex-col items-center select-none bg-white"
    >
      {/* 7 Circle Icons Horizontal Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-20px' }}
        className="w-full flex flex-wrap justify-center items-center gap-2.5 md:gap-4.5 pb-2 scrollbar-none max-w-3xl"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={itemVariants}
              onClick={() => handleCardClick(item.path)}
              className="flex flex-col items-center cursor-pointer select-none group min-w-[76px] text-center"
            >
              {/* Canva Style Filled Circle (slightly larger and magic spring hover reactive bounce) */}
              <motion.div
                whileHover={{ y: -6, scale: 1.12, rotate: 4, boxShadow: '0 10px 20px -4px rgba(0,0,0,0.15)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{ background: item.gradient, boxShadow: '0 4px 10px -2px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' }}
                className="w-[58px] h-[58px] rounded-full flex items-center justify-center text-white"
              >
                <IconComponent size={22} strokeWidth={2.5} />
              </motion.div>

              {/* Label Below Circle */}
              <span className="font-sans font-bold text-[11px] text-gray-500 tracking-tight mt-2.5 group-hover:text-black transition-colors">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
