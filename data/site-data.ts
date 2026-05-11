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
  type: ProgramType;
  name: string;
  duration?: string;
  affiliation?: string;
  intake?: string;
  order: number;
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
    "College of Engineering Poonjar, Poonjar, Kottayam District, Kerala, India — 686582",
  phones: ["+91-4828-XXXXXX"],
  emails: ["principal@cepoonjar.ac.in", "office@cepoonjar.ac.in"],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.0!2d76.8!3d9.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDAuMCJONzYsNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
};

export const aboutInstitution = {
  history: `<p>The College of Engineering Poonjar is a premier institution under the Institute of Human Resources Development (IHRD), Government of Kerala. Located in the scenic Poonjar region, the college has been nurturing engineering talent with a strong focus on academic rigour, ethics, and employability.</p>`,
  vision: `<p>To emerge as a centre of excellence in engineering education and research, contributing to sustainable development and societal well-being.</p>`,
  mission: `<ul><li>Impart quality technical education aligned with industry and societal needs.</li><li>Foster innovation, entrepreneurship, and lifelong learning.</li><li>Promote inclusive practices and environmental consciousness.</li></ul>`,
};

export const principalProfile = {
  name: "Dr. Principal Name",
  designation: "Principal",
  message: `<p>Welcome to the College of Engineering Poonjar. Our campus is committed to holistic development of students through academics, co-curricular activities, and industry connect.</p>`,
  photoUrl: undefined as string | undefined,
  email: "principal@cepoonjar.ac.in",
  phone: "+91-4828-XXXXXX",
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
  faculties: [
    {
      name: `HoD — ${short}`,
      designation: "Professor & Head",
      qualification: "Ph.D",
      isLabCoordinator: false,
      order: 1,
    },
    {
      name: `Faculty Member — ${short}`,
      designation: "Assistant Professor",
      qualification: "M.Tech",
      isLabCoordinator: true,
      order: 2,
    },
  ],
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

export const programs: ProgramRow[] = [
  {
    type: "UG",
    name: "B.Tech Computer Science & Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 1,
  },
  {
    type: "UG",
    name: "B.Tech Electronics & Communication Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 2,
  },
  {
    type: "PG",
    name: "MCA",
    duration: "2 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "60",
    order: 3,
  },
  {
    type: "DIPLOMA",
    name: "Diploma in Engineering (selected branches)",
    duration: "3 Years",
    affiliation: "SBTE Kerala",
    intake: "As per allotment",
    order: 4,
  },
];

export const admissionTracks: AdmissionTrack[] = [
  {
    slug: "btech",
    title: "B.Tech Admission",
    eligibility:
      "<p>Pass in Higher Secondary (+2) with Physics, Chemistry, and Mathematics. KEAM qualification as per government norms.</p>",
    allotment:
      "<p>Centralized allotment through DTE Kerala / CAP as per applicable prospectus.</p>",
    feeStructure:
      "<p>Fee as prescribed by Government of Kerala / IHRD from time to time. Contact office for latest fee schedule.</p>",
    importantLinks: [
      { label: "DTE Kerala", url: "https://dtekerala.gov.in" },
      { label: "KEAM", url: "https://cee.kerala.gov.in" },
    ],
    downloads: [],
  },
  {
    slug: "diploma",
    title: "Diploma Admission",
    eligibility:
      "<p>SSLC or equivalent. Polytechnic admission through centralized allotment.</p>",
    allotment: "<p>Through Polytechnic centralized admission process.</p>",
    feeStructure: "<p>As per government polytechnic fee norms.</p>",
    importantLinks: [{ label: "Polytechnic Admission", url: "https://www.dtekerala.gov.in" }],
    downloads: [],
  },
  {
    slug: "mca",
    title: "MCA Admission",
    eligibility:
      "<p>Recognized Bachelor’s degree with Mathematics at +2 or degree level, with valid entrance score as per prospectus.</p>",
    allotment: "<p>Centralized allotment / institute-level as per regulations.</p>",
    feeStructure: "<p>As per university and government norms.</p>",
    importantLinks: [{ label: "LBS Centre", url: "https://lbscentre.in" }],
    downloads: [],
  },
  {
    slug: "lateral",
    title: "Lateral Entry Admission",
    eligibility:
      "<p>Diploma holders in relevant branch as per AICTE / university regulations.</p>",
    allotment: "<p>Through centralized lateral entry counselling where applicable.</p>",
    feeStructure: "<p>Same fee structure as regular programme for respective year.</p>",
    importantLinks: [],
    downloads: [],
  },
];

export const placementOverview = {
  content: `<p>The Training & Placement Cell facilitates internships, campus drives, and skill programmes. Students are supported with aptitude training, technical workshops, and mock interviews.</p>`,
};

export const placementTeamMembers = [
  {
    name: "Prof. Placement Coordinator",
    role: "Training & Placement Officer",
    isOfficer: true,
    email: "tpo@cepoonjar.ac.in",
    phone: undefined as string | undefined,
    order: 1,
  },
  {
    name: "Dr. Faculty Mentor",
    role: "Placement Cell Member",
    isOfficer: false,
    order: 2,
  },
];

export const placementDrives = [
  {
    company: "Sample Tech Pvt Ltd",
    description: "Campus drive for software engineer roles.",
    driveDate: new Date().toISOString(),
    package: "4.5 LPA",
    selectedCount: 8,
  },
];

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
    order: 1,
  },
  {
    slug: "library",
    name: "Library",
    summary: "Digital and print learning resources.",
    description:
      "<p>Central library with technical books, journals, e-resources, and quiet study spaces.</p>",
    order: 2,
  },
  {
    slug: "seminar-hall",
    name: "Seminar Hall",
    summary: "Venue for conferences and workshops.",
    description:
      "<p>Seminar hall equipped with audio-visual systems for academic and cultural events.</p>",
    order: 3,
  },
  {
    slug: "transportation",
    name: "Transportation",
    summary: "Bus services covering nearby routes.",
    description:
      "<p>College buses connect major towns for day scholars. Timetable available at office.</p>",
    order: 4,
  },
  {
    slug: "hostel",
    name: "Hostel",
    summary: "Separate hostel facilities (as applicable).",
    description:
      "<p>Hostel accommodation with mess and common amenities. Admission as per rules.</p>",
    order: 5,
  },
  {
    slug: "canteen",
    name: "Canteen",
    summary: "Hygienic food services on campus.",
    description:
      "<p>Canteen provides meals and snacks at subsidized rates during working hours.</p>",
    order: 6,
  },
];

