/**
 * Static site content — edit this file to update the public website.
 * No database or build step required beyond `next build`.
 */

import { communitySections } from "./community-sections";
import { departments } from "./departments";
export {
  facultyFeedbackForms,
  studentWelfare,
  studentsHubLinks,
} from "./student-welfare";

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
  imageUrl?: string;
  order: number;
  faculties: FacultyRow[];
};

/** Hero images synced from cep.ac.in — keyed by route path */
export const pageHeroImages: Record<string, { src: string; alt: string }> = {
  "/about/institution": {
    src: "/images/pages/about-institution.jpg",
    alt: "College of Engineering Poonjar campus",
  },
  "/placements": {
    src: "/images/IMG_20240327_164043.jpg.jpeg",
    alt: "Placement and pass-out highlights at College of Engineering Poonjar",
  },
  "/admission": {
    src: "/images/pages/admission.jpg",
    alt: "Admissions at College of Engineering Poonjar",
  },
  "/academics/programs": {
    src: "/images/pages/programs.jpg",
    alt: "Academic programmes at College of Engineering Poonjar",
  },
  "/about/iqac": {
    src: "/images/pages/iqac.jpg",
    alt: "College of Engineering Poonjar — IQAC",
  },
  "/academics/council": {
    src: "/images/pages/council.jpg",
    alt: "College of Engineering Poonjar — Academic Council",
  },
  "/students": {
    src: "/images/pages/students.jpg",
    alt: "Student life at College of Engineering Poonjar",
  },
  "/contact": {
    src: "/images/pages/contact.jpg",
    alt: "Contact College of Engineering Poonjar",
  },
  "/community": {
    src: "/images/pages/community.jpg",
    alt: "Alumni and community at College of Engineering Poonjar",
  },
  "/students/anti-ragging": {
    src: "/images/pages/anti-ragging.png",
    alt: "Anti-ragging awareness at College of Engineering Poonjar",
  },
  "/academics/departments": {
    src: "/images/pages/departments.jpg",
    alt: "Academic departments at College of Engineering Poonjar",
  },
  "/facilities": {
    src: "/images/pages/facilities.jpg",
    alt: "Campus facilities at College of Engineering Poonjar",
  },
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
  phone?: string;
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
  /** Google Maps embed from https://cep.ac.in/about/contact */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.3412391804104!2d76.82954391533076!3d9.65185578157862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9924d34156f3bc17!2sCollege+of+Engineering+Poonjar!5e0!3m2!1sen!2sin!4v1467903669284",
  mapOpenUrl:
    "https://www.google.com/maps/place/College+of+Engineering+Poonjar/@9.6518558,76.8317326,17z",
};

/** From https://cep.ac.in/admission */
export const admissionHelplines = [
  { name: "Mr. Shine P James", phone: "9446122060" },
  { name: "Ms. Flower Abraham Mundackal", phone: "9400858312" },
  { name: "Ms. Josymol Joseph", phone: "8281649584" },
  { name: "Office", phone: "9562401737" },
] as const;

export const admissionFeeStructure = [
  {
    course: "Master of Computer Application",
    fileUrl: "/documents/fee.pdf",
    order: 1,
  },
  {
    course: "B.Tech",
    fileUrl: "/documents/fee.pdf",
    order: 2,
  },
  {
    course: "Bachelor of Computer Applications",
    fileUrl: "/documents/fee.pdf",
    order: 3,
  },
  {
    course: "Bachelor of Business Administration",
    fileUrl: "/documents/fee.pdf",
    order: 4,
  },
  {
    course: "Diploma",
    fileUrl: "/documents/fee.pdf",
    order: 5,
  },
] as const;

/** From https://cep.ac.in/about/aboutUs */
export const aboutInstitution = {
  /** Short intro shown on the homepage only */
  homeIntro:
    "College of Engineering Poonjar was established in 2000 by the Institute of Human Resources Development (IHRD), an autonomous educational institution under the Government of Kerala. The college is located in a scenic place on a calm hilly region with pure air and greenery congenial for any student to pursue learning with dedication.",
  intro: `<p>College of Engineering Poonjar was established in 2000 By Institute of Human Resources Development (IHRD), an autonomous educational institution under the Government of Kerala. The management of IHRD is vested with a Governing Body composed of with the Hon'ble Minister of Education, Kerala State, as the Chairman and Additional Chief Secretary, Higher Education Department, Government of Kerala as the Vice-Chairman. IHRD is based on the principle, "Think Globally and Act Locally" and its associate institutions are located in diverse locations in Kerala to achieve this goal. College of Engineering Poonjar is located in a scenic place on a calm hilly region with pure air and greenery congenial for any student to pursue learning with dedication.</p>`,
  vision: `<p>Scientific advancement, Technological progress and Economic growth of the Country through human resources development adhering to the principle "Think Globally, and Act Locally".</p>`,
  mission: `<ul><li>To provide education and training of consistently high standards through innovative and versatile programmes that are beneficial to the current and emerging needs of the society.</li><li>To ensure that the aim of education is realized not only in the acquisition of new knowledge and skills, but also in the attainment of wisdom and judgement indispensable to their proper application.</li><li>To provide support in ensuring life long learning which promotes the total development of individual and society in which the person functions.</li></ul>`,
  eoaDocuments: [
    {
      label: "E.O.A 2025–2026",
      fileUrl: "/documents/EOA_2025_2026.pdf",
      order: 1,
    },
    {
      label: "E.O.A 2024–2025",
      fileUrl: "/documents/EOA_2024_2025.pdf",
      order: 2,
    },
    {
      label: "E.O.A 2000–2024",
      fileUrl: "/documents/EOA_2000_2024.pdf",
      order: 3,
    },
  ],
};

