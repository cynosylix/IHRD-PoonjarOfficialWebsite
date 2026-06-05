/**
 * Static site content — edit this file to update the public website.
 * No database or build step required beyond `next build`.
 */

export type ProgramType = "UG" | "PG" | "DIPLOMA";

export type CommunityKind =
  | "ALUMNI"
  | "PTA"
  | "SENATE"
  | "IEEE"
  | "IEDC"
  | "NSS";

export type FacultyRow = {
  name: string;
  designation: string;
  qualification?: string;
  isLabCoordinator: boolean;
  order: number;
};

export type Department = {
  slug: string;
  name: string;
  shortName?: string;
  intro: string;
  vision: string;
  mission: string;
  order: number;
  faculties: FacultyRow[];
};

export type ProgramRow = {
  slug: string;
  type: ProgramType;
  name: string;
  /** Expanded title shown in the programme detail hero (e.g. Master of Computer Applications) */
  fullName?: string;
  duration?: string;
  affiliation?: string;
  intake?: string;
  order: number;
  about: string;
  learnings: string[];
  outcomes: string[];
  objectives: string[];
  /** Optional related department slug for cross-linking */
  departmentSlug?: string;
  /** HTML — academic eligibility criteria */
  eligibility?: string;
  /** HTML — admission allotment process and links */
  allotment?: string;
};

export type AdmissionTrack = {
  slug: string;
  title: string;
  eligibility: string;
  allotment: string;
  feeStructure: string;
  importantLinks: { label: string; url: string }[];
  downloads: { label: string; fileUrl: string }[];
};

export type Facility = {
  slug: string;
  name: string;
  summary?: string;
  description: string;
  imageUrl?: string;
  galleryUrls?: string[];
  highlights?: string[];
  order: number;
};

export type CommunityMember = {
  name: string;
  role?: string;
  order: number;
};

export type CommunityEvent = {
  title: string;
  description?: string;
  eventDate?: string;
};

export type CommunitySection = {
  kind: CommunityKind;
  title: string;
  description: string;
  content: string;
  heroImageUrl?: string;
  members: CommunityMember[];
  events: CommunityEvent[];
};

