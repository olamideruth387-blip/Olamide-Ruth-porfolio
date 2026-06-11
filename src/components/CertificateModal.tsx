import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Check, Copy, Award, ShieldCheck } from "lucide-react";
import { Certificate } from "../types";

interface CertificateModalProps {
  selectedCert: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ selectedCert, onClose }: CertificateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!selectedCert) return null;

  const handleCopyId = () => {
    if (selectedCert.verifyId) {
      navigator.clipboard.writeText(selectedCert.verifyId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCleanDate = (dateStr: string) => {
    return dateStr.replace("Issued ", "");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
          id="cert-lightbox-overlay"
        />

        {/* Modal content viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="relative w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
          id="cert-modal-viewport"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all z-20 cursor-pointer"
            aria-label="Close modal"
            id="close-cert-modal"
          >
            <X size={18} />
          </button>

          {/* Left panel: Certificate High-fidelity Replica Layout */}
          <div className="flex-1 bg-zinc-900/60 p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5 max-h-[55vh] lg:max-h-[92vh]">
            <div className="w-full max-w-[760px] aspect-[1.414/1] bg-white rounded shadow-2xl relative overflow-hidden select-none text-zinc-800 p-4 sm:p-6 md:p-8 flex flex-col justify-between font-serif border-[1px] border-zinc-200">
              
              {/* --- 1. ALISON CERTIFICATE STYLE REPLICA --- */}
              {selectedCert.logoType === "alison" && (
                <div className="h-full flex relative border-[8px] border-double border-[#005B4C] p-3 md:p-6 -m-2 sm:-m-4 md:-m-6 flex-1 justify-between">
                  {/* Left green stripe ribbon */}
                  <div className="w-[22%] h-full bg-[#E5F6EE] relative flex flex-col justify-between items-center py-4 border-r border-[#005B4C]/20 -mt-10 -mb-10 -ml-10">
                    {/* Ribbon backing */}
                    <div className="w-6 sm:w-10 h-[105%] bg-[#00A383] absolute top-[-2%] left-3 sm:left-6 -z-10 shadow-sm flex flex-col justify-between">
                      <div className="w-full h-4 border-b-2 border-dashed border-white/20"></div>
                      <div className="w-full h-4 border-t-2 border-dashed border-white/20"></div>
                    </div>

                    <div className="relative pt-6 sm:pt-10 flex flex-col items-center">
                      {/* Certified custom logo badge */}
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#005B4C] flex flex-col items-center justify-center shadow-md relative z-10 p-0.5 sm:p-1 overflow-hidden">
                        <span className="text-[6px] sm:text-[9px] font-sans font-bold text-[#4B0082] leading-none text-center">CPD</span>
                        <span className="text-[3px] sm:text-[5px] font-sans font-bold text-zinc-500 uppercase tracking-widest mt-0.5 leading-none text-center">CERTIFIED</span>
                        <div className="w-full border-t border-zinc-100 my-0.5 sm:my-1" />
                        <span className="text-[2.5px] sm:text-[4.5px] font-sans text-zinc-400 uppercase text-center leading-none">The CPD Certification<br/>Service</span>
                      </div>
                    </div>

                    {/* Date and seal reference */}
                    <div className="mt-auto flex flex-col items-center pb-2 text-center">
                      <p className="text-[8px] sm:text-[11px] font-sans font-extrabold text-zinc-900 block leading-none">
                        {getCleanDate(selectedCert.date)}
                      </p>
                      <span className="text-[5px] sm:text-[7px] uppercase font-sans tracking-wider text-zinc-500 block mt-1">Date of Award</span>
                    </div>
                  </div>

                  {/* Main right Alison text area */}
                  <div className="flex-1 pl-4 sm:pl-8 flex flex-col justify-between">
                    {/* Top logo mark */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5 font-sans">
                        <div className="relative w-6 h-6 sm:w-9 sm:h-9 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#00D09C] via-[#00A383] to-[#005B4C] rounded-lg rotate-12 shadow-sm" />
                          <span className="relative text-white font-extrabold text-xs sm:text-sm">A</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] sm:text-[20px] font-bold tracking-tighter text-[#00A383] leading-none">Alison</span>
                          <span className="text-[5px] sm:text-[7px] uppercase tracking-widest text-[#005B4C] font-bold mt-0.5 leading-none">Empower Yourself</span>
                        </div>
                      </div>
                      <div className="text-right font-sans">
                        <span className="text-[8px] sm:text-[11px] font-black text-[#005B4C] tracking-wide uppercase border border-[#005B4C]/20 px-2 py-0.5 rounded-md">CERTIFICATE</span>
                      </div>
                    </div>

                    {/* Main certificate confirmation statement */}
                    <div className="my-auto py-2 text-left space-y-2 sm:space-y-4">
                      <div className="space-y-0.5 font-sans">
                        <p className="text-[6px] sm:text-[8px] uppercase font-semibold tracking-wider text-zinc-400">has received this award for successfully completing this course:</p>
                        <h3 className="text-base sm:text-2xl font-extrabold text-zinc-800 tracking-tight uppercase leading-snug">OLAMIDE RUTH DAVID</h3>
                      </div>

                      <div className="space-y-1 border-t border-zinc-100 pt-3">
                        <h4 className="text-[11px] sm:text-[18px] font-extrabold text-zinc-900 leading-tight uppercase font-sans tracking-tight">
                          {selectedCert.title}
                        </h4>
                        <p className="text-[6.5px] sm:text-[9.5px] text-zinc-500 leading-relaxed font-sans max-w-lg">
                          A validation of completed course curricula, certified modules, practical evaluations, and benchmark diagnostic examinations validated via Alison credential standards.
                        </p>
                      </div>
                    </div>

                    {/* Footer credentials and signature */}
                    <div className="grid grid-cols-12 gap-2 items-end border-t border-zinc-100 pt-3 font-sans text-left">
                      {/* Verification Block and QR Code style */}
                      <div className="col-span-6 flex items-center gap-2">
                        {/* Mock QR matrix look */}
                        <div className="w-8 h-8 sm:w-11 sm:h-11 bg-zinc-100 border border-zinc-200 p-0.5 flex flex-wrap shrink-0 rounded">
                          <div className="w-1/2 h-1/2 border-r border-b border-zinc-800 bg-zinc-900" />
                          <div className="w-1/2 h-1/2 border-b border-zinc-400 bg-zinc-100" />
                          <div className="w-1/2 h-1/2 border-r border-zinc-400 bg-zinc-100" />
                          <div className="w-1/2 h-1/2 bg-zinc-900" />
                        </div>
                        <div className="space-y-0.5 text-left leading-none font-mono">
                          <span className="text-[4.5px] sm:text-[6px] text-zinc-400 block uppercase font-bold tracking-wider">To Verify:</span>
                          <span className="text-[5.5px] sm:text-[8.5px] font-extrabold text-zinc-700 block truncate">
                            ID: {selectedCert.verifyId}
                          </span>
                          <span className="text-[4.5px] sm:text-[6px] text-zinc-400 block lowercase tracking-tight">alison.com/verify/...</span>
                        </div>
                      </div>
                      
                      {/* Signature block */}
                      <div className="col-span-6 text-right space-y-0.5">
                        <p className="text-[9px] sm:text-[13px] font-serif font-bold text-zinc-800 italic leading-none">
                          {selectedCert.signature}
                        </p>
                        <hr className="border-zinc-200 w-24 ml-auto my-0.5" />
                        <p className="text-[4.5px] sm:text-[6.5px] text-zinc-400 font-bold uppercase tracking-wider block font-sans">
                          {selectedCert.signTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. WILEY / COURSERA CERTIFICATE STYLE REPLICA --- */}
              {selectedCert.logoType === "wiley" && (
                <div className="h-full flex flex-col justify-between border-[1px] border-zinc-100 p-2 sm:p-5 relative aspect-[1.414/1] flex-1">
                  {/* Subtle double thin lines border */}
                  <div className="absolute inset-1.5 border-[4px] border-double border-zinc-100 pointer-events-none -z-10" />

                  {/* Header logos panel */}
                  <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2 select-none">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-white text-emerald-600 font-serif font-black text-xs sm:text-base p-0.5 shadow-sm">
                        W
                      </div>
                      <span className="text-[9px] sm:text-[12px] font-serif font-black text-zinc-800 tracking-wider">WILEY</span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="text-sky-600 font-sans text-xs sm:text-base font-extrabold italic leading-none tracking-tight">coursera</span>
                      <span className="text-[4.5px] sm:text-[6.5px] font-sans text-zinc-400 block uppercase tracking-widest mt-0.5 font-bold">Course Certificate</span>
                    </div>
                  </div>

                  {/* Name and GTM details */}
                  <div className="my-auto py-2 sm:py-4 text-left space-y-2 sm:space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[6px] sm:text-[8px] font-sans text-zinc-400">{getCleanDate(selectedCert.date)}</p>
                      <h3 className="text-sm sm:text-2xl font-black text-zinc-950 tracking-tight font-serif leading-none mt-1">Olamide Ruth David</h3>
                      <p className="text-[6.5px] sm:text-[9.5px] text-zinc-500 leading-normal font-serif max-w-md">
                        has successfully completed a non-credit course authorised by <span className="font-semibold">{selectedCert.issuer}</span> and validated through Coursera.
                      </p>
                    </div>

                    <div className="bg-zinc-50/70 p-2 sm:p-3.5 rounded-xl border border-zinc-200/50 max-w-md text-left">
                      <h4 className="text-[10px] sm:text-[15px] font-black text-zinc-900 uppercase font-sans tracking-tight">
                        {selectedCert.title}
                      </h4>
                    </div>
                  </div>

                  {/* Signatures and Validation Side Seal */}
                  <div className="grid grid-cols-12 gap-3 items-end border-t border-zinc-100 pt-3 text-left font-sans mt-auto select-none">
                    <div className="col-span-7 space-y-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[15px] font-serif font-bold tracking-widest text-zinc-800 italic leading-none font-bold">WILEY</span>
                        <span className="text-[5.5px] sm:text-[7.5px] text-zinc-400 block font-sans mt-1 leading-tight">{selectedCert.signature}</span>
                        <span className="text-[4.5px] sm:text-[6px] text-zinc-400 block italic leading-none">Wiley Skills Network</span>
                      </div>
                    </div>

                    {/* Official Coursera Seal stamp column */}
                    <div className="col-span-5 flex flex-col items-center sm:items-end justify-between self-stretch text-right relative">
                      <div className="absolute right-0 bottom-6 w-14 h-14 sm:w-20 sm:h-20 rounded-full border-[1.5px] border-dashed border-zinc-200/80 flex items-center justify-center p-0.5 bg-zinc-50/50 shadow-sm">
                        <div className="absolute inset-0.5 rounded-full border border-zinc-100" />
                        <svg className="absolute inset-0 w-full h-full rotate-[-45deg]" viewBox="0 0 100 100">
                          <path id="curve-wiley" fill="transparent" d="M 12 50 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                          <text className="fill-zinc-400 font-extrabold tracking-[0.25em] font-sans text-[5.2px]">
                            <textPath href="#curve-wiley" startOffset="0%">
                              EDUCATION FOR EVERYONE • COURSE CERTIFICATE •
                            </textPath>
                          </text>
                        </svg>
                        <span className="text-[5px] sm:text-[7px] text-zinc-600 font-black font-sans uppercase tracking-widest bg-white rounded px-1.5 py-0.5 border border-zinc-100 shadow-sm z-10">coursera</span>
                      </div>

                      {/* Verification Link */}
                      <div className="space-y-0.5 text-[5px] sm:text-[6.5px] text-zinc-400 leading-tight font-mono select-all">
                        <span className="block">Verify at Coursera:</span>
                        <a href={selectedCert.verifyUrl} target="_blank" rel="noreferrer" className="text-zinc-600 font-bold hover:text-sky-500 underline truncate block max-w-[150px]">
                          coursera.org/verify/{selectedCert.verifyId}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. PACKT / COURSERA CERTIFICATE STYLE REPLICA --- */}
              {selectedCert.logoType === "packt" && (
                <div className="h-full flex flex-col justify-between border-[1px] border-zinc-100 p-2 sm:p-5 relative aspect-[1.414/1] flex-1">
                  {/* Subtle double thin lines border */}
                  <div className="absolute inset-1.5 border-[4px] border-double border-zinc-100 pointer-events-none -z-10" />

                  {/* Header logos panel */}
                  <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2 select-none">
                      <span className="text-orange-500 font-sans font-black text-sm sm:text-lg tracking-tight select-none">&lt;packt&gt;</span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="text-sky-600 font-sans text-xs sm:text-base font-extrabold italic leading-none tracking-tight">coursera</span>
                      <span className="text-[4.5px] sm:text-[6.5px] font-sans text-zinc-400 block uppercase tracking-widest mt-0.5 font-bold">Course Certificate</span>
                    </div>
                  </div>

                  {/* Name and course details */}
                  <div className="my-auto py-2 sm:py-4 text-left space-y-2 sm:space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[6px] sm:text-[8px] font-sans text-zinc-400">{getCleanDate(selectedCert.date)}</p>
                      <h3 className="text-sm sm:text-2xl font-black text-zinc-950 tracking-tight font-serif leading-none mt-1">Olamide Ruth David</h3>
                      <p className="text-[6.5px] sm:text-[9.5px] text-zinc-500 leading-normal font-serif max-w-md">
                        has successfully completed a non-credit course authorised by <span className="font-semibold">{selectedCert.issuer}</span> and validated through Coursera.
                      </p>
                    </div>

                    <div className="bg-zinc-50/70 p-2 sm:p-3.5 rounded-xl border border-zinc-200/50 max-w-md text-left">
                      <h4 className="text-[10px] sm:text-[15px] font-black text-zinc-900 uppercase font-sans tracking-tight">
                        {selectedCert.title}
                      </h4>
                    </div>
                  </div>

                  {/* Signatures and Validation Side Seal */}
                  <div className="grid grid-cols-12 gap-3 items-end border-t border-zinc-100 pt-3 text-left font-sans mt-auto select-none">
                    <div className="col-span-7 space-y-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[14px] font-serif font-bold text-zinc-800 italic leading-none font-bold">Packt</span>
                        <span className="text-[5.5px] sm:text-[7.5px] text-zinc-400 block font-sans mt-1 leading-tight">{selectedCert.signature}</span>
                        <span className="text-[4.5px] sm:text-[6px] text-zinc-400 block italic leading-none">Packt Editorial Board</span>
                      </div>
                    </div>

                    {/* Official Coursera Seal stamp column */}
                    <div className="col-span-5 flex flex-col items-center sm:items-end justify-between self-stretch text-right relative">
                      <div className="absolute right-0 bottom-6 w-14 h-14 sm:w-20 sm:h-20 rounded-full border-[1.5px] border-dashed border-zinc-200/80 flex items-center justify-center p-0.5 bg-zinc-50/50 shadow-sm">
                        <div className="absolute inset-0.5 rounded-full border border-zinc-100" />
                        <svg className="absolute inset-0 w-full h-full rotate-[-45deg]" viewBox="0 0 100 100">
                          <path id="curve-packt" fill="transparent" d="M 12 50 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                          <text className="fill-zinc-400 font-extrabold tracking-[0.25em] font-sans text-[5.2px]">
                            <textPath href="#curve-packt" startOffset="0%">
                              EDUCATION FOR EVERYONE • COURSE CERTIFICATE •
                            </textPath>
                          </text>
                        </svg>
                        <span className="text-[5px] sm:text-[7px] text-zinc-600 font-black font-sans uppercase tracking-widest bg-white rounded px-1.5 py-0.5 border border-zinc-100 shadow-sm z-10">coursera</span>
                      </div>

                      {/* Verification Link */}
                      <div className="space-y-0.5 text-[5px] sm:text-[6.5px] text-zinc-400 leading-tight font-mono select-all">
                        <span className="block">Verify at Coursera:</span>
                        <a href={selectedCert.verifyUrl} target="_blank" rel="noreferrer" className="text-zinc-600 font-bold hover:text-sky-500 underline truncate block max-w-[150px]">
                          coursera.org/verify/{selectedCert.verifyId}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 4. HUBSPOT / COURSERA PROJECT CERTIFICATE STYLE REPLICA --- */}
              {selectedCert.logoType === "hubspot" && (
                <div className="h-full flex flex-col justify-between border-[1px] border-zinc-100 p-2 sm:p-5 relative aspect-[1.414/1] flex-1">
                  {/* Subtle double thin lines border */}
                  <div className="absolute inset-1.5 border-[4px] border-double border-zinc-100 pointer-events-none -z-10" />

                  {/* Header logos panel */}
                  <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2 select-none">
                      <span className="text-sky-600 font-sans font-black text-sm tracking-tight leading-none">coursera</span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="text-zinc-500 font-sans text-xs font-black tracking-tight uppercase leading-none">PROJECT CERTIFICATE</span>
                      <span className="text-[4px] font-mono text-zinc-400 block mt-0.5">AUTHORIZED &amp; VERIFIED</span>
                    </div>
                  </div>

                  {/* Name and course details */}
                  <div className="my-auto py-2 sm:py-4 text-left space-y-2 sm:space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[6px] sm:text-[8px] font-sans text-zinc-400">{getCleanDate(selectedCert.date)}</p>
                      <h3 className="text-sm sm:text-2xl font-black text-zinc-950 tracking-tight font-serif leading-none mt-1">Olamide Ruth David</h3>
                      <p className="text-[6.5px] sm:text-[9.5px] text-zinc-500 leading-normal font-serif max-w-md">
                        has successfully completed an online project authorized by <span className="font-semibold">Coursera</span> and offered through Coursera.
                      </p>
                    </div>

                    <div className="bg-zinc-50/70 p-2 sm:p-3.5 rounded-xl border border-zinc-200/50 max-w-md text-left">
                      <h4 className="text-[10px] sm:text-[15px] font-black text-zinc-900 uppercase font-sans tracking-tight">
                        {selectedCert.title}
                      </h4>
                    </div>
                  </div>

                  {/* Signatures and Validation Side Seal */}
                  <div className="grid grid-cols-12 gap-3 items-end border-t border-zinc-100 pt-3 text-left font-sans mt-auto select-none">
                    <div className="col-span-7 space-y-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[14px] font-serif font-bold text-zinc-800 italic leading-none font-bold">{selectedCert.signature}</span>
                        <hr className="border-zinc-200 my-0.5 w-16" />
                        <span className="text-[5px] sm:text-[7px] text-zinc-400 block font-sans mt-0.5 leading-tight">{selectedCert.signTitle}</span>
                        <span className="text-[4px] sm:text-[5px] text-zinc-400 block uppercase font-mono tracking-widest leading-none">Verified HubSpot Partner</span>
                      </div>
                    </div>

                    {/* Official Coursera Seal stamp column */}
                    <div className="col-span-5 flex flex-col items-center sm:items-end justify-between self-stretch text-right relative">
                      <div className="absolute right-0 bottom-6 w-14 h-14 sm:w-20 sm:h-20 rounded-full border-[1.5px] border-dashed border-zinc-200/80 flex items-center justify-center p-0.5 bg-zinc-50/50 shadow-sm">
                        <div className="absolute inset-0.5 rounded-full border border-zinc-100" />
                        <svg className="absolute inset-0 w-full h-full rotate-[-45deg]" viewBox="0 0 100 100">
                          <path id="curve-hubspot" fill="transparent" d="M 12 50 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                          <text className="fill-zinc-400 font-extrabold tracking-[0.25em] font-sans text-[5.2px]">
                            <textPath href="#curve-hubspot" startOffset="0%">
                              EDUCATION FOR EVERYONE • PROJECT CERTIFICATE •
                            </textPath>
                          </text>
                        </svg>
                        <span className="text-[5px] sm:text-[7px] text-zinc-600 font-black font-sans uppercase tracking-widest bg-white rounded px-1.5 py-0.5 border border-zinc-100 shadow-sm z-10">coursera</span>
                      </div>

                      {/* Verification Link */}
                      <div className="space-y-0.5 text-[5px] sm:text-[6.5px] text-zinc-400 leading-tight font-mono select-all">
                        <span className="block">Verify at Coursera:</span>
                        <a href={selectedCert.verifyUrl} target="_blank" rel="noreferrer" className="text-zinc-600 font-bold hover:text-sky-500 underline truncate block max-w-[150px]">
                          coursera.org/verify/{selectedCert.verifyId}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 5. UNIVERSITY OF MARYLAND CERTIFICATE STYLE REPLICA --- */}
              {selectedCert.logoType === "maryland" && (
                <div className="h-full flex flex-col justify-between border-[1px] border-zinc-100 p-2 sm:p-5 relative aspect-[1.414/1] flex-1">
                  {/* Subtle double thin lines border */}
                  <div className="absolute inset-1.5 border-[4px] border-double border-zinc-100 pointer-events-none -z-10" />

                  {/* Header logos panel */}
                  <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2 select-none leading-none">
                      <div className="flex flex-col">
                        <span className="text-[#E03A3E] font-sans font-extrabold text-[8px] sm:text-[10px] tracking-tight uppercase leading-none">UNIVERSITY OF</span>
                        <span className="text-zinc-950 font-sans font-black text-[10px] sm:text-[14px] tracking-wider uppercase leading-none mt-0.5">MARYLAND</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="text-sky-600 font-sans text-xs sm:text-base font-extrabold italic leading-none tracking-tight">coursera</span>
                      <span className="text-[4.5px] sm:text-[6.5px] font-sans text-zinc-400 block uppercase tracking-widest mt-0.5 font-bold">Course Certificate</span>
                    </div>
                  </div>

                  {/* Name and course details */}
                  <div className="my-auto py-2 sm:py-4 text-left space-y-2 sm:space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[6px] sm:text-[8px] font-sans text-zinc-400">{getCleanDate(selectedCert.date)}</p>
                      <h3 className="text-sm sm:text-2xl font-black text-zinc-950 tracking-tight font-serif leading-none mt-1">Olamide Ruth David</h3>
                      <p className="text-[6.5px] sm:text-[9.5px] text-zinc-500 leading-normal font-serif max-w-md">
                        has successfully completed a non-credit course authorised by <span className="font-semibold">{selectedCert.issuer}</span>, College Park and offered through Coursera.
                      </p>
                    </div>

                    <div className="bg-zinc-50/70 p-2 sm:p-3.5 rounded-xl border border-zinc-200/50 max-w-md text-left">
                      <h4 className="text-[10px] sm:text-[15px] font-black text-zinc-900 uppercase font-sans tracking-tight">
                        {selectedCert.title}
                      </h4>
                    </div>
                  </div>

                  {/* Signatures and Validation Side Seal */}
                  <div className="grid grid-cols-12 gap-3 items-end border-t border-zinc-100 pt-3 text-left font-sans mt-auto select-none">
                    <div className="col-span-7 space-y-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[14px] font-serif font-bold text-zinc-800 italic leading-none font-bold">PM Kannan</span>
                        <hr className="border-zinc-200 my-0.5 w-16" />
                        <span className="text-[5.5px] sm:text-[7.5px] text-zinc-400 block font-sans mt-0.5 leading-tight">{selectedCert.signature}</span>
                        <span className="text-[4.5px] sm:text-[6px] text-zinc-400 block leading-none">{selectedCert.signTitle}</span>
                      </div>
                    </div>

                    {/* Official Coursera Seal stamp column */}
                    <div className="col-span-5 flex flex-col items-center sm:items-end justify-between self-stretch text-right relative">
                      <div className="absolute right-0 bottom-6 w-14 h-14 sm:w-20 sm:h-20 rounded-full border-[1.5px] border-dashed border-zinc-200/80 flex items-center justify-center p-0.5 bg-zinc-50/50 shadow-sm">
                        <div className="absolute inset-0.5 rounded-full border border-zinc-100" />
                        <svg className="absolute inset-0 w-full h-full rotate-[-45deg]" viewBox="0 0 100 100">
                          <path id="curve-maryland" fill="transparent" d="M 12 50 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                          <text className="fill-zinc-400 font-extrabold tracking-[0.25em] font-sans text-[5.2px]">
                            <textPath href="#curve-maryland" startOffset="0%">
                              EDUCATION FOR EVERYONE • COURSE CERTIFICATE •
                            </textPath>
                          </text>
                        </svg>
                        <span className="text-[5px] sm:text-[7px] text-zinc-600 font-black font-sans uppercase tracking-widest bg-white rounded px-1.5 py-0.5 border border-zinc-100 shadow-sm z-10">coursera</span>
                      </div>

                      {/* Verification Link */}
                      <div className="space-y-0.5 text-[5px] sm:text-[6.5px] text-zinc-400 leading-tight font-mono select-all">
                        <span className="block">Verify at Coursera:</span>
                        <a href={selectedCert.verifyUrl} target="_blank" rel="noreferrer" className="text-zinc-600 font-bold hover:text-sky-500 underline truncate block max-w-[150px]">
                          coursera.org/verify/{selectedCert.verifyId}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 6. PMA / ALLIANCE COURSE - HIGH FIDELITY GRADED ASSIGNMENT REPLICA --- */}
              {selectedCert.logoType === "pma" && (
                <div className="h-full flex flex-col justify-between border-[1px] border-zinc-200 p-2 sm:p-4 rounded-xl relative aspect-[1.414/1] flex-1 font-sans bg-white text-zinc-800 -m-1 sm:-m-4 md:-m-6">
                  {/* Graded Assignment Header layout */}
                  <div className="bg-[#EAF2FF] rounded-xl p-3 sm:p-5 relative overflow-hidden border border-blue-100 flex justify-between items-center h-[52%]">
                    <div className="z-10 max-w-[65%] text-left">
                      <span className="text-blue-600 font-bold text-[8px] sm:text-[11px] tracking-wide block mb-0.5 uppercase">Graded Assignment</span>
                      <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-[#002664] tracking-tight leading-tight uppercase font-sans">
                        {selectedCert.title}
                      </h3>
                      <button className="mt-2 sm:mt-4 bg-[#0052CC] hover:bg-[#0747A6] text-white text-[7px] sm:text-[9.5px] font-bold py-1 px-3 sm:py-1.5 sm:px-4 rounded transition-colors cursor-pointer shadow-sm">
                        Try again
                      </button>
                    </div>
                    
                    {/* Floating books graphic representing Scan 3 illustration */}
                    <div className="absolute right-2 bottom-1.5 sm:right-5 w-[28%] aspect-square flex items-center justify-center select-none">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Platform platform base ellipse */}
                        <div className="absolute bottom-[10%] w-[85%] h-[15%] bg-[#00A383]/10 border border-[#00A383]/20 rounded-full flex items-center justify-center" />
                        {/* Shimmer light beam vertical */}
                        <div className="absolute top-[20%] bottom-[12%] w-[45%] bg-gradient-to-b from-[#0052CC]/15 to-transparent rounded-b-xl" />
                        
                        {/* Main central flying book */}
                        <div className="absolute top-[10%] w-[45%] h-[28%] bg-[#8F47FF] rounded shadow-md rotate-12 flex flex-col justify-between p-1 border border-[#B08FFF]">
                          <div className="w-full h-0.5 bg-white/20 rounded" />
                          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded bg-white/30 self-end" />
                        </div>
                        {/* Side companion books */}
                        <div className="absolute left-[-5px] bottom-[25%] w-[25%] h-[15%] bg-[#FFAC1C] rounded shadow-sm -rotate-12" />
                        <div className="absolute right-[-5px] bottom-[20%] w-[25%] h-[15%] bg-[#36B37E] rounded shadow-sm rotate-45" />
                      </div>
                    </div>
                  </div>

                  {/* Below row validation split */}
                  <div className="grid grid-cols-12 gap-3 mt-3 text-left h-[43%] items-stretch">
                    {/* Passed Box in green */}
                    <div className="col-span-8 bg-[#E5F6EE] border border-green-200 rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
                      <div className="space-y-0.5 text-left">
                        <h4 className="text-green-800 font-extrabold text-[9px] sm:text-[12px] leading-tight">You passed!</h4>
                        <p className="text-[7px] sm:text-[9.5px] text-green-700">To pass you need a grade of at least 80%.</p>
                        <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
                          <span className="text-base sm:text-2xl font-black text-green-800 leading-none">100%</span>
                          <button className="bg-white text-zinc-700 border border-zinc-200 text-[6.5px] sm:text-[9px] py-0.5 px-2 rounded font-medium shadow-sm leading-none">
                            View feedback
                          </button>
                        </div>
                      </div>
                      <p className="text-[6px] sm:text-[8px] text-green-600/70 font-mono leading-none mt-1">
                        Submitted May 10, 11:41 AM UTC
                      </p>
                    </div>

                    {/* What to expect panel */}
                    <div className="col-span-4 bg-zinc-50 border border-zinc-200/60 rounded-xl p-2 sm:p-3.5 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h5 className="text-[6.5px] sm:text-[8px] font-bold text-zinc-400 tracking-wide uppercase">What to expect</h5>
                        <div className="space-y-1 text-[6.5px] sm:text-[8.5px] text-zinc-600 leading-normal">
                          <p className="flex items-center gap-1 font-semibold">
                            <span className="text-xs shrink-0">📅</span> Due Jun 15, 11:59 PM
                          </p>
                          <p className="flex items-center gap-1 font-semibold">
                            <span className="text-xs shrink-0">🔄</span> Unlimited attempts
                          </p>
                        </div>
                      </div>
                      <span className="text-[5.5px] sm:text-[7.5px] text-zinc-400 block tracking-tight font-mono text-right capitalize">Ref: {selectedCert.verifyId}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right panel: Course Detailed achievements & Core Verification Actions */}
          <div className="w-full lg:w-[400px] bg-zinc-950 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto max-h-[35vh] lg:max-h-[92vh]" id="cert-right-panel">
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono Scalability uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-1.5 font-bold">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Verified Registry Record
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Issued by <span className="text-[#00A383] font-semibold">{selectedCert.issuer}</span>
                </p>
              </div>

              {/* Achievements & Syllabus Breakdown */}
              {selectedCert.achievements && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">// Key Validations & Competencies</h4>
                  <ul className="space-y-2.5">
                    {selectedCert.achievements.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-zinc-300 leading-relaxed font-sans">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Grade details if available */}
              {selectedCert.grade && (
                <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">Examination Grade Obtained</span>
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Award size={12} /> {selectedCert.grade}
                  </span>
                </div>
              )}
            </div>

            {/* Actions Panel */}
            <div className="pt-6 border-t border-white/5 mt-6 space-y-3">
              {selectedCert.verifyId && (
                <button
                  onClick={handleCopyId}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-zinc-300 hover:text-white text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
                  id="copy-cert-id-button"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400 animate-bounce" />
                      Copied ID!
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy ID
                    </>
                  )}
                </button>
              )}
              <p className="text-[9px] text-zinc-500 text-center font-mono font-medium flex items-center justify-center gap-1 select-none">
                <ShieldCheck size={10} className="text-zinc-600" />
                CPD Certified Registry Handshake Secured
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