export const principalProfile = {
  name: "Dr. M V Rajesh",
  designation: "Principal",
  qualification: "Ph.D.",
  yearsOfExperience: "25+",
  quote:
    "Education is not merely the acquisition of knowledge, but the development of character, innovation, and leadership.",
  message: `<p>As we gather in the serene embrace of our college's verdant campus, I am filled with pride and gratitude for the journey we have embarked upon together. Our institution stands not only as a bastion of academic excellence but also as a nurturing ground for the leaders and innovators of tomorrow. At our college, we believe in more than just imparting knowledge; we strive to cultivate holistic development in our students. We endeavour to nurture their young minds, providing them with the fertile soil they need to enrich their intellect and spread the wings of their aspirations. Our commitment extends beyond the classroom, as we endeavour to equip our students with the real-life experiences and practical skills necessary to navigate the challenges they will encounter in their professional and personal lives.</p><p>One of the defining features of our institution is our commitment to fostering a calm, eco-friendly, and green environment. Our lush campus not only provides a picturesque backdrop for learning but also serves as a constant reminder of our responsibility to the planet. We take pride in our sustainability initiatives and our efforts to instil environmental consciousness in our students. It is heartening to see the fruits of our labour reflected in the success of our placement programs and the strong ties we maintain with our esteemed alumni. Our students are not only well-prepared academically but also possess the confidence and adaptability to excel in any work environment. The high placement success and active engagement of our alumni stand as a testament to the quality of education and mentorship provided at our college.</p><p>Moreover, the drive and enthusiasm of our students in organizing and participating in various programs and events are truly commendable. Whether it be cultural festivals, academic competitions, or community outreach initiatives, our students consistently demonstrate their passion and commitment to making a positive impact on society. Central to our mission is our unwavering focus on providing excellent academics and state-of-the-art facilities to our students. From cutting-edge laboratories to well-stocked libraries, we spare no effort in ensuring that our students have access to the resources they need to thrive. As we look ahead to the future, I am confident that our college will continue to be a beacon of excellence, guiding and inspiring generations of students to reach greater heights. Together, let us continue to nurture talent, foster innovation, and create a brighter tomorrow.</p>`,
  photoUrl: "/images/pages/principal.jpg",
  email: "principal@cep.ac.in",
  phone: "+918547005035",
};

export const principalVisionPillars = [
  {
    title: "Academic Excellence",
    description:
      "Delivering rigorous, industry-aligned programmes that uphold the highest standards of teaching, learning, and assessment under IHRD.",
  },
  {
    title: "Research & Innovation",
    description:
      "Encouraging inquiry, experimentation, and creative problem-solving that prepares students for emerging technological challenges.",
  },
  {
    title: "Student Development",
    description:
      "Nurturing character, leadership, and holistic growth through academics, co-curricular activities, and community engagement.",
  },
] as const;

export const principalAchievements = [
  { value: 25, suffix: "+", label: "Years of Service" },
  { value: 2000, suffix: "+", label: "Student Strength" },
  { value: 8, suffix: "", label: "Programs Offered" },
  { value: 25, suffix: "+", label: "Institutional Achievements" },
] as const;

