import { jsPDF } from "jspdf";
import { Certificate } from "../types";

export interface PortfolioProject {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  story_date: string;
  challenge: string;
  strategy: string;
  impact: string;
  client: string;
  reading_time: string;
  stat_value: string;
  stat_name: string;
  image_traffic?: string | null;
  image_channel?: string | null;
  image_geo?: string | null;
  image_pipeline?: string | null;
}

interface Job {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  category: string;
  tags: string[];
}

interface Edu {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  activities: string;
  description: string[];
  skills: string[];
}

export function generateProfessionalPDF(
  experience: Job[],
  education: Edu[],
  certifications: Certificate[],
  portfolioProjects: PortfolioProject[] = []
) {
  // Create an A4 PDF document in portrait mode, unit: points (pt)
  // A4 size: 595.28 x 841.89 points
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  
  // Page Margins
  const marginL = 54; // 0.75 in
  const marginR = 54;
  const marginT = 54;
  const marginB = 54;
  const contentWidth = pageWidth - marginL - marginR;
  const usableHeight = pageHeight - marginB;

  let y = marginT;
  let currentPageNum = 1;

  // Helper: Add header and footer templates to a page
  const addPageDecorations = (pageNum: number) => {
    // Top Accent line (Emerald Green)
    pdf.setFillColor(16, 185, 129); // #10b981
    pdf.rect(0, 0, pageWidth, 5, "F");

    // Footer
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(115, 115, 115); // #737373 Neutral 500
    
    // Page Number
    pdf.text(`Page ${pageNum}`, pageWidth - marginR, pageHeight - 30, { align: "right" });
    
    // Bottom portfolio indicator with clickable link
    pdf.text("Olamide David  |  Systems Automation & Digital Growth", marginL, pageHeight - 30);
    
    // Add clickable link to the footer text
    pdf.link(marginL, pageHeight - 38, 200, 12, { url: "https://www.olamideruthdavid.com/" });
  };

  // Helper: Ensure the spacing before writing. Adds a page if we would overflow.
  const checkPageOverflow = (neededHeight: number): boolean => {
    if (y + neededHeight > usableHeight) {
      pdf.addPage();
      currentPageNum++;
      y = marginT + 15; // Reset to top margin, adding a bit of padding for accent line
      addPageDecorations(currentPageNum);
      return true;
    }
    return false;
  };

  // Set up first page decorations
  addPageDecorations(currentPageNum);

  // --- HEADER SECTION (Page 1) ---
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(24, 24, 27); // #18181b Zinc 900
  pdf.text("OLAMIDE DAVID", marginL, y);
  y += 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(16, 185, 129); // #10b981 Emerald Green
  pdf.text("SYSTEMS AUTOMATION & DIGITAL GROWTH", marginL, y);
  y += 18;

  // Contact details grid/lines
  const contactLines = [
    { text: "Email: olamideruth387@gmail.com", isLink: true, url: "mailto:olamideruth387@gmail.com" },
    { text: "Portfolio & Live Workspace: https://www.olamideruthdavid.com/", isLink: true, url: "https://www.olamideruthdavid.com/" },
    { text: "Location: Chester, England, United Kingdom  |  Remote Enabled", isLink: false }
  ];

  pdf.setFontSize(9);
  contactLines.forEach(line => {
    if (line.isLink) {
      pdf.setTextColor(16, 185, 129); // #10b981 Emerald Green
      pdf.setFont("helvetica", "bold");
    } else {
      pdf.setTextColor(82, 82, 91); // #52525b Zinc 600
      pdf.setFont("helvetica", "normal");
    }
    pdf.text(line.text, marginL, y);
    if (line.isLink && line.url) {
      // Simple link overlay over this text line (roughly 9pt text heights)
      const textWidth = pdf.getTextWidth(line.text);
      
      // Draw subtle underline
      pdf.setDrawColor(16, 185, 129);
      pdf.setLineWidth(0.5);
      pdf.line(marginL, y + 1, marginL + textWidth, y + 1);
      
      pdf.link(marginL, y - 8, textWidth, 10, { url: line.url });
    }
    y += 13;
  });

  // Divider
  y += 5;
  pdf.setDrawColor(228, 228, 231); // #e4e4e7 Zinc 200
  pdf.setLineWidth(1);
  pdf.line(marginL, y, pageWidth - marginR, y);
  y += 18;

  // --- EXECUTIVE SUMMARY ---
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(24, 24, 27);
  pdf.text("EXECUTIVE PROFILE", marginL, y);
  y += 14;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(63, 63, 70); // #3f3f46 Zinc 700
  
  const summaryText = 
    "Systems Automation Specialist and Performance Marketer with extensive post-graduate qualifications in Information Technology and Database Design from the University of Chester. High-precision execution across performance marketing, CRM development, lead qualification pipelines, and scalable automations. Speciality focuses on identifying pipeline leaks, setting up high-conversion email channels, and utilizing robust database integrations to secure predictable growth pipelines.";

  const summaryLines = pdf.splitTextToSize(summaryText, contentWidth);
  pdf.text(summaryLines, marginL, y);
  y += summaryLines.length * 13 + 15;

  // --- EXPERIENCE SECTION ---
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(24, 24, 27);
  pdf.text("PROFESSIONAL EXPERIENCE", marginL, y);
  y += 8;
  pdf.line(marginL, y, pageWidth - marginR, y); // Small subbar
  y += 18;

  experience.forEach((job) => {
    // Estimate job container size (Header + description + bullets)
    // Headline/header height ~ 35pt, description wrap lines, bullets count
    const wrappedDesc = pdf.splitTextToSize(job.description, contentWidth);
    let estimatedHeight = 35 + (wrappedDesc.length * 12);
    
    const bulletLinesList: string[][] = [];
    job.bullets.forEach(bullet => {
      const bLines = pdf.splitTextToSize(`•  ${bullet}`, contentWidth - 15);
      bulletLinesList.push(bLines);
      estimatedHeight += (bLines.length * 12);
    });
    
    // Add margin space
    estimatedHeight += 25; 

    // Check boundary
    checkPageOverflow(estimatedHeight);

    // Render Title & Company
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(24, 24, 27);
    
    const roleCompanyText = `${job.role} — ${job.company}`;
    pdf.text(roleCompanyText, marginL, y);
    
    // Add clean visually distinct inline clickable link next to the company name
    const rcWidth = pdf.getTextWidth(roleCompanyText);
    const linkX = marginL + rcWidth + 8;
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(16, 185, 129); // #10b981 Emerald Green
    
    const lnkText = "[View Case & Live Details ↗]";
    pdf.text(lnkText, linkX, y - 1);
    const lnkWidth = pdf.getTextWidth(lnkText);
    
    // Subtle underline
    pdf.setDrawColor(16, 185, 129);
    pdf.setLineWidth(0.5);
    pdf.line(linkX, y + 1, linkX + lnkWidth, y + 1);
    
    // Create the clickable link zone covering both the title and the action tag
    const jobUrl = `https://www.olamideruthdavid.com/?page=experience`;
    pdf.link(marginL, y - 9, rcWidth + 8 + lnkWidth, 12, { url: jobUrl });
    
    y += 14;

    // Period / Category / Location
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8.5);
    pdf.setTextColor(115, 115, 115); // #737373 Neutral 500
    pdf.text(`${job.period}  |  ${job.location}  |  ${job.category}`, marginL, y);
    y += 14;

    // Description
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(63, 63, 70); // #3f3f46 Zinc 700
    pdf.text(wrappedDesc, marginL, y);
    y += wrappedDesc.length * 12.5 + 6;

    // Bullets
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    bulletLinesList.forEach((bLines) => {
      // Draw standard clean dot
      pdf.setTextColor(16, 185, 129); // Emerald Green list marker
      pdf.text("▪", marginL + 5, y + 0.5);
      
      pdf.setTextColor(63, 63, 70);
      pdf.text(bLines, marginL + 15, y);
      y += bLines.length * 12;
    });

    // Technical Skills Tags for this experience
    if (job.tags && job.tags.length > 0) {
      y += 4;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(115, 115, 115);
      const tagsText = `Core Tech: [ ${job.tags.join("  |  ")} ]`;
      // Check wrap tags
      const wrapTags = pdf.splitTextToSize(tagsText, contentWidth - 10);
      pdf.text(wrapTags, marginL, y);
      y += wrapTags.length * 10;
    }

    y += 18; // spacing after job item
  });

  // --- FEATURED CASE STUDIES & PROJECTS (SUPABASE SYNCED) ---
  if (portfolioProjects && portfolioProjects.length > 0) {
    checkPageOverflow(100);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(24, 24, 27);
    pdf.text("FEATURED SYSTEMS & CLIENT WORKS", marginL, y);
    y += 8;
    pdf.line(marginL, y, pageWidth - marginR, y);
    y += 18;

    portfolioProjects.forEach((proj, idx) => {
      // Wrap text to estimate block heights
      const excerptWrapped = pdf.splitTextToSize(proj.excerpt || "", contentWidth);
      const challengeWrapped = pdf.splitTextToSize(`Challenge: ${proj.challenge || ""}`, contentWidth - 10);
      const strategyWrapped = pdf.splitTextToSize(`Automation Strategy: ${proj.strategy || ""}`, contentWidth - 10);
      const impactWrapped = pdf.splitTextToSize(`Outcomes & Impact: ${proj.impact || ""}`, contentWidth - 10);
      
      let estProjHeight = 50 + (excerptWrapped.length * 11) + (challengeWrapped.length * 11) + (strategyWrapped.length * 11) + (impactWrapped.length * 11) + 40;
      
      checkPageOverflow(estProjHeight);

      // Project Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      pdf.setTextColor(24, 24, 27);
      pdf.text(`${proj.title} (Client: ${proj.client || "Confidential"})`, marginL, y);

      // Add clickable deep-dive anchor and link
      const titleWidth = pdf.getTextWidth(`${proj.title} (Client: ${proj.client || "Confidential"})`);
      const linkX = marginL + titleWidth + 8;
      
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(16, 185, 129); // Emerald Green
      
      const exploreLnkText = "[Explore Interactive Flow & Charts ↗]";
      pdf.text(exploreLnkText, linkX, y - 1);
      const exploreLnkWidth = pdf.getTextWidth(exploreLnkText);
      
      pdf.setDrawColor(16, 185, 129);
      pdf.setLineWidth(0.5);
      pdf.line(linkX, y + 1, linkX + exploreLnkWidth, y + 1);

      // Route exactly to the portfolio page of the site
      const projUrl = `https://www.olamideruthdavid.com/?page=portfolio&id=${idx}`;
      pdf.link(marginL, y - 9, titleWidth + 8 + exploreLnkWidth, 12, { url: projUrl });
      y += 14;

      // Meta: Category & Story Date
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8.5);
      pdf.setTextColor(115, 115, 115);
      pdf.text(`Category: ${proj.category || "Automation Pipeline"}  |  Impact Metric Window: ${proj.story_date || "Continuous"}`, marginL, y);
      y += 14;

      // Excerpt description
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(82, 82, 91); // Neutral/zinc text gray
      pdf.text(excerptWrapped, marginL, y);
      y += (excerptWrapped.length * 11.5) + 6;

      // Challenge / Impl Details
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(63, 63, 70);
      
      // Draw sub dots for Challenge, strategy, impact
      pdf.setTextColor(16, 185, 129);
      pdf.text("•", marginL + 5, y + 0.5);
      pdf.setTextColor(63, 63, 70);
      pdf.text(challengeWrapped, marginL + 15, y);
      y += (challengeWrapped.length * 11) + 4;

      pdf.setTextColor(16, 185, 129);
      pdf.text("•", marginL + 5, y + 0.5);
      pdf.setTextColor(63, 63, 70);
      pdf.text(strategyWrapped, marginL + 15, y);
      y += (strategyWrapped.length * 11) + 4;

      pdf.setTextColor(16, 185, 129);
      pdf.text("•", marginL + 5, y + 0.5);
      pdf.setTextColor(115, 115, 115);
      pdf.setFont("helvetica", "bold");
      pdf.text(impactWrapped, marginL + 15, y);
      y += (impactWrapped.length * 11) + 6;

      // Metric Spotlight banner badge
      if (proj.stat_value && proj.stat_name) {
        const badgeText = `CRITICAL MARKETING IMPACT OUTCOME: [${proj.stat_value}] ${proj.stat_name}`;
        
        pdf.setFillColor(244, 252, 248); // Super soft emerald green tint
        pdf.rect(marginL, y - 8, contentWidth, 16, "F");
        
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(4, 120, 87); // Deep emerald text
        pdf.text(badgeText, marginL + 8, y + 3);
        y += 18;
      }

      y += 12; // Gap space between custom projects
    });
  }

  // --- EDUCATION SECTION ---
  checkPageOverflow(80); // Ensure the section starts comfortably
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(24, 24, 27);
  pdf.text("ACADEMIC BACKGROUND", marginL, y);
  y += 8;
  pdf.line(marginL, y, pageWidth - marginR, y);
  y += 18;

  education.forEach((edu) => {
    // Estimate heights for education
    let estEduHeight = 35;
    const eduDescLinesList: string[][] = [];
    edu.description.forEach(desc => {
      const dLines = pdf.splitTextToSize(desc, contentWidth - 15);
      eduDescLinesList.push(dLines);
      estEduHeight += dLines.length * 12 + 4;
    });
    estEduHeight += 15;

    checkPageOverflow(estEduHeight);

    // Degree & School
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(24, 24, 27);
    const eduTitle = `${edu.degree}`;
    pdf.text(eduTitle, marginL, y);
    
    // Add clean visually distinct inline clickable link next to education degree
    const tWidth = pdf.getTextWidth(eduTitle);
    const eduLinkX = marginL + tWidth + 8;
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(16, 185, 129); // #10b981 Emerald Green
    
    const eduLnkText = "[Verify Institution & Achievements ↗]";
    pdf.text(eduLnkText, eduLinkX, y - 1);
    const eduLnkWidth = pdf.getTextWidth(eduLnkText);
    
    // Subtle underline
    pdf.setDrawColor(16, 185, 129);
    pdf.setLineWidth(0.5);
    pdf.line(eduLinkX, y + 1, eduLinkX + eduLnkWidth, y + 1);
    
    // Create the clickable link zone
    const eduUrl = `https://www.olamideruthdavid.com/?page=experience`;
    pdf.link(marginL, y - 9, tWidth + 8 + eduLnkWidth, 12, { url: eduUrl });
    
    y += 14;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.setTextColor(16, 185, 129);
    pdf.text(edu.institution, marginL, y);
    y += 13;

    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8.5);
    pdf.setTextColor(115, 115, 115);
    let eduMeta = `${edu.period}`;
    if (edu.grade) eduMeta += `  •  Grade: ${edu.grade}`;
    if (edu.activities) eduMeta += `  •  Activities: ${edu.activities}`;
    pdf.text(eduMeta, marginL, y);
    y += 14;

    // Bullets or details
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(63, 63, 70);
    eduDescLinesList.forEach((dLines) => {
      pdf.setTextColor(16, 185, 129);
      pdf.text("▪", marginL + 5, y + 0.5);
      pdf.setTextColor(63, 63, 70);
      pdf.text(dLines, marginL + 15, y);
      y += (dLines.length * 12) + 2;
    });

    // Skills
    if (edu.skills && edu.skills.length > 0) {
      y += 4;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(115, 115, 115);
      pdf.text(`Core Studies: ${edu.skills.join("  •  ")}`, marginL, y);
      y += 10;
    }

    y += 16;
  });

  // --- LICENSES & CERTIFICATIONS SECTION ---
  checkPageOverflow(100);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(24, 24, 27);
  pdf.text("LICENSES & CERTIFICATIONS", marginL, y);
  y += 8;
  pdf.line(marginL, y, pageWidth - marginR, y);
  y += 18;

  certifications.forEach((cert) => {
    // Estimating cert sizes (header ~ 25pt, dynamic bullet list ~ 12pt per bullet-line)
    let estCertHeight = 28;
    const certAchLinesList: string[][] = [];
    if (cert.achievements) {
      cert.achievements.forEach(ach => {
        const aLines = pdf.splitTextToSize(ach, contentWidth - 15);
        certAchLinesList.push(aLines);
        estCertHeight += aLines.length * 11.5 + 3;
      });
    }
    estCertHeight += 12;

    checkPageOverflow(estCertHeight);

    // Title / Issuer
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(24, 24, 27);
    const certTitle = `${cert.title} — ${cert.issuer}`;
    pdf.text(certTitle, marginL, y);
    
    // Add clean visually distinct inline clickable link next to certification title
    const cWidth = pdf.getTextWidth(certTitle);
    const certLinkX = marginL + cWidth + 8;
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(16, 185, 129); // #10b981 Emerald Green
    
    const certLnkText = "[Verify Credential ↗]";
    pdf.text(certLnkText, certLinkX, y - 1);
    const certLnkWidth = pdf.getTextWidth(certLnkText);
    
    // Subtle underline
    pdf.setDrawColor(16, 185, 129);
    pdf.setLineWidth(0.5);
    pdf.line(certLinkX, y + 1, certLinkX + certLnkWidth, y + 1);
    
    const destinationUrl = cert.verifyUrl || "https://www.olamideruthdavid.com/?page=certifications";
    pdf.link(marginL, y - 9, cWidth + 8 + certLnkWidth, 12, { url: destinationUrl });
    
    y += 13;

    // Date / ID
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8.5);
    pdf.setTextColor(115, 115, 115);
    let certMeta = `${cert.date}`;
    if (cert.verifyId) certMeta += `  •  Credential ID: ${cert.verifyId}`;
    pdf.text(certMeta, marginL, y);
    y += 13;

    // Achievements
    if (certAchLinesList.length > 0) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      
      certAchLinesList.forEach((aLines) => {
        pdf.setTextColor(16, 185, 129); // Emerald dot
        pdf.text("▪", marginL + 5, y + 0.5);
        pdf.setTextColor(63, 63, 70);
        pdf.text(aLines, marginL + 15, y);
        y += aLines.length * 11 + 3;
      });
    }

    y += 10; // short space between certs
  });

  // Save the PDF locally on trigger
  pdf.save("olamide-david-professional-summary.pdf");
}