export const siteSettings = {
  collegeName: "College of Engineering Poonjar",
  tagline: "Excellence in Technical Education — IHRD",
  address:
    "College of Engineering Poonjar, Poonjar Thekkekara (P.O), Kottayam District, Kerala, India — 686582",
  phones: ["04822-271737", "+91 9188405172"],
  emails: [
    "cepoonjar.ihrd@gmail.com",
    "principal@cepoonjar.ac.in",
    "office@cepoonjar.ac.in",
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=College+of+Engineering+Poonjar,Poonjar+Thekkekara,Kottayam,Kerala+686582&hl=en&z=15&output=embed",
};

export const admissionHelplines = [
  { name: "Mr. Shine P James", phone: "+91 9446122060" },
  { name: "Ms. Flower Abraham Mundackal", phone: "+91 9400858312" },
  { name: "Ms. Josymol Joseph", phone: "+91 8281649584" },
  { name: "College office", phone: "+91 9562401737" },
] as const;

export const aboutInstitution = {
  /** Short intro shown on the homepage only — full details on /about/institution */
  homeIntro:
    "Established in 2000 under the Institute of Human Resources Development (IHRD), Government of Kerala, College of Engineering Poonjar is committed to excellence in technical education, innovation, and holistic student development. Situated amidst the serene hills of Poonjar, the college provides an ideal environment for learning and professional growth.",
  history: `<p>College of Engineering Poonjar was established in 2000 as an institution under IHRD, Government of Kerala. The campus at Poonjar Thekkekara serves the Kottayam district with B.Tech, MCA, and diploma programmes in engineering and computer applications.</p><p>The college follows IHRD governance and academic policies, with affiliations to APJ Abdul Kalam Technological University and the State Board of Technical Education as applicable to each programme.</p>`,
  vision: `<p>To emerge as a centre of excellence in engineering education and research, contributing to sustainable development and societal well-being.</p>`,
  mission: `<ul><li>Impart quality technical education aligned with industry and societal needs.</li><li>Foster innovation, entrepreneurship, and lifelong learning.</li><li>Promote inclusive practices and environmental consciousness.</li></ul>`,
};

export const principalProfile = {
  name: "Dr. Rajesh M. V.",
  designation: "Principal",
  message: `<p>Welcome to the College of Engineering Poonjar, an institution under the Institute of Human Resources Development (IHRD), Government of Kerala. We are committed to quality technical education, ethical values, and holistic development of every student through rigorous academics, laboratories, and industry engagement.</p><p>Our faculty and staff work together to nurture innovation, employability, and responsible citizenship. I invite prospective students, parents, and partners to explore our programmes and campus life.</p>`,
  photoUrl: "/images/collageOutDoor-2.webp",
  email: "principal@cepoonjar.ac.in",
  phone: "+91 8547005035",
};

const dept = (
  slug: string,
  name: string,
  short: string,
  intro: string,
  vision: string,
  mission: string,
  order: number,
): Department => ({
  slug,
  name,
  shortName: short,
  intro,
  vision,
  mission,
  order,
  faculties: [],
});

export const departments: Department[] = [
  dept(
    "computer-science-engineering",
    "Computer Science Engineering",
    "CSE",
    "The CSE department offers contemporary programmes in computing, algorithms, and software engineering with strong laboratory support.",
    "To be a recognized centre for computing education and research.",
    "Deliver industry-aligned curriculum, promote research, and nurture ethical computing professionals.",
    1,
  ),
  dept(
    "computer-applications",
    "Computer Applications",
    "CA",
    "Focused on application development, data systems, and modern software practices for diverse domains.",
    "Excellence in application-oriented computing education.",
    "Bridge academia and industry through projects, internships, and skill development.",
    2,
  ),
  dept(
    "electrical-electronics-engineering",
    "Electrical & Electronics Engineering",
    "EEE",
    "Covers power systems, machines, drives, and electronics with emphasis on energy and sustainability.",
    "Leadership in electrical sciences and sustainable technologies.",
    "Impart strong fundamentals and hands-on skills in electrical and electronic systems.",
    3,
  ),
  dept(
    "electronics-communication-engineering",
    "Electronics & Communication Engineering",
    "ECE",
    "Embedded systems, communication, signal processing, and VLSI-oriented learning pathways.",
    "Advance communication and electronic systems education.",
    "Enable students to design, analyse, and deploy modern electronic systems.",
    4,
  ),
  dept(
    "automobile-engineering",
    "Automobile Engineering",
    "AE",
    "Automotive design, vehicle dynamics, manufacturing, and emerging EV technologies.",
    "Centre of excellence in mobility engineering.",
    "Develop competent automobile engineers with safety and sustainability focus.",
    5,
  ),
  dept(
    "applied-science",
    "Applied Science",
    "AS",
    "Foundation sciences — Mathematics, Physics, Chemistry — supporting all engineering programmes.",
    "Strengthen scientific temperament among engineering learners.",
    "Deliver quality basic science education integrated with engineering curricula.",
    6,
  ),
];

const DIPLOMA_ELIGIBILITY =
  "<p>All candidates who have passed SSLC/THSLC or equivalent examination with eligibility for higher studies can apply for admission. The candidate should be a citizen of India of Kerala origin.</p>";

const DIPLOMA_ALLOTMENT =
  "<p>The Allotment Process will be done through a Single Window System (SWS) of Allotment to give allotments to the various Government/Aided/Cost sharing Colleges under Govt. Control /Private Self Financing Colleges, based on the options submitted online by the candidates.</p><p>For details of allotment see the website: <a href=\"https://www.polyadmission.org\" target=\"_blank\" rel=\"noopener noreferrer\">www.polyadmission.org</a></p>";

const DIPLOMA_OBJECTIVES = [
  "Deliver competency-based technical education in selected engineering branches.",
  "Develop workshop, laboratory, and field skills for technician and supervisory roles.",
  "Instil safety, quality, and professional ethics in technical practice.",
  "Enable progression to employment or lateral entry to degree programmes where applicable.",
];

const DIPLOMA_OUTCOMES = [
  "Operate and maintain equipment in relevant engineering domains.",
  "Apply standard procedures to solve routine technical problems.",
  "Collaborate in teams and communicate effectively at the workplace.",
  "Pursue higher studies through lateral entry or skill upgradation pathways.",
];

function diplomaBranch(
  slug: string,
  branchName: string,
  order: number,
  learnings: string[],
  departmentSlug?: string,
): ProgramRow {
  const safeBranch = branchName.replace(/&/g, "&amp;");
  const fullTitle = `Diploma in ${branchName}`;

  return {
    slug,
    type: "DIPLOMA",
    name: branchName,
    fullName: fullTitle,
    duration: "3 Years",
    affiliation: "SBTE Kerala",
    intake: "As per allotment",
    order,
    departmentSlug,
    about: `<p>The ${fullTitle.replace(/&/g, "&amp;")} is a technical education programme designed to provide students with fundamental engineering knowledge and practical skills in ${safeBranch.toLowerCase()}. The course focuses on industry-oriented learning through classroom sessions, laboratory practice, workshops, and project-based training. Students gain hands-on experience in core engineering concepts, technical problem-solving, modern tools, and industrial applications related to their specialization. The programme also helps students develop communication, teamwork, and professional skills required for technical careers. After completing the diploma, students can pursue employment opportunities in industries, manufacturing, maintenance, production, and technical services, or continue higher studies through lateral entry into engineering degree programmes.</p>`,
    objectives: DIPLOMA_OBJECTIVES,
    learnings,
    outcomes: DIPLOMA_OUTCOMES,
    eligibility: DIPLOMA_ELIGIBILITY,
    allotment: DIPLOMA_ALLOTMENT,
  };
}

export const programs: ProgramRow[] = [
  {
    slug: "btech-computer-science-engineering",
    type: "UG",
    name: "B.Tech Computer Science & Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 1,
    departmentSlug: "computer-science-engineering",
    about:
      "<p>The Bachelor of Technology in Computer Science &amp; Engineering (CSE) is a professional undergraduate programme that prepares students for careers in the fast-growing field of technology and innovation. The course provides knowledge in programming, software development, artificial intelligence, cybersecurity, data science, cloud computing, networking, and modern computing technologies through both theoretical learning and practical training. Students develop problem-solving, analytical, and technical skills through projects, laboratory sessions, internships, and industry-oriented activities. The programme also focuses on communication, teamwork, and professional development, helping students become industry-ready professionals. Graduates can explore career opportunities in software companies, IT industries, startups, research organizations, and government sectors, or pursue higher studies in advanced technology fields.</p>",
    objectives: [
      "Impart fundamental and advanced concepts in computer science and engineering.",
      "Develop problem-solving, analytical, and programming skills for real-world applications.",
      "Promote teamwork, communication, and ethical practices in computing professions.",
      "Encourage innovation, research aptitude, and lifelong learning in emerging technologies.",
    ],
    learnings: [
      "Programming languages, data structures, and algorithms",
      "Database systems, operating systems, and computer networks",
      "Software engineering, web technologies, and application development",
      "Machine learning fundamentals and intelligent systems (as per curriculum)",
      "Project design, testing, and deployment in team environments",
    ],
    outcomes: [
      "Design and implement software solutions for defined engineering problems.",
      "Apply mathematical and computational methods to analyse and optimise systems.",
      "Work effectively in multidisciplinary teams with professional responsibility.",
      "Pursue higher studies, entrepreneurship, or industry roles in IT and allied sectors.",
    ],
    eligibility:
      "<p>Candidates who have passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry as one of the optional subjects with at least 45% marks put together in the above subjects are eligible for admission. In case, the candidate has not studied Chemistry, the marks obtained in Computer Science shall be considered. In case, the candidate has not studied Chemistry and Computer Science the marks obtained in Biotechnology shall be considered. In case, the candidate has not studied Chemistry, Computer Science and Biotechnology the marks obtained in Biology shall be considered. The marks as shown in the mark list of the Board of Examination obtained from the respective Higher Secondary Board shall be considered for academic eligibility.</p>",
    allotment:
      "<p>Admission to 100% seats of the annual intake is made by Commissioner for Entrance examination (CEE), Government of Kerala from the rank list of Kerala Engineering Entrance examination conducted every year by Govt. of Kerala.</p><p>For details of Kerala Engineering Entrance examination and allotment, see the website: <a href=\"https://www.cee-kerala.org\" target=\"_blank\" rel=\"noopener noreferrer\">www.cee-kerala.org</a></p><p>For KEAM candidate portal, please visit: <a href=\"https://cee.kerala.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">cee.kerala.gov.in</a></p>",
  },
  {
    slug: "btech-electronics-communication-engineering",
    type: "UG",
    name: "B.Tech Electronics & Communication Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 2,
    departmentSlug: "electronics-communication-engineering",
    about:
      "<p>The B.Tech in Electronics &amp; Communication Engineering (ECE) is a professional undergraduate programme that focuses on the study of electronic devices, communication technologies, embedded systems, and modern electronic applications. The course provides students with strong theoretical knowledge and practical skills in areas such as digital electronics, microprocessors, signal processing, wireless communication, VLSI design, IoT, and automation technologies. Through laboratory sessions, projects, workshops, and industry-oriented training, students gain hands-on experience and problem-solving abilities required in the modern electronics and communication industry. The programme also helps students develop innovation, technical expertise, teamwork, and professional skills, preparing them for careers in telecommunications, embedded systems, electronics manufacturing, automation, research, and higher studies in advanced technology fields.</p>",
    objectives: [
      "Establish strong fundamentals in electronics, signals, and communication engineering.",
      "Enable design and analysis of analog and digital electronic systems.",
      "Integrate laboratory skills with theoretical knowledge for practical problem solving.",
      "Prepare graduates for industry, higher education, and research in ECE domains.",
    ],
    learnings: [
      "Electronic devices, circuits, and linear integrated circuits",
      "Digital electronics, microprocessors, and embedded systems",
      "Analog and digital communication, signal processing",
      "Electromagnetic theory, antennas, and wireless fundamentals",
      "VLSI and system design concepts as per university syllabus",
    ],
    outcomes: [
      "Analyse and design electronic and communication subsystems.",
      "Use modern tools and simulation environments for engineering tasks.",
      "Communicate technical ideas clearly in written and oral form.",
      "Adapt to evolving standards and technologies in the ECE sector.",
    ],
    eligibility:
      "<p>Candidates who have passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry as one of the optional subjects with at least 45% marks put together in the above subjects are eligible for admission. In case, the candidate has not studied Chemistry, the marks obtained in Computer Science shall be considered. In case, the candidate has not studied Chemistry and Computer Science the marks obtained in Biotechnology shall be considered. In case, the candidate has not studied Chemistry, Computer Science and Biotechnology the marks obtained in Biology shall be considered. The marks as shown in the mark list of the Board of Examination obtained from the respective Higher Secondary Board shall be considered for academic eligibility.</p>",
    allotment:
      "<p>Admission to 100% seats of the annual intake is made by Commissioner for Entrance examination (CEE), Government of Kerala from the rank list of Kerala Engineering Entrance examination conducted every year by Govt. of Kerala.</p><p>For details of Kerala Engineering Entrance examination and allotment, see the website: <a href=\"https://www.cee-kerala.org\" target=\"_blank\" rel=\"noopener noreferrer\">www.cee-kerala.org</a></p><p>For KEAM candidate portal, please visit: <a href=\"https://cee.kerala.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">cee.kerala.gov.in</a></p>",
  },
  {
    slug: "mca",
    type: "PG",
    name: "MCA",
    fullName: "Master of Computer Applications",
    duration: "2 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 3,
    departmentSlug: "computer-applications",
    about:
      "<p>The Master of Computer Applications (MCA) is a postgraduate programme designed to provide advanced knowledge and practical skills in computer applications, software development, and modern computing technologies. The programme focuses on programming, database management, web and mobile application development, cloud computing, artificial intelligence, cybersecurity, and software engineering concepts. Through projects, laboratory sessions, internships, and industry-oriented training, students gain hands-on experience and problem-solving abilities required in the IT industry. The course also enhances analytical thinking, communication, teamwork, and professional skills, preparing graduates for careers in software development, IT services, system management, research, product development, and higher studies in advanced computing fields.</p>",
    objectives: [
      "Provide advanced knowledge in computer applications, software development, and modern computing technologies.",
      "Develop strong programming, analytical, and problem-solving skills.",
      "Enhance practical knowledge through projects, internships, and laboratory-based learning.",
      "Prepare students for careers in software development, IT services, system administration, and product development.",
    ],
    learnings: [
      "Advanced programming, data structures, and software engineering",
      "Database management, data analytics, and enterprise applications",
      "Computer networks, security, and cloud-oriented concepts",
      "Project management, mini-projects, and major project work",
      "Electives in emerging areas as offered under university regulations",
    ],
    outcomes: [
      "Architect and deliver application solutions meeting user and business needs.",
      "Evaluate technologies and methodologies for effective software lifecycle management.",
      "Demonstrate professional conduct in team-based and client-facing environments.",
      "Qualify for technical, analytical, and managerial positions in the IT industry.",
    ],
    eligibility:
      "<p>Candidates must hold a B.C.A/B.Sc. (Computer Science)/B.Sc. (IT)/B.E. (CSE)/B.Tech. (CSE)/B.E. (IT)/B.Tech. (IT) degree or its equivalent. Alternatively, candidates with any graduation degree, preferably with Mathematics at 10+2 or graduation level, and a minimum of 50% marks (45% for reserved categories) are eligible. For those without a Mathematics background, the university will provide a compulsory bridge course, along with additional bridge courses related to computer subjects as per university norms.</p>",
    allotment:
      "<p>The MCA course admission allotment process operates via a Single Window System (SWS), facilitating allotments to Government, Aided, Private Self Financing, and Self Financing Colleges under Government Control. Allotments are based on online options submitted by candidates included in the rank list for MCA admission.</p><p>For details of MCA Entrance examination and allotment see the website: <a href=\"https://www.lbscentre.kerala.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">www.lbscentre.kerala.gov.in</a></p>",
  },
  diplomaBranch(
    "diploma-computer-engineering",
    "Computer Engineering",
    4,
    [
      "Programming, computer hardware, and networking fundamentals",
      "Workshop practices, drawing, and measurement techniques",
      "Laboratory experiments and maintenance-oriented skills",
      "Communication, computing basics, and employability skills",
      "Industrial training / project exposure as per SBTE norms",
    ],
    "computer-science-engineering",
  ),
  diplomaBranch(
    "diploma-electronics-engineering",
    "Electronics Engineering",
    5,
    [
      "Electronic devices, circuits, and digital systems",
      "Microcontrollers, embedded systems, and communication basics",
      "Workshop practices, drawing, and measurement techniques",
      "Laboratory experiments and maintenance-oriented skills",
      "Industrial training / project exposure as per SBTE norms",
    ],
    "electronics-communication-engineering",
  ),
  diplomaBranch(
    "diploma-electrical-electronics-engineering",
    "Electrical and Electronics Engineering",
    6,
    [
      "Electrical machines, power systems, and electronics fundamentals",
      "Wiring, installation, and maintenance practices",
      "Workshop practices, drawing, and measurement techniques",
      "Laboratory experiments and safety-oriented skills",
      "Industrial training / project exposure as per SBTE norms",
    ],
    "electrical-electronics-engineering",
  ),
  diplomaBranch(
    "diploma-automobile-engineering",
    "Automobile Engineering",
    7,
    [
      "Automotive systems, engines, and vehicle maintenance",
      "Workshop practices, drawing, and measurement techniques",
      "Laboratory experiments and diagnostic skills",
      "Communication, computing basics, and employability skills",
      "Industrial training / project exposure as per SBTE norms",
    ],
    "automobile-engineering",
  ),
  diplomaBranch(
    "diploma-civil-engineering-health-hygiene",
    "Civil Engineering (Health & Hygiene)",
    8,
    [
      "Building construction, surveying, and civil drawing",
      "Sanitation, water supply, and health-related civil applications",
      "Workshop practices, drawing, and measurement techniques",
      "Laboratory experiments and site-oriented skills",
      "Industrial training / project exposure as per SBTE norms",
    ],
  ),
];

export const admissionTracks: AdmissionTrack[] = [
  {
    slug: "lateral",
    title: "Lateral Entry Admission",
    eligibility:
      "<p>Diploma holders in relevant branch as per AICTE / university regulations.</p>",
    allotment: "<p>Through centralized lateral entry counselling where applicable.</p>",
    feeStructure: "<p>Same fee structure as regular programme for respective year.</p>",
    importantLinks: [{ label: "DTE Kerala", url: "https://dtekerala.gov.in" }],
    downloads: [
      { label: "KEAM / lateral entry information", fileUrl: "https://cee.kerala.gov.in" },
    ],
  },
];

export const placementOverview = {
  content: `<p>The Training & Placement Cell facilitates internships, campus drives, and skill programmes. Students are supported with aptitude training, technical workshops, and mock interviews.</p><p>Recruitment statistics below are updated as official data is published each academic year.</p>`,
};

export const placementTeamMembers = [
  {
    name: "Ms. Flower Abraham Mundackal",
    role: "Training & Placement Officer",
    isOfficer: true,
    email: "cgpucepoonjar@gmail.com",
    phone: "+91 9400858312",
    order: 1,
  },
];

export const placementDrives: {
  company: string;
  description: string;
  driveDate?: string;
  package?: string;
  selectedCount?: number;
}[] = [];

export const placementStatistics = [
  {
    academicYear: "2023-24",
    totalOffers: 120,
    highestPackage: "12 LPA",
    averagePackage: "4.2 LPA",
    placementPercent: 78,
    visitedCompanies: 35,
  },
  {
    academicYear: "2022-23",
    totalOffers: 95,
    highestPackage: "10 LPA",
    averagePackage: "3.8 LPA",
    placementPercent: 72,
    visitedCompanies: 28,
  },
];

export const placementActivities = [
  {
    title: "Aptitude Bootcamp",
    description: "Week-long quantitative and logical reasoning sessions.",
    activityDate: undefined as string | undefined,
    order: 1,
  },
  {
    title: "Industry Expert Talk",
    description: "Session on emerging technologies and careers.",
    order: 2,
  },
];

export const facilities: Facility[] = [
  {
    slug: "central-computing-facility",
    name: "Central Computing Facility",
    summary: "Modern labs with high-speed connectivity.",
    description:
      "<p>Central computing facility supports academic labs, internet access, and project development with licensed software and servers.</p>",
    imageUrl: "/images/events/eduai-workshop.png",
    order: 1,
  },
  {
    slug: "library",
    name: "Library",
    summary: "Digital and print learning resources.",
    description:
      "<p>Central library with technical books, journals, e-resources, and quiet study spaces.</p>",
    imageUrl: "/images/collageOutDoor-1.webp",
    order: 2,
  },
  {
    slug: "seminar-hall",
    name: "Seminar Hall",
    summary: "Venue for conferences and workshops.",
    description:
      "<p>Seminar hall equipped with audio-visual systems for academic and cultural events.</p>",
    imageUrl: "/images/events/eduai-school.png",
    order: 3,
  },
  {
    slug: "transportation",
    name: "Transportation",
    summary: "Bus services covering nearby routes.",
    description:
      "<p>College buses connect major towns for day scholars. Timetable available at office.</p>",
    imageUrl: "/images/slides/industry-campus.jpg",
    order: 4,
  },
  {
    slug: "hostel",
    name: "Hostel",
    summary: "Separate hostel facilities (as applicable).",
    description:
      "<p>Hostel accommodation with mess and common amenities. Admission as per rules.</p>",
    imageUrl: "/images/slides/kalika-26.jpg",
    order: 5,
  },
  {
    slug: "canteen",
    name: "Canteen",
    summary: "Hygienic food services on campus.",
    description:
      "<p>Canteen provides meals and snacks at subsidized rates during working hours.</p>",
    imageUrl: "/images/events/placements-2k25.jpg",
    order: 6,
  },
];

function community(kind: CommunityKind, title: string): CommunitySection {
  return {
    kind,
    title,
    description: title,
    content: `<p>The ${title} chapter at College of Engineering Poonjar connects students, faculty, and stakeholders through programmes, leadership, and service initiatives on campus.</p>`,
    members: [],
    events: [],
  };
}

export const communitySections: CommunitySection[] = [
  community("ALUMNI", "Alumni"),
  community("PTA", "PTA"),
  community("SENATE", "Senate"),
  community("IEEE", "IEEE"),
  community("IEDC", "IEDC"),
  community("NSS", "NSS"),
];

export const iqacContent = {
  intro: `<p>Internal Quality Assurance Cell (IQAC) coordinates quality initiatives and best practices as per NAAC guidelines.</p>`,
  functions: `<ul><li>Develop quality benchmarks</li><li>Document and disseminate good practices</li><li>Facilitate stakeholder feedback</li></ul>`,
};

export const iqacMembers = [
  {
    name: "IQAC Coordinator",
    designation: "Coordinator",
    department: "Quality cell",
    order: 1,
  },
  { name: "Faculty member", designation: "Member", department: "Academics", order: 2 },
];

export const academicCouncilPage = {
  description: `<p>The Academic Council deliberates on curriculum, academic calendar, examinations, and quality improvement measures.</p>`,
  functions: `<ul><li>Approve academic regulations</li><li>Review assessment patterns</li><li>Recommend new programmes / revisions</li></ul>`,
};

export const academicCouncilMembers = [
  { name: "Principal", designation: "Chairperson", order: 1 },
  { name: "Heads of departments", designation: "Members", order: 2 },
  { name: "Senior faculty representatives", designation: "Members", order: 3 },
];

export const campusAlbum = [
  {
    src: "/images/slides/placement-2025-26.png",
    title: "Placement",
    alt: "Placement highlights 2025–26",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/kalika-26.jpg",
    title: "College Arts Day",
    alt: "KALIKA'26 — college arts day celebration",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/yuga-26.jpg",
    title: "College Sports Day",
    alt: "YUGA'26 — college sports day",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/achievements-2025.jpg",
    title: "Hall Of Achievements",
    alt: "Hall of Achievements 2025",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/anti-ragging.png",
    title: "Anti-Ragging Week",
    alt: "Anti-ragging awareness week on campus",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/thrikonam-25.png",
    title: "College Onam Celebration",
    alt: "THRIKONAM'25 — Onam celebration",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/excellence-day-25.png",
    title: "Graduation Ceremony",
    alt: "EXCELLENCE-DAY'25 — graduation ceremony",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/ekthara-25.jpg",
    title: "College Day",
    alt: "EKTHARA'25 — college day",
    description: undefined as string | undefined,
  },
] as const;

/** Optional rich “spotlight” block for the homepage featured panel (trusted static copy). */
export type AnnouncementSpotlight = {
  /** Main paragraph; use **text** for bold segments. */
  body: string;
  /** Programme lines; use **label** for bold prefixes. */
  programLines: string[];
};

export type Announcement = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  published: boolean;
  priority: number;
  publishedAt?: string;
  spotlight?: AnnouncementSpotlight;
};