export { departments };

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
    intake: "60",
    order,
    departmentSlug,
    about: `<p>College of Engineering Poonjar offers three year regular diploma courses affiliated to the Board of Technical Education, Kerala. The ${fullTitle.replace(/&/g, "&amp;")} is a technical education programme designed to provide students with fundamental engineering knowledge and practical skills in ${safeBranch.toLowerCase()}. The course focuses on industry-oriented learning through classroom sessions, laboratory practice, workshops, and project-based training. Students gain hands-on experience in core engineering concepts, technical problem-solving, modern tools, and industrial applications related to their specialization. The programme also helps students develop communication, teamwork, and professional skills required for technical careers. After completing the diploma, students can pursue employment opportunities in industries, manufacturing, maintenance, production, and technical services, or continue higher studies through lateral entry into engineering degree programmes.</p>`,
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
    name: "B.Tech Computer Science and Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "90",
    order: 1,
    departmentSlug: "computer-science-engineering",
    about:
      "<p>College of Engineering Poonjar offers full-time graduate courses of APJ Abdul Kalam Technological University (KTU), approved by AICTE. The institute is owned by the Government of Kerala and managed by the Institute of Human Resources Development (IHRD).</p><p>The Bachelor of Technology in Computer Science &amp; Engineering (CSE) is a professional undergraduate programme that prepares students for careers in the fast-growing field of technology and innovation. The course provides knowledge in programming, software development, artificial intelligence, cybersecurity, data science, cloud computing, networking, and modern computing technologies through both theoretical learning and practical training. Students develop problem-solving, analytical, and technical skills through projects, laboratory sessions, internships, and industry-oriented activities. The programme also focuses on communication, teamwork, and professional development, helping students become industry-ready professionals. Graduates can explore career opportunities in software companies, IT industries, startups, research organizations, and government sectors, or pursue higher studies in advanced technology fields.</p>",
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
    name: "B.Tech Electronics and Communication Engineering",
    duration: "4 Years",
    affiliation: "APJ Abdul Kalam Technological University",
    intake: "30",
    order: 2,
    departmentSlug: "electronics-communication-engineering",
    about:
      "<p>College of Engineering Poonjar offers full-time graduate courses of APJ Abdul Kalam Technological University (KTU), approved by AICTE. The institute is owned by the Government of Kerala and managed by the Institute of Human Resources Development (IHRD).</p><p>The B.Tech in Electronics &amp; Communication Engineering (ECE) is a professional undergraduate programme that focuses on the study of electronic devices, communication technologies, embedded systems, and modern electronic applications. The course provides students with strong theoretical knowledge and practical skills in areas such as digital electronics, microprocessors, signal processing, wireless communication, VLSI design, IoT, and automation technologies. Through laboratory sessions, projects, workshops, and industry-oriented training, students gain hands-on experience and problem-solving abilities required in the modern electronics and communication industry. The programme also helps students develop innovation, technical expertise, teamwork, and professional skills, preparing them for careers in telecommunications, embedded systems, electronics manufacturing, automation, research, and higher studies in advanced technology fields.</p>",
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
    intake: "30",
    order: 3,
    departmentSlug: "computer-applications",
    about:
      "<p>College of Engineering Poonjar offers Master of Computer Applications (MCA) of APJ Abdul Kalam Technological University (KTU) and is approved by AICTE. The Master of Computer Applications (MCA) is a postgraduate programme designed to provide advanced knowledge and practical skills in computer applications, software development, and modern computing technologies. The programme focuses on programming, database management, web and mobile application development, cloud computing, artificial intelligence, cybersecurity, and software engineering concepts. Through projects, laboratory sessions, internships, and industry-oriented training, students gain hands-on experience and problem-solving abilities required in the IT industry. The course also enhances analytical thinking, communication, teamwork, and professional skills, preparing graduates for careers in software development, IT services, system management, research, product development, and higher studies in advanced computing fields.</p>",
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
    "Civil (Public Health And Environment) Engineering",
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
      "<p>College of Engineering Poonjar admits 3-year polytechnic diploma or B.Sc. degree holders directly to the 3rd semester B.Tech programmes through the Lateral Entry Scheme.</p><p><strong>Academic Eligibility:</strong> Candidates who have completed a three years/two years (Lateral Entry) Diploma in Engineering and Technology or D.Voc from State Board of Technical Education, universities, or government institutions, or are currently enrolled in AICTE approved institutions. Additionally, candidates with a B.Sc. degree from a recognized university, with Mathematics at the 10+2 level, are eligible to apply. Applicants must fulfill the minimum marks requirement. For students from diverse backgrounds, universities will offer suitable bridge courses in Mathematics, Physics, Engineering drawing, etc., to ensure the achievement of desired learning outcomes for the programme.</p>",
    allotment:
      "<p><strong>Allotment:</strong> The B.Tech Lateral Entry admission process in Kerala utilizes a Single Window System (SWS) for allotment, managed by the Director, LBS Centre for Science and Technology. This system facilitates transparent allotments to Government, Aided, Cost-sharing, and Private Self Financing Colleges based on candidates' online preferences and rank list inclusion. Candidates can conveniently select colleges in order of preference, with allotments strictly based on options exercised, rank obtained, and eligible reservations. Registration of options is exclusively through the website <a href=\"https://www.lbscentre.kerala.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">www.lbscentre.kerala.gov.in</a>, and candidates are advised to register only for colleges they intend to join upon allotment.</p><p>For details of Lateral Entry Test entrance examination and allotment see the website: <a href=\"https://www.lbscentre.kerala.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">www.lbscentre.kerala.gov.in</a></p>",
    feeStructure: "<p>Fee structure as notified by the Government of Kerala and IHRD for the respective academic year.</p>",
    importantLinks: [
      { label: "LBS Centre Kerala", url: "https://www.lbscentre.kerala.gov.in" },
      { label: "DTE Kerala", url: "https://dtekerala.gov.in" },
    ],
    downloads: [
      { label: "Lateral entry information", fileUrl: "https://www.lbscentre.kerala.gov.in" },
    ],
  },
];

/** Placement page copy from https://cep.ac.in/placement */
export const placementOverview = {
  content: `<h2>About CGPU</h2><p>The Career Guidance and Placement Unit(CGPU) of College of Engineering Poonjar is a voluntary organization headed by the Placement Officer and assisted by student representatives from all the departments. The Principal,P.T.A, Staff members and all students of this institution extends their support to the successful functioning of the Unit.CGPU organizes lectures, seminars, group discussions, mock interviews, industry visits etc. for career guidance, personality development, communication skill development, technical skill improvement ,compititive exam guidance and entrepreneurship. They also provide information and assistance to students regarding job opportunities in India and abroad, opportunities for self employment, opportunities for higher studies in India and Abroad. The Placement Cell gives training, arranges programs and conduct recruitment drives. The Training is given in to prepare resumes, to present self introduction, to face interviews and to participate in group discussions.Various Personality development programs which are a blend of lectures from experts Mind games and entertainments are conducted to initiate the students into active mode. 'Super Brain' is one such programme organized and executed by the students themselves. We also arrange training programs by outside agencies. The cell provides information's to students about opportunities in different companies Profiles of this companies and their recruitment schedule. The cell contacts the companies and provides them the details about our college and our students profile and persuade them to conduct drives in our college or to include our students in the drives they conduct in other colleges.The cell organizes recruitment drives of reputed companies in the college itself with the help of our students. From the first year onwards the students are initiated into better English language communication by lectures debates and interactive sessions.</p><h2>Placement Cell</h2><p>Activities of the CGPU are co-ordinated by a Placement Cell committee under the advice of Placement Officer. The present committee has been constituted as follows.</p>`,
};

