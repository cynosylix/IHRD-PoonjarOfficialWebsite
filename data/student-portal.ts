export const studentPortalStats = [
  { value: 2000, suffix: "+", label: "Students" },
  { value: 95, suffix: "%", label: "Placement Support" },
  { value: 25, suffix: "+", label: "Student Clubs" },
  { value: 100, suffix: "+", label: "Annual Events" },
] as const;

export const studentServices = [
  {
    title: "Library",
    description:
      "Access books, digital resources, and quiet study spaces to support your academic journey.",
    href: "/facilities/library",
  },
  {
    title: "Scholarships",
    description:
      "Explore government and institutional scholarship opportunities for eligible students.",
    href: "/admission",
  },
  {
    title: "Placements",
    description:
      "Career guidance, training, and recruitment support through the institutional placement unit.",
    href: "/placements",
  },
  {
    title: "Clubs & Activities",
    description:
      "Join student clubs, cultural forums, and leadership bodies that enrich campus life.",
    href: "/community/senate",
  },
  {
    title: "Student Support",
    description:
      "Grievance redressal, welfare committees, and confidential support for every student.",
    href: "/students/grievance-redressal",
  },
  {
    title: "Innovation & Research",
    description:
      "Entrepreneurship cells, technical forums, and innovation initiatives for budding engineers.",
    href: "/community/iedc",
  },
] as const;

export const studentActivities = [
  {
    title: "Arts & Culture",
    description: "College arts festivals, performances, and creative expression on campus.",
    image: "/images/slides/kalika-26.jpg",
    href: "/community/senate",
  },
  {
    title: "Sports",
    description: "Annual sports meets, inter-college tournaments, and fitness programmes.",
    image: "/images/slides/yuga-26.jpg",
    href: "/community/senate",
  },
  {
    title: "Technical Events",
    description: "Hackathons, project expos, and industry-oriented technical programmes.",
    image: "/images/slides/industry-campus.jpg",
    href: "/community/ieee",
  },
  {
    title: "NSS & Social Activities",
    description: "Community outreach, social responsibility, and nation-building initiatives.",
    image: "/images/slides/anti-ragging.png",
    href: "/community/nss",
  },
  {
    title: "Entrepreneurship",
    description: "Startup culture, innovation challenges, and entrepreneurial skill development.",
    image: "/images/slides/achievements-2025.jpg",
    href: "/community/iedc",
  },
] as const;

export const studentQuickAccess = [
  {
    title: "Academic Calendar",
    description: "Key academic dates, schedules, and institutional announcements.",
    href: "/notices",
  },
  {
    title: "Exam Notifications",
    description: "Examination circulars, timetables, and official updates.",
    href: "/notices",
  },
  {
    title: "Student Portal",
    description: "Application forms, registrations, and student documentation.",
    href: "/students/forms",
  },
  {
    title: "Campus Album",
    description: "Highlights from campus events, celebrations, and student life.",
    href: "/#campus-album-heading",
  },
  {
    title: "Downloads",
    description: "Syllabus, academic resources, and official downloadable documents.",
    href: "/academics/syllabus",
  },
  {
    title: "Important Notices",
    description: "Latest notices on admissions, examinations, and campus updates.",
    href: "/notices",
  },
] as const;

export const studentAchievements = [
  {
    title: "Academic Excellence",
    value: 85,
    suffix: "%+",
    label: "University Pass Rate",
    badge: "Academics",
  },
  {
    title: "Placement Achievements",
    value: 90,
    suffix: "+",
    label: "Companies Visited",
    badge: "Careers",
  },
  {
    title: "Sports Achievements",
    value: 15,
    suffix: "+",
    label: "Tournament Wins",
    badge: "Sports",
  },
  {
    title: "Cultural Achievements",
    value: 50,
    suffix: "+",
    label: "Annual Programmes",
    badge: "Culture",
  },
] as const;

export const studentTestimonials = [
  {
    quote:
      "The supportive faculty and vibrant campus culture helped me build confidence alongside strong technical skills for my career.",
    name: "Aswin Babu",
    programme: "B.Tech — Computer Science & Engineering",
  },
  {
    quote:
      "From technical fests to placement training, the college gave me every opportunity to explore, learn, and grow as an engineer.",
    name: "Amal C Mohan",
    programme: "B.Tech — Electronics & Communication",
  },
  {
    quote:
      "NSS activities and student clubs taught me leadership and teamwork beyond the classroom — experiences I will always value.",
    name: "Niranjan K Ajay",
    programme: "Student Senate — General Secretary",
  },
  {
    quote:
      "The serene campus, modern labs, and approachable mentors made my engineering years both productive and memorable.",
    name: "Roopasree K",
    programme: "Arts Club Secretary",
  },
] as const;
