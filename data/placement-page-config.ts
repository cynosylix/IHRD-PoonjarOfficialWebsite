import { pageHeroImages } from "./site-data";

/** Campus hero for the placements page (homepage gradient applied in PageBanner). */
export const PLACEMENT_HERO_IMAGE =
  pageHeroImages["/placements"]?.src ?? "/images/IMG_20240327_164043.jpg.jpeg";

export const PLACEMENT_HIGHLIGHTS_2025 = {
  image: "/images/placements_and_passouts_2k25.webp",
  imageAlt:
    "College of Engineering Poonjar placement and pass-out highlights for 2025",
  badge: "2025 Placement Highlights",
  title: "Placement Highlights 2025",
  subtitle:
    "Celebrating the achievements of our students and the success of campus placements.",
  highlights: [
    {
      title: "Placement Achievements",
      description:
        "Outstanding offers and career outcomes across UG, PG, and diploma programmes through dedicated CGPU support.",
    },
    {
      title: "Student Success Stories",
      description:
        "Graduates stepping into rewarding roles with confidence built through training, mentorship, and campus guidance.",
    },
    {
      title: "Industry Recruitment",
      description:
        "Reputed companies from IT, core engineering, consulting, and allied sectors engaging with our talent pool.",
    },
    {
      title: "Campus Placement Performance",
      description:
        "A strong placement season reflecting rigorous preparation, mock interviews, and industry-ready skill development.",
    },
  ],
} as const;

export type PlacementStatItem = {
  label: string;
  value: string;
  suffix?: string;
  description: string;
};

export type PlacementActivityItem = {
  title: string;
  description: string;
};

export type RecruiterSectorItem = {
  name: string;
  description: string;
  logoUrl?: string;
};

/** Default highlights when `placementStatistics` has no entries yet. */
export const PLACEMENT_DEFAULT_STATS: PlacementStatItem[] = [
  {
    label: "Placement Rate",
    value: "95",
    suffix: "%",
    description: "Career guidance and placement support through CGPU",
  },
  {
    label: "Recruiters Visited",
    value: "Multi",
    suffix: "-sector",
    description: "On-campus and pooled recruitment drives each year",
  },
  {
    label: "Highest Package",
    value: "Industry",
    suffix: "-leading",
    description: "Competitive offers across IT, core, and consulting roles",
  },
  {
    label: "Students Placed",
    value: "All",
    suffix: " programmes",
    description: "UG, PG, and diploma students supported by the Placement Cell",
  },
];

export const PLACEMENT_TRAINING_ACTIVITIES: PlacementActivityItem[] = [
  {
    title: "Aptitude Training",
    description:
      "Structured sessions to strengthen quantitative, logical, and verbal reasoning for competitive recruitment.",
  },
  {
    title: "Soft Skills Development",
    description:
      "Communication, presentation, and interpersonal skills through lectures, debates, and interactive sessions.",
  },
  {
    title: "Technical Workshops",
    description:
      "Hands-on workshops and skill-building programs aligned with industry expectations and emerging technologies.",
  },
  {
    title: "Mock Interviews",
    description:
      "Simulated interview and group discussion practice to prepare students for recruitment processes.",
  },
  {
    title: "Career Guidance",
    description:
      "Expert lectures and counselling on career paths, higher studies, and self-employment opportunities.",
  },
  {
    title: "Industry Interaction",
    description:
      "Industry visits, expert talks, and recruitment coordination with companies across sectors.",
  },
];

export const PLACEMENT_RECRUITER_SECTORS: RecruiterSectorItem[] = [
  {
    name: "Information Technology",
    description: "Software development, IT services, and product companies",
  },
  {
    name: "Core Engineering",
    description: "Manufacturing, electronics, electrical, and automation sectors",
  },
  {
    name: "Consulting & Analytics",
    description: "Business, data, and technology consulting roles",
  },
  {
    name: "Startups & Innovation",
    description: "Emerging ventures and entrepreneurship-oriented opportunities",
  },
  {
    name: "Public Sector",
    description: "Government and PSU recruitment through competitive processes",
  },
  {
    name: "Higher Studies",
    description: "Guidance for postgraduate and international education pathways",
  },
];

export function splitPlacementContent(html: string): {
  aboutHtml: string;
  cellIntroHtml: string;
} {
  const aboutMatch = html.match(/<h2>About CGPU<\/h2>([\s\S]*?)(?=<h2>Placement Cell<\/h2>|$)/i);
  const cellMatch = html.match(/<h2>Placement Cell<\/h2>([\s\S]*)/i);
  return {
    aboutHtml: aboutMatch?.[1]?.trim() ?? html,
    cellIntroHtml: cellMatch?.[1]?.trim() ?? "",
  };
}