export const placementTeamMembers = [
  {
    name: "Mrs. Flower Abraham Mundackal",
    role: "Training and Placement Officer",
    isOfficer: true,
    email: "cgpucepoonjar@gmail.com",
    phone: "+91 9400858312",
    order: 1,
  },
  {
    name: "Mrs. Josymol Joseph",
    role: "Assistant Placement Officer",
    isOfficer: false,
    email: "josymol@cep.ac.in",
    order: 2,
  },
  {
    name: "Mr. Jince Jose",
    role: "Assistant Placement Officer",
    isOfficer: false,
    email: "jince@cep.ac.in",
    order: 3,
  },
  {
    name: "Mr. Mahesh Krishnan S",
    role: "Assistant Placement Officer",
    isOfficer: false,
    email: "maheshks4you123@gmail.com",
    order: 4,
  },
  { name: "Robin Samuelkutty", role: "S7 BTECH CSE Representative", isOfficer: false, email: "robinsamuelkutty77@gmail.com", order: 5 },
  { name: "Diya Sara Binoy", role: "S7 BTECH CSE Representative", isOfficer: false, email: "diyasarabinoy@gmail.com", order: 6 },
  { name: "Sandeep Santhosh", role: "S7 BTECH CSE Representative", isOfficer: false, email: "sandepsanthosh@gmail.com", order: 7 },
  { name: "Amal Sunny", role: "S5 BTECH CSE Representative", isOfficer: false, email: "amalsunny2005@gmail.com", order: 8 },
  { name: "Archaneswary K Sunil", role: "S5 BTECH CSE Representative", isOfficer: false, email: "archaneswaryachu777@gmail.com", order: 9 },
  { name: "Akshay CV", role: "S5 BTECH CSE Representative", isOfficer: false, email: "cvakshay764@gmail.com", order: 10 },
  { name: "Abhishek T.P", role: "S3 BTECH CSE Representative", isOfficer: false, email: "abhi656723@gmail.com", order: 11 },
  { name: "Rosemary Rejimon", role: "S3 BTECH CSE Representative", isOfficer: false, email: "rosesaps2005@gmail.com", order: 12 },
  { name: "Isha Shajahan", role: "S3 BTECH CSE Representative", isOfficer: false, email: "ishashajahn@gmail.com", order: 13 },
  { name: "Alan C V", role: "S3 BTECH CSE Representative", isOfficer: false, email: "cva8724@gmail.com", order: 14 },
  { name: "Ann Susan Philip", role: "S3 BTECH ECE Representative", isOfficer: false, email: "annsusanphilip53@gmail.com", order: 15 },
  { name: "Shameer Sabeer", role: "S3 MCA Representative", isOfficer: false, email: "shemeersabeer@gmail.com", order: 16 },
  { name: "Anjo jose", role: "S5 Diploma EL Representative", isOfficer: false, email: "anjo20jose@gmail.com", order: 17 },
  { name: "Joseph Francis", role: "S5 Diploma CT Representative", isOfficer: false, email: "jfch2626@gmail.com", order: 18 },
  { name: "Manu Raju", role: "S5 Diploma EE Representative", isOfficer: false, email: "rajumanu238@gmail.com", order: 19 },
  { name: "Christymon Jose", role: "S3 Diploma AU Representative", isOfficer: false, email: "sschiron9@gmail.com", order: 20 },
  { name: "Vishnu P Vijay", role: "S5 Diploma EL Representative", isOfficer: false, email: "vishnupvijay83@gmail.com", order: 21 },
  { name: "Abhijith P Sanju", role: "S3 Diploma EEE Representative", isOfficer: false, email: "abhijithpsanju409@gamil.com", order: 22 },
  { name: "Renil Jose", role: "S3 Diploma CT Representative", isOfficer: false, email: "reniljose24@gmail.com", order: 23 },
];

export const placementDrives: {
  company: string;
  description: string;
  driveDate?: string;
  package?: string;
  selectedCount?: number;
  logoUrl?: string;
}[] = [];

export const placementStatistics: {
  academicYear: string;
  totalOffers?: number;
  highestPackage?: string;
  averagePackage?: string;
  placementPercent?: number;
  visitedCompanies?: number;
}[] = [];

export const placementActivities: {
  title: string;
  description: string;
  activityDate?: string;
  order: number;
}[] = [];

