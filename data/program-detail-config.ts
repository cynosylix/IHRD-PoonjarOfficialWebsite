export const ENHANCED_PROGRAM_SLUGS = [
  "btech-computer-science-engineering",
  "btech-electronics-communication-engineering",
  "mca",
] as const;

export type EnhancedProgramSlug = (typeof ENHANCED_PROGRAM_SLUGS)[number];

export type ProgramCareer = {
  title: string;
};

export type ProgramDetailConfig = {
  heroImage: string;
  careers: ProgramCareer[];
  /** Optional concise hero summary; overrides auto-extracted about text. */
  /** Override hero H1 title. */
  heroTitle?: string;
  heroSummary?: string;
  /** Override Key Features card items. */
  keyFeatures?: string[];
  /** Section description under "About the Programme". */
  aboutDescription?: string;
  /** Taller hero (55vh–65vh) for postgraduate pages. */
  heroHeight?: "compact" | "standard";
  /** Hide prospectus button; show Apply Now + Contact Department only. */
  heroButtons?: "full" | "apply-contact";
  hideCareerPathwaysCard?: boolean;
  hideCurriculumSection?: boolean;
  hideWhyChooseSection?: boolean;
  hideObjectivesSection?: boolean;
  hideOutcomesSection?: boolean;
  aboutMaxWidthClass?: string;
  admissionsSectionAlign?: "center" | "left";
  eligibilityTitle?: string;
  allotmentTitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  careerGridCols?: "4" | "6";
  contactButtonLabel?: string;
  contactButtonHref?: string;
  contentSectionAlign?: "center" | "left";
  highlightsSectionDescription?: string;
  keyFeaturesSectionDescription?: string;
  keyFeaturesLayout?: "title" | "detailed";
};

export const programDetailConfig: Record<EnhancedProgramSlug, ProgramDetailConfig> = {
  "btech-computer-science-engineering": {
    heroImage: "/images/IMG_8830.JPG.jpeg",
    heroSummary:
      "Build the future through innovation and technology with the B.Tech Computer Science & Engineering programme. Students gain strong foundations in programming, software development, artificial intelligence, cybersecurity, and emerging technologies. The curriculum combines academic excellence with practical learning, industry exposure, and hands-on project experience. Graduates are prepared for successful careers in the rapidly evolving technology sector.",
    careers: [
      { title: "Software Engineer" },
      { title: "AI Engineer" },
      { title: "Data Scientist" },
      { title: "Cyber Security Analyst" },
      { title: "Cloud Engineer" },
      { title: "Full Stack Developer" },
    ],
  },
  "btech-electronics-communication-engineering": {
    heroImage: "/images/IMG_20240327_164043.jpg.jpeg",
    heroSummary:
      "The B.Tech Electronics & Communication Engineering programme provides a strong foundation in electronics, communication systems, embedded technologies, and modern engineering applications. Students gain practical experience through laboratories, projects, and industry-oriented training. The curriculum covers emerging areas such as IoT, VLSI, wireless communication, and automation technologies. Graduates are well prepared for careers in electronics, telecommunications, embedded systems, research, and advanced technology sectors.",
    careers: [
      { title: "Embedded Systems Engineer" },
      { title: "VLSI Engineer" },
      { title: "Communication Engineer" },
      { title: "IoT Engineer" },
      { title: "Robotics Engineer" },
      { title: "Network Engineer" },
    ],
  },
  mca: {
    heroImage: "/images/IMG_20240902_125631.jpg.jpeg",
    heroTitle: "Master of Computer Applications (MCA)",
    heroSummary:
      "The MCA programme equips students with advanced knowledge in software development, data management, artificial intelligence, cloud technologies, and modern computing systems. The curriculum combines academic excellence with practical learning to prepare graduates for leadership roles in the IT industry.",
    heroHeight: "standard",
    heroButtons: "apply-contact",
    aboutDescription:
      "A postgraduate pathway designed for advanced computing skills, industry readiness, and professional leadership in IT.",
    admissionsSectionAlign: "center",
    hideCareerPathwaysCard: true,
    hideCurriculumSection: true,
    hideWhyChooseSection: true,
    hideObjectivesSection: true,
    hideOutcomesSection: true,
    eligibilityTitle: "Eligibility",
    allotmentTitle: "Admission Process",
    careerGridCols: "4",
    keyFeatures: [
      "Software Development",
      "Database Management",
      "Artificial Intelligence",
      "Cloud Computing",
      "Data Analytics",
      "Project-Based Learning",
    ],
    keyFeaturesLayout: "title",
    highlightsSectionDescription:
      "Core objectives that define the postgraduate learning experience.",
    keyFeaturesSectionDescription:
      "Advanced computing areas covered through theory, laboratories, and project work.",
    careers: [
      { title: "Software Developer" },
      { title: "System Analyst" },
      { title: "Data Analyst" },
      { title: "Cloud Engineer" },
      { title: "AI Specialist" },
      { title: "Database Administrator" },
      { title: "IT Consultant" },
      { title: "Project Manager" },
    ],
    ctaTitle: "Begin Your MCA Journey at IHRD Poonjar",
    ctaDescription:
      "Join a postgraduate programme designed to prepare you for leadership roles in software, data, and emerging technologies.",
  },
};

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Industry-focused curriculum",
    description: "Programmes aligned with KTU standards and evolving industry requirements.",
  },
  {
    title: "Experienced faculty",
    description: "Dedicated faculty guiding students through theory, labs, and projects.",
  },
  {
    title: "Research opportunities",
    description: "Exposure to projects, seminars, and innovation-driven learning activities.",
  },
  {
    title: "Placement support",
    description: "Career guidance and placement assistance through the institution.",
  },
  {
    title: "Innovation culture",
    description: "Encouragement for creative problem-solving and technical entrepreneurship.",
  },
  {
    title: "Modern laboratories",
    description: "Hands-on training in well-equipped labs and practical environments.",
  },
] as const;

