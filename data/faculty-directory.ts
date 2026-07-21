/**
 * Faculty directory — department-wise profiles for the Faculty page.
 * Add a new department by creating `public/images/faculty/{folder}/`
 * and appending a group here; the page layout does not need changes.
 */

export type FacultyDirectoryMember = {
  name: string;
  designation: string;
  /** Filename inside the department folder (e.g. SanchuS.jpeg). */
  photoFile: string;
  order: number;
};

export type FacultyDirectoryDepartment = {
  /** Folder under /images/faculty/ — keep stable for image paths. */
  folder: string;
  name: string;
  order: number;
  members: FacultyDirectoryMember[];
};

export const facultyDirectory: FacultyDirectoryDepartment[] = [
  {
    folder: "mechanical",
    name: "Mechanical Engineering",
    order: 1,
    members: [
      {
        name: "Dr. Sanchu S",
        designation: "Assistant Professor in Mechanical Engineering",
        photoFile: "SanchuS.jpeg",
        order: 1,
      },
      {
        name: "Santhosh A J",
        designation: "Trade Instructor (Mechanical)",
        photoFile: "Santhosh.jpeg",
        order: 2,
      },
    ],
  },
  {
    folder: "automobile",
    name: "Automobile Engineering",
    order: 2,
    members: [
      {
        name: "Muhammed Yaseen",
        designation: "Lecturer in Automobile Engineering",
        photoFile: "Yaseen.jpeg",
        order: 1,
      },
      {
        name: "Akhil K S",
        designation: "Lecturer in Automobile Engineering",
        photoFile: "AkhilKS.jpeg",
        order: 2,
      },
      {
        name: "Arjun Babu",
        designation: "Demonstrator in Automobile Engineering",
        photoFile: "ArjunBabu.jpeg",
        order: 3,
      },
      {
        name: "Anupama C Raj",
        designation: "Demonstrator in Automobile Engineering",
        photoFile: "Anupama.jpeg",
        order: 4,
      },
    ],
  },
];

export function facultyDirectoryPhotoUrl(folder: string, photoFile: string) {
  return `/images/faculty/${folder}/${photoFile}`;
}

export function facultyDirectoryDepartments() {
  return [...facultyDirectory].sort((a, b) => a.order - b.order);
}