export const facilities: Facility[] = [
  {
    slug: "central-computing-facility",
    name: "Central Computing Facility",
    summary: "114 PCs with Windows and Linux, campus-wide broadband, and antivirus protection.",
    description:
      "<p>Our Central Computing Facility is equipped with a collection of 114 PCs, including Intel Core 2 Duo and AMD Athlon Machines, running Windows 7, Windows 10, and Windows 11, as well as Red Hat Linux and Fedora operating systems. These systems are interconnected through a D-Link Advanced Hub, ensuring efficient network management. With uninterrupted electricity supply, the lab provides 24-hour broadband internet access across the campus, empowering students with the 'Ultimate Resource of Education'. To ensure security and protection against unwanted sites, we employ AVG Antivirus Solution, safeguarding the integrity of our computing environment and promoting a safe browsing experience for all users.</p>",
    imageUrl: "/images/facilities/facility-computer.jpg",
    order: 1,
  },
  {
    slug: "library",
    name: "Library",
    summary: "Over 10,000 volumes, digital library, and e-learning resources.",
    description:
      "<p>The College library houses over 10,000 volumes of books alongside modern amenities such as photocopying and internet facilities, including an e-book center with approximately 500 titles. With two functional parts, our library accommodates over 200 readers at a time, offering a borrowing period of 14 days for books, extendable for an additional 14 days. Our fully automated and modernized facility features a Digital Library section and internet access, providing services like current affairs awareness, selective dissemination of information, and e-learning resources. Open on all working days from 9 am to 5 pm, library cards are issued to all members for book borrowing, ensuring a rich and accessible learning environment for our college community.</p>",
    imageUrl: "/images/facilities/facility-library.jpg",
    order: 2,
  },
  {
    slug: "seminar-hall",
    name: "Seminar Hall",
    summary: "Spacious hall seating up to 350 for seminars, workshops, and cultural events.",
    description:
      "<p>Our seminar hall is a versatile venue tailored to meet the diverse needs of our college community. With a spacious capacity accommodating up to 350 individuals, it serves as an ideal space for hosting a wide array of events, including academic seminars, workshops, guest lectures, and cultural performances.</p>",
    imageUrl: "/images/facilities/facility-seminar.jpg",
    order: 3,
  },
  {
    slug: "transportation",
    name: "Transportation",
    summary: "College buses from Pala, Kanjirappally, and Erattupetta.",
    description:
      "<p>The college operates a fleet of buses to facilitate convenient commuting for students and faculty from various locations. With regular services from Pala, Kanjirappally, and Erattupetta, we aim to ensure hassle-free transportation for all members of our college community.</p><p>The college buses run on designated routes with scheduled stops at key locations in Pala, Kanjirappally, and Erattupetta. The routes are designed to cover the most frequented areas to accommodate the needs of our students and faculty. Please refer to the college office for details on bus timings and stops.</p>",
    imageUrl: "/images/facilities/facility-transport.jpg",
    order: 4,
  },
  {
    slug: "hostel",
    name: "Hostel",
    summary: "Three hostels with warden supervision and daily college bus service.",
    description:
      "<p>Our college offers comfortable accommodation for students through three hostels, comprising two women's hostels and one men's hostel. The men's hostel is conveniently located within the campus premises, providing easy access to academic facilities and campus life. Additionally, our women's hostels, situated in Poonjar, offer a safe and supportive living environment for female students. With well-maintained facilities, including spacious rooms, common areas, and dining facilities, our hostels aim to provide a conducive living and learning environment for students pursuing their academic endeavors. The college bus provides transit to and from college every day, ensuring convenient access for hostel residents. Furthermore, all hostels have a warden, usually a faculty member, who supervises and addresses any grievances, ensuring the safety and well-being of our students throughout their stay.</p>",
    imageUrl: "/images/collageOutDoor-2.jpg",
    order: 5,
  },
  {
    slug: "canteen",
    name: "Canteen",
    summary: "On-campus meals, snacks, and beverages at affordable prices.",
    description:
      "<p>Our college canteen is a vibrant social hub offering a diverse menu of delicious meals, snacks, and beverages to suit every taste. Conveniently located on campus, it provides students and faculty with a welcoming space to relax, refuel, and connect. We prioritize hygiene and safety in food preparation, ensuring high-quality meals at affordable prices. With a community atmosphere and affordable prices, our canteen is the perfect place to unwind and enjoy a satisfying meal with friends.</p>",
    imageUrl: "/images/facilities/facility-canteen.jpg",
    order: 6,
  },
];

export { communitySections };

/** From https://cep.ac.in/iqac */
export const iqacContent = {
  intro: `<p>Internal Quality Assurance Cell or Internal Audit Cell (IQAC/IAC) comprises of senior faculty members having representation from each department and is constituted by the Principal for the purpose of ensuring timely, efficient and progressive performance of academic and administrative tasks. A senior member of IQAC shall be its coordinator. The term of IQAC shall be one academic year .IQAC shall conduct internal academic audits and produce the required documents and records to the External Auditor appointed by the University, on demand IQAC is also responsible for uploading monthly report, annual report and any other data required by the University. IQAC will aim to develop and apply quality benchmarks/parameters for the various academic and administrative activities of the institution .IQAC shall ensure equitable access to resources for various classes of the society, and to organize conduct of remedial coaching and bridge programmes as and when it is needed IQAC shall strive to incorporate modern methods into the teaching learning process.</p>`,
};

