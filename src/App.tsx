/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Linkedin, 
  Mail, 
  MapPin,
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
  Cpu,
  TrendingUp,
  Workflow,
  CheckCircle2,
  PhoneCall,
  GraduationCap,
  Award,
  Search,
  Database,
  Activity,
  Filter,
  BookOpen,
  Clock,
  Calendar,
  X,
  Menu,
  ArrowRight
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "./data/blog";
import { Certificate } from "./types";
import { CERTIFICATIONS } from "./data/certifications";
import CertificateModal from "./components/CertificateModal";
import olamideDavidProfile from "./assets/images/olamide_david_profile_custom.png";
import expertiseBg from "./assets/images/olamide_david_profile_custom.png";
import trafficTrendChart from "./assets/images/traffic_trend_chart_1780020783149.png";
import channelDistribution from "./assets/images/channel_distribution_1780020800007.png";
import geoDistribution from "./assets/images/geo_distribution_1780020824560.png";
import pipelineArchitecture from "./assets/images/pipeline_architecture_1780020844192.png";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { User, Lock, LogOut, Key, Check, FileText } from "lucide-react";

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

export function getGoogleDriveEmbedUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmedUrl = url.trim();
  if (trimmedUrl.includes("drive.google.com") || trimmedUrl.includes("docs.google.com")) {
    let fileId = "";
    // Pattern 1: /file/d/FILE_ID/view or /file/d/FILE_ID/edit
    const dPattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match1 = trimmedUrl.match(dPattern);
    if (match1 && match1[1]) {
      fileId = match1[1];
    } else {
      // Pattern 2: ?id=FILE_ID or &id=FILE_ID
      const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
      const match2 = trimmedUrl.match(idPattern);
      if (match2 && match2[1]) {
        fileId = match2[1];
      }
    }
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  return trimmedUrl;
}

const EXPERTISE = [
  { id: "01", title: "Marketing Strategy", desc: "Stop guessing. You'll get systematic B2B campaigns that turn cold objections directly into highly resonant messaging that drives conversions." },
  { id: "02", title: "Email Marketing", desc: "Nurture your leads automatically. You'll turn cold signups into warm prospects with automated email flows that do the heavy lifting for you." },
  { id: "03", title: "Leadership Development", desc: "Empower your team. Let's train your departments, streamline coordination, and supercharge quality so you hit every critical commercial deadline." },
  { id: "04", title: "Web Development", desc: "Get a secure, blazing-fast web experience. You'll have highly responsive pages and ironclad backends engineered specifically to convert your traffic." },
  { id: "05", title: "Business Analytics", desc: "Stop staring at confusing layouts. You can easily visualize metrics, spot leaks in your sales funnel, and boost your absolute ROI." },
  { id: "06", title: "Content Marketing", desc: "Speak directly to your reader's buying motives. You'll get sharp case studies and copywriting designed to make people trust you instantly." },
  { id: "07", title: "Lead Generation", desc: "Keep your pipeline flooded. You can plug automated outreach and lead scoring systems in to secure high-value sales calls while you sleep." },
  { id: "08", title: "Search Engine Optimization (SEO)", desc: "Be the answer when your customers search. You'll gain organic flow with crisp technical page optimization and high-authority visibility." }
];

const EXPERIENCE = [
  {
    id: "01",
    role: "Customer Insight and CRM focused Performance Marketing",
    company: "Freelance | Self-Employed",
    period: "Aug 2025 - Present \u00b7 11 mos",
    location: "Chester, England, United Kingdom \u00b7 Remote",
    description: "Feed customer objections back into marketing campaigns to improve messaging alignment. Structured CRM data to enable better lead qualification, segmentation and follow-up.",
    bullets: [],
    category: "CRM & Performance",
    tags: ["Customer Insight", "CRM", "Performance Marketing", "Lead Qualification", "Segmentation", "Objection Mapping"]
  },
  {
    id: "02",
    role: "Lead Generation and Email Automation",
    company: "Kushika Ventures",
    period: "Jan 2025 - May 2026 \u00b7 1 yr 5 mos",
    location: "Remote \u00b7 Full-time",
    description: "Fostered dynamic commercial scalability through technical setup of highly-responsive automation channels and email outreach.",
    bullets: [
      "Carried out day-to-day duties accurately and efficiently.",
      "Quickly learned and applied new skills to daily tasks, improving efficiency and productivity.",
      "Successfully delivered on tasks within tight deadlines.",
      "Offered friendly, efficient customer service and handled challenging situations with ease.",
      "Increased customer satisfaction by resolving issues.",
      "Cleaned work areas and equipment to maintain faultless hygiene standards."
    ],
    category: "Automation & Growth",
    tags: ["Lead Generation", "Email Automation", "Customer Satisfaction", "Teamwork", "Efficiency"]
  },
  {
    id: "03",
    role: "Custom CRM and Performance Marketing",
    company: "SOSV",
    period: "Feb 2024 - Jan 2026 \u00b7 2 yrs",
    location: "Remote \u00b7 Consulting",
    description: "Designed bespoke pipeline architectures and client consultation patterns to maximize satisfaction and retention rates.",
    bullets: [
      "Managed multiple projects simultaneously whilst ensuring timely completion and quality control.",
      "Recommended improvements on business processes for optimised performance and profitability.",
      "Liaised closely with clients throughout consulting process, ensuring satisfaction at every stage.",
      "Organised training sessions to enhance team performance.",
      "Implemented CRM systems to streamline operations.",
      "Participated actively in business strategy meetings, contributing valuable insights from a customer perspective."
    ],
    category: "CRM & Performance",
    tags: ["Project Management", "Consulting", "Process Optimization", "CRM Setup", "Business Strategy"]
  },
  {
    id: "04",
    role: "User Experience Designer",
    company: "RepuShield",
    period: "Jan 2022 - Nov 2025 \u00b7 3 yrs 11 mos",
    location: "Remote",
    description: "Elevated standard metrics of user engagement by combining usability research insights with high-fidelity interactive wireframes.",
    bullets: [
      "Improved site navigation by redesigning layout based on usability testing results.",
      "Conceptualised innovative site features, improving customer retention rates.",
      "Augmented brand identity through consistent UI elements across platforms.",
      "Developed wireframes, resulting in clear project visualisations.",
      "Led UX research initiatives, providing valuable insights into user behaviour and preferences.",
      "Delivered high-impact visuals using advanced graphic software tools."
    ],
    category: "UX & UI Design",
    tags: ["UX Research", "Usability Testing", "Wireframing", "Brand Identity", "Site Navigation"]
  },
  {
    id: "05",
    role: "Full Stack Engineer",
    company: "CustomFitForMe",
    period: "Jan 2024 - Feb 2025 \u00b7 1 yr 2 mos",
    location: "On-site \u00b7 Full-time",
    description: "Built robust backend services and implemented responsive frontend client components to secure end-to-end data pipelines.",
    bullets: [
      "Built robust backend services, improving data security and integrity.",
      "Collaborated closely with cross-functional teams to ensure seamless integration of front-end and back-end functionalities.",
      "Enhanced user experience by implementing responsive web design principles."
    ],
    category: "Technical & Engineering",
    tags: ["Backend Services", "Full Stack Development", "Data Security", "Responsive Design", "Troubleshooting", "Teamwork"]
  },
  {
    id: "06",
    role: "Automation Engineer",
    company: "TRleadershipHub",
    period: "Sep 2021 - Aug 2023 \u00b7 2 yrs",
    location: "Nigeria \u00b7 On-site \u00b7 Full-time",
    description: "Applied precision designs using advanced automation and modeling tools to secure budget constraints and teach junior developers.",
    bullets: [
      "Implemented sustainable building practices, promoting environmental responsibility.",
      "Presented design proposals to clients for approval and modification requests.",
      "Utilised advanced software tools like CAD and BIM for precision in designs.",
      "Managed budget constraints whilst maintaining high standards of design excellence.",
      "Assisted junior architects in their projects, fostering a learning environment at work."
    ],
    category: "Technical & Engineering",
    tags: ["CAD / BIM", "Sustainable Design", "Budget Optimization", "Troubleshooting", "Teamwork"]
  }
];

const EDUCATION = [
  {
    id: "01",
    degree: "Master of Science - MS, Information Technology & Systems Automation",
    institution: "University of Chester",
    period: "Oct 2023 – Sep 2024",
    grade: "Distinction",
    activities: "Student Liaison",
    description: [
      "Enterprise systems design, relational database modeling, and scalable workflow automation systems development.",
      "Data-driven modeling for customer tracking, optimizing platform integration layers, and systematic synchronization.",
      "Cross-functional communication pipelines connecting technical implementation plans directly with business stakeholders.",
      "Designing complex automated routing logic, building HubSpot CRM webhooks, and optimizing lead acquisition segments."
    ],
    skills: ["Collaborative Problem Solving", "Cross-functional Team Leadership", "Systematic Research", "Data Modeling"]
  },
  {
    id: "02",
    degree: "Bachelor of Science - BS, Technology Operations & Systems Management",
    institution: "Joseph Ayo Babalola University",
    period: "Jan 2013 – Apr 2017",
    grade: "",
    activities: "",
    description: [
      "Rigorous foundational coursework in database structures, web architectures, computer networks, and system design patterns.",
      "Practical deployment of automated process workflows, backend system testing, platform debugging, and strict data quality assurance."
    ],
    skills: ["Analytical Rigor", "Methodical Execution", "Technical Documentation", "Quality Control Protocols"]
  }
];

// CERTIFICATIONS imported dynamically from src/data/certifications.ts

const DETAILED_SKILLS: Array<{ name: string; category: string; contexts: string[]; desc: string; role?: string }> = [
  {
    name: "Pipeline Troubleshooting",
    category: "CRM & Automation",
    contexts: ["University of Chester", "Tech Systems Integration Group", "GTM Scale Partners", "Systems Automation Limited"],
    desc: "Systematically debugging technical errors in automated multi-step sequences, fixing API handshakes, and diagnosing data segmentation bottlenecks in HubSpot and Salesforce campaigns."
  },
  {
    name: "Performance Marketing",
    category: "Campaign Optimization",
    contexts: ["Performance Marketing", "University of Chester"],
    desc: "Deploying data-driven B2B customer acquisition campaigns, refining ad messaging layouts, and scaling ROI by weeding out redundant channels."
  },
  {
    name: "Email Automations",
    category: "CRM & Automation",
    contexts: ["Performance Marketing"],
    desc: "Configuring high-converting trigger actions, personalized customer journeys, automated newsletter templates, and cold pipeline follow-up sequences."
  },
  {
    name: "Search Engine Optimization (SEO)",
    category: "Campaign Optimization",
    contexts: ["Performance Marketing"],
    desc: "Improving ranking visibility with detailed on-page structural schemas, optimizing core web vitals, and producing user-centric search-focused documentation."
  },
  {
    name: "CRM Architecture",
    category: "CRM & Automation",
    contexts: ["Performance Marketing", "GTM Scale Partners"],
    desc: "Structuring contact fields, deal stages, and smart custom object records so executive teams have a single source of truth for all pipeline metrics."
  },
  {
    name: "Copywriting & Copy Audit",
    category: "Campaign Optimization",
    contexts: ["Performance Marketing"],
    desc: "Applying Johnny Thompson direct-response strategies and the AIDA formula to turn stale website sections into compelling, high-converting copy that hooks the reader."
  },
  {
    name: "B2B Lead Generation",
    category: "Campaign Optimization",
    contexts: ["Performance Marketing"],
    desc: "Operating automated target prospecting trackers, scrapers, and predictive scoring rules to systematically capture qualified enterprise signups."
  },
  {
    name: "Web Development",
    category: "CRM & Automation",
    contexts: ["University of Chester", "Performance Marketing"],
    desc: "Building clean, secure, and lightning-fast custom landing page experiences in React and Node.js with scalable backend configurations."
  },
  {
    name: "Marketing Analytics",
    category: "Analytics & Strategy",
    contexts: ["Performance Marketing", "University of Chester"],
    desc: "Evaluating email click-through rates, advertising conversion ratios, and pipeline velocity metrics to calculate precise multi-channel ROI."
  },
  {
    name: "Competitive Market Research",
    category: "Analytics & Strategy",
    contexts: ["University of Chester"],
    desc: "Compiling comprehensive B2B buyer behavior data, performing competitive gap audits, and finding messaging opportunities within crowded sectors."
  },
  {
    name: "Data Reporting & Visual Dashboards",
    category: "Analytics & Strategy",
    contexts: ["University of Chester", "Performance Marketing"],
    desc: "Designing easy-to-read performance reports and customized interactive dashboards that display live customer journey telemetry."
  },
  {
    name: "Conversion Rate Optimization (CRO)",
    category: "Analytics & Strategy",
    contexts: ["Performance Marketing"],
    desc: "Executing rapid A/B testing on pricing layouts, button positions, and risk-reversing copy elements based on detailed user activity patterns."
  },
  {
    name: "Team Leadership & Direct Training",
    category: "Management & Growth",
    contexts: ["Performance Marketing", "University of Chester"],
    desc: "Training staff, aligning communication across developer squads, and ensuring marketing operations execute key business milestones on schedule."
  },
  {
    name: "Collaborative Problem Solving",
    category: "Management & Growth",
    contexts: ["University of Chester", "Performance Marketing"],
    desc: "Working with product leads, design teams, and system engineers to debug pipeline blockages and optimize the digital user journey."
  },
  {
    name: "Cross-functional Alignment",
    category: "Management & Growth",
    contexts: ["University of Chester"],
    desc: "Acting as an intermediary between sales, product, and technical development groups to keep complex B2B projects synchronized."
  }
];