export const DIPLOMA_PROGRAM_SLUGS = [
  "diploma-computer-engineering",
  "diploma-electronics-engineering",
  "diploma-electrical-electronics-engineering",
  "diploma-automobile-engineering",
  "diploma-civil-engineering-health-hygiene",
] as const;

export type DiplomaProgramSlug = (typeof DIPLOMA_PROGRAM_SLUGS)[number];

const DIPLOMA_HERO_IMAGE = "/images/IMG_20240327_164043.jpg.jpeg";

const DIPLOMA_CAREERS: Record<DiplomaProgramSlug, ProgramCareer[]> = {
  "diploma-computer-engineering": [
    { title: "Computer Technician" },
    { title: "Network Support Specialist" },
    { title: "IT Help Desk Analyst" },
    { title: "Software Tester" },
    { title: "Hardware Maintenance Engineer" },
    { title: "Technical Support Executive" },
    { title: "System Administrator" },
    { title: "Field Service Engineer" },
  ],
  "diploma-electronics-engineering": [
    { title: "Electronics Technician" },
    { title: "Service Engineer" },
    { title: "PCB Assembly Technician" },
    { title: "Instrumentation Assistant" },
    { title: "Telecom Technician" },
    { title: "Maintenance Engineer" },
    { title: "Quality Control Assistant" },
    { title: "Production Supervisor" },
  ],
  "diploma-electrical-electronics-engineering": [
    { title: "Electrical Technician" },
    { title: "Maintenance Engineer" },
    { title: "Industrial Electrician" },
    { title: "Power Systems Assistant" },
    { title: "Wiring & Installation Specialist" },
    { title: "Service Engineer" },
    { title: "Panel Board Assembler" },
    { title: "Field Technician" },
  ],
  "diploma-automobile-engineering": [
    { title: "Automobile Technician" },
    { title: "Service Engineer" },
    { title: "Diagnostic Specialist" },
    { title: "Workshop Supervisor" },
    { title: "Parts & Service Advisor" },
    { title: "Assembly Line Technician" },
    { title: "Fleet Maintenance Assistant" },
    { title: "Quality Inspector" },
  ],
  "diploma-civil-engineering-health-hygiene": [
    { title: "Civil Site Technician" },
    { title: "Survey Assistant" },
    { title: "Construction Supervisor" },
    { title: "Public Health Inspector Assistant" },
    { title: "Water Supply Technician" },
    { title: "Building Maintenance Officer" },
    { title: "Drafting Technician" },
    { title: "Site Planning Assistant" },
  ],
};