export const announcements: Announcement[] = [
  {
    id: "a-admissions",
    title: "Admissions — Academic Year 2026–2027",
    excerpt:
      "Registration is open for B.Tech, MCA, and Diploma programmes at College of Engineering Poonjar.",
    content: "<p>Refer the admissions page for eligibility, fees, and schedules.</p>",
    published: true,
    priority: 10,
    publishedAt: "2026-06-20T12:00:00.000Z",
    spotlight: {
      body:
        "Registration is now open for admissions to the following programs at **College of Engineering Poonjar** (An Institution Under IHRD) for the year **2026 - 2027**.",
      programLines: [
        "**B.Tech:** CSE / ECE",
        "**MCA**",
        "**Diploma:** Computer / Electronics / Electrical / Automobile",
      ],
    },
  },
  {
    id: "a-press-notification",
    title: "Press Notification",
    excerpt: "Official press notification from the college.",
    content: "<p>Details available at the college office and notices board.</p>",
    published: true,
    priority: 9,
    publishedAt: "2026-06-02T12:00:00.000Z",
  },
  {
    id: "a-temp-appointment-2",
    title: "Temporary Appointment 2",
    excerpt: "Temporary appointment notification.",
    content: "<p>Refer the college office for application details.</p>",
    published: true,
    priority: 8,
    publishedAt: "2026-05-26T12:00:00.000Z",
  },
  {
    id: "a-temp-appointment",
    title: "Temporary Appointment",
    excerpt: "Temporary appointment notification.",
    content: "<p>Refer the college office for application details.</p>",
    published: true,
    priority: 7,
    publishedAt: "2026-05-26T12:00:00.000Z",
  },
  {
    id: "a-guest-notification-2",
    title: "Guest Notification 2",
    excerpt: "Guest lecture / visit notification.",
    content: "<p>Schedule and venue details will be announced in due course.</p>",
    published: true,
    priority: 6,
    publishedAt: "2026-05-22T12:00:00.000Z",
  },
  {
    id: "a-guest-notification",
    title: "Guest Notification",
    excerpt: "Guest lecture / visit notification.",
    content: "<p>Schedule and venue details will be announced in due course.</p>",
    published: true,
    priority: 5,
    publishedAt: "2026-05-20T12:00:00.000Z",
  },
];