export interface GeoTarget {
  name: string;
  sector: string;
  lat: number;
  lng: number;
  score: number;
  leadStatus: "Prospect Identified" | "Outreach Program Active" | "Friction Point Mapped" | "Qualified - Meeting Set" | "CRM Pipeline Connected";
  objectionFriction: string;
  techStackAudit: string;
  leadAcquisitionScoring: number;
  contactPerson: string;
  estimatedRevPot: string;
  email?: string;
  BusinessName?: string;
  website?: string;
  Description?: string;
  "About Business"?: string;
}

function getHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateGeoTargets(query: string): GeoTarget[] {
  const normQuery = query.toLowerCase().trim() || "coffee shops in london";
  
  if (normQuery.includes("coffee") && normQuery.includes("london")) {
    return [
      {
        name: "The Artisan Brew Spot",
        sector: "Premium Retail Beverage & CRM Flow",
        lat: 51.5134,
        lng: -0.1368,
        score: 94,
        leadStatus: "Prospect Identified",
        objectionFriction: "High dynamic foot traffic, but zero automated retargeting sequences; drops ~40% of potential repeat customers.",
        techStackAudit: "Hubspot email deliverability settings fully optimized and verified.",
        leadAcquisitionScoring: 94,
        contactPerson: "Marcus Vance (General Manager)",
        estimatedRevPot: "£14,500/mo"
      },
      {
        name: "Kensington Roasters Co.",
        sector: "Client Retention Pipeline Audit",
        lat: 51.5014,
        lng: -0.1921,
        score: 88,
        leadStatus: "Outreach Program Active",
        objectionFriction: "Standard email list exists but lacks segment tags. Outreach currently blocked by authority-level pricing objections.",
        techStackAudit: "UTM tag parameters properly mapped and database sync verified.",
        leadAcquisitionScoring: 88,
        contactPerson: "Elena Rostova (Operations Director)",
        estimatedRevPot: "£18,200/mo"
      },
      {
        name: "Pancras Station Espresso",
        sector: "Commuter Density Lead Capture",
        lat: 51.5303,
        lng: -0.1253,
        score: 76,
        leadStatus: "Friction Point Mapped",
        objectionFriction: "Massive footfall count but low customer lifetime value. CRM loyalty onboarding sequence has a 75% cart drop-off rate.",
        techStackAudit: "Automated segment trigger rules fully configured and verified.",
        leadAcquisitionScoring: 76,
        contactPerson: "David Miller (Senior Partner)",
        estimatedRevPot: "£32,000/mo"
      },
      {
        name: "Shoreditch Grind Works",
        sector: "Freelance Cohort Growth Funnel",
        lat: 51.5262,
        lng: -0.0784,
        score: 91,
        leadStatus: "Qualified - Meeting Set",
        objectionFriction: "Strong organic review profile, but vulnerable to pricing pressure from co-working spots. Needs custom CRM lifecycle automation.",
        techStackAudit: "Ecosystem API pipeline test passed and custom webhook schema verified.",
        leadAcquisitionScoring: 91,
        contactPerson: "Femi Adebayo (Founder & CEO)",
        estimatedRevPot: "£21,000/mo"
      }
    ];
  }

  let keyword = "Business Target";
  let location = "London";
  
  if (normQuery.includes(" in ")) {
    const parts = normQuery.split(" in ");
    keyword = parts[0].trim();
    location = parts[1].trim();
  } else {
    const words = normQuery.split(" ");
    if (words.length > 1) {
      keyword = words[0];
      location = words.slice(1).join(" ");
    } else {
      keyword = normQuery;
    }
  }

  const capKW = keyword.replace(/\b\w/g, c => c.toUpperCase());
  const capLoc = location.replace(/\b\w/g, c => c.toUpperCase());
  
  const hash = getHashCode(normQuery);
  
  let baseLat = 51.5074;
  let baseLng = -0.1278;
  
  if (capLoc.toLowerCase().includes("york")) {
    baseLat = 40.7128;
    baseLng = -74.0060;
  } else if (capLoc.toLowerCase().includes("manchester")) {
    baseLat = 53.4808;
    baseLng = -2.2426;
  } else if (capLoc.toLowerCase().includes("leeds")) {
    baseLat = 53.8008;
    baseLng = -1.5491;
  } else if (capLoc.toLowerCase().includes("paris")) {
    baseLat = 48.8566;
    baseLng = 2.3522;
  } else if (capLoc.toLowerCase().includes("birmingham")) {
    baseLat = 52.4862;
    baseLng = -1.8904;
  } else {
    // Generate simple coordinates from hash
    baseLat = 50 + (hash % 100) / 10;
    baseLng = -2 + ((hash * 7) % 40) / 10;
  }

  const sectors = [
    "Localized Compliance Audit", 
    "High-Density Lead Optimization", 
    "CRM Staged System Alignment", 
    "Commercial Objections Analysis",
    "Automation & Diagnostics Calibration"
  ];

  const statuses: GeoTarget["leadStatus"][] = [
    "Prospect Identified", 
    "Outreach Program Active", 
    "Friction Point Mapped", 
    "Qualified - Meeting Set", 
    "CRM Pipeline Connected"
  ];

  const objectionFrictions = [
    "Unstable acquisition model. Funnel lacks a segmented email lifecycle, leading to major client leakage.",
    "Target expresses skepticism around custom platform pricing. CRM outreach sequence needs optimized case studies.",
    "Solid operational standards, but lacks optimized follow-up systems. Post-inquiry pipeline drops 55% of leads.",
    "SOP systems are run on analog logs, producing high checklist error rates. Customer pipeline requires automated alerts."
  ];

  const techStackAudits = [
    "HubSpot & Salesforce automation sync latency under 120ms.",
    "CRM custom field schemas aligned with UTM analytics parameters.",
    "Ecosystem API handshakes established and structurally verified.",
    "Lead scoring and database segmentation rules certified 100% accurate."
  ];

  const names = [
    `${capLoc} Allied ${capKW}`,
    `${capKW} Collective (${capLoc})`,
    `Standard ${capKW} Systems`,
    `Apex ${capKW} Partners (${capLoc})`
  ];

  const contacts = [
    "Arthur Pendelton (GTM Director)",
    "Sarah Jenkins (Operations Manager)",
    "Peter Sterling (Communications Officer)",
    "James Cole (Procurement Director)"
  ];

  return [0, 1, 2, 3].map(i => {
    const targetHash = hash + i * 313;
    const offsetLat = ((targetHash % 100) - 50) / 5000;
    const offsetLng = (((targetHash * 13) % 100) - 50) / 5000;
    const score = 70 + (targetHash % 28);
    const rev = 12000 + (targetHash % 38000);
    
    return {
      name: names[i % names.length],
      sector: sectors[(targetHash + i) % sectors.length],
      lat: Number((baseLat + offsetLat).toFixed(4)),
      lng: Number((baseLng + offsetLng).toFixed(4)),
      score: score,
      leadStatus: statuses[(targetHash + i) % statuses.length],
      objectionFriction: objectionFrictions[(targetHash + i) % objectionFrictions.length],
      techStackAudit: techStackAudits[(targetHash + i) % techStackAudits.length],
      leadAcquisitionScoring: score,
      contactPerson: contacts[i % contacts.length],
      estimatedRevPot: `£${rev.toLocaleString()}/mo`
    };
  });
}

function extractRawItems(raw: any): any[] {
  if (!raw) return [];

  // 1. If it's an array, process each item recursively and flatten
  if (Array.isArray(raw)) {
    const items: any[] = [];
    raw.forEach(item => {
      if (item && typeof item === "object" && ("json" in item || "data" in item)) {
        const nested = item.json ?? item.data;
        items.push(...extractRawItems(nested));
      } else {
        items.push(...extractRawItems(item));
      }
    });
    return items;
  }

  // 2. If it is an object
  if (typeof raw === "object") {
    // If it has a json or data property specifically (n8n single-item wrapper)
    if ("json" in raw || "data" in raw) {
      return extractRawItems(raw.json ?? raw.data);
    }

    // Check if it has a known array property that holds the records
    const arrayKeys = [
      "targets", "results", "leads", "data", "items", 
      "output", "businesses", "entities", "companies", 
      "records", "rows", "locations", "response"
    ];
    for (const key of arrayKeys) {
      if (key in raw && Array.isArray(raw[key])) {
        return extractRawItems(raw[key]);
      }
    }

    // If it looks like a direct single result (has some business/contact fields)
    const directKeys = ["BusinessName", "businessName", "name", "email", "contactEmail", "website", "url", "Description", "description", "About Business", "aboutBusiness"];
    const hasDirectFields = directKeys.some(k => k in raw);
    if (hasDirectFields) {
      return [raw];
    }

    // Check if any other property is an array and use that
    for (const key of Object.keys(raw)) {
      if (Array.isArray(raw[key])) {
        return extractRawItems(raw[key]);
      }
    }

    // Fallback: return the object as a single-element array
    return [raw];
  }

  // Fallback for primitives or strings
  return [];
}

