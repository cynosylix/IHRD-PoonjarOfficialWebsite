/** Local path for a faculty portrait synced from cep.ac.in (order matches data/departments.ts). */
export function facultyPhotoUrl(deptSlug: string, order: number): string {
  return `/images/faculty/${deptSlug}/${order}.jpg`;
}