export const studentForms = [
  {
    id: "sf1",
    title: "Bonafide certificate",
    category: "office",
    description:
      "Submit a written application at the college office with ID proof and fee receipt as notified by the office.",
    fileUrl: "/contact",
    order: 1,
  },
];

export const syllabi = [
  {
    id: "sy-ktu",
    departmentSlug: undefined as string | undefined,
    title: "APJ Abdul Kalam Technological University — Syllabus",
    fileUrl: "https://ktu.edu.in/en/academic/syllabus",
    semester: undefined as string | undefined,
    academicYear: undefined as string | undefined,
    order: 0,
  },
  {
    id: "sy-sbte",
    departmentSlug: undefined as string | undefined,
    title: "SBTE Kerala — Diploma syllabus",
    fileUrl: "https://sbte.kerala.gov.in",
    semester: undefined as string | undefined,
    academicYear: undefined as string | undefined,
    order: 1,
  },
];

/** --- Helpers --- */

export function getDepartmentBySlug(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function getAdmissionTrack(slug: string) {
  return admissionTracks.find((t) => t.slug === slug);
}

export function getProgramBySlug(slug: string) {
  const legacySlugMap: Record<string, string> = {
    "diploma-engineering": "diploma-computer-engineering",
  };
  const resolved = legacySlugMap[slug] ?? slug;
  return programs.find((p) => p.slug === resolved);
}

export function getFacilityBySlug(slug: string) {
  return facilities.find((f) => f.slug === slug);
}

export function getCommunityByKind(kind: CommunityKind) {
  return communitySections.find((c) => c.kind === kind);
}

export function publishedAnnouncements() {
  return announcements
    .filter((a) => a.published)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
