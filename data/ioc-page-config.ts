export const IOC_HERO_IMAGE = "/images/slides/industry-campus.jpg";

export const IOC_ABOUT_TEXT =
  "Industry on Campus (IOC) is designed to provide students with direct exposure to industry practices and emerging technologies. Through collaborations with leading companies, students participate in real-world projects, internships, industrial training, workshops, certification programs, hackathons, research initiatives, and placement-oriented programs. The objective is to develop industry-ready professionals equipped with technical expertise, innovation, and problem-solving skills.";

export const IOC_BENEFITS = [
  { title: "Industry-Oriented Training", description: "Hands-on learning aligned with current industry standards and practices." },
  { title: "Live Industrial Projects", description: "Work on real-world assignments with partner organizations." },
  { title: "Internship Opportunities", description: "Gain practical experience through structured internship programs." },
  { title: "Placement Assistance", description: "Career guidance and recruitment support through industry networks." },
  { title: "Technical Workshops", description: "Expert-led sessions on emerging tools, platforms, and technologies." },
  { title: "Certification Programs", description: "Industry-recognized credentials to strengthen your professional profile." },
  { title: "Expert Mentorship", description: "Learn directly from experienced professionals and technical leaders." },
  { title: "Research & Innovation", description: "Collaborate on cutting-edge research and innovation-driven initiatives." },
] as const;

/** Benefit card images — matched by index to IOC_BENEFITS */
export const IOC_BENEFIT_IMAGES = [
  "/images/Ioc1.jpeg",
  "/images/ioc2.jpeg",
  "/images/ioc3.jpeg",
  "/images/ioc4.jpeg",
  "/images/ioc5.jpeg",
  "/images/ioc6.jpeg",
  "/images/ioc7.jpeg",
] as const;

export type IocPartner = {
  id: string;
  name: string;
  logo: string;
  description: string;
  tags: string[];
  website?: string;
  heading?: string;
  logoPosition: "left" | "right";
};

export const IOC_PARTNERS: IocPartner[] = [
  {
    id: "cynosylix",
    name: "Cynosylix Technology",
    logo: "/images/cynosylix_log.png",
    logoPosition: "left",
    description:
      "Welcome to Cynosylix Technology, where innovation meets excellence. Cynosylix Technology is a technology-driven company committed to transforming innovative ideas into real-world solutions. The company specializes in Artificial Intelligence, Software Development, Embedded Systems, IoT, Cloud Computing, Educational Technology, and Digital Transformation. As the Official Technical Partner of the IHRD Industry on Campus (IOC) Program, Cynosylix actively collaborates with the institution to provide industry-oriented training, internships, live projects, workshops, mentorship, certification programs, placement assistance, and exposure to emerging technologies.",
    tags: [
      "AI",
      "Software Development",
      "IoT",
      "Embedded Systems",
      "Cloud Computing",
      "Web Development",
      "Mobile Apps",
    ],
    website: "https://cynosylix.com",
  },
  {
    id: "digital-core",
    name: "Digital Core Technologies",
    logo: "/images/gigit.png",
    logoPosition: "right",
    heading: "10 Years of Global Success",
    description:
      "Digital Core Technologies was incorporated in July 2014 with the objective of producing top-tier Electronic Product Design Professionals and delivering world-class Electronic Product Design solutions. The company has successfully partnered with organizations across Europe, USA, Japan, and India with a strong focus on embedded engineering and electronics.",
    tags: [
      "Embedded Systems",
      "Electronics",
      "Product Design",
      "Firmware",
      "Industrial Automation",
    ],
    website: "https://www.digitalcoretechnologies.com",
  },
  {
    id: "nexusaide",
    name: "Nexusaide Technologies LLP",
    logo: "/images/nex.png",
    logoPosition: "left",
    description:
      "Nexusaide Technologies LLP is committed to crafting the digital future by delivering innovative software solutions, enterprise applications, AI solutions, cloud technologies, and digital transformation services. The company partners with startups and enterprises to build scalable technology platforms.",
    tags: ["Cloud", "Enterprise Software", "AI", "Digital Transformation"],
    website: "https://nexusaide.com",
  },
  {
    id: "gadgeon",
    name: "Gadgeon",
    logo: "/images/gad.png",
    logoPosition: "right",
    description:
      "Gadgeon is a global technology services company delivering innovation-driven engineering excellence in Embedded Engineering, Artificial Intelligence, IoT, Cloud Computing, Application Engineering, and Digital Transformation.",
    tags: ["Embedded Engineering", "AI", "IoT", "Cloud", "Digital Engineering"],
    website: "https://www.gadgeon.com",
  },
];

export const IOC_STATS = [
  { type: "numeric" as const, value: 4, suffix: "+", label: "Industry Partners" },
  { type: "numeric" as const, value: 100, suffix: "+", label: "Internship Opportunities" },
  { type: "numeric" as const, value: 50, suffix: "+", label: "Live Projects" },
  { type: "text" as const, headline: "Industry Experts", label: "Mentorship Sessions" },
  { type: "text" as const, headline: "Placement", label: "Career Support" },
];
