/**
 * Production-verified image map from https://cep.ac.in (2026).
 * Each tab uses the image shown on the matching production page/section.
 */
const FACILITY_SOURCES = [
  { slug: "central-computing-facility", url: "https://cep.ac.in/images/cs.jpeg", file: "facility-computer" },
  { slug: "library", url: "https://cep.ac.in/images/library.jpg", file: "facility-library" },
  { slug: "seminar-hall", url: "https://cep.ac.in/images/sh.jpg", file: "facility-seminar" },
  { slug: "transportation", url: "https://cep.ac.in/images/bus.jpg", file: "facility-transport" },
  { slug: "hostel", url: "https://cep.ac.in/images/college.jpg", file: "facility-hostel" },
  { slug: "canteen", url: "https://cep.ac.in/images/canteen.jpeg", file: "facility-canteen" },
];

/** Page hero strips — unique image per tab (not all the same college.jpg) */
const PAGE_SOURCES = [
  { key: "/about/institution", url: "https://cep.ac.in/images/colleges.jpg", file: "about-institution", ext: "jpg" },
  { key: "/about/principal", url: "https://api.cep.ac.in/media/photos/desk/mvr2.jpg", file: "principal", ext: "jpg" },
  { key: "/placements", url: "https://api.cep.ac.in/media/photos/events/placements_and_passouts_2k25.jpg", file: "placements", ext: "jpg" },
  { key: "/admission", url: "https://cep.ac.in/images/admission_poster.jpeg", file: "admission", ext: "jpg" },
  { key: "/academics/programs", url: "https://cep.ac.in/images/college.jpg", file: "programs", ext: "jpg" },
  { key: "/about/iqac", url: "https://cep.ac.in/images/colleges.jpg", file: "iqac", ext: "jpg" },
  { key: "/academics/council", url: "https://cep.ac.in/images/colleges.jpg", file: "council", ext: "jpg" },
  { key: "/students", url: "https://api.cep.ac.in/media/photos/slides/Anti_ragging.png", file: "students", ext: "png" },
  { key: "/contact", url: "https://cep.ac.in/images/colleges.jpg", file: "contact", ext: "jpg" },
  { key: "/community", url: "https://api.cep.ac.in/media/photos/alumni/promo_video_final5_-_frame_at_1m11s.jpg", file: "community", ext: "jpg" },
  { key: "/students/anti-ragging", url: "https://api.cep.ac.in/media/photos/slides/Anti_ragging.png", file: "anti-ragging", ext: "png" },
  { key: "/academics/departments", url: "https://cep.ac.in/images/colleges.jpg", file: "departments", ext: "jpg" },
  { key: "/facilities", url: "https://cep.ac.in/images/colleges.jpg", file: "facilities", ext: "jpg" },
];

const COMMUNITY_SOURCES = [
  {
    kind: "ALUMNI",
    url: "https://api.cep.ac.in/media/photos/alumni/promo_video_final5_-_frame_at_1m11s.jpg",
    file: "alumni",
  },
  { kind: "IEEE", url: "https://cep.ac.in/images/ieee.png", file: "ieee" },
  { kind: "IEDC", url: "https://cep.ac.in/images/iedc.jpg", file: "iedc" },
  { kind: "NSS", url: "https://cep.ac.in/images/nss.png", file: "nss" },
];

/** Department list/detail images — HOD portraits from production department pages */
const DEPARTMENT_SOURCES = [
  { slug: "computer-science-engineering", url: "https://api.cep.ac.in/media/photos/hod/rajesh.jpeg", file: "dept-cse" },
  { slug: "computer-applications", url: "https://api.cep.ac.in/media/photos/hod/annie.jpg", file: "dept-ca" },
  { slug: "electronics-communication-engineering", url: "https://api.cep.ac.in/media/photos/hod/flowermiss.jpg", file: "dept-ece" },
  { slug: "electrical-electronics-engineering", url: "https://api.cep.ac.in/media/photos/hod/shine_YbOtffp.jpg", file: "dept-eee" },
  { slug: "automobile-engineering", url: "https://api.cep.ac.in/media/photos/hod/joshy.jpg", file: "dept-ae" },
  { slug: "applied-science", url: "https://api.cep.ac.in/media/photos/hod/manoj.jpg", file: "dept-as" },
];

/** Department card banner images (lab/facility photo where production uses facility imagery) */
const DEPARTMENT_BANNER_SOURCES = [
  { slug: "computer-science-engineering", url: "https://cep.ac.in/images/cs.jpeg", file: "banner-cse" },
  { slug: "computer-applications", url: "https://cep.ac.in/images/cs.jpeg", file: "banner-ca" },
];

const SLIDE_SOURCES = [
  { url: "https://api.cep.ac.in/media/photos/slides/Untitled.png", file: "placement-2025-26", ext: "png" },
  { url: "https://api.cep.ac.in/media/photos/slides/3_1.jpg", file: "kalika-26", ext: "jpg" },
  { url: "https://api.cep.ac.in/media/photos/slides/2_1.jpg", file: "yuga-26", ext: "jpg" },
  { url: "https://api.cep.ac.in/media/photos/slides/1_1.jpg", file: "achievements-2025", ext: "jpg" },
  { url: "https://api.cep.ac.in/media/photos/slides/Anti_ragging.png", file: "anti-ragging", ext: "png" },
  { url: "https://api.cep.ac.in/media/photos/slides/onam25.png", file: "thrikonam-25", ext: "png" },
  { url: "https://api.cep.ac.in/media/photos/slides/excellence.png", file: "excellence-day-25", ext: "png" },
  { url: "https://api.cep.ac.in/media/photos/slides/1000064901.jpg", file: "industry-campus", ext: "jpg" },
  { url: "https://api.cep.ac.in/media/photos/slides/EKTHARA_25_1.jpg", file: "ekthara-25", ext: "jpg" },
];

module.exports = {
  FACILITY_SOURCES,
  PAGE_SOURCES,
  COMMUNITY_SOURCES,
  DEPARTMENT_SOURCES,
  DEPARTMENT_BANNER_SOURCES,
  SLIDE_SOURCES,
};
