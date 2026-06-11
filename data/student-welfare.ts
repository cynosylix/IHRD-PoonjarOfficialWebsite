export type WelfareMember = {
  name: string;
  role: string;
  order: number;
};

export type StudentWelfareSection = {
  title: string;
  content: string;
  members: WelfareMember[];
  objectives?: string[];
  /** Production uses "Committee Members" or "Members" */
  membersTitle?: string;
  objectivesTitle?: string;
  contactEmail?: string;
};

/** Student welfare content synced from https://cep.ac.in/student */
export const studentWelfare: Record<string, StudentWelfareSection> = {
  antiRagging: {
    title: "Anti-Ragging Committee",
    content: `<p>Our college is committed to fostering a safe and respectful environment for all students. The Anti-Ragging Committee plays a vital role in ensuring the well-being of our student community by addressing instances of ragging and harassment promptly and effectively.</p>`,
    membersTitle: "Committee Members",
    members: [
      { name: "Principal", role: "Chairman", order: 1 },
      { name: "Mr. Shine P James", role: "Asst.Prof.in Electronics(Convener)", order: 2 },
      { name: "Mr. Rajesh K R", role: "Asst.Prof.in Computer Science", order: 3 },
      { name: "Mr. Anuraj", role: "SI of Police Erattupetta (External Member)", order: 4 },
      { name: "Mr. Pramod K R", role: "Sub Editor, Mangalam Daily (External Member)", order: 5 },
      { name: "P.T.A. President", role: "External Member", order: 6 },
    ],
  },
  casteDiscrimination: {
    title: "Prevention of Caste Based Discrimination",
    content: `<p>Government of India, Ministry of HRD, Department of Higher Education, New Delhi and University Grants Commission is continuously monitoring the prevention of caste based discrimination in higher educational institutions. The College ensures that no official/faculty members indulge in any kind of discrimination against any community or category of students.</p>`,
    membersTitle: "Committee Members",
    members: [
      { name: "Mr. Shine P James", role: "Asst.Prof. in Electronics (Convener)", order: 1 },
      { name: "Mr. Musthapha Kamal", role: "Sr. Superintendent", order: 2 },
      { name: "Ms. Eliswa Laiju", role: "Asst.Prof. in Electrical &amp; Electronics Engg.", order: 3 },
      { name: "Ms. Akshya N", role: "Student Member(SC/ST)(EC7)", order: 4 },
    ],
  },
  grievanceRedressal: {
    title: "Grievance Redressal Committee",
    content: `<p>The Grievance Redressal Committee at our college is dedicated to ensuring a fair and transparent environment for all students, faculty, and staff. Comprised of experienced members from various departments, the committee is committed to addressing and resolving grievances promptly and impartially.</p>`,
    membersTitle: "Committee Members",
    members: [
      { name: "Mr. Shine P James", role: "HoD ECE", order: 1 },
      { name: "Ms. Flower Abraham Mundackal", role: "Asst.prof.in ECE", order: 2 },
      { name: "Ms. Sneha Shaji", role: "student member( S2 CSE )", order: 3 },
      { name: "Ms. Pooja Krishnan", role: "Student member ( S7 ECE)", order: 4 },
    ],
    contactEmail: "principal@cep.ac.in",
  },
  womenGrievance: {
    title: "Women's Grievance Cell",
    content: `<p>Our institution is dedicated to fostering a supportive and inclusive environment for all members of our community. The Women's Grievance Cell plays a crucial role in promoting gender equality and addressing any concerns or complaints related to harassment or discrimination against female students and staff.</p>`,
    objectivesTitle: "Objectives:",
    objectives: [
      "To promote a healthy working environment for all our female staffs and students.",
      "Work towards building a gender-neutral workplace.",
      "To deal with cases/complaints of any type of harassment of female students and staffs of the college.",
    ],
    membersTitle: "Members",
    members: [
      { name: "Ms. Jeessy M Jose", role: "System Analyst (Convener)", order: 1 },
      { name: "Ms. Leena P. S.", role: "Senior Office Assistant", order: 2 },
      { name: "Ms. Flower Abraham Mundackal", role: "Asst.Prof.in Electronics", order: 3 },
      { name: "Ms. Catherine Antony", role: "Student Member", order: 4 },
    ],
  },
};

export const facultyFeedbackForms = [
  {
    id: "ff-dip-ce",
    title: "Feedback form for Diploma in Computer Engineering",
    status: "open" as const,
    fileUrl: "https://docs.google.com/forms/d/e/1FAIpQLSePHVocBkYDjq-Iifn8EkxGoktNg2ob7dGEHuybw_eoJ8tI9g/viewform",
    order: 1,
  },
  {
    id: "ff-dip-eee",
    title: "Feedback form for Diploma in Electrical & Electronics Engineering",
    status: "open" as const,
    fileUrl: "https://forms.gle/ihAhh29rihHxKG8BA",
    order: 2,
  },
  {
    id: "ff-dip-el",
    title: "Feedback form for Electronics Engineering",
    status: "open" as const,
    fileUrl: "https://forms.gle/wwCxLfdAGYAYAmHJA",
    order: 3,
  },
  {
    id: "ff-cs-v",
    title: "Feedback form for CS-V",
    status: "closed" as const,
    fileUrl: null,
    order: 4,
  },
  {
    id: "ff-ec-vi",
    title: "Feedback form for EC-VI",
    status: "closed" as const,
    fileUrl: null,
    order: 5,
  },
  {
    id: "ff-ee-vi",
    title: "Feedback form for EE-VI",
    status: "closed" as const,
    fileUrl: null,
    order: 6,
  },
  {
    id: "ff-cs-iv",
    title: "Feedback form for CS-IV",
    status: "closed" as const,
    fileUrl: null,
    order: 7,
  },
  {
    id: "ff-ec-iv",
    title: "Feedback form for EC-IV",
    status: "closed" as const,
    fileUrl: null,
    order: 8,
  },
  {
    id: "ff-cs-iii",
    title: "Feedback form for CS-III",
    status: "closed" as const,
    fileUrl: null,
    order: 9,
  },
] as const;

export const studentsHubLinks = [
  {
    href: "/students/forms",
    title: "Application Forms",
    desc: "Common application form, no-dues certificates, semester registration, and permission forms.",
  },
  {
    href: "/students/feedback",
    title: "Faculty Feedback Forms",
    desc: "Course-wise feedback forms for diploma and degree programmes.",
  },
  {
    href: "/students/anti-ragging",
    title: "Anti-Ragging Committee",
    desc: "Policy, committee members, and confidential reporting.",
  },
  {
    href: "/students/caste-discrimination",
    title: "Prevention of Caste Based Discrimination",
    desc: "Committee monitoring prevention of caste-based discrimination in the institution.",
  },
  {
    href: "/students/grievance-redressal",
    title: "Grievance Redressal Committee",
    desc: "Fair and transparent redressal for academic and administrative grievances.",
  },
  {
    href: "/students/women-grievance",
    title: "Women's Grievance Cell",
    desc: "Support for gender equality and confidential redressal for female students and staff.",
  },
] as const;
