/** Local path for a faculty portrait synced from cep.ac.in (order matches data/departments.ts). */
export function facultyPhotoUrl(deptSlug: string, order: number): string {
  return `/images/faculty/${deptSlug}/${order}.jpg`;
}

/** Named portrait under a department folder (Faculty directory page). */
export function facultyNamedPhotoUrl(folder: string, photoFile: string): string {
  return `/images/faculty/${folder}/${photoFile}`;
}