function community(
  kind: CommunityKind,
  title: string,
): CommunitySection {
  return {
    kind,
    title,
    description: `${title} activities at College of Engineering Poonjar.`,
    content: `<p>This section highlights ${title} initiatives, events, and member information. Update copy in <code>data/site-data.ts</code>.</p>`,
    members: [
      { name: `${title} Coordinator`, role: "Coordinator", order: 1 },
      { name: "Member Representative", role: "Member", order: 2 },
    ],
    events: [
      {
        title: `${title} annual meet`,
        description: "Networking and planning session.",
        eventDate: new Date(Date.now() + 86400000 * 60).toISOString(),
      },
    ],
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
  { name: "Dr. IQAC Coordinator", designation: "Coordinator", department: "CSE", order: 1 },
  { name: "Prof. Member", designation: "Member", department: "ECE", order: 2 },
];

export const academicCouncilPage = {
  description: `<p>The Academic Council deliberates on curriculum, academic calendar, examinations, and quality improvement measures.</p>`,
  functions: `<ul><li>Approve academic regulations</li><li>Review assessment patterns</li><li>Recommend new programmes / revisions</li></ul>`,
};

export const academicCouncilMembers = [
  { name: "Principal", designation: "Chairperson", order: 1 },
  { name: "HoD — CSE", designation: "Member", order: 2 },
  { name: "Senior Professor", designation: "Member", order: 3 },
];

export const announcements: {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  published: boolean;
  priority: number;
  publishedAt?: string;
}[] = [
  {
    id: "a1",
    title: "Academic Year Registration Open",
    excerpt: "Students are advised to complete registration within the notified dates.",
    content: "<p>Detailed schedule is published on the notice board and website.</p>",
    published: true,
    priority: 1,
    publishedAt: new Date().toISOString(),
  },
  {
    id: "a2",
    title: "Holiday — Regional Festival",
    excerpt: "College remains closed on notified dates.",
    content: "<p>Refer academic calendar for updates.</p>",
    published: true,
    priority: 0,
    publishedAt: new Date().toISOString(),
  },
];

export const collegeEvents = [
  {
    id: "e1",
    title: "TechFest 2026",
    slug: "techfest-2026",
    description: "Annual technical festival with workshops and competitions.",
    startsAt: new Date(Date.now() + 86400000 * 14).toISOString(),
    venue: "Main Auditorium",
    imageUrl: undefined as string | undefined,
    published: true,
  },
  {
    id: "e2",
    title: "Alumni Meet",
    slug: "alumni-meet-2026",
    description: "Networking and knowledge sharing with alumni.",
    startsAt: new Date(Date.now() + 86400000 * 30).toISOString(),
    venue: undefined as string | undefined,
    published: true,
  },
];

export const testimonials = [
  {
    id: "t1",
    authorName: "Alumni — Batch 2020",
    role: "Software Engineer",
    batch: "2020",
    content:
      "Strong fundamentals and supportive faculty helped me start my career with confidence.",
    published: true,
    order: 1,
  },
];

export const galleryItems = [
  { id: "g1", title: "Campus", url: "/images/placeholder-campus.svg", category: "Campus", order: 1 },
  { id: "g2", title: "Lab", url: "/images/placeholder-lab.svg", category: "Labs", order: 2 },
];

export const studentForms = [
  {
    id: "sf1",
    title: "Bonafide Certificate Request",
    category: "downloadable",
    description: "Request form for bonafide certificate (add PDF to /public/documents).",
    fileUrl: "/documents/README.txt",
    order: 1,
  },
];

export const syllabi = [
  {
    id: "sy1",
    departmentSlug: "computer-science-engineering",
    title: "B.Tech CSE — Semester 1 Syllabus (Sample)",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    semester: "S1",
    academicYear: "2024-25",
    order: 0,
  },
];

/** --- Helpers --- */

export function getDepartmentBySlug(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function getAdmissionTrack(slug: string) {
  return admissionTracks.find((t) => t.slug === slug);
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

export function publishedEvents() {
  return collegeEvents.filter((e) => e.published);
}

export function publishedTestimonials() {
  return testimonials.filter((t) => t.published).sort((a, b) => a.order - b.order);
}
