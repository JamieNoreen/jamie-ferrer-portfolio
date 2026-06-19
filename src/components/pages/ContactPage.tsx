/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { TemplateType } from '../../types';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Paintbrush,
  ExternalLink 
} from 'lucide-react';

interface ContactPageProps {
  template: TemplateType;
}

interface ContactItem {
  id: string;
  label: string;
  platform: string;
  value: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string; // Used for editorial & futuristic theme settings
  bgColorLight: string;
}

export default function ContactPage({ template }: ContactPageProps) {
  const pageTitle = "Workspace Communications";
  const pageSubtitle = "Secure pathways to transmit data, request interfaces, or schedule synchronization meetings";

  // Primary Contacts
  const primaryContacts: ContactItem[] = [
    {
      id: "email",
      label: "Primary Email Address",
      platform: "Email",
      value: "placeholder@gmail.com",
      url: "mailto:placeholder@gmail.com",
      icon: Mail,
      accentColor: "#EF4444", // Red/rose accent
      bgColorLight: "bg-red-50/50"
    },
    {
      id: "phone",
      label: "Direct Signal Routing",
      platform: "Phone No.",
      value: "+63 placeholder number",
      url: "tel:+63placeholder",
      icon: Phone,
      accentColor: "#10B981", // Emerald accent
      bgColorLight: "bg-emerald-50/50"
    }
  ];

  // Professional Profiles
  const profileContacts: ContactItem[] = [
    {
      id: "linkedin",
      label: "Professional Identity",
      platform: "LinkedIn",
      value: "linkedin.com/in/placeholder",
      url: "https://linkedin.com/in/placeholder",
      icon: Linkedin,
      accentColor: "#3B82F6", // LinkedIn Blue
      bgColorLight: "bg-blue-50/50"
    },
    {
      id: "github",
      label: "Technical Identity",
      platform: "GitHub",
      value: "github.com/placeholder",
      url: "https://github.com/placeholder",
      icon: Github,
      accentColor: "#111827", // Dark Slate/Black
      bgColorLight: "bg-gray-100"
    },
    {
      id: "behance",
      label: "Creative Portfolio",
      platform: "Behance",
      value: "behance.net/placeholder",
      url: "https://behance.net/placeholder",
      icon: Paintbrush, // Lucide paintbrush representing Behance creative space
      accentColor: "#6366F1", // Indigo
      bgColorLight: "bg-indigo-50/50"
    }
  ];

  // ==========================================
  // 1. TEMPLATE: MINIMALISM
  // ==========================================
  if (template === 'minimalism') {
    return (
      <div className="max-w-3xl mx-auto pb-16 font-sans text-gray-900 space-y-12">
        {/* Document Style Title */}
        <div className="space-y-1.5 pt-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--page-accent)] font-extrabold">TRANSMISSION DIRECTORY</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-none">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-500 font-sans leading-relaxed tracking-normal max-w-xl mt-1.5 font-medium">
            {pageSubtitle}
          </p>
        </div>

        <div className="border-t border-gray-150 my-6" />

        {/* TOP SECTION: Direct Contact */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase block">
            01 :: DIRECT CONTACT LINKS
          </span>

          <div className="border border-gray-150 divide-y divide-gray-150 rounded-lg overflow-hidden bg-white">
            {primaryContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded border border-gray-150 bg-gray-50 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gray-505" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block leading-none">
                        {contact.label}
                      </span>
                      <a 
                        href={contact.url} 
                        target="_blank" 
                        rel="noopener referrer" 
                        className="text-sm font-extrabold text-gray-950 hover:underline inline-flex items-center gap-1.5"
                      >
                        {contact.value}
                        <ExternalLink size={12} className="text-gray-400 shrink-0" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 sm:w-auto w-full justify-end">
                    <div className="text-right flex flex-col justify-center">
                      <span className="text-[9px] font-semibold text-gray-950 block">{contact.platform}</span>
                      <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block leading-none">Scan to contact</span>
                    </div>
                    <div className="p-1.5 border border-gray-150 rounded bg-white shrink-0">
                      <QRCodeSVG 
                        value={contact.url} 
                        size={56} 
                        fgColor="#000000" 
                        bgColor="#FFFFFF"
                        level="M"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider Line between sections */}
        <div className="border-t border-gray-150 my-8" />

        {/* BOTTOM SECTION: Find Me Online */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 font-black uppercase block">
            02 :: PROFESSIONAL PROFILES
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.id} className="border border-gray-150 rounded-lg p-5 bg-white flex flex-col justify-between items-center text-center space-y-4 group">
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-9 h-9 rounded-full border border-gray-150 bg-gray-50 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gray-505" />
                    </div>
                    <span className="text-sm font-extrabold text-gray-950 block pt-1">{contact.platform}</span>
                    <a 
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-gray-400 hover:text-gray-950 hover:underline block break-all break-words max-w-full px-2"
                    >
                      {contact.value}
                    </a>
                  </div>

                  <div className="flex flex-col items-center space-y-2 pt-2 border-t border-gray-100 w-full">
                    <div className="p-2 border border-gray-150 rounded bg-white">
                      <QRCodeSVG 
                        value={contact.url} 
                        size={80} 
                        fgColor="#000000" 
                        bgColor="#FFFFFF"
                        level="M"
                      />
                    </div>
                    <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block leading-none">Scan to visit</span>
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
  // 2. TEMPLATE: CREATIVE / EDITORIAL
  // ==========================================
  if (template === 'editorial') {
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

        {/* Section title */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Direct Channels & Signals
            </h2>
          </div>

          {/* Direct Contact: Email & Phone as flat Swiss poster cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {primaryContacts.map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div 
                  key={contact.id} 
                  className="border-4 border-gray-950 p-6 bg-white rounded-none flex flex-col justify-between transition-colors hover:bg-gray-50 duration-200"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gray-50 border-2 border-gray-950 flex items-center justify-center rounded-none text-gray-950">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase bg-gray-950 text-white px-3 py-1 tracking-widest rounded-none">
                        {contact.platform}
                      </span>
                    </div>

                    <div className="space-y-1 my-6 border-t-2 border-gray-950 pt-4">
                      <span className="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest block leading-none mb-2">
                        {contact.label.toUpperCase()}
                      </span>
                      <a 
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-sans font-black text-gray-950 uppercase tracking-tighter hover:underline block break-all break-words"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>

                  {/* QR nested inside flat black box */}
                  <div className="mt-6 border-2 border-gray-950 p-4 bg-white flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 rounded-none">
                    <div className="shrink-0">
                      <QRCodeSVG 
                        value={contact.url}
                        size={72}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                        level="M"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans font-black uppercase tracking-wider text-gray-950 block">SCAN QR</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section title */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col gap-1 border-b-4 border-gray-950 pb-2">
            <h2 className="text-2xl font-sans font-black uppercase text-gray-950 tracking-tight">
              Professional Profiles & Nodes
            </h2>
          </div>

          {/* Social profiles as flat poster grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {profileContacts.map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div 
                  key={contact.id}
                  className="border-4 border-gray-950 p-6 bg-white rounded-none flex flex-col justify-between space-y-6 transition-colors hover:bg-gray-50 duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 border-2 border-gray-950 flex items-center justify-center text-gray-950 rounded-none bg-gray-50">
                          <Icon size={16} />
                        </div>
                        <span className="font-sans font-black text-lg text-gray-950 uppercase tracking-tighter">{contact.platform}</span>
                      </div>
                      <span className="font-mono text-[9px] font-black text-gray-950">#0{idx + 1}</span>
                    </div>

                    <div className="space-y-1 border-t-2 border-gray-950 pt-3">
                      <a 
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-gray-700 hover:text-gray-950 hover:underline block break-all break-words"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>

                  {/* QR code centered in pristine square container */}
                  <div className="border-t-2 border-gray-950 pt-4 flex flex-col items-center">
                    <div className="border-2 border-gray-950 p-3 bg-white">
                      <QRCodeSVG 
                        value={contact.url}
                        size={80}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                        level="M"
                      />
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
  return (
    <div className="max-w-4xl mx-auto pb-16 font-mono text-[#00FF88] space-y-12">
      
      {/* MONOSPACE NEON GRADIENT HEADER */}
      <div className="space-y-2 pt-4 border-l-2 border-[#00FF88]/45 pl-4 bg-[#00FF88]/2 relative select-none">
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase filter drop-shadow-[0_0_8px_var(--page-accent)]">
          Initialize Connection.
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-sans">
          {pageSubtitle}
        </p>
        <div className="h-[2px] bg-gradient-to-r from-[var(--page-accent)] via-[#00ff88]/30 to-transparent relative mt-1" />
      </div>

      {/* Direct Contact displayed as two full-width glowing data panels */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5 select-none">
          <span className="text-[10px] uppercase text-white tracking-wider font-bold">Direct Channels</span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {primaryContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <div 
                key={contact.id}
                className="p-5 rounded-xl border border-[#00FF88]/25 bg-black/50 text-white shadow-[0_0_12px_rgba(3,255,136,0.08)] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5 group hover:border-[#00FF88]/50 transition-all duration-300"
              >
                {/* HUD Corners */}
                <span className="absolute top-1 left-1 text-[7px] text-[#00FF88]/30 font-black">┌</span>
                <span className="absolute bottom-1 left-1 text-[7px] text-[#00FF88]/30 font-black">└</span>
                <span className="absolute top-1 right-1 text-[7px] text-[#00FF88]/30 font-black">┐</span>
                <span className="absolute bottom-1 right-1 text-[7px] text-[#00FF88]/30 font-black">┘</span>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded border border-[#00FF88]/30 bg-[#00FF88]/5 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#00FF88] filter drop-shadow-[0_0_3px_#00FF88]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8.5px] text-gray-405 tracking-normal uppercase font-bold block">
                      {contact.label}
                    </span>
                    <a 
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-black text-white hover:text-[#00FF88] hover:underline flex items-center gap-1.5 tracking-wide break-all break-words"
                    >
                      {contact.value}
                      <ExternalLink size={14} className="text-[#00FF88]/50 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* QR box on the right of the panel */}
                <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-[#00FF88]/15 pt-4 sm:pt-0 sm:pl-5 self-end sm:self-auto w-full sm:w-auto justify-end">
                  <div className="text-right flex flex-col justify-center">
                    <span className="text-[8.5px] tracking-tight text-[#00FF88] font-bold block">{contact.platform}</span>
                    <span className="text-[7.5px] text-gray-400 uppercase tracking-widest block font-bold mt-0.5">SCAN TO CONNECT</span>
                  </div>
                  <div className="p-1.5 border border-[#00FF88]/25 bg-black rounded shrink-0">
                    <QRCodeSVG 
                      value={contact.url}
                      size={64}
                      fgColor="#00FF88" // Glowing neon color
                      bgColor="#000000"
                      level="M"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section separator - Glowing neon horizontal line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/40 to-transparent my-6 select-none" />

      {/* Grid of social profiles displayed as 3-column glowing card grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#00FF88]/30 pb-1.5 select-none">
          <span className="text-[10px] uppercase text-white tracking-wider font-bold">Professional Profiles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profileContacts.map((contact) => {
            const Icon = contact.icon;
            
            // LinkedIn is slightly larger in futuristic as requested (col-span-1 overrides but spacing & detail are optimized)
            const isLinkedIn = contact.id === "linkedin";
            const scaleClass = isLinkedIn ? "z-10 shadow-[0_0_15px_rgba(3,255,136,0.12)] border-[#00FF88]/35" : "border-[#00FF88]/20";

            return (
              <div 
                key={contact.id}
                className={`p-5 rounded-xl border bg-black/60 text-white relative overflow-hidden flex flex-col justify-between items-center text-center space-y-4 group transition-all duration-300 hover:border-[#00FF88]/45 ${scaleClass}`}
              >
                {/* HUD corners */}
                <span className="absolute top-1 left-1 text-[6px] text-[#00FF88]/25 font-black">┌</span>
                <span className="absolute bottom-1 left-1 text-[6px] text-[#00FF88]/25 font-black">└</span>
                <span className="absolute top-1 right-1 text-[6px] text-[#00FF88]/25 font-black">┐</span>
                <span className="absolute bottom-1 right-1 text-[6px] text-[#00FF88]/25 font-black">┘</span>

                <div className="flex flex-col items-center space-y-2 w-full">
                  <div className="w-10 h-10 rounded-full border border-[#00FF88]/30 bg-black flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#00FF88] filter drop-shadow-[0_0_3px_#00FF88]" />
                  </div>
                  <div>
                    <span className="text-[12px] font-black text-white hover:text-[#00FF88]/90 block uppercase tracking-wide">{contact.platform}</span>
                    <a 
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-[#00FF88]/60 hover:text-[#00FF88] hover:underline block truncate max-w-full px-2"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>

                {/* Centered QR code with tiny scan label below */}
                <div className="flex flex-col items-center space-y-2 pt-3 border-t border-[#00FF88]/10 w-full">
                  <div className="p-2 border border-[#00FF88]/25 bg-black rounded">
                    <QRCodeSVG 
                      value={contact.url}
                      size={90}
                      fgColor="#00FF88"
                      bgColor="#000000"
                      level="M"
                    />
                  </div>
                  <span className="text-[7px] text-[#00FF88]/60 font-bold uppercase tracking-widest block leading-none">SCAN</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
