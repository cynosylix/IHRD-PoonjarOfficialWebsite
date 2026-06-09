import type { Department } from "./site-data";

const fac = (
  name: string,
  designation: string,
  qualification: string,
  order: number,
  isLabCoordinator = false,
) => ({
  name,
  designation,
  qualification,
  isLabCoordinator,
  order,
});

/** Department content and faculty synced from https://cep.ac.in/departments/* */
export const departments: Department[] = [
  {
    slug: "computer-science-engineering",
    name: "Computer Science and Engineering",
    shortName: "CSE",
    imageUrl: "/images/departments/dept-cse.jpg",
    order: 1,
    intro:
      "<p>Welcome to the Department of Computer Science and Engineering at College of Engineering Poonjar. In today's digital age, where technology plays an increasingly integral role in shaping our world, the field of computer science and engineering stands at the forefront of innovation and discovery. At our department, we are passionate about exploring the endless possibilities that arise from the convergence of computer science and engineering disciplines.</p>",
    vision:
      "<p>Evolve as a premier institution moulding professionally competent and socially committed engineers.</p>",
    mission:
      "<ul><li>Conduct state of the art programmes emphasising industry interaction and innovative teaching for academic excellence.</li><li>Provide necessary support system for students contributing to their personal and professional growth.</li><li>Extend technological expertise to nearby communities for their social and economic growth.</li></ul>",
    faculties: [
      fac("Mr. Rajesh K R", "Head of Dept.", "M.Tech", 1),
      fac("Dr. Annie Julie Joseph", "Assistant Professor", "PhD", 2),
      fac("Ms. Josymol Joseph", "Assistant Professor", "M.Tech", 3),
      fac("Ms. Thasni Noushad", "Assistant Professor", "M.Tech", 4),
      fac("Ms. Krishna Divakar", "Assistant Professor", "M.Tech Cybersecurity", 5),
      fac("Ms. Remya G Nair", "Lecturer", "M.Tech CSE", 6),
      fac("Ms. Asiya Muhammed", "Lecturer", "B.Tech CSE", 7),
      fac("Ms. Priyanka Prasad", "Lecturer", "B.Tech CSE", 8),
      fac("Mrs. Mary Treesa Thomas", "Assistant Professor", "M.Tech CSE", 9),
      fac("Mrs. Anjana Sekhar", "Lecturer", "M.Tech Communication and Networking", 10),
      fac("Mrs. Geethu A", "Assistant Professor", "M.Tech Software Engineering", 11),
      fac("Ms. Aparna A Nair", "Assistant Professor", "M.Tech", 12),
      fac("Mr. Jaisemon Thomas", "Demonstrator", "Diploma", 13, true),
      fac("Ms. Sindhumol C.R", "Programmer", "PGDCA", 14, true),
      fac("Mr. Viswanath S Nair", "Tradesman", "ITI Computer Operating and Programming", 15, true),
      fac("Ms. Meera Ramachandran", "Programmer", "PGDCA", 16, true),
      fac("Ms. Monisha P.M", "Demonstrator", "Diploma", 17, true),
    ],
  },
  {
    slug: "computer-applications",
    name: "Computer Applications",
    shortName: "CA",
    imageUrl: "/images/departments/dept-ca.jpg",
    order: 2,
    intro:
      "<p>Welcome to the Department of Computer Applications at College of Engineering Poonjar. In an era where digital transformation drives global progress, the field of computer applications plays a vital role in building intelligent solutions for real-world challenges. Our department is dedicated to nurturing technically proficient professionals who are equipped to innovate, develop, and lead in the rapidly evolving world of software and information technology.</p>",
    vision:
      "<p>The Department of Computer Applications aims to generate technically competent and skilled intellectual professionals to meet the challenges of the modern computing industry.</p>",
    mission:
      "<ul><li>Providing a strong theoretical and practical background with an emphasis on software development.</li><li>To provide technical solutions, especially in the field of Information Technology to the local society.</li><li>Empowering the youth in rural communities with computer education.</li><li>To offer technical education in order to meet the need for IT employment today and to keep up with the latest developments through lifelong learning.</li></ul>",
    faculties: [
      fac("Dr. Annie Julie Joseph", "Head of Dept.", "PhD", 1),
      fac("Mr. Rajesh K R", "Assistant Professor", "M.Tech", 2),
      fac("Ms. Josymol Joseph", "Assistant Professor", "M.Tech", 3),
      fac("Ms. Thasni Noushad", "Assistant Professor", "M.Tech", 4),
      fac("Ms. Krishna Divakar", "Assistant Professor", "M.Tech", 5),
      fac("Ms. Remya G Nair", "Lecturer", "M.Tech", 6),
      fac("Ms. Asiya Muhammed", "Lecturer", "B.Tech", 7),
      fac("Ms. Priyanka Prasad", "Lecturer", "B.Tech", 8),
      fac("Mrs. Mary Treesa Thomas", "Assistant Professor", "M.Tech", 9),
      fac("Mrs. Geethu A", "Assistant Professor", "M.Tech", 10),
      fac("Mrs. Anjana Sekhar", "Assistant Professor", "M.Tech", 11),
      fac("Mrs. Ganapriya Prakash", "Assistant Professor", "MA in English language and Literature", 12),
      fac("Mr. Jaisemon Thomas", "Demonstrator", "Diploma", 13, true),
      fac("Ms. Sindhumol C.R", "Programmer", "PGDCA", 14, true),
      fac("Mr. Viswanath S Nair", "Tradesman", "ITI", 15, true),
      fac("Ms. Meera Ramachandran", "Programmer", "PGDCA", 16, true),
      fac("Ms. Monisha P.M", "Demonstrator", "Diploma", 17, true),
    ],
  },
  {
    slug: "electronics-communication-engineering",
    name: "Electronics and Communication Engineering",
    shortName: "ECE",
    imageUrl: "/images/departments/dept-ece.jpg",
    order: 4,
    intro:
      "<p>Welcome to the Department of Electronics and Communication Engineering at College of Engineering Poonjar. In an era defined by rapid technological advancements and global connectivity, the field of Electronics and Communication Engineering plays a pivotal role in shaping the way we communicate, interact, and innovate. At our department, we are dedicated to fostering a deep understanding of both the theoretical principles and practical applications that underpin modern electronic and communication systems.</p>",
    vision:
      "<p>To become a Centre of excellence in the field of electronics and communication Engineering offering academic excellence in learning and research thereby producing creative and socially responsible engineers, ready to take up challenges for industrial development.</p>",
    mission:
      "<ul><li>To provide a creative learning environment for the students to produce quality graduates with passion for knowledge and creativity in the field of Electronics and Communication Engineering.</li><li>To prepare students to have creative and innovative thinking to meet the challenges of the industry and research at the global level.</li></ul>",
    faculties: [
      fac("Ms. Flower Abraham Mundackal", "Head of Dept.", "M.Tech", 1),
      fac("Mr. Shine P James", "Assistant Professor", "M.Tech", 2),
      fac("Mr. Najmal A", "Assistant Professor", "M.Tech", 3),
      fac("Ms. Treesa Maria Sunny", "Assistant Professor", "M.Tech VLSI Design", 4),
      fac("Ms. Revathy M Kumar", "Lecturer", "B.Tech", 5),
      fac("Mr. Mahesh Krishnan S", "Lecturer", "B.Tech", 6),
      fac("Mrs. Meenu M Venu", "Lecturer", "M.Tech", 7),
      fac("Mrs. Jyothilakshmi K S", "Lecturer", "B.Tech", 8),
      fac("Mrs. Sreeja Sivan", "Demonstrator", "M.E", 9, true),
      fac("Ms. Bijimol K C", "Demonstrator", "Diploma in Electronics", 10, true),
    ],
  },
  {
    slug: "electrical-electronics-engineering",
    name: "Electrical and Electronics Engineering",
    shortName: "EEE",
    imageUrl: "/images/departments/dept-eee.jpg",
    order: 3,
    intro:
      "<p>Welcome to the Department of Electrical and Electronics Engineering at College of Engineering Poonjar. We are dedicated to shaping the future through innovation, exploration, and discovery in the field of electrical and electronics engineering. Our department is committed to providing a comprehensive education that prepares students to tackle the complex challenges of our rapidly evolving technological landscape.</p>",
    vision:
      "<p>To develop knowledge in Electrical &amp; Electronics area with creative minds, innovative ideas and practical skills for the betterment of mankind.</p>",
    mission:
      "<p>To develop the theoretical knowledge, practical aspect in the field of Electrical &amp; Electronics Engineering and inculcate high degree of passion and social ethics for creating successful engineers.</p>",
    faculties: [
      fac("Mr. Shine P James", "Head of Dept.", "M.Tech", 1),
      fac("Ms. Rakhi Chandran", "Assistant Professor", "M.Tech", 2),
      fac("Ms. Athira V Pillai", "Assistant Professor", "M.Tech", 3),
      fac("Mr. Joshy Joseph", "Assistant Professor", "M.Tech", 4),
      fac("Ms. Jishamol C K", "Lecturer", "B.Tech", 5),
      fac("Mr. Arjun Krishna", "Lecturer", "B.Tech", 6),
      fac("Mr. Agustin Joseph", "Lecturer", "B.Tech", 7),
      fac("Ms. Revathy K R", "Lecturer", "B.Tech", 8),
      fac("Ms. Ranjini P Kumar", "Lecturer", "B.Tech", 9),
    ],
  },
  {
    slug: "automobile-engineering",
    name: "Automobile Engineering",
    shortName: "AE",
    imageUrl: "/images/departments/dept-ae.jpg",
    order: 5,
    intro:
      "<p>Welcome to the Department of Automobile Engineering at College of Engineering Poonjar. As mobility becomes smarter and more sustainable, the field of automobile engineering is evolving to meet the demands of a dynamic and eco-conscious world. Our department is committed to cultivating innovative minds capable of designing, developing, and revolutionizing automotive systems through a blend of mechanical principles, electronics, and modern technologies.</p>",
    vision:
      "<p>The Department of Automobile Engineering aspires to produce innovative, industry-ready professionals with strong technical knowledge and ethical values to excel in the evolving global automotive sector.</p>",
    mission:
      "<ul><li>To provide a solid foundation in automobile engineering principles with a focus on design, development, and sustainable automotive technologies.</li><li>To address the challenges of mobility and transportation by offering practical and research-oriented solutions tailored to local and global needs.</li><li>To empower students from diverse backgrounds, especially rural areas, through accessible and quality automotive education.</li><li>To cultivate a spirit of continuous learning and innovation, ensuring graduates remain competitive in a rapidly advancing technological landscape.</li></ul>",
    faculties: [
      fac("Mr. Joshy Joseph", "Head of Dept.", "M.Tech", 1),
      fac("Ms. Athiralakshmi S", "Assistant Professor", "M.Tech Remote Sensing & GIS", 2),
      fac("Mr. Anandhu Suresh", "Technical demonstrator", "Diploma in Automobile Engineering", 3),
      fac("Mr. Jince Jose", "Lecturer", "B.Tech", 4),
      fac("Mr. Akshay Nayathodan", "Lecturer", "B.Tech", 5),
      fac("Mr. Krishnanand K C", "Lecturer", "B.Tech", 6),
    ],
  },
  {
    slug: "applied-science",
    name: "Applied Science",
    shortName: "AS",
    imageUrl: "/images/departments/dept-as.jpg",
    order: 6,
    intro:
      "<p>Welcome to the Department of Applied Science at College of Engineering Poonjar. Our department serves as the cornerstone of interdisciplinary education, providing students with a strong foundation in fundamental sciences, mathematics, and humanities. We aim to foster critical thinking, creativity, and communication skills essential for success in both academic and professional pursuits.</p>",
    vision:
      "<p>To provide firm and robust support for engineering education by imparting quality education in science, mathematics and humanities.</p>",
    mission:
      "<ul><li>To help engineering / technology students learn and practice their discipline with a clarity on the underlying scientific principles and the mathematical concepts.</li><li>To instil universal human values in students through training in linguistics, professional ethics and life skills.</li></ul>",
    faculties: [
      fac("Mr. Manoj K R", "Head of Dept.", "M.Sc, B.Ed, M.Phil", 1),
      fac("Ms. Suneetha S", "Assistant Professor in Chemistry", "M.Sc, M.Phil", 2),
      fac("Ms. Archa Rajesh", "Assistant Professor in Physics", "M.Sc Physics", 3),
      fac("Mrs. Ganapriya Prakash", "Assistant Professor in English", "MA in English language and Literature", 4),
    ],
  },
];