export const iqacMembers = [
  { role: "Chairman", member: "Dr. M V Rajesh (Principal)", order: 1 },
  { role: "Representative from Teachers", member: "Mr. Shine P James (HoD ECE)", order: 2 },
  { role: "Representative from Teachers", member: "Mr. Rajesh K.R (HoD CSE)", order: 3 },
  { role: "Representative from Teachers", member: "Mr. Joshy Joseph , (HoD, EEE)", order: 4 },
  { role: "Representative from Teachers", member: "Ms. Suneetha S (Asso.prof.in Chemistry)", order: 5 },
  { role: "Representative from Teachers", member: "Mr. Manoj K R (HoD, Applied Science)", order: 6 },
  { role: "Representative from Teachers", member: "Dr. Minu K K (Asso.Prof.in Maths)", order: 7 },
  { role: "Member from Management", member: "Dr. K.T.Shanavaz (Asso.Prof. in ECE ,CE Kallooppara)", order: 8 },
  { role: "Senior Administrative Officer", member: "Mr. Babu Sukumaran (Head Clerk)", order: 9 },
  { role: "Nominee from local Society", member: "Mr. Johnson Joseph (SMVHSS Panachikappara)", order: 10 },
  { role: "Nominee from students", member: "Mr. Arjun Nair (S5 CSE)", order: 11 },
  { role: "Nominee from Alumni", member: "Mr. Romy Joy (2015-19 ECE)", order: 12 },
  { role: "Nominee from Industry", member: "Mr. Arun M J (Director Makonics infinity Solutions , Kochi)", order: 13 },
  { role: "Nominee from Professional body", member: "Ms. Flower Abraham Mundackal (Co- ordinator,ISTE)", order: 14 },
];

/** Academic Council composition — leadership and representatives across departments and stakeholders. */
export type AcademicCouncilMember = {
  name: string;
  designation: string;
  departmentOrRole: string;
  email?: string;
  phone?: string;
  order: number;
  leadership?: boolean;
};

export const academicCouncilMembers: AcademicCouncilMember[] = [
  {
    name: "Dr. M V Rajesh",
    designation: "Chairman",
    departmentOrRole: "Principal",
    email: "principal@cep.ac.in",
    phone: "+918547005035",
    order: 1,
    leadership: true,
  },
  {
    name: "Mr. Babu Sukumaran",
    designation: "Council Secretary",
    departmentOrRole: "Senior Administrative Officer",
    order: 2,
    leadership: true,
  },
  {
    name: "Mr. Rajesh K R",
    designation: "Faculty Representative",
    departmentOrRole: "Head of Department, Computer Science & Engineering",
    order: 3,
    leadership: true,
  },
  {
    name: "Dr. Annie Julie Joseph",
    designation: "Member",
    departmentOrRole: "Head of Department, Computer Applications",
    order: 4,
  },
  {
    name: "Ms. Flower Abraham Mundackal",
    designation: "Member",
    departmentOrRole: "Head of Department, Electronics & Communication Engineering",
    order: 5,
  },
  {
    name: "Mr. Shine P James",
    designation: "Member",
    departmentOrRole: "Head of Department, Electrical & Electronics Engineering",
    order: 6,
  },
  {
    name: "Mr. Joshy Joseph",
    designation: "Member",
    departmentOrRole: "Head of Department, Automobile Engineering",
    order: 7,
  },
  {
    name: "Mr. Manoj K R",
    designation: "Member",
    departmentOrRole: "Head of Department, Applied Science",
    order: 8,
  },
  {
    name: "Mr. Arjun Nair",
    designation: "Student Representative",
    departmentOrRole: "Nominee from Students",
    order: 9,
  },
  {
    name: "Mr. Johnson Joseph",
    designation: "External Member",
    departmentOrRole: "Nominee from Local Society — SMVHSS Panachikappara",
    order: 10,
  },
  {
    name: "Mr. Romy Joy",
    designation: "Alumni Representative",
    departmentOrRole: "Nominee from Alumni (2015–19 ECE)",
    order: 11,
  },
  {
    name: "Mr. Arun M J",
    designation: "Industry Representative",
    departmentOrRole: "Director, Makonics Infinity Solutions, Kochi",
    order: 12,
  },
];

export const academicCouncilResponsibilities = [
  {
    title: "Academic Planning",
    description:
      "Formulate the institutional vision, mission, and strategic plan; prepare the academic calendar and information brochure in alignment with university schedules.",
  },
  {
    title: "Curriculum Development",
    description:
      "Advise on courses of instruction, academic policies, and programme-related matters to ensure relevance and quality across all departments.",
  },
  {
    title: "Quality Assurance",
    description:
      "Review and adapt important policy decisions, conduct periodic analysis of university examination results, and uphold academic standards.",
  },
  {
    title: "Student Development",
    description:
      "Address student discipline, grievances, and welfare; support the smooth conduct of academic and co-curricular activities on campus.",
  },
  {
    title: "Research & Innovation",
    description:
      "Promote a culture of inquiry and excellence; liaise with PTA, Alumni Association, and external bodies to strengthen academic engagement.",
  },
] as const;

