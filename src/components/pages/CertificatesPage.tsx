/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TemplateType } from '../../types';
import { Award, Shield, FileCheck, Check, Code, Compass, Layout, Cpu, Globe } from 'lucide-react';

interface CertificatesPageProps {
  template: TemplateType;
}

interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  skills: string[];
  prominence: 'most' | 'secondary' | 'standard';
  monogram: string;
}

interface CertTier {
  id: string;
  title: string;
  subtitle: string;
  items: CertificateItem[];
}

export default function CertificatesPage({ template }: CertificatesPageProps) {
  const pageTitle = "Professional Credentials";
  const pageSubtitle = "Technical certifications, AI proficiencies, and digital marketing specializations under active verification";

  // Detailed complete content mapping based on user specifications
  const tiers: CertTier[] = [
    {
      id: "tech-certs",
      title: "TIER 1 — TECHNICAL CERTIFICATIONS",
      subtitle: "Core engineering, design methodology, and corporate networking accreditations",
      items: [
        {
          id: "it-python",
          name: "IT Specialist - Python",
          issuer: "Certiport — A Pearson VUE Business",
          date: "October 2024",
          skills: ["Python Programming Language"],
          prominence: "most",
          monogram: "CP"
        },
        {
          id: "google-ux",
          name: "Google UX Design Foundation",
          issuer: "Google via Coursera",
          date: "2026",
          skills: ["UX Design", "User Research", "Wireframing", "Prototyping"],
          prominence: "most",
          monogram: "G"
        },
        {
          id: "cisco-english",
          name: "CISCO English for IT 1",
          issuer: "CISCO",
          date: "2026",
          skills: ["Technical Communication", "IT English"],
          prominence: "secondary",
          monogram: "CS"
        }
      ]
    },
    {
      id: "ai-certs",
      title: "TIER 2 — AI AND EMERGING TECH",
      subtitle: "Cognitive workflows, deep generative architectures, and regional computational directives",
      items: [
        {
          id: "ai-asean",
          name: "AI Ready ASEAN",
          issuer: "ASEAN Foundation",
          date: "2026",
          skills: ["Artificial Intelligence", "Data Literacy", "Digital Readiness"],
          prominence: "most",
          monogram: "AF"
        }
      ]
    },
    {
      id: "marketing-suite",
      title: "TIER 3 — DIGITAL MARKETING SUITE",
      subtitle: "Consolidated system optimization, search visibility, and organic campaign funnels",
      items: [
        {
          id: "mktg-email",
          name: "Email Marketing",
          issuer: "Digital Marketing Institute",
          date: "July 2023",
          skills: ["A/B Testing", "Email Marketing", "Campaign Management"],
          prominence: "standard",
          monogram: "DM"
        },
        {
          id: "mktg-seo",
          name: "SEO — Search Engine Optimization",
          issuer: "Digital Marketing Institute",
          date: "July 2023",
          skills: ["Search Engine Optimization"],
          prominence: "standard",
          monogram: "DM"
        },
        {
          id: "mktg-sem",
          name: "Search Engine Marketing",
          issuer: "Digital Marketing Institute",
          date: "June 2023",
          skills: ["Search Engine Marketing (SEM)"],
          prominence: "standard",
          monogram: "DM"
        },
        {
          id: "mktg-social",
          name: "Social Media Marketing",
          issuer: "Digital Marketing Institute",
          date: "June 2023",
          skills: ["Social Media Strategy", "Content Marketing"],
          prominence: "standard",
          monogram: "DM"
        }
      ]
    }
  ];

  // Helper verifying alert
  const handleVerifyAlert = (certName: string) => {
    // Elegant warning output showing clean mock output
    console.log(`Verifying ID authority link for "${certName}"`);
  };

  // ==========================================
  // 1. TEMPLATE: MINIMALISM
  // ==========================================
  if (template === 'minimalism') {
    return (
      <div className="max-w-3xl mx-auto pb-12 font-sans text-gray-900 space-y-12">
        {/* Simple Document Style Header */}
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--page-accent)] font-extrabold">VERIFIED COGNIZANCE :: SIGN OFF</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-none">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500 font-sans leading-relaxed tracking-normal max-w-xl mt-1.5 font-medium">
            {pageSubtitle}
          </p>
        </div>

        <div className="border-t border-gray-150 my-6" />

        {/* List of Tiers */}
        <div className="space-y-12">
          {tiers.map((tier) => {
            const isMarketing = tier.id === "marketing-suite";

            return (
              <div key={tier.id} className="space-y-5">
                {/* Thin header separator */}
                <div className="flex items-center justify-between border-b border-gray-150 pb-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase">
                    {tier.title}
                  </span>
                </div>

                {/* Indented Digital Marketing Block vs Row lists */}
                {isMarketing ? (
                  <div className="pl-6 border-l-2 border-gray-100 space-y-4">
                    <div className="text-xs text-gray-500 font-mono tracking-tight font-bold uppercase mb-2">
                      [ Digital Marketing Suite Collection ]
                    </div>
                    <div className="space-y-4">
                      {tier.items.map((cert) => (
                        <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-1">
                          <div>
                            <h4 className="text-sm font-bold text-gray-800">{cert.name}</h4>
                            <p className="text-xs text-gray-400 font-medium font-mono">{cert.issuer} &bull; {cert.date}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tier.items.map((cert) => {
                      const isProminent = cert.prominence === 'most';
                      const isSec = cert.prominence === 'secondary';

                      return (
                        <div 
                          key={cert.id}
                          className="flex items-start gap-4 py-2 hover:bg-gray-50/40 rounded-lg transition-colors duration-150 group"
                        >
                          {/* 40x40px logo slot */}
                          <div className="w-[40px] h-[40px] shrink-0 border border-gray-200 select-none rounded flex items-center justify-center font-mono font-black text-xs text-gray-500 bg-gray-50/50">
                            {cert.monogram}
                          </div>

                          {/* Mid block with variable sizing based on visual hierarchy */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`${isProminent ? 'text-base font-black text-gray-900' : isSec ? 'text-sm font-extrabold text-gray-800' : 'text-xs font-bold text-gray-700'} tracking-tight`}>
                              {cert.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                              <span className="text-[11px] font-mono text-gray-500 font-medium">{cert.issuer}</span>
                              <span className="text-[10px] text-gray-300 font-mono font-bold">/</span>
                              <span className="text-[11px] font-mono text-gray-400 font-semibold">{cert.date}</span>
                            </div>
                          </div>

                          {/* Pill Tag skills */}
                          <div className="hidden md:flex flex-wrap justify-end gap-1 shrink-0 max-w-xs">
                            {cert.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-0.5 rounded bg-white">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. TEMPLATE: CREATIVE / EDITORIAL
  // ==========================================
  if (template === 'editorial') {
    const techCerts = tiers.find(t => t.id === 'tech-certs')?.items || [];
    const aiCerts = tiers.find(t => t.id === 'ai-certs')?.items || [];
    const mktgSuite = tiers.find(t => t.id === 'marketing-suite')?.items || [];

    return (
      <div className="max-w-4xl mx-auto pb-20 font-sans text-gray-950 space-y-16">
        
        {/* Stark Swiss Typographic Header */}
        <div className="text-left pt-6 pb-2 border-b-4 border-gray-950">
          <h1 className="text-4xl md:text-6xl font-sans font-black uppercase text-gray-950 tracking-tighter leading-none">
            {pageTitle}
          </h1>
          <p className="text-sm font-sans font-bold uppercase tracking-wider text-gray-600 mt-3">
            {pageSubtitle}
          </p>
        </div>

        {/* 1. TECHNICAL (Stark posters with sharp borders and tracked labels) */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Technical & UX Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {techCerts.map((cert, idx) => {
              return (
                <div 
                  key={cert.id}
                  className="border-4 border-gray-950 p-6 bg-white rounded-none relative flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-5">
                      <span className="text-[10px] font-mono font-black text-white bg-gray-950 px-2.5 py-1 uppercase tracking-widest leading-none rounded-none">
                        {cert.monogram}
                      </span>
                    </div>

                    <h3 className="font-sans font-black text-2xl md:text-3xl text-gray-950 uppercase tracking-tighter leading-none mb-5">
                      {cert.name}
                    </h3>

                    <div className="space-y-1 font-mono text-[10px] text-gray-700 uppercase tracking-wider border-t-2 border-gray-950 pt-3">
                      <p className="font-black text-gray-950">ISSUER: {cert.issuer}</p>
                      <p>DATE: {cert.date}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[9px] font-mono font-black uppercase tracking-wider bg-white border-2 border-gray-950 text-gray-950 px-2 py-0.5 rounded-none select-none">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. AI & EMERGING TECH (Full-width Swiss Poster block) */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Artificial Intelligence & Core Autonomy
            </h2>
          </div>

          <div className="grid grid-cols-1 pt-4">
            {aiCerts.map((cert) => (
              <div 
                key={cert.id}
                className="border-4 border-gray-950 p-6 md:p-8 rounded-none bg-white relative flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
              >
                <div className="absolute top-6 right-6 font-mono font-black text-sm text-white bg-gray-950 w-12 h-12 flex items-center justify-center select-none uppercase border-2 border-gray-950 rounded-none">
                  {cert.monogram}
                </div>

                <div>
                  <h3 className="font-sans font-black text-3xl md:text-5xl text-gray-950 uppercase tracking-tighter leading-none mt-6 mb-5">
                    {cert.name}
                  </h3>

                  <div className="space-y-1 font-mono text-[10px] text-gray-700 uppercase tracking-wider border-t-2 border-gray-950 pt-3 max-w-md">
                    <p className="font-black text-gray-950">AUTHORIZED BY: {cert.issuer}</p>
                    <p>DATE: {cert.date}</p>
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-950 my-6" />

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-mono font-black uppercase tracking-wider bg-white border-2 border-gray-950 text-gray-950 px-3 py-1 rounded-none select-none">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. MARKETING SUITE (Stark multi-column grid) */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Digital Marketing Suite Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {mktgSuite.map((cert, idx) => {
              return (
                <div 
                  key={cert.id}
                  className="bg-white border-4 border-gray-950 p-5 rounded-none flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-gray-950 font-black">#0{idx + 1}</span>
                    </div>

                    <h3 className="font-sans font-black text-lg text-gray-950 uppercase tracking-tighter leading-none">
                      {cert.name}
                    </h3>
                    
                    <div className="space-y-1 font-mono text-[9px] text-gray-700 uppercase tracking-wider border-t-2 border-gray-950 pt-2">
                      <p className="font-bold text-gray-950">ISSUER: {cert.issuer}</p>
                      <p>DATE: {cert.date}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-300">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[8px] font-mono font-black bg-white text-gray-900 px-1.5 py-0.5 rounded-none border border-gray-950 uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. TEMPLATE: FUTURISTIC
  // ==========================================
  const techCertsF = tiers.find(t => t.id === 'tech-certs')?.items || [];
  const aiCertsF = tiers.find(t => t.id === 'ai-certs')?.items || [];
  const mktgSuiteF = tiers.find(t => t.id === 'marketing-suite')?.items || [];

  return (
    <div className="max-w-4xl mx-auto pb-16 font-mono text-[#00FF88] space-y-12">
      {/* HUD terminal display header */}
      <div className="space-y-2 pt-4 border-l-2 border-[#00FF88]/40 pl-4 bg-[#00FF88]/2 relative">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase filter drop-shadow-[0_0_8px_var(--page-accent)]">
          {pageTitle}
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
          {pageSubtitle}
        </p>
        <div className="h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-cyan-500 to-transparent relative mt-1" />
      </div>

      {/* Futuristic module rows divided by glowing rules */}
      <div className="space-y-12">

        {/* A. Technical Certifications: Full width panels */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
            <span className="text-[9px] font-black uppercase text-white tracking-widest">Technical & UX Certifications</span>
          </div>

          <div className="space-y-4">
            {techCertsF.map((cert) => (
              <div 
                key={cert.id}
                className="p-5 rounded-xl border border-[var(--page-border)] bg-black/40 text-white shadow-[0_0_15px_rgba(0,255,136,0.03)] relative overflow-hidden flex flex-col md:flex-row gap-6 justify-between items-start md:items-center group hover:border-[var(--page-accent)] transition-all duration-350"
              >

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-black border border-[var(--page-accent)]/40 flex items-center justify-center text-[var(--page-accent)] shrink-0 shadow-[inset_0_0_8px_rgba(0,255,136,0.2)]">
                    <Cpu size={20} className="filter drop-shadow-[0_0_4px_var(--page-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-[var(--page-accent)] uppercase tracking-wide group-hover:text-white transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 capitalize font-mono mt-0.5">{cert.issuer} &bull; {cert.date}</p>
                  </div>
                </div>

                {/* Skills as Glowing border pill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[8.5px] font-mono font-extrabold uppercase bg-cyan-950/20 border border-cyan-500/40 text-cyan-400 px-2 py-0.5 rounded tracking-wide">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. AI Ready ASEAN: Secondary Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
            <span className="text-[9px] font-black uppercase text-white tracking-widest">AI & Emerging Tech</span>
          </div>

          <div className="space-y-4">
            {aiCertsF.map((cert) => (
              <div 
                key={cert.id}
                className="p-5 rounded-xl border border-[var(--page-accent)] bg-black/60 relative overflow-hidden flex flex-col md:flex-row gap-4 justify-between items-start md:items-center shadow-[0_0_15px_rgba(0,255,136,0.1)] group"
              >
                <div className="space-y-1">
                  <h3 className="font-black text-sm text-white uppercase tracking-wider mt-1 group-hover:text-[var(--page-accent)] transition-colors">{cert.name}</h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{cert.issuer} &bull; {cert.date}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[8.5px] font-mono font-extrabold uppercase bg-[#00FF88]/10 border border-[#00FF88]/40 text-[#00FF88] px-2.5 py-0.5 rounded tracking-wide">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C. Digital Marketing Suite: 2x2 Glowing HUD grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5">
            <span className="text-[9px] font-black uppercase text-white tracking-widest">Digital Marketing Suite</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mktgSuiteF.map((cert) => (
              <div 
                key={cert.id}
                className="p-4 rounded-xl border border-[#00FF88]/15 hover:border-[#00FF88]/30 bg-black/20 text-white relative flex flex-col justify-between hover:bg-black/40 transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="font-black text-xs uppercase tracking-wide leading-snug text-white">
                    {cert.name}
                  </h3>
                  
                  <p className="text-[9.5px] text-gray-400 font-bold font-mono leading-normal">{cert.issuer} &bull; {cert.date}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#00FF88]/10 flex flex-wrap gap-1">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[7.5px] font-semibold text-cyan-400 bg-cyan-950/20 px-1.5 py-0.2 rounded border border-cyan-800/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