export function isDiplomaProgramSlug(slug: string): slug is DiplomaProgramSlug {
  return (DIPLOMA_PROGRAM_SLUGS as readonly string[]).includes(slug);
}

export function usesPremiumProgramLayout(slug: string): boolean {
  return isEnhancedProgramSlug(slug) || isDiplomaProgramSlug(slug);
}

export function buildDiplomaProgramConfig(program: {
  slug: string;
  name: string;
  learnings: string[];
}): ProgramDetailConfig {
  const branch = program.name;
  const slug = program.slug as DiplomaProgramSlug;

  return {
    heroImage: DIPLOMA_HERO_IMAGE,
    heroSummary: `The Diploma in ${branch} programme provides fundamental engineering knowledge and practical skills in ${branch.toLowerCase()}. Students gain hands-on experience through workshops, laboratories, and industry-oriented project training. The curriculum develops technical problem-solving abilities, modern tools proficiency, and professional readiness for skilled industry roles.`,
    heroHeight: "standard",
    heroButtons: "apply-contact",
    contactButtonLabel: "Contact Admissions",
    contactButtonHref: "/contact",
    aboutDescription:
      "A three-year SBTE Kerala affiliated technical programme designed for practical skills, industry readiness, and career progression.",
    admissionsSectionAlign: "center",
    contentSectionAlign: "center",
    hideCareerPathwaysCard: true,
    hideCurriculumSection: true,
    hideWhyChooseSection: true,
    hideObjectivesSection: true,
    hideOutcomesSection: true,
    eligibilityTitle: "Eligibility",
    allotmentTitle: "Admission Process",
    careerGridCols: "4",
    keyFeatures: program.learnings,
    keyFeaturesLayout: "detailed",
    highlightsSectionDescription:
      "Core objectives that define the diploma learning experience.",
    keyFeaturesSectionDescription:
      "Practical skills and learning areas covered through the SBTE-approved curriculum.",
    careers: DIPLOMA_CAREERS[slug],
    ctaTitle: `Begin Your Diploma in ${branch} at IHRD Poonjar`,
    ctaDescription:
      "Join a hands-on technical programme designed to prepare you for skilled careers in engineering, manufacturing, and industry services.",
  };
}

export function isEnhancedProgramSlug(slug: string): slug is EnhancedProgramSlug {
  return (ENHANCED_PROGRAM_SLUGS as readonly string[]).includes(slug);
}

export function getProgramDetailConfig(
  slug: string,
  program?: { slug: string; name: string; learnings: string[] },
): ProgramDetailConfig | undefined {
  if (isEnhancedProgramSlug(slug)) return programDetailConfig[slug];
  if (isDiplomaProgramSlug(slug) && program) return buildDiplomaProgramConfig(program);
  return undefined;
}

/** Prefer the programme-specific paragraph from the about HTML block. */
export function extractProgramDescription(aboutHtml: string): string {
  const paragraphs = aboutHtml.match(/<p>([\s\S]*?)<\/p>/g);
  if (paragraphs && paragraphs.length >= 2) {
    return stripHtml(paragraphs[1]!);
  }
  return stripHtml(aboutHtml).slice(0, 320);
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