export const academicCouncilPage = {
  description: `<p>The Academic Council is a body which assists the Principal in decision making with regard to academic, courses of instruction, and rules of discipline of students. This body is constituted by the Principal. The council will be asked to consider and report on any question concerning the academic, courses of instruction and rules of discipline by the Principal. The council meets at least once in a month. The tenure of the members is three years.</p>`,
  functions: `<ul><li>To discuss and adapt all important policy decisions before getting promulgated. The Principal can override any decision taken by the council in case of any contingency, on communication to the Academic Council.</li><li>To formulate the vision, mission and strategic plan of the college before being put up in the Board of Governors for approval.</li><li>To prepare academic calendar for the institution in tune with the University calendar.</li><li>To prepare information brochure for dissemination among the stake holders.</li><li>To discuss complaints regarding students and to suggest appropriate disciplinary actions.</li><li>To conduct periodic analysis of result upon declaration of the results of University Examinations.</li><li>To help the Principal in maintaining discipline and for the smooth conduct of academic and non-academic matters in the college.</li><li>To act as a liaisoning entity with various bodies like PTA, Alumni Association etc.</li></ul>`,
};

export const campusAlbum = [
  {
    src: "/images/slides/placement-2025-26.png",
    title: "Placement 2025-26",
    alt: "Placement 2025-26",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/kalika-26.jpg",
    title: "College Arts Day KALIKA'26",
    alt: "College Arts Day KALIKA'26",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/yuga-26.jpg",
    title: "College Sports Day YUGA'26",
    alt: "College Sports Day YUGA'26",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/achievements-2025.jpg",
    title: "Hall Of Achievements 2025",
    alt: "Hall Of Achievements 2025",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/anti-ragging.png",
    title: "Anti-Ragging Week Awareness",
    alt: "Anti-Ragging Week Awareness",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/thrikonam-25.png",
    title: "THRIKONAM'25 — Onam Celebration",
    alt: "THRIKONAM'25 — Onam Celebration",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/excellence-day-25.png",
    title: "EXCELLENCE-DAY'25 — Graduation Ceremony",
    alt: "EXCELLENCE-DAY'25 — Graduation Ceremony",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/industry-campus.jpg",
    title: "Industry On Campus Inauguration & Environment Day",
    alt: "Industry On Campus Inauguration & Environment Day",
    description: undefined as string | undefined,
  },
  {
    src: "/images/slides/ekthara-25.jpg",
    title: "EKTHARA'25 — College Day",
    alt: "EKTHARA'25 — College Day",
    description: undefined as string | undefined,
  },
] as const;

export type CampusAlbumItem = (typeof campusAlbum)[number];

/** Optional rich “spotlight” block for the homepage featured panel (trusted static copy). */
export type AnnouncementSpotlight = {
  /** Main paragraph; use **text** for bold segments. */
  body: string;
  /** Programme lines; use **label** for bold prefixes. */
  programLines: string[];
};

export const NOTICE_CATEGORIES = [
  "Admissions",
  "Examinations",
  "Events",
  "Circulars",
  "Placements",
] as const;

export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

export type AnnouncementHomepageBadge = "NEW" | "IMPORTANT";

export type Announcement = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  published: boolean;
  priority: number;
  publishedAt?: string;
  category: NoticeCategory;
  spotlight?: AnnouncementSpotlight;
  /** Homepage Latest Announcements badge override. */
  homepageBadge?: AnnouncementHomepageBadge;
  /** Shown with calendar icon on the homepage (e.g. Academic Year 2026–27). */
  academicYearLabel?: string;
  /** Optional CTA on the homepage card. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Subtle highlight for high-priority homepage cards. */
  highlight?: boolean;
};

export const announcements: Announcement[] = [
  {
    id: "a-btech-fee-structure-2026-27",
    title: "B.Tech Admission Fee Structure 2026–27",
    excerpt:
      "The B.Tech Admission Fee Structure for the Academic Year 2026–27 has been published. Parents and students can now view the complete fee details for Merit (Low Fee) and Merit (High Fee) categories before completing the admission process.",
    content:
      "<p>The B.Tech Admission Fee Structure for the Academic Year 2026–27 has been published. Parents and students can now view the complete fee details for Merit (Low Fee) and Merit (High Fee) categories on the B.Tech programme pages.</p>",
    published: true,
    priority: 20,
    publishedAt: "2026-07-21T10:00:00.000Z",
    category: "Admissions",
    homepageBadge: "NEW",
    academicYearLabel: "Academic Year 2026–27",
    ctaLabel: "View Fee Structure",
    ctaHref: "/academics/programs/btech-computer-science-engineering#btech-fee-structure",
    highlight: true,
  },
  {
    id: "a-btech-documents-keam-2026",
    title: "Documents Required for B.Tech Admission (KEAM 2026)",
    excerpt:
      "Students who have received KEAM 2026 allotment are requested to bring all the required original certificates and supporting documents at the time of admission.",
    content:
      "<p>Students who have received KEAM 2026 allotment are requested to bring all the required original certificates and supporting documents at the time of admission. See the full checklist on the B.Tech programme pages.</p>",
    published: true,
    priority: 19,
    publishedAt: "2026-07-21T09:00:00.000Z",
    category: "Admissions",
    homepageBadge: "IMPORTANT",
    academicYearLabel: "Academic Year 2026–27",
    ctaLabel: "View Required Documents",
    ctaHref: "/academics/programs/btech-computer-science-engineering#btech-documents",
  },
  {
    id: "a-admissions",
    title: "Admissions — Academic Year 2026–2027",
    excerpt:
      "Registration is open for B.Tech, MCA, and Diploma programmes at College of Engineering Poonjar.",
    content: "<p>Refer the admissions page for eligibility, fees, and schedules.</p>",
    published: true,
    priority: 10,
    publishedAt: "2026-06-20T12:00:00.000Z",
    category: "Admissions",
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
    category: "Circulars",
  },
  {
    id: "a-temp-appointment-2",
    title: "Temporary Appointment 2",
    excerpt: "Temporary appointment notification.",
    content: "<p>Refer the college office for application details.</p>",
    published: true,
    priority: 8,
    publishedAt: "2026-05-26T12:00:00.000Z",
    category: "Circulars",
  },
  {
    id: "a-temp-appointment",
    title: "Temporary Appointment",
    excerpt: "Temporary appointment notification.",
    content: "<p>Refer the college office for application details.</p>",
    published: true,
    priority: 7,
    publishedAt: "2026-05-26T12:00:00.000Z",
    category: "Circulars",
  },
  {
    id: "a-guest-notification-2",
    title: "Guest Notification 2",
    excerpt: "Guest lecture / visit notification.",
    content: "<p>Schedule and venue details will be announced in due course.</p>",
    published: true,
    priority: 6,
    publishedAt: "2026-05-22T12:00:00.000Z",
    category: "Events",
  },
  {
    id: "a-guest-notification",
    title: "Guest Notification",
    excerpt: "Guest lecture / visit notification.",
    content: "<p>Schedule and venue details will be announced in due course.</p>",
    published: true,
    priority: 5,
    publishedAt: "2026-05-20T12:00:00.000Z",
    category: "Events",
  },
];

