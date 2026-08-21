/** Local path for a faculty portrait (order matches data/departments.ts unless photoFile is set). */
export function facultyPhotoUrl(deptSlug: string, order: number, photoFile?: string): string {
  if (photoFile) {
    return `/images/faculty/${deptSlug}/${photoFile}`;
  }
  return `/images/faculty/${deptSlug}/${order}.jpg`;
}

/** Named portrait under a department folder (Faculty directory page). */
export function facultyNamedPhotoUrl(folder: string, photoFile: string): string {
  return `/images/faculty/${folder}/${photoFile}`;
}