export default function App() {
  const [activePage, setActivePage] = useState<"about" | "services" | "experience" | "certifications" | "tools" | "portfolio" | "blog" | "contact">("about");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // --- Portfolio Database Integration & Realtime Sync ---
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const portfolioProject = portfolioProjects.length > 0 
    ? (portfolioProjects[activeTabIndex] !== undefined ? portfolioProjects[activeTabIndex] : portfolioProjects[0])
    : null;

  const handleManualRefresh = async () => {
    setIsManualRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsManualRefreshing(false);
  };

  useEffect(() => {
    if (activeTabIndex >= portfolioProjects.length && portfolioProjects.length > 0) {
      setActiveTabIndex(0);
    }
  }, [portfolioProjects, activeTabIndex]);

  useEffect(() => {
    if (isConfigured) {
      // 1. Fetch the latest portfolio record from public.portfolio_projects
      const fetchPortfolio = async () => {
        try {
          const { data, error } = await supabase
            .from("portfolio_projects")
            .select("*")
            .order("updated_at", { ascending: false });

          if (error) {
            console.warn("Supabase Fetch Warn:", error.message);
            setPortfolioProjects([]);
          } else if (data && data.length > 0) {
            setPortfolioProjects(data as PortfolioProject[]);
          } else {
            setPortfolioProjects([]);
          }
        } catch (err) {
          console.error("Failed to connect to portfolio table:", err);
          setPortfolioProjects([]);
        }
      };

      fetchPortfolio();

      // 2. Setup database-triggered Realtime Subscription to update the interface instantly
      const channel = supabase
        .channel("portfolio-realtime-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "portfolio_projects"
          },
          (payload) => {
            console.log("Realtime payload received for portfolio_projects. Performing self-healing refetch:", payload);
            fetchPortfolio(); // Always refetch from the source of truth to ensure absolute parity
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setPortfolioProjects([]);
    }
  }, [isConfigured, refreshTrigger]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [activePage]);

  // Handle bidirectional URL routing and linking
  useEffect(() => {
    const handleUrlRouting = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      const hashParam = window.location.hash.replace("#", "");
      
      const targetPage = pageParam || hashParam;
      const validPages = ["about", "services", "experience", "certifications", "tools", "portfolio", "blog", "contact"];
      if (targetPage && validPages.includes(targetPage)) {
        setActivePage(targetPage as any);
      }
    };
    
    handleUrlRouting();
    window.addEventListener("hashchange", handleUrlRouting);
    return () => window.removeEventListener("hashchange", handleUrlRouting);
  }, []);

  useEffect(() => {
    const validPages = ["about", "services", "experience", "certifications", "tools", "portfolio", "blog", "contact"];
    if (validPages.includes(activePage)) {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash !== activePage) {
        window.history.replaceState(null, "", `#${activePage}`);
      }
    }
  }, [activePage]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogCategory, setBlogCategory] = useState("All");
  const [blogSearch, setBlogSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [geoSearchPhrase, setGeoSearchPhrase] = useState("coffee shops in London");
  const [geoActiveQuery, setGeoActiveQuery] = useState("coffee shops in London");
  const [isSearchingGeo, setIsSearchingGeo] = useState(false);
  const [searchGeoStep, setSearchGeoStep] = useState(0);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(0);
  const [activeGeoTargets, setActiveGeoTargets] = useState<GeoTarget[]>(() => generateGeoTargets("coffee shops in London"));
  const [webhookStatus, setWebhookStatus] = useState<string>("");
  const [webhookRawResponse, setWebhookRawResponse] = useState<any>(null);

  // --- Supabase Authentication States & Initialization ---
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<{ email: string; id?: string; isSimulated?: boolean } | null>(null);

  useEffect(() => {
    if (isConfigured) {
      // Fetch initial user session
      supabase.auth.getUser().then(({ data: { user: supabaseUser } }) => {
        if (supabaseUser) {
          setUser({ email: supabaseUser.email || "", id: supabaseUser.id });
        }
      });

      // Set up authentication listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email || "", id: session.user.id });
        } else {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Check if there is a simulated user stored in localStorage
      const storedUser = localStorage.getItem("simulated_supabase_user");
      if (storedUser) {
        setUser({ email: storedUser, isSimulated: true });
      }
    }
  }, [isConfigured]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);
    setAuthLoading(true);

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError("Email and Password are required.");
      setAuthLoading(false);
      return;
    }

    if (authMode === "signup" && authPassword !== authConfirmPassword) {
      setAuthError("Passwords do not match.");
      setAuthLoading(false);
      return;
    }

    try {
      if (isConfigured) {
        if (authMode === "signup") {
          const { data, error } = await supabase.auth.signUp({
            email: authEmail,
            password: authPassword,
          });
          if (error) throw error;
          
          if (data.session) {
            setUser({ email: data.session.user.email || "", id: data.session.user.id });
            setAuthSuccessMsg("Account successfully created and logged in!");
          } else {
            setAuthSuccessMsg("Registration successful! Please check your email inbox to verify your account.");
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password: authPassword,
          });
          if (error) throw error;
          if (data.user) {
            setUser({ email: data.user.email || "", id: data.user.id });
            setAuthSuccessMsg("Successfully signed in!");
            setTimeout(() => {
              setIsAuthModalOpen(false);
              setAuthSuccessMsg(null);
              setAuthEmail("");
              setAuthPassword("");
            }, 800);
          }
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        localStorage.setItem("simulated_supabase_user", authEmail);
        setUser({ email: authEmail, isSimulated: true });
        setAuthSuccessMsg(authMode === "signup" ? "Success (Simulated): Account created!" : "Success (Simulated): Signed in successfully!");
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setAuthSuccessMsg(null);
          setAuthEmail("");
          setAuthPassword("");
          setAuthConfirmPassword("");
        }, 1200);
      }
    } catch (err: any) {
      setAuthError(err.message || "An authentication error occurred.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (isConfigured) {
        await supabase.auth.signOut();
      } else {
        localStorage.removeItem("simulated_supabase_user");
      }
      setUser(null);
      setAuthSuccessMsg("Successfully logged out.");
      setTimeout(() => {
        setAuthSuccessMsg(null);
        setIsAuthModalOpen(false);
      }, 800);
    } catch (err: any) {
      setAuthError(err.message || "Sign out failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleExecuteGeoSearch = async (phrase: string) => {
    if (!user) {
      setAuthMode("signup");
      setIsAuthModalOpen(true);
      return;
    }
    if (!phrase.trim()) return;
    setGeoSearchPhrase(phrase);
    setIsSearchingGeo(true);
    setSearchGeoStep(1);
    setWebhookStatus("Initiating SerpAPI proxy session...");
    setWebhookRawResponse(null);
    
    try {
      // Step 2: Establish connection and send payload
      await new Promise(resolve => setTimeout(resolve, 600));
      setSearchGeoStep(2);
      setWebhookStatus("Connecting to Google Maps index via SerpAPI...");
      
      const response = await fetch("/api/proxy-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phrase: phrase
        })
      });
      
      setSearchGeoStep(3);
      setWebhookStatus("Retrieving real geographic matches...");
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Proxy responded with status ${response.status}`);
      }
      
      const result = await response.json();
      const data = result.data;
      setWebhookRawResponse(result);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSearchingGeo(false);
      setSearchGeoStep(0);
      setGeoActiveQuery(phrase);
      setSelectedTargetIndex(0);
      
      // Parse data and update geo targets using recursive array extractor
      const rawItems = extractRawItems(data);
      
      // Map raw items into beautiful GeoTargets
      if (rawItems.length > 0) {
        const parsedTargets: GeoTarget[] = rawItems.map((item: any, idx: number) => {
          const name = String(item.BusinessName || item.businessName || item.name || item.title || `Opportunity [T-${idx + 1}]`);
          const sector = String(item.sector || item.category || "Target Market Entity");
          const lat = Number(item.lat || item.latitude || (51.5134 + (idx * 0.012) - 0.005));
          const lng = Number(item.lng || item.longitude || (-0.1368 + (idx * 0.012) - 0.005));
          const score = Number(item.score || item.leadAcquisitionScoring || 90 - (idx * 4) % 15);
          
          const rawEmail = item.email || item.contactEmail || "";
          const email = String(rawEmail);
          const website = String(item.website || item.url || item.link || "");
          const description = String(item.Description || item.description || "[null]");
          const aboutBusiness = String(item["About Business"] || item.aboutBusiness || item.about || "");
          
          // Format backup strings if they aren't provided by webhook
          const descVal = description && description !== "[null]" ? description : "Pipeline registered. Webhook synchronized custom intelligence records.";
          const contactPerson = email && email !== "[null]" ? email : "Marcus Vance (General Manager / Lead Contact)";
          const techStackAudit = aboutBusiness && aboutBusiness !== "[null]" ? `About Business: "${aboutBusiness}"` : "Compliant with HubSpot CRM integration benchmarks.";
          const objectionFriction = descVal.startsWith("Description:") ? descVal : `Description: "${descVal}"`;

          return {
            name,
            sector,
            lat,
            lng,
            score: isNaN(score) ? 88 : score,
            leadStatus: "Qualified - Meeting Set",
            objectionFriction,
            techStackAudit,
            leadAcquisitionScoring: isNaN(score) ? 88 : score,
            contactPerson,
            estimatedRevPot: item.estimatedRevPot || item.revenue || "£14,500/mo",
            
            // Webhook specific fields
            email: email || undefined,
            BusinessName: name,
            website: website || undefined,
            Description: description || undefined,
            "About Business": aboutBusiness || undefined
          };
        });
        
        setActiveGeoTargets(parsedTargets);
        setWebhookStatus(`Successfully parsed ${parsedTargets.length} local results from Google Maps.`);
      } else if (typeof data === "string" && data.length > 0) {
        const derived = generateGeoTargets(phrase);
        if (derived.length > 0) {
          derived[0].objectionFriction = `SerpAPI Raw Response: "${data}"`;
          derived[0].contactPerson = "SerpAPI Response String";
        }
        setActiveGeoTargets(derived);
        setWebhookStatus(`Response received from SerpAPI query: "${data.substring(0, 40)}${data.length > 40 ? '...' : ''}"`);
      } else {
        setActiveGeoTargets(generateGeoTargets(phrase));
        setWebhookStatus("Processed query successfully (No custom results from SerpAPI).");
      }
      
    } catch (err: any) {
      console.error("SerpAPI processing error:", err);
      setWebhookRawResponse({ success: false, error: err.message || String(err), simulatedFallback: true });
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSearchingGeo(false);
      setSearchGeoStep(0);
      setGeoActiveQuery(phrase);
      setSelectedTargetIndex(0);
      
      const errTargets = generateGeoTargets(phrase);
      if (errTargets.length > 0) {
        if (err.message && err.message.includes("SERP_API_KEY")) {
          errTargets[0].name = "⚠ SerpAPI Credentials Needed";
          errTargets[0].objectionFriction = "Description: 'Please provide your Google SerpAPI Key inside the Settings Secrets panel in AI Studio.'";
          errTargets[0].contactPerson = "Setup Action Required";
        } else {
          errTargets[0].name = "⚠ Connection Offline";
          errTargets[0].objectionFriction = `Description: 'Failed to complete call: ${err.message || "Unknown error"}.'`;
          errTargets[0].contactPerson = "Network State Block";
        }
      }
      setActiveGeoTargets(errTargets);
      setWebhookStatus(`SerpAPI query fallback activated. Reason: ${err.message || 'CORS/API Credentials'}`);
    }
  };

  const filteredSkills = DETAILED_SKILLS.filter(skill => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.contexts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredBlogPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = blogCategory === "All" || post.category === blogCategory;
    const matchesSearch = post.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          post.summary.toLowerCase().includes(blogSearch.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full overflow-x-hidden bg-black text-zinc-300 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Background glow meshes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] -z-10"></div>
      <div className="absolute bottom-[10%] left-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] -z-10"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-8">
          <button 
            onClick={() => { setActivePage("about"); setIsMobileMenuOpen(false); }} 
            className="text-base lg:text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent border-none p-0 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Olamide David
          </button>
          <div className="hidden md:flex items-center gap-3 lg:gap-6 text-[10px] lg:text-xs font-semibold uppercase tracking-wider">
            {[
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "experience", label: "Experience" },
              { id: "certifications", label: "Certifications" },
              { id: "tools", label: "Tools" },
              { id: "portfolio", label: "Portfolio" },
              { id: "blog", label: "Publications" },
              { id: "contact", label: "Contact" }
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id as any)}
                className={`transition-colors relative py-1.5 cursor-pointer focus:outline-none whitespace-nowrap ${
                  activePage === page.id 
                    ? "text-emerald-400 font-bold" 
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {page.label}
                {activePage === page.id && (
                  <motion.span 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActivePage("contact")} 
            className="hidden md:inline-block px-3 py-1.5 lg:px-5 lg:py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] focus:outline-none cursor-pointer border-none whitespace-nowrap"
          >
            Let's Talk
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-zinc-400 hover:text-white md:hidden cursor-pointer focus:outline-none z-50 bg-transparent border-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
 
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl md:hidden pt-28 px-8 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4 text-base font-bold uppercase tracking-wider text-zinc-400">
              {[
                { id: "about", label: "About" },
                { id: "services", label: "Services & Skills" },
                { id: "experience", label: "Experience & Education" },
                { id: "certifications", label: "Certifications" },
                { id: "tools", label: "Tools & Terminal" },
                { id: "portfolio", label: "Portfolio" },
                { id: "blog", label: "Publications" },
                { id: "contact", label: "Contact" }
              ].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => {
                    setActivePage(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-3 border-b border-white/5 flex items-center justify-between cursor-pointer focus:outline-none bg-transparent ${
                    activePage === item.id ? "text-emerald-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className={activePage === item.id ? "text-emerald-500" : "text-zinc-600"} />
                </motion.button>
              ))}
            </div>
 
            <div className="flex flex-col gap-3">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <User size={14} className="animate-pulse" />
                  <span className="max-w-[200px] truncate">{user.email} (Profile)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode("signin");
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-white/10 bg-zinc-900/40 text-zinc-300 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <User size={14} />
                  <span>Sign In / Sign Up</span>
                </button>
              )}

              <button 
                onClick={() => {
                  setActivePage("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer border-none"
              >
                Let's Talk
              </button>
              <div className="flex justify-center gap-8 text-zinc-500 pt-4 border-t border-white/5">
                <a href="https://www.linkedin.com/in/olamide-david/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin size={20} /> <span className="text-xs">LinkedIn</span>
                </a>
                <a href="mailto:olamideruth387@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={20} /> <span className="text-xs">Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Quick Social / Navigation */}
      <div className="fixed left-6 bottom-12 z-40 hidden lg:flex flex-col gap-6 text-zinc-500">
        <a href="https://www.linkedin.com/in/olamide-david/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group">
          <Linkedin size={18} />
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Linkedin</span>
        </a>
        <a href="mailto:olamideruth387@gmail.com" className="hover:text-white transition-colors flex items-center gap-2 group">
          <Mail size={18} />
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
        </a>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          {activePage === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 relative">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center w-full max-w-6xl">
            {/* Visual Column */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-72 h-96 lg:w-80 lg:h-[420px]"
              >
                <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl transform rotate-3 -z-10"></div>
                <div className="absolute inset-0 border border-orange-500/10 rounded-2xl transform -rotate-2 -z-10"></div>
                <img 
                  src={olamideDavidProfile}
                  alt="Olamide David"
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Text Heading Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-emerald-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Systems Automation & Digital Growth</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
              >
                Olamide<br />
                <span className="text-emerald-400">David.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl"
              >
                You're paying high database fees for contacts that sit there and rot in your CRM. Let's fix that. You'll get standard-setting analytical precision applied directly to your sales funnel to qualify, segment, and convert your leads.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="pt-4 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActivePage("contact")}
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase tracking-wider text-xs rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 cursor-pointer border-none"
                  >
                    Claim Your Free 15-Minute Pipeline Audit
                  </button>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded border border-emerald-500/10 font-bold uppercase tracking-widest animate-pulse">
                    Only 3 spots left this week
                  </span>
                </div>
                <p className="text-[10px] font-mono text-zinc-500">
                  ⚡ Completely free. A raw, honest breakdown of your pipeline leakages. No strings attached.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro Highlight Row */}
        <section className="py-24 border-y border-white/5 bg-zinc-950/20 -mx-6 px-6">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="max-w-4xl"
          >
            <span className="text-xs font-mono text-zinc-650 tracking-wider mb-2 block uppercase">// YOUR ADVANTAGE</span>
            <p className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-100 leading-tight">
              You don't need another generic agencies speaking fluff. You need a standard of <span className="text-emerald-400 font-medium font-sans">absolute, analytical precision</span> that turns your messy CRM data into <span className="text-orange-400 font-medium font-mono">predictable, ready-to-buy pipelines</span>.
            </p>
          </motion.div>
        </section>
      </motion.div>
    )}

        {activePage === "services" && (
          <motion.div
            key="services-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Services Grid */}
        <section id="services" className="py-32 relative">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Scalable Solutions</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8 animate-fadeIn">
                How you can<br />
                <span className="text-emerald-400 font-sans">scale today.</span>
              </h2>
              <p className="text-zinc-400 max-w-sm text-base leading-relaxed mb-12">
                Stop losing warm, ready-to-buy prospects to messy trackers or weak email setup. You'll get systematic CRM alignment, automated email sequences, and high-performance digital marketing campaigns.
              </p>

              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                <img 
                  src={expertiseBg} 
                  alt="Professional Services & Execution"
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPERTISE.map((item) => (
                <div key={item.id} className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-emerald-500">{item.id}</span>
                    <h4 className="text-white font-bold tracking-tight text-lg">{item.title}</h4>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

          </motion.div>
        )}

        {activePage === "experience" && (
          <motion.div
            key="experience-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Experience Timeline Section (Converted from Experiments) */}
            <section id="experience" className="py-32 border-t border-white/5 relative bg-zinc-950/30 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
               <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Career & Milestones</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                 Professional Experience
               </h2>
               <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                 A robust record of performance marketing, CRM development, user experience design, and automation engineering.
               </p>
            </div>

            <div className="space-y-8">
              {EXPERIENCE.map((job) => (
                <div 
                  key={job.id} 
                  className="group p-8 rounded-3xl bg-zinc-900/10 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:bg-zinc-900/20"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Prefix and Period */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-zinc-600 font-bold">{job.id}</span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold tracking-wider">
                          {job.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-400">{job.period}</p>
                      <span className="text-xs text-zinc-600 mt-1 block flex items-center gap-1.5">
                        <MapPin size={12} className="text-emerald-500/60" /> {job.location.split(' \u00b7 ')[0]}
                      </span>
                    </div>

                    {/* Role Description */}
                    <div className="lg:col-span-9 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors flex flex-wrap items-center gap-2 md:gap-3">
                          <span>{job.role}</span>
                          <span className="text-zinc-500 font-light text-xl">/</span>
                          <span className="text-lg font-medium text-emerald-500/90">{job.company}</span>
                        </h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                        {job.description}
                      </p>

                      {job.bullets && job.bullets.length > 0 && (
                        <ul className="list-none space-y-2 mt-4 pl-0">
                          {job.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="text-zinc-400 text-xs leading-relaxed flex items-start gap-2 max-w-3xl">
                              <span className="text-emerald-500 font-bold select-none mt-0.5">▪</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-zinc-950 border border-white/5 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Timeline Section */}
        <section id="education" className="py-32 border-t border-white/5 relative bg-zinc-950/20 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
               <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Academic Background</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] flex items-center gap-4">
                 Education
               </h2>
               <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                 Rigorous academic training in database architecture, software automation development, campaign metrics, and growth operations.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {EDUCATION.map((edu) => (
                <div 
                  key={edu.id} 
                  className="group p-8 rounded-3xl bg-zinc-900/10 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:bg-zinc-900/20 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-zinc-600 font-bold">{edu.id}</span>
                          <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold tracking-wider">
                            {edu.id === "01" ? "Postgraduate" : "Undergraduate"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-emerald-500/90 font-medium text-sm mt-1">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-zinc-500 flex flex-wrap gap-4 border-t border-b border-white/5 py-3">
                      <div>
                        <span className="text-zinc-600 uppercase tracking-wider block text-[9.5px] mb-0.5">Timeline</span>
                        <span className="text-zinc-400">{edu.period}</span>
                      </div>
                      {edu.grade && (
                        <div>
                          <span className="text-zinc-600 uppercase tracking-wider block text-[9.5px] mb-0.5">Grade</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Award size={12} /> {edu.grade}
                          </span>
                        </div>
                      )}
                      {edu.activities && (
                        <div>
                          <span className="text-zinc-600 uppercase tracking-wider block text-[9.5px] mb-0.5">Activities & Societies</span>
                          <span className="text-zinc-400">{edu.activities}</span>
                        </div>
                      )}
                    </div>

                    {edu.description && edu.description.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-emerald-500" /> // Key Studies & Core Focus
                        </p>
                        <ul className="space-y-2 text-zinc-400 text-xs leading-relaxed pl-4 list-disc marker:text-emerald-500">
                          {edu.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/5">
                    {edu.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-zinc-950 border border-white/5 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Licenses & Certifications Section */}
        <section id="certifications" className="py-32 border-t border-white/5 relative bg-zinc-950/10 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
               <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Professional Credentials</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                 Licenses &amp; Certifications
               </h2>
               <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                 Industry-recognized credentials validating execution standards in B2B performance marketing, product strategy, and AI systems.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <div 
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group p-6 rounded-2xl bg-zinc-900/10 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:bg-zinc-900/20 flex flex-col justify-between h-full animate-fadeIn cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Award size={18} />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 font-bold">
                        [{cert.id}]
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase min-h-[40px]">
                        {cert.title}
                      </h3>
                      <p className="text-emerald-500/90 font-medium text-xs">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Miniature interactive preview thumb representation of certificate */}
                    <div className="relative mt-3 aspect-[1.414/1] w-full rounded-lg bg-zinc-950 border border-white/10 p-2.5 overflow-hidden group-hover:border-emerald-500/20 transition-all flex flex-col justify-between text-[4px] leading-tight select-none">
                      {cert.logoType === "alison" ? (
                        <div className="h-full flex gap-1 text-[2.5px]">
                          <div className="w-1/4 h-full bg-emerald-500/15 border-r border-emerald-500/10 flex flex-col justify-between py-1 -mt-2 -mb-2 -ml-2">
                            <div className="w-2.5 h-2.5 rounded-full border border-emerald-500/30 flex items-center justify-center bg-white mx-auto mt-1 text-[2.5px] font-sans font-bold text-emerald-700 p-0.5">CPD</div>
                            <span className="text-[2.5px] text-center font-mono text-zinc-500">2026</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-between pl-1">
                            <div className="flex justify-between font-sans">
                              <span className="font-bold text-emerald-400 text-[3.5px]">Alison</span>
                              <span className="text-zinc-600 font-mono text-[2.5px]">CPD Validated</span>
                            </div>
                            <div className="text-center font-sans space-y-0.5">
                              <span className="block text-[3.5px] font-bold text-zinc-300">OLAMIDE RUTH DAVID</span>
                              <span className="block text-[2px] text-zinc-500 uppercase max-w-[80px] mx-auto truncate font-sans">{cert.title}</span>
                            </div>
                            <div className="flex justify-between text-[2px] text-zinc-600">
                              <span>ID: {cert.verifyId}</span>
                              <span className="italic">Authorized Sign</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col justify-between text-[2.5px] border border-white/5 p-1 relative">
                          <div className="flex justify-between items-center border-b border-white/5 pb-0.5 font-sans">
                            <span className="font-bold text-zinc-300 uppercase">{cert.issuer.split(" & ")[0]}</span>
                            <span className="text-sky-400 text-[3.5px] font-serif italic text-right">coursera</span>
                          </div>
                          <div className="text-center space-y-0.5 py-1">
                            <span className="block text-[3.5px] font-black text-zinc-200">Olamide Ruth David</span>
                            <span className="block text-[2px] text-zinc-500 font-sans max-w-[120px] mx-auto truncate leading-tight uppercase font-medium">{cert.title}</span>
                          </div>
                          <div className="flex justify-between items-end text-[2px] text-zinc-600">
                            <span>{cert.date}</span>
                            <span className="text-[2.5px] text-sky-400 font-semibold font-mono">Verify Cert</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Cool Hover zoom overlay icon hint */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-2.5 py-1 rounded bg-emerald-500 text-black font-sans font-bold text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                          Read Certificate <ArrowUpRight size={8} />
                        </span>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
                      <Calendar size={12} className="text-zinc-600" />
                      <span>{cert.date}</span>
                    </div>

                    <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10 px-2.5 py-1 rounded-md transition-colors font-medium">
                      Show credential <ArrowUpRight size={10} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

          </motion.div>
        )}

        {activePage === "certifications" && (
          <motion.div
            key="certifications-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Credentials Validation Registry */}
            <section className="py-24 sm:py-32 relative px-6 -mx-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                  <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Credentials Validation Registry</span>
                  <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                    Professional Registry &amp; Certifications
                  </h2>
                  <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                    Authorized and verified technical licenses and competencies reflecting standard execution across growth stages, marketing automation engines, and machine learning/AI agent integrations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CERTIFICATIONS.map((cert) => (
                    <div 
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="group p-6 rounded-2xl bg-zinc-900/10 border border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:bg-zinc-900/20 flex flex-col justify-between h-full animate-fadeIn cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <Award size={18} />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 font-bold">
                            [{cert.id}]
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase min-h-[40px]">
                            {cert.title}
                          </h3>
                          <p className="text-emerald-500/90 font-medium text-xs">
                            {cert.issuer}
                          </p>
                    {/* Miniature interactive preview thumb representation of certificate */}
                        <div className="relative mt-4 aspect-[1.414/1] w-full rounded-xl bg-white border border-zinc-200 p-1.5 overflow-hidden shadow-md group-hover:border-emerald-500 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)] transition-all flex flex-col justify-between text-[4px] leading-tight select-none">
                          {cert.logoType === "alison" && (
                            <div className="h-full flex gap-1 text-[2.5px] p-0.5 border-[1.5px] border-double border-[#005B4C]/45 rounded relative bg-white text-zinc-800">
                              <div className="absolute inset-0 bg-[#E5F6EE]/20 -z-10" />
                              <div className="w-[20%] h-full bg-[#E5F6EE] border-r border-[#005B4C]/25 flex flex-col justify-between py-1 -mt-1 -mb-1 -ml-1 shrink-0">
                                <div className="w-3 h-3 rounded-full border border-[#005B4C]/30 flex items-center justify-center bg-white mx-auto text-[2.5px] font-sans font-bold text-[#4B0082] p-0.5 leading-none shrink-0">CPD</div>
                                <span className="text-[2px] text-center font-mono font-bold text-zinc-500">{cert.date.split(" ").pop()}</span>
                              </div>
                              <div className="flex-1 flex flex-col justify-between pl-1">
                                <div className="flex justify-between font-sans items-center">
                                  <span className="font-extrabold text-[#00A383] text-[4.5px]">Alison</span>
                                  <span className="text-zinc-400 font-mono text-[2.5px] uppercase font-bold">CPD Certified</span>
                                </div>
                                <div className="text-center font-sans space-y-0.5 my-auto">
                                  <span className="block text-[4.2px] font-black text-zinc-800 uppercase tracking-wide leading-none">OLAMIDE RUTH DAVID</span>
                                  <span className="block text-[2.5px] text-zinc-500 uppercase max-w-[85px] mx-auto truncate font-sans font-semibold">{cert.title}</span>
                                </div>
                                <div className="flex justify-between text-[2px] text-zinc-500 font-mono items-end border-t border-zinc-100 pt-0.5">
                                  <span>ID: {cert.verifyId}</span>
                                  <span className="italic font-serif font-bold text-zinc-700">M. Richardson</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {cert.logoType === "wiley" && (
                            <div className="h-full flex flex-col justify-between text-[2.5px] border border-zinc-200/60 p-1 relative bg-white text-zinc-800 rounded">
                              <div className="absolute inset-0.5 border border-dashed border-zinc-100 pointer-events-none -z-10" />
                              <div className="flex justify-between items-center border-b border-zinc-150 pb-0.5 font-sans">
                                <div className="flex items-center gap-0.5">
                                  <div className="w-3 h-3 rounded-full border border-emerald-500/30 flex items-center justify-center bg-white text-emerald-600 text-[3.5px] font-serif font-black shadow-sm">W</div>
                                  <span className="font-black text-zinc-800 uppercase text-[3.5px] font-serif tracking-tighter">WILEY</span>
                                </div>
                                <span className="text-sky-600 text-[4px] font-sans font-black italic text-right leading-none">coursera</span>
                              </div>
                              <div className="text-center space-y-0.5 py-1 my-auto">
                                <p className="text-[2px] text-zinc-400 leading-none">{cert.date.replace("Issued ", "")}</p>
                                <span className="block text-[4.5px] font-black text-zinc-900 font-serif leading-none mt-0.5">Olamide Ruth David</span>
                                <span className="block text-[2.5px] text-zinc-550 font-sans max-w-[110px] mx-auto truncate leading-tight uppercase font-medium">{cert.title}</span>
                              </div>
                              <div className="flex justify-between items-end text-[2px] text-zinc-400 font-mono border-t border-zinc-100 pt-0.5">
                                <span>Wiley Skills Network</span>
                                <span className="text-[2.5px] text-sky-600 font-bold font-mono">Verify Cert</span>
                              </div>
                            </div>
                          )}

                          {cert.logoType === "packt" && (
                            <div className="h-full flex flex-col justify-between text-[2.5px] border border-zinc-200/60 p-1 relative bg-white text-zinc-800 rounded">
                              <div className="absolute inset-0.5 border border-dashed border-zinc-100 pointer-events-none -z-10" />
                              <div className="flex justify-between items-center border-b border-zinc-150 pb-0.5 font-sans">
                                <span className="font-extrabold text-[#F05A28] uppercase text-[4.5px] tracking-tighter font-mono">&lt;packt&gt;</span>
                                <span className="text-sky-600 text-[4px] font-sans font-black italic text-right leading-none">coursera</span>
                              </div>
                              <div className="text-center space-y-0.5 py-1 my-auto">
                                <p className="text-[2px] text-zinc-400 leading-none">{cert.date.replace("Issued ", "")}</p>
                                <span className="block text-[4.5px] font-black text-zinc-900 font-serif leading-none mt-0.5">Olamide Ruth David</span>
                                <span className="block text-[2.5px] text-zinc-550 font-sans max-w-[110px] mx-auto truncate leading-tight uppercase font-medium">{cert.title}</span>
                              </div>
                              <div className="flex justify-between items-end text-[2px] text-zinc-400 font-mono border-t border-zinc-100 pt-0.5">
                                <span>Packt Editorial Board</span>
                                <span className="text-[2.5px] text-sky-600 font-bold font-mono">Verify Cert</span>
                              </div>
                            </div>
                          )}

                          {cert.logoType === "hubspot" && (
                            <div className="h-full flex flex-col justify-between text-[2.5px] border border-zinc-200/60 p-1 relative bg-white text-zinc-800 rounded">
                              <div className="absolute inset-0.5 border border-dashed border-zinc-100 pointer-events-none -z-10" />
                              <div className="flex justify-between items-center border-b border-zinc-150 pb-0.5 font-sans">
                                <span className="text-sky-600 text-[4px] font-sans font-black italic text-left leading-none">coursera</span>
                                <span className="text-zinc-500 text-[3.5px] font-sans text-right uppercase font-bold tracking-tighter leading-none">PROJECT CERT</span>
                              </div>
                              <div className="text-center space-y-0.5 py-1 my-auto">
                                <p className="text-[2px] text-zinc-400 leading-none">{cert.date.replace("Issued ", "")}</p>
                                <span className="block text-[4.5px] font-black text-zinc-900 font-serif leading-none mt-0.5">Olamide Ruth David</span>
                                <span className="block text-[2.5px] text-zinc-550 font-sans max-w-[110px] mx-auto truncate leading-tight uppercase font-medium">{cert.title}</span>
                              </div>
                              <div className="flex justify-between items-end text-[2px] text-zinc-400 font-mono border-t border-zinc-100 pt-0.5">
                                <span>HubSpot Partner</span>
                                <span className="text-[2.5px] text-sky-600 font-bold font-mono">Verify Cert</span>
                              </div>
                            </div>
                          )}

                          {cert.logoType === "maryland" && (
                            <div className="h-full flex flex-col justify-between text-[2.5px] border border-zinc-200/60 p-1 relative bg-white text-zinc-800 rounded">
                              <div className="absolute inset-0.5 border border-dashed border-zinc-100 pointer-events-none -z-10" />
                              <div className="flex justify-between items-center border-b border-zinc-150 pb-0.5 font-sans">
                                <div className="flex flex-col leading-none">
                                  <span className="text-[#E03A3E] font-black font-sans text-[2px] leading-none">UNIVERSITY OF</span>
                                  <span className="font-extrabold text-zinc-950 uppercase text-[2.8px] leading-none mt-0.5">MARYLAND</span>
                                </div>
                                <span className="text-sky-600 text-[4px] font-sans font-black italic text-right leading-none">coursera</span>
                              </div>
                              <div className="text-center space-y-0.5 py-1 my-auto">
                                <p className="text-[2px] text-zinc-400 leading-none">{cert.date.replace("Issued ", "")}</p>
                                <span className="block text-[4.5px] font-black text-zinc-900 font-serif leading-none mt-0.5">Olamide Ruth David</span>
                                <span className="block text-[2.5px] text-zinc-550 font-sans max-w-[110px] mx-auto truncate leading-tight uppercase font-medium">{cert.title}</span>
                              </div>
                              <div className="flex justify-between items-end text-[2px] text-zinc-400 font-mono border-t border-zinc-100 pt-0.5">
                                <span>UMD College Park</span>
                                <span className="text-[2.5px] text-sky-600 font-bold font-mono">Verify Cert</span>
                              </div>
                            </div>
                          )}

                          {cert.logoType === "pma" && (
                            <div className="h-full flex flex-col justify-between text-[2.5px] border border-zinc-200/50 p-1 relative bg-white text-zinc-800 rounded">
                              <div className="flex justify-between items-center border-b border-zinc-100 pb-0.5 font-sans">
                                <span className="text-[2.2px] font-bold text-blue-600 font-sans uppercase">Graded Assignment</span>
                                <span className="text-emerald-600 font-mono text-[2.8px] font-black uppercase">100% Score</span>
                              </div>
                              <div className="text-center space-y-0.5 py-0.5 my-auto">
                                <span className="block text-[3.5px] font-black text-[#002664] font-sans truncate leading-none uppercase max-w-[105px] mx-auto">{cert.title}</span>
                                <span className="block text-[2px] text-zinc-400 font-sans leading-none mt-0.5">Status: PASSED (Submitted May 10)</span>
                              </div>
                              <div className="flex justify-between items-center text-[2px] text-zinc-500 border-t border-zinc-150 pt-0.5">
                                <span className="flex items-center gap-0.5 font-sans text-[2px] font-bold">📅 Due Jun 15</span>
                                <span className="text-blue-600 font-bold font-mono">View Report</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Hover zoom overlay icon hint */}
                          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-2.5 py-1 rounded bg-emerald-500 text-black font-sans font-bold text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                              Read Certificate <ArrowUpRight size={8} />
                            </span>
                          </div>
                        </div>            </div>

                      </div>

                      <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
                          <Calendar size={12} className="text-zinc-600" />
                          <span>{cert.date}</span>
                        </div>

                        <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10 px-2.5 py-1 rounded-md transition-colors font-medium">
                          Show credential <ArrowUpRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activePage === "services" && (
          <motion.div
            key="skills-matrix-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Skills Validation Section */}
            <section id="skills" className="py-32 border-t border-white/5 relative bg-black/40 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
               <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Competency Validation</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                 Skills & Practice Matrix
               </h2>
               <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                 A comprehensive layout of validated technical proficiencies mapped directly to proven performance across enterprise B2B pipelines, CRM installations, and digital growth setups.
               </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center pb-8 border-b border-white/5 mb-10">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2">
                {["All", "Campaign Optimization", "CRM & Automation", "Analytics & Strategy", "Management & Growth"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold"
                        : "bg-zinc-900/40 text-zinc-400 border border-white/5 hover:border-emerald-500/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search field */}
              <div className="relative w-full lg:max-w-xs">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Search size={14} className="group-hover:text-emerald-500 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search skills, methods or places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900/30 border border-white/5 focus:border-emerald-500/50 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Interactive Catalog</span>
                <span className="text-2xl font-black text-white">{DETAILED_SKILLS.length} validated units</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Active Filters</span>
                <span className="text-2xl font-black text-emerald-400">{filteredSkills.length} matches</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Pipeline Velocity</span>
                <span className="text-2xl font-black text-emerald-400">100% Data-Driven</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Lead Optimization</span>
                <span className="text-2xl font-black text-orange-400">100% CRM Tracked</span>
              </div>
            </div>

            {/* Grid of skill cards */}
            {filteredSkills.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-zinc-950/20 border border-white/5">
                <p className="text-zinc-500 text-sm">No skills found matching your active filter criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="mt-4 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs hover:bg-emerald-500/20 transition-all font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
                    className="p-6 rounded-2xl bg-zinc-900/10 border border-white/5 hover:border-emerald-500/20 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Category and Dot visual */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            skill.category === "Campaign Optimization" ? "bg-emerald-500" :
                            skill.category === "CRM & Automation" ? "bg-orange-500" :
                            skill.category === "Analytics & Strategy" ? "bg-blue-500" :
                            "bg-cyan-500"
                          }`} />
                          {skill.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight duration-300">
                        {skill.name}
                      </h4>

                      {/* Optional Specific Role */}
                      {skill.role && (
                        <p className="text-xs font-medium text-emerald-500/70 mt-1 italic">
                          As {skill.role}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                        {skill.desc}
                      </p>
                    </div>

                    {/* Associated Context Path */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase block mb-2 tracking-widest">
                        // Verified Context
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.contexts.map((context) => (
                          <span 
                            key={context} 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-zinc-950 text-[10px] text-zinc-500 hover:text-white border border-white/5 transition-colors font-medium cursor-default"
                          >
                            <Database size={8} className="text-emerald-500/60" /> {context}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

          </motion.div>
        )}

        {activePage === "tools" && (
          <motion.div
            key="tools-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tools and Systems Section */}
            <section id="tools" className="py-24 border-t border-white/5 relative bg-zinc-950/25 px-6 -mx-6">
              <div className="max-w-4xl mx-auto">
                {!user ? (
                  /* Restricted Access View */
                  <div className="text-center py-16 px-6 max-w-xl mx-auto space-y-8">
                    <div className="relative inline-flex items-center justify-center p-6 rounded-3xl bg-zinc-900/40 border border-white/5 shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-3xl pointer-events-none"></div>
                      <Lock className="text-emerald-400 animate-pulse" size={40} />
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">// CLOUD SECURITY RESTRICTION</span>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Authorization Required
                      </h2>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        To protect API usage and optimize lead indexing pipelines, the Google Maps Leads Explorer utility is protected by standard identity authorization.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/5 bg-zinc-950/40 text-xs text-zinc-500 max-w-md mx-auto flex items-start gap-3 text-left">
                      <ShieldAlert className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <div className="space-y-1">
                        <p className="font-semibold text-zinc-350">Identity verification takes 15 seconds</p>
                        <p>Receive access instantly upon signup. Standard credentials can be simulated for demo purposes in offline environments.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={() => { setAuthMode("signup"); setIsAuthModalOpen(true); }}
                        className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] focus:outline-none cursor-pointer border-none"
                      >
                        Sign Up Now
                      </button>
                      <button
                        onClick={() => { setAuthMode("signin"); setIsAuthModalOpen(true); }}
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-12">
                  <span className="text-xs font-mono text-emerald-400 mb-4 block uppercase tracking-widest">// Interactive Staging Terminal</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    Google Maps Leads Explorer
                  </h2>
                  <p className="text-zinc-400 text-sm max-w-xl mt-3">
                    Enter any query below to scan Google Maps live using your SerpAPI key and inspect automatically synthesized lead diagnostics and opportunities.
                  </p>
                </div>

                {/* Console Input Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/20 border border-white/5 mb-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
                  
                  <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3.5 relative z-10">
                    <div className="flex-1">
                      <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider block mb-2 font-semibold">// GOOGLE MAPS SEARCH PHRASE</label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                          type="text"
                          value={geoSearchPhrase}
                          onChange={(e) => setGeoSearchPhrase(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleExecuteGeoSearch(geoSearchPhrase); }}
                          placeholder="e.g. coffee shops in London, clinics in Birmingham..."
                          className="w-full bg-zinc-950/70 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans placeholder-zinc-650"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleExecuteGeoSearch(geoSearchPhrase)}
                      disabled={isSearchingGeo || !geoSearchPhrase.trim()}
                      className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isSearchingGeo 
                          ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed" 
                          : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg hover:shadow-emerald-500/20"
                      }`}
                    >
                      <Activity size={12} className={isSearchingGeo ? "animate-spin" : ""} />
                      {isSearchingGeo ? "Querying Maps..." : "Query SerpAPI"}
                    </button>
                  </div>

                  {webhookStatus && (
                    <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-zinc-950/50 border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-[10px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-zinc-500 uppercase tracking-widest text-[9px]">CONNECTION STATE:</span>
                        <span className="text-emerald-400">{webhookStatus}</span>
                      </div>
                      <span className="text-[9px] text-zinc-650">Engine: serpapi_google_maps_proxy</span>
                    </div>
                  )}
                </div>

                {/* Core Working Area */}
                <AnimatePresence mode="wait">
              {isSearchingGeo ? (
                /* Scanning state view */
                <motion.div
                  key="loading-terminal"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-10 rounded-3xl bg-zinc-900/10 border border-emerald-500/20 text-center relative overflow-hidden h-[450px] flex flex-col justify-center items-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                  
                  {/* Radar beacon sweep */}
                  <div className="w-24 h-24 rounded-full border border-emerald-500/25 flex items-center justify-center mb-6 relative animate-pulse">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping"></span>
                    <Cpu className="text-emerald-400 animate-bounce" size={28} />
                  </div>

                  <div className="max-w-md space-y-3 font-mono">
                    <h4 className="text-white text-sm font-bold tracking-tight uppercase animate-pulse">
                      SECURE SOURCE ROUTING IN PROGRESS...
                    </h4>
                    
                    {/* Fake terminal log stream based on active step */}
                    <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/5 text-left text-[11px] leading-relaxed text-zinc-400 font-mono space-y-1.5 w-full mx-auto max-w-sm shadow-inner">
                      <p className="text-emerald-500 font-bold">// DUAL SYSTEM LOG FEED</p>
                      
                      {searchGeoStep >= 1 && (
                        <p className="text-zinc-500 animate-pulse">
                          &gt; [PIPELINE CALIBRATION] Matching path criteria for "{geoSearchPhrase}"...
                        </p>
                      )}
                      {searchGeoStep >= 2 && (
                        <p className="text-emerald-400">
                          &gt; [GEOGRAPHIC SCANNER] Coordinates localized. Mapping market segment overlay vectors...
                        </p>
                      )}
                      {searchGeoStep >= 3 && (
                        <p className="text-amber-400">
                          &gt; [CRM DATA STRUCTURE] Modeling lead scores, acquisition pipelines & obstruction indices...
                        </p>
                      )}
                      <p className="text-zinc-650 opacity-60">
                        &gt; [INFRASTRUCTURE] Connection buffer encrypted. Standby...
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Interactive Webhook Results Container */
                activeGeoTargets.length > 0 && (
                  <motion.div
                    key="results-dashboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8 text-left mt-8"
                  >
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                          // SERPAPI GEOLOCATION REPORT
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Analyzed Opportunities for &ldquo;{geoActiveQuery}&rdquo;
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 sm:self-center">
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-wider">
                          {activeGeoTargets.length} Record(s) Retrieved
                        </span>
                      </div>
                    </div>

                    {/* Left/Right splitting grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Dynamic Target List */}
                      <div className="md:col-span-5 space-y-3">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                          // IDENTIFIED PIPELINE OPPORTUNITIES
                        </span>
                        
                        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                          {activeGeoTargets.map((target, idx) => {
                            const isSelected = selectedTargetIndex === idx;
                            return (
                              <button
                                key={`${target.name}-${idx}`}
                                onClick={() => setSelectedTargetIndex(idx)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer block ${
                                  isSelected 
                                    ? "bg-zinc-905/40 border-emerald-500/35 shadow-md shadow-emerald-500/5 translate-x-1" 
                                    : "bg-zinc-950/20 border-white/5 hover:border-white/10 hover:bg-zinc-900/10"
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div className="space-y-1 min-w-0">
                                    <span className="text-[9px] font-mono text-zinc-500 block truncate uppercase">
                                      {target.sector}
                                    </span>
                                    <h4 className="text-sm font-bold text-white truncate group-hover:text-emerald-400">
                                      {target.name}
                                    </h4>
                                  </div>
                                  <span className={`text-[10px] font-mono font-bold shrink-0 ${
                                    target.score >= 90 ? "text-emerald-400" : "text-amber-400"
                                  }`}>
                                    Score: {target.score}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Selected Target Dossier Details */}
                      <div className="md:col-span-7">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold mb-3">
                          // OPPORTUNITY CRITERIA EXPLORER
                        </span>

                        {(() => {
                          const target = activeGeoTargets[selectedTargetIndex];
                          if (!target) return null;
                          return (
                            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 space-y-5 relative">
                              <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-zinc-650">
                                RECORD INDEX: T-{selectedTargetIndex + 1}
                              </div>

                              <div>
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                                  {target.sector}
                                </span>
                                <h4 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                                  {target.name}
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-white/5">
                                {/* Email Field if present, else fallback contact person */}
                                <div>
                                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-0.5">// Contact Point</span>
                                  <span className="text-zinc-300 font-sans font-medium break-all selection:bg-emerald-500/30 block">
                                    {target.email ? target.email.replace("The email found is: ", "") : target.contactPerson}
                                  </span>
                                </div>

                                {/* Estimated Revenue / Commercial potential */}
                                <div>
                                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-0.5">// Financial Potency</span>
                                  <span className="text-emerald-400 block font-bold">
                                    {target.estimatedRevPot}
                                  </span>
                                </div>

                                {/* Website link if present */}
                                {target.website && (
                                  <div className="sm:col-span-2 border-t border-white/5 pt-2.5">
                                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-1">// Reference Website</span>
                                    <a 
                                      href={target.website} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-cyan-405 hover:text-cyan-300 hover:underline transition-all text-xs break-all block truncate font-sans font-medium"
                                    >
                                      {target.website}
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* Description, Objection Friction details */}
                              <div className="space-y-3.5 border-t border-white/5 pt-4">
                                {target.Description && target.Description !== "[null]" && (
                                  <div className="p-3 bg-zinc-950/40 rounded-xl border border-white/5">
                                    <span className="text-zinc-500 font-mono block text-[9px] uppercase tracking-wider mb-1">// Mapped Description</span>
                                    <p className="text-zinc-350 font-sans text-xs leading-relaxed font-normal">
                                      {target.Description}
                                    </p>
                                  </div>
                                )}

                                {target["About Business"] && target["About Business"] !== "[null]" && (
                                  <div className="p-3 bg-zinc-950/40 rounded-xl border border-white/5">
                                    <span className="text-zinc-500 font-mono block text-[9px] uppercase tracking-wider mb-1">// About Business Insights</span>
                                    <p className="text-zinc-350 font-sans text-xs leading-relaxed font-normal">
                                      {target["About Business"]}
                                    </p>
                                  </div>
                                )}

                                {(!target.Description && target.objectionFriction) && (
                                  <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                    <span className="text-amber-500/80 font-mono block text-[9px] uppercase tracking-wider mb-1">// CRM Pipeline Objection & Friction</span>
                                    <p className="text-zinc-350 font-sans text-xs leading-relaxed font-normal">
                                      {target.objectionFriction.replace(/^Description:\s*"/, "").replace(/"$/, "")}
                                    </p>
                                  </div>
                                )}

                                {target.techStackAudit && (
                                  <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                    <span className="text-emerald-400/80 font-mono block text-[9px] uppercase tracking-wider mb-1">// CRM Tech Stack Audit & Telemetry</span>
                                    <p className="text-zinc-350 font-sans text-xs leading-relaxed font-normal">
                                      {target.techStackAudit}
                                    </p>
                                  </div>
                                )}
                              </div>

                            </div>
                          );
                        })()}
                      </div>

                    </div>

                    {/* Highly discreet, elegant, interactive Raw JSON payload collapser */}
                    <div className="pt-4 border-t border-white/5">
                      <details className="group">
                        <summary className="list-none flex justify-between items-center cursor-pointer select-none text-zinc-500 hover:text-white transition-colors duration-200 outline-none">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold block flex items-center gap-1.5">
                            <span className="inline-block transition-transform duration-200 group-open:rotate-90">➔</span>
                            // AUDIT RAW SERPAPI GEOLOCATION METRICS (response.json)
                          </span>
                          <span className="text-[10px] font-mono text-zinc-650 group-hover:text-emerald-400 transition-colors">
                            Click to Expand Payload
                          </span>
                        </summary>
                        
                        <div className="mt-4 rounded-xl border border-white/5 bg-black/60 overflow-hidden shadow-inner">
                          <div className="bg-zinc-950/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                            </div>
                            <span className="font-mono text-[9px] text-zinc-650 uppercase">response.json</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (webhookRawResponse) {
                                  navigator.clipboard.writeText(JSON.stringify(webhookRawResponse, null, 2));
                                } else {
                                  navigator.clipboard.writeText(JSON.stringify({ status: "Pending query initialization", activeQuery: geoActiveQuery }, null, 2));
                                }
                              }}
                              className="text-[8px] font-mono text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/5 px-2 py-0.5 rounded transition-colors cursor-pointer"
                            >
                              Copy Payload
                            </button>
                          </div>
                          <pre className="font-mono text-[10px] leading-relaxed text-zinc-300 p-4 overflow-auto max-h-[350px] scrollbar-thin scrollbar-thumb-zinc-800">
                            <code>
                              {webhookRawResponse 
                                ? JSON.stringify(webhookRawResponse, null, 2) 
                                : JSON.stringify({ status: "Pending query initialization", activeQuery: geoActiveQuery }, null, 2)
                              }
                            </code>
                          </pre>
                        </div>
                      </details>
                    </div>

                  </motion.div>
                )
              )}
            </AnimatePresence>
                  </>
                )}
              </div>
            </section>

          </motion.div>
        )}

        {activePage === "portfolio" && (
          <motion.div
            key="portfolio-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Portfolio Case Study Section */}
            <section id="portfolio" className="py-24 border-t border-white/5 relative bg-zinc-950/20 px-6 -mx-6">
              <div className="max-w-6xl mx-auto">
                {!portfolioProject ? (
                  <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center py-16 px-6 border border-white/5 bg-zinc-900/10 rounded-3xl space-y-6">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Database className="text-emerald-400" size={24} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                            {isConfigured ? "Supabase Live Connection Active" : "Simulated Local Storage Mode"}
                          </p>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white uppercase font-sans tracking-tight">No Portfolio Projects Found</h3>
                      </div>
                      <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
                        To keep your site clean and customized, only rows present in your Supabase database table will render here. All static fallbacks have been filtered out.
                      </p>

                      <div className="flex justify-center gap-4 pt-2">
                        <button
                          onClick={handleManualRefresh}
                          disabled={isManualRefreshing}
                          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          <Clock size={12} className={`text-emerald-400 ${isManualRefreshing ? 'animate-spin' : ''}`} />
                          {isManualRefreshing ? "Syncing..." : "Manual DB Refetch"}
                        </button>
                      </div>
                    </div>

                    {/* Diagnostics & Real-time Integration Steps */}
                    <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6 font-sans">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={14} /> Real-Time Database Connection Troubleshooter
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500">v1.1 Active Diagnostics</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 text-xs text-zinc-400">
                        <div className="space-y-4">
                          <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">// Connection State</h5>
                          <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Supabase API Key:</span>
                              <span className={isConfigured ? "text-emerald-400" : "text-amber-500"}>
                                {isConfigured ? "✓ Configured (Secret)" : "Missing (Using Local DB)"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Target Table:</span>
                              <span className="text-zinc-300">public.portfolio_projects</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Realtime Engine:</span>
                              <span className={isConfigured ? "text-emerald-400" : "text-zinc-500"}>
                                {isConfigured ? "Active Listener Connected" : "Inactive (Simulated)"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Query Sort Index:</span>
                              <span className="text-zinc-300">updated_at DESC (Live)</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">// Checklist to make changes reflect</h5>
                          <ul className="space-y-2.5 leading-relaxed">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-semibold mt-0.5">1.</span>
                              <span>
                                <strong>Ensure table has records:</strong> Check if you have running rows in <code className="text-emerald-400 font-mono text-[10.5px] bg-emerald-500/5 px-1 rounded">portfolio_projects</code>. Rows are sorted by last updated!
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-semibold mt-0.5">2.</span>
                              <span>
                                <strong>Enable Supabase Replication (Crucial):</strong> Go to your **Supabase Dashboard** &rarr; **Database** &rarr; **Replication**, look under **Source**, choose your active publication (usually `supabase_realtime`), and make sure `portfolio_projects` is **toggled ON** to broadcast!
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-semibold mt-0.5">3.</span>
                              <span>
                                <strong>Confirm RLS Read Access:</strong> Ensure your table has a SELECT policy allowing public read access, or verify your query isn't blocked by Row Level Security constraints.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Pasteable SQL Seeding Snippet */}
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center">
                          <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">// SQL Seeding Snippet (Run in Supabase SQL Editor if table is empty)</h5>
                        </div>
                        <pre className="bg-black/90 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-zinc-400 overflow-x-auto leading-relaxed max-h-40">
{`INSERT INTO public.portfolio_projects (
    title, excerpt, category, story_date, challenge, strategy, impact, client, reading_time, stat_value, stat_name
) VALUES (
    'The B2B Engineering Pipeline: Converting Technical Audiences for a Core AI Infrastructure Tool',
    'How we navigated long enterprise consideration cycles to transform an initial Q3 2024 viral spike into a highly stabilized, premium global developer footprint.',
    'Technical B2B & Developer Relations (DevRel)',
    'May 2024 – April 2026',
    'Marketing kusho.ai...',
    'We abandoned mass-consumer playbooks...',
    'The targeted execution yielded a highly deliberate, sustainable traffic structure...',
    'kusho.ai',
    '4 minutes',
    '68.28%',
    'Combined US and India Traffic Share Dominance'
);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    
                    {/* Project Workspace Tabs Selector */}
                    <div className="border-b border-white/5 pb-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-widest mb-1 select-none">
                            // MULTI-ROW CONNECTION ({portfolioProjects.length} {portfolioProjects.length === 1 ? "Case Study" : "Case Studies"} Loaded)
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-white uppercase font-sans tracking-tight">
                            Select Case Archive
                          </h2>
                        </div>
                      </div>

                      {/* Tab Buttons flexbox containing all projects */}
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        {portfolioProjects.map((proj, idx) => {
                          const isActive = idx === activeTabIndex;
                          return (
                            <button
                              key={proj.id || idx}
                              onClick={() => setActiveTabIndex(idx)}
                              className={`flex-shrink-0 text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer min-w-[220px] max-w-[280px] ${
                                isActive 
                                  ? "bg-zinc-900/80 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.08)]" 
                                  : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/20"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
                                <span className={isActive ? "text-emerald-400 font-semibold" : "text-zinc-500"}>
                                  [{String(idx + 1).padStart(2, '0')}]
                                </span>
                                <span className={`uppercase tracking-wider px-2 py-0.5 rounded-md text-[9px] ${
                                  isActive ? "bg-emerald-500/10 text-emerald-400 font-semibold" : "bg-white/5 text-zinc-400"
                                }`}>
                                  {proj.client || "Client"}
                                </span>
                              </div>
                              <h3 className={`text-xs font-bold line-clamp-1 uppercase ${isActive ? "text-white" : "text-zinc-400"}`}>
                                {proj.title}
                              </h3>
                              <p className="text-[10px] text-zinc-500 line-clamp-1 mt-1">
                                {proj.category}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={portfolioProject?.id || activeTabIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-20"
                      >
                        {/* Header Block */}
                        <div className="space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full">
                          {portfolioProject.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <Calendar size={11} className="text-zinc-600" /> {portfolioProject.story_date}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <Clock size={11} className="text-zinc-600" /> {portfolioProject.reading_time}
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-none font-sans uppercase">
                        {portfolioProject.title}
                      </h1>

                      <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-4xl border-l-[3px] border-emerald-500/40 pl-6">
                        {portfolioProject.excerpt}
                      </p>

                      {/* Metadata Matrix */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">// Enterprise Client</span>
                          <strong className="text-white text-sm font-semibold">{portfolioProject.client}</strong>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">// Core Domain</span>
                          <strong className="text-white text-sm font-semibold">AI Testing Agents</strong>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">// Strategy Vectors</span>
                          <strong className="text-white text-sm font-semibold">Technical DevRel & Benchmarks</strong>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">// Engagement Cycle</span>
                          <strong className="text-emerald-400 text-sm font-semibold">Enterprise Sandbox Integrations</strong>
                        </div>
                      </div>
                    </div>

                    {/* Stat Banner Block */}
                    <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/20 border border-emerald-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
                      <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 space-y-4">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">// Core Success Metric</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none select-none">
                              {portfolioProject.stat_value}
                            </span>
                          </div>
                          <p className="text-zinc-300 text-sm font-semibold uppercase tracking-wider leading-snug">
                            {portfolioProject.stat_name}
                          </p>
                        </div>

                        <div className="md:col-span-1 text-zinc-700 hidden md:block text-2xl font-light text-center">|</div>

                        <div className="md:col-span-6 space-y-4 text-xs">
                          <h4 className="font-mono text-zinc-400 uppercase tracking-widest">// Highlights of Enterprise Concentration</h4>
                          <ul className="space-y-3 font-sans text-zinc-400">
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                              <span><strong>India Hub Dominance:</strong> Commands absolute superiority with <strong>43.15%</strong> of entire worldwide engineering visits.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                              <span><strong>United States Influence:</strong> Commands <strong>25.13%</strong> of global high-intent decision-makers, locking in premium enterprise pipeline channels.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                              <span><strong>Anti-decay Pipeline Retention:</strong> Structural B2B positioning channels converted launch-spike bounce into zero-decay organic baselines.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Challenge, Strategy, Impact Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-8 text-sm leading-relaxed">
                      
                      {/* Challenge */}
                      <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 space-y-6 flex flex-col justify-between hover:border-white/10 transition-colors h-full">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-orange-400 bg-orange-500/5 border border-orange-500/10 px-2.5 py-0.5 rounded">01</span>
                            <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">The Core Challenge</h3>
                          </div>
                          <p className="text-zinc-400 leading-relaxed font-sans">
                            {portfolioProject.challenge}
                          </p>
                        </div>
                      </div>

                      {/* Strategy */}
                      <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 space-y-6 flex flex-col justify-between hover:border-white/10 transition-colors h-full">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded">02</span>
                            <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Strategic Execution</h3>
                          </div>
                          <p className="text-zinc-400 leading-relaxed font-sans">
                            {portfolioProject.strategy}
                          </p>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 space-y-6 flex flex-col justify-between hover:border-white/10 transition-colors h-full">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2.5 py-0.5 rounded">03</span>
                            <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Pipeline & Impact</h3>
                          </div>
                          <p className="text-zinc-400 leading-relaxed font-sans">
                            {portfolioProject.impact}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Dashboard Visualization Suite & Gallery */}
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-4">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-500 block uppercase tracking-widest mb-1">// SYSTEM DATA & PIPELINE TELEMETRY</span>
                          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Interactive Case Analytics Suite</h2>
                        </div>
                        <span className="text-xs text-zinc-500 font-mono">
                          *Click on any image below to view high-resolution fullscreen asset.
                        </span>
                      </div>

                      {/* 4 to 6 Images Gallery / Bento Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Visual 1: Traffic Trend Chart */}
                        <div 
                          onClick={() => setLightboxImage(getGoogleDriveEmbedUrl(portfolioProject.image_traffic || trafficTrendChart))}
                          className="group cursor-pointer p-6 rounded-3xl bg-zinc-900/15 border border-white/5 hover:border-emerald-500/35 hover:bg-zinc-900/25 transition-all duration-300 space-y-4"
                        >
                          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 relative flex items-center justify-center">
                            <img 
                              src={getGoogleDriveEmbedUrl(portfolioProject.image_traffic || trafficTrendChart)} 
                              alt="Traffic Trend Curve 2024 - 2026" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-emerald-400 gap-1 bg-black/50 font-mono tracking-wider">
                              <Search size={14} /> Fullscreen Lightbox
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-emerald-400">// Dataset-01</span>
                              <span className="text-zinc-500">Stability Index: 98.4%</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Traffic Trend & Year-over-Year Curve</h4>
                            <p className="text-zinc-500 text-xs">Visualizes the late 2024 launch surge settling smoothly into a non-decaying base throughout 2025 and 2026.</p>
                          </div>
                        </div>

                        {/* Visual 2: Channel Split Donut */}
                        <div 
                          onClick={() => setLightboxImage(getGoogleDriveEmbedUrl(portfolioProject.image_channel || channelDistribution))}
                          className="group cursor-pointer p-6 rounded-3xl bg-zinc-900/15 border border-white/5 hover:border-emerald-500/35 hover:bg-zinc-900/25 transition-all duration-300 space-y-4"
                        >
                          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 relative flex items-center justify-center">
                            <img 
                              src={getGoogleDriveEmbedUrl(portfolioProject.image_channel || channelDistribution)} 
                              alt="B2B Channel Distribution Chart" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-emerald-400 gap-1 bg-black/50 font-mono tracking-wider">
                              <Search size={14} /> Fullscreen Lightbox
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-emerald-400">// Dataset-02</span>
                              <span className="text-zinc-500">Conversion Quality: Tier-1</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Traffic Channel Distribution</h4>
                            <p className="text-zinc-500 text-xs text-zinc-550">Highlights mature B2B channel distribution split where Organic Search and Direct traffic dominates the funnel.</p>
                          </div>
                        </div>

                        {/* Visual 3: Geographic Distribution Map */}
                        <div 
                          onClick={() => setLightboxImage(getGoogleDriveEmbedUrl(portfolioProject.image_geo || geoDistribution))}
                          className="group cursor-pointer p-6 rounded-3xl bg-zinc-900/15 border border-white/5 hover:border-emerald-500/35 hover:bg-zinc-900/25 transition-all duration-300 space-y-4"
                        >
                          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 relative flex items-center justify-center">
                            <img 
                              src={getGoogleDriveEmbedUrl(portfolioProject.image_geo || geoDistribution)} 
                              alt="Global Engineering Hub Geographies Map" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-emerald-400 gap-1 bg-black/50 font-mono tracking-wider">
                              <Search size={14} /> Fullscreen Lightbox
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-emerald-400">// Dataset-03</span>
                              <span className="text-zinc-500">Concentration Score: Excellent</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Global Developer Geographic Distribution</h4>
                            <p className="text-zinc-400 text-xs">{`Shows India commanding 43.15% share and USA securing 25.13%, mapping absolute dominance in global tech markets.`}</p>
                          </div>
                        </div>

                        {/* Visual 4: Dev Testing Pipeline Blueprint */}
                        <div 
                          onClick={() => setLightboxImage(getGoogleDriveEmbedUrl(portfolioProject.image_pipeline || pipelineArchitecture))}
                          className="group cursor-pointer p-6 rounded-3xl bg-zinc-900/15 border border-white/5 hover:border-emerald-500/35 hover:bg-zinc-900/25 transition-all duration-300 space-y-4"
                        >
                          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 relative flex items-center justify-center">
                            <img 
                              src={getGoogleDriveEmbedUrl(portfolioProject.image_pipeline || pipelineArchitecture)} 
                              alt="Infrastructure workflow blueprint" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-emerald-400 gap-1 bg-black/50 font-mono tracking-wider">
                              <Search size={14} /> Fullscreen Lightbox
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
                              <span className="text-emerald-400">// Blueprint-04</span>
                              <span className="text-zinc-500">DevRel Interlock</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">API Testing Pipeline Workflow Architecture</h4>
                            <p className="text-zinc-500 text-xs">Architectural logic connecting GitHub, Git Commit workflows, and the automated testing agent logic.</p>
                          </div>
                        </div>

                        {/* Visual 5: CSS Dynamic Conversion Funnel (Visual Representation 5!) */}
                        <div className="p-8 rounded-3xl bg-zinc-900/15 border border-white/5 space-y-6 flex flex-col justify-between hover:border-emerald-500/25 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider select-none">
                              <span className="text-emerald-400">// Visual-05 • CSS Live Funnel</span>
                              <span className="text-zinc-500">Sandbox Conversion</span>
                            </div>
                            <h4 className="text-sm font-bold text-white">Developer Trial Conversion Funnel Flow</h4>
                            
                            {/* Interactive Visual Funnel representation */}
                            <div className="space-y-2.5 pt-4">
                              <div className="w-full bg-zinc-950/60 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40" />
                                  <span className="text-xs text-zinc-300 font-sans">Total Dev Impressions</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-zinc-400">100%</span>
                              </div>
                              <div className="w-[90%] bg-zinc-950/60 rounded-xl p-3 border border-white/5 flex justify-between items-center ml-[5%]">
                                <div className="flex items-center gap-3">
                                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/60" />
                                  <span className="text-xs text-zinc-300 font-sans">Case Seeding & Click-Through</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-zinc-400">22.4%</span>
                              </div>
                              <div className="w-[75%] bg-zinc-950/60 rounded-xl p-3 border border-white/5 flex justify-between items-center ml-[12.5%]">
                                <div className="flex items-center gap-3">
                                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80" />
                                  <span className="text-xs text-zinc-300 font-sans">Sandbox Trial Initializations</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-emerald-400">11.8%</span>
                              </div>
                              <div className="w-[58%] bg-gradient-to-r from-emerald-950/50 to-emerald-950/20 rounded-xl p-3 border border-emerald-500/20 flex justify-between items-center ml-[21%]">
                                <div className="flex items-center gap-3">
                                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-pulse" />
                                  <span className="text-xs text-emerald-300 font-semibold font-mono">Enterprise Pilots</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-emerald-400">3.65%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-zinc-550 text-xs leading-relaxed">High-intent Technical DevRel distribution filtering converts developer sandboxes at over 3x higher ratios compared to consumer ads.</p>
                        </div>

                        {/* Visual 6: CSS Interactive Ecosystem Integrity Map (Visual Representation 6!) */}
                        <div className="p-8 rounded-3xl bg-zinc-900/15 border border-white/5 space-y-6 flex flex-col justify-between hover:border-emerald-500/25 transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider select-none">
                              <span className="text-emerald-400">// Visual-06 • Ecosystem Map</span>
                              <span className="text-zinc-500">Integrations Network</span>
                            </div>
                            <h4 className="text-sm font-bold text-white">Core Tool Integration Ecosystem Landscape</h4>
                            
                            {/* Interactive diagram grid */}
                            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                              <div className="p-3 bg-zinc-950/80 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <Database size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono uppercase text-zinc-400">Postman / curl</span>
                              </div>
                              <div className="p-3 bg-zinc-950/80 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <ArrowRight size={16} className="text-emerald-500 rotate-45 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase text-zinc-400">Kusho Agent</span>
                              </div>
                              <div className="p-3 bg-zinc-950/80 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <Workflow size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono uppercase text-zinc-400">Automated QA</span>
                              </div>
                              <div className="p-3 bg-zinc-950/80 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <Activity size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono uppercase text-zinc-400">Telemetry</span>
                              </div>
                              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <TrendingUp size={16} className="text-emerald-400" />
                                <span className="text-[10px] font-mono uppercase text-emerald-300 font-semibold">Conversion</span>
                              </div>
                              <div className="p-3 bg-zinc-950/80 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500/30 transition-all hover:scale-[1.03] rounded-2xl">
                                <CheckCircle2 size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono uppercase text-zinc-400">System Logs</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-zinc-550 text-xs leading-relaxed">Technical audits, zero-fluff integration benchmarking publications, and developer tooling setups establish complete workflow integrity.</p>
                        </div>

                      </div>
                    </div>

                    {/* Closing Case Insights Callout */}
                    <div className="p-8 rounded-3xl bg-zinc-900/10 border border-white/5 space-y-4">
                      <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-widest">// ARCHITECT'S FINAL RETROSPECTIVE</h4>
                      <p className="text-zinc-450 text-xs leading-relaxed font-sans">
                        {`The extreme consistency of the stabilized baseline demonstrates that targeting enterprise software designers with uncompromised, zero-copy, highly technical Developer Relations benchmark cases completely mitigates the expected natural decay of viral product launches. By refusing high-volume generic ads and focusing exclusively on developer value hubs (HN, GitHub, and high-fidelity architecture newsletters), we converted user traffic into persistent CRM accounts that scale organically over multi-month enterprise execution vectors.`}
                      </p>
                    </div>

                    {/* Back to top or action shortcut */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-white/5">
                      <div className="text-xs text-zinc-500 font-mono">
                        Published: May 2026 • Lead Architect: Olamide David
                      </div>
                      <button
                        onClick={() => setActivePage("contact")}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer border-none"
                      >
                        Initiate Pipeline Consulting Connection
                      </button>
                    </div>

                  </motion.div>
                </AnimatePresence>

                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}

        {activePage === "blog" && (
          <motion.div
            key="blog-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Blog Section */}
            <section id="blog" className="py-32 border-t border-white/5 relative bg-zinc-950/20 px-6 -mx-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
               <span className="text-xs font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Brain Trust & Hybrid Insights</span>
               <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                 Intellectual Musings
               </h2>
               <p className="text-zinc-500 text-lg max-w-2xl mt-4">
                 Where precise campaign analysis, CRM automation systems, and performance marketing pipelines converge.
               </p>
            </div>

            {/* Blog Controls */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center pb-8 border-b border-white/5 mb-10 text-xs">
              <div className="flex flex-wrap gap-2">
                {["All", "Analytics", "Marketing", "CRM Automation"].map((cat) => (
                  <button
                    key={cat}
                    id={`blog-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setBlogCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                      blogCategory === cat
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold cursor-pointer"
                        : "bg-zinc-900/40 text-zinc-400 border border-white/5 hover:border-emerald-500/20 hover:text-white cursor-pointer"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:max-w-xs">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Search size={14} />
                </div>
                <input
                  id="blog-search-input"
                  type="text"
                  placeholder="Search articles & themes..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900/30 border border-white/5 focus:border-emerald-500/50 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Blog Grid */}
            {filteredBlogPosts.length === 0 ? (
              <div id="blog-empty-state" className="p-16 text-center rounded-3xl bg-zinc-950/20 border border-white/5">
                <p className="text-zinc-500 text-sm">No articles match your selection.</p>
                <button 
                  id="blog-clear-filters"
                  onClick={() => { setBlogCategory("All"); setBlogSearch(""); }}
                  className="mt-4 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs hover:bg-emerald-500/20 transition-all font-semibold cursor-pointer"
                >
                  Reset blog search
                </button>
              </div>
            ) : (
              <div id="blog-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogPosts.map((post) => (
                  <div
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setSelectedBlog(post)}
                    className="group cursor-pointer p-8 rounded-3xl bg-zinc-900/15 border border-white/5 hover:border-emerald-500/20 hover:bg-zinc-900/25 transition-all duration-500 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-zinc-500 text-[10px] font-mono flex items-center gap-1">
                          <Clock size={10} /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 tracking-tight leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-zinc-500 text-xs leading-relaxed mt-4 line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] font-mono text-zinc-650 uppercase tracking-wider">
                            #{tag.replace(/\s+/g, '')}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-emerald-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5 font-sans">
                        Read <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

          </motion.div>
        )}

        {activePage === "contact" && (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <section id="footer" className="pt-32 pb-12">
           <span className="text-sm font-mono text-emerald-500 mb-6 block uppercase tracking-widest">// Outreach</span>
           
           <div className="grid lg:grid-cols-12 gap-24 items-start mb-32">
             <div className="lg:col-span-7">
               <h2 className="text-5xl md:text-[80px] font-bold text-white tracking-tighter leading-[0.8] mb-12">
                Let's construct something of <span className="text-emerald-400">precision.</span>
               </h2>
               <div className="space-y-8 text-lg text-zinc-500 leading-relaxed">
                 <p>
                    I'm open to conversations around <span className="text-white font-semibold">MarTech Systems Automation</span>, <span className="text-white font-semibold">Performance Digital CRM Operations</span>, and <span className="text-white font-semibold">Product Development & Go-To-Market Strategy</span>.
                 </p>
                 <p>
                    Whether you need a technical operator who understands database structures, a CRM architect to scale automated lifecycle routines, or a growth partner who bridges high-converting copy with advanced analytics, I bring absolute precision directly to the execution desk.
                 </p>
                 <p className="text-white font-semibold flex items-center gap-2">
                   <PhoneCall size={18} className="text-emerald-500" /> Reach out to connect on technical GTM campaigns or performance pipelines.
                 </p>
               </div>
             </div>

             <div className="lg:col-span-5 space-y-12 w-full max-w-sm ml-auto">
               <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-white/5 max-w-sm">
                 <img 
                    src={olamideDavidProfile}
                    referrerPolicy="no-referrer"
                    alt="Olamide David portrait"
                    className="w-full h-full object-cover"
                 />
               </div>

               <div className="grid gap-8">
                 <div>
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-6 block">// Direct Access Channels</span>
                   <div className="space-y-4">
                     <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-emerald-500/20 transition-all">
                        <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1">Send Email</p>
                        <a href="mailto:olamideruth387@gmail.com" className="text-white font-medium hover:text-emerald-400 transition-colors block">
                          olamideruth387@gmail.com
                        </a>
                     </div>
                     <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-emerald-500/20 transition-all">
                        <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1">LinkedIn Network</p>
                        <a href="https://www.linkedin.com/in/olamide-david/" target="_blank" rel="noreferrer" className="text-white font-medium hover:text-emerald-400 transition-colors flex items-center justify-between">
                          linkedin.com/in/olamide-david <ArrowUpRight size={14} className="text-zinc-600" />
                        </a>
                     </div>
                     <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40">
                        <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1">Current Base</p>
                        <p className="text-white font-medium">
                          Chester, England, United Kingdom
                        </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div className="flex items-center justify-between border-t border-white/5 pt-12 text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em]">
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition-colors flex items-center gap-2 group"
             >
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors transform group-hover:-translate-y-1">
                  ↑
                </div>
                Back to top
             </button>
             <span>© 2026 Olamide David</span>
            </div>
          </section>
          </motion.div>
        )}
      </AnimatePresence>

      {activePage !== "contact" && (
        <footer className="mt-16 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-650 uppercase tracking-widest pb-12">
          <span>Olamide David — Staging Portfolio</span>
          <span>© 2026 All Rights Reserved</span>
        </footer>
      )}
      </main>
      {/*
           </div>
        </section>
      </main>

      */}{/* Blog Detail Overlay Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div 
            id="blog-modal-backdrop"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              id="blog-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative mt-12 mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="blog-modal-close"
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-emerald-500/20 transition-all duration-300 z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Content */}
              <div id="blog-modal-scroll-area" className="max-h-[85vh] overflow-y-auto p-8 md:p-12">
                
                {/* Header */}
                <div className="space-y-4 mb-8">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
                      {selectedBlog.category}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Calendar size={12} /> {selectedBlog.pubDate}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Clock size={12} /> {selectedBlog.readTime}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                    {selectedBlog.title}
                  </h1>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedBlog.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-[10px] text-zinc-505 text-zinc-500 uppercase tracking-widest font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Article Body */}
                <div className="prose prose-invert max-w-none space-y-6">
                  {selectedBlog.content.map((paragraph, idx) => (
                    <p 
                      key={idx} 
                      className={`${idx === 0 ? "text-lg md:text-xl text-zinc-300 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-emerald-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1 font-sans" : "text-sm md:text-base text-zinc-400 leading-relaxed font-sans"}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer of Modal */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                      <img 
                        src={olamideDavidProfile} 
                        alt="Olamide David portrait" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Olamide David</p>
                      <p className="text-[10px] font-mono text-emerald-500/70 uppercase">Systems Automation & Performance CRM</p>
                    </div>
                  </div>

                  <a
                    id="blog-modal-share-linkedin"
                    href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(selectedBlog.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-zinc-300 font-bold text-xs rounded-full border border-white/5 transition-all duration-300"
                  >
                    <Linkedin size={14} /> Share on LinkedIn
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Supabase Auth Modal Overlay */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div 
            id="auth-modal-backdrop"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => {
              if (!authLoading) {
                setIsAuthModalOpen(false);
                setAuthError(null);
                setAuthSuccessMsg(null);
              }
            }}
          >
            <motion.div
              id="auth-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] relative p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setAuthError(null);
                  setAuthSuccessMsg(null);
                }}
                disabled={authLoading}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-white/5 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-white/10 transition-all cursor-pointer disabled:opacity-50"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1.5 font-bold">// SECURE REGISTRAR TERMINAL</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {user 
                    ? "Your Portal Profile" 
                    : authMode === "signin" 
                      ? "Sign In to Database" 
                      : "Create Portal Account"
                  }
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  {user 
                    ? "You are logged in via Supabase secure authentication tier." 
                    : "Connect, synchronize lead metadata, and access private clinic endpoints."
                  }
                </p>
              </div>

              {/* Status Info Badge */}
              <div className="mb-6 p-3 rounded-xl border border-white/5 bg-zinc-900/40 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`}></div>
                  <span className="text-zinc-400 uppercase">Provider Status:</span>
                </div>
                <span className={isConfigured ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {isConfigured ? 'Live Supabase API' : 'Sandbox Demo Mode'}
                </span>
              </div>

              {!isConfigured && !user && (
                <div className="mb-5 p-3.5 rounded-xl border border-dashed border-amber-500/20 bg-amber-500/5 text-xs space-y-2">
                  <p className="font-semibold text-amber-400 flex items-center gap-1.5 font-mono">
                    <ShieldAlert size={12} /> Key Setup Pending
                  </p>
                  <p className="text-zinc-400">
                    Live Supabase keys are not configured. Standard operations are running in a **local offline sandbox with localStorage**.
                  </p>
                  <div className="pt-1.5 text-[10px] space-y-1 font-mono text-zinc-500 border-t border-white/5">
                    <p className="text-white">// To enable full cloud storage, set:</p>
                    <p>• <span className="text-amber-450 text-amber-400">VITE_SUPABASE_URL</span>: (Your project endpoint)</p>
                    <p>• <span className="text-amber-450 text-amber-400">VITE_SUPABASE_ANON_KEY</span>: (Your anonymous key)</p>
                  </div>
                </div>
              )}

              {/* Main Content Areas */}
              {user ? (
                /* Profile & Sign Out Page */
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/60 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">
                        {user.email.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">// Authenticated Person</p>
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-500">
                      <div>
                        <span className="block uppercase">// Session Mode</span>
                        <span className={`font-semibold ${user.isSimulated ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {user.isSimulated ? 'Local Sandbox' : 'Cloud Session'}
                        </span>
                      </div>
                      <div>
                        <span className="block uppercase">// Access Level</span>
                        <span className="text-white font-semibold">Standard Operator</span>
                      </div>
                    </div>
                  </div>

                  {authSuccessMsg && (
                    <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-450 text-emerald-400 font-semibold text-xs text-center flex items-center justify-center gap-2">
                      <CheckCircle2 size={14} /> {authSuccessMsg}
                    </div>
                  )}

                  <button
                    onClick={handleSignOut}
                    disabled={authLoading}
                    className="w-full py-3.5 bg-zinc-900 border border-white/5 font-bold hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-zinc-300 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {authLoading ? (
                      <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <LogOut size={13} />
                        <span>Terminate Active Session</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Interactive Form Area */
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-semibold">// Email Address Handle</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="operations@tech-gtm.com"
                        required
                        disabled={authLoading}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/30 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-semibold">// Access Security Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        minLength={6}
                        disabled={authLoading}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/30 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {authMode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-semibold">// Verify Security Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <input
                          type="password"
                          value={authConfirmPassword}
                          onChange={(e) => setAuthConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required={authMode === "signup"}
                          minLength={6}
                          disabled={authLoading}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/30 transition-colors disabled:opacity-50"
                        />
                      </div>
                    </motion.div>
                  )}

                  {authError && (
                    <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-medium text-xs text-center">
                      {authError}
                    </div>
                  )}

                  {authSuccessMsg && (
                    <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-semibold text-xs text-center">
                      {authSuccessMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 border-none"
                  >
                    {authLoading ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Key size={13} />
                        <span>
                          {authMode === "signin" ? "Authenticate Credentials" : "Issue Access Account"}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      disabled={authLoading}
                      onClick={() => {
                        setAuthMode(authMode === "signin" ? "signup" : "signin");
                        setAuthError(null);
                        setAuthSuccessMsg(null);
                      }}
                      className="text-[10px] font-mono text-zinc-550 text-zinc-500 hover:text-white transition-colors uppercase tracking-wider cursor-pointer focus:outline-none bg-transparent border-none"
                    >
                      {authMode === "signin" 
                        ? "New User? Create custom operator account" 
                        : "Already registered? Login via password"
                      }
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Certificate Modal Reader */}
      <CertificateModal
        selectedCert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      {/* Dynamic Lightbox for Portfolio / Analytics */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-all cursor-pointer z-[110]"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Enlarged visualization"
                className="w-full h-auto max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