export const studentForms = [
  {
    id: "sf-common",
    title: "Common Application Form",
    category: "forms",
    description: "Common application form for student requests.",
    fileUrl: "/documents/CEP_common_application_form.pdf",
    order: 1,
  },
  {
    id: "sf-no-dues-student",
    title: "No Dues Certificate Application Students",
    category: "forms",
    description: "No dues certificate application for students.",
    fileUrl: "/documents/CEP_Student_No_Dues_Certificate.pdf",
    order: 2,
  },
  {
    id: "sf-sem-registration",
    title: "Semister Registeration Form - All Courses",
    category: "forms",
    description: "Semester registration form for all courses.",
    fileUrl: "/documents/CEP-Sem_Registration-all_courses.pdf",
    order: 3,
  },
  {
    id: "sf-no-dues-faculty",
    title: "No Dues Certificate faculties",
    category: "forms",
    description: "No dues certificate application for faculty and staff.",
    fileUrl: "/documents/NO_DUES_CERTIFICATE_FOR_FACULTY_7_STAFF.pdf",
    order: 4,
  },
  {
    id: "sf-permission",
    title: "Student Permission Form",
    category: "forms",
    description: "Student permission form with parent consent.",
    fileUrl: "/documents/CE_Poonjar_Student_Permission_Form_with_Parent_Consent.pdf",
    order: 5,
  },
];

export const syllabusPageIntro =
  "Official KTU and diploma course syllabus resources. Download links for individual programmes are listed below.";

export const syllabi = [
  {
    id: "sy-mca",
    departmentSlug: "computer-applications" as string | undefined,
    title: "Master of Computer Application",
    fileUrl: "https://ktu.edu.in/en/academic/syllabus",
    semester: undefined as string | undefined,
    academicYear: "KTU",
    order: 1,
  },
  {
    id: "sy-btech-cse",
    departmentSlug: "computer-science-engineering" as string | undefined,
    title: "B.Tech Computer Science and Engineering",
    fileUrl: "https://ktu.edu.in/en/academic/syllabus",
    semester: undefined as string | undefined,
    academicYear: "KTU",
    order: 2,
  },
  {
    id: "sy-btech-ece",
    departmentSlug: "electronics-communication-engineering" as string | undefined,
    title: "B.Tech Electronics and Communication Engineering",
    fileUrl: "https://ktu.edu.in/en/academic/syllabus",
    semester: undefined as string | undefined,
    academicYear: "KTU",
    order: 3,
  },
  {
    id: "sy-dip-ce",
    departmentSlug: "computer-science-engineering" as string | undefined,
    title: "Diploma in Computer Engineering",
    fileUrl: "https://sbte.kerala.gov.in",
    semester: undefined as string | undefined,
    academicYear: "SBTE",
    order: 4,
  },
  {
    id: "sy-dip-hw",
    departmentSlug: undefined as string | undefined,
    title: "Diploma in Hardware Engineering",
    fileUrl: "https://sbte.kerala.gov.in",
    semester: undefined as string | undefined,
    academicYear: "SBTE",
    order: 5,
  },
  {
    id: "sy-dip-el",
    departmentSlug: "electronics-communication-engineering" as string | undefined,
    title: "Diploma in Electronics Engineering",
    fileUrl: "https://sbte.kerala.gov.in",
    semester: undefined as string | undefined,
    academicYear: "SBTE",
    order: 6,
  },
  {
    id: "sy-dip-eee",
    departmentSlug: "electrical-electronics-engineering" as string | undefined,
    title: "Diploma in Electrical and Electronics Engineering",
    fileUrl: "https://sbte.kerala.gov.in",
    semester: undefined as string | undefined,
    academicYear: "SBTE",
    order: 7,
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
