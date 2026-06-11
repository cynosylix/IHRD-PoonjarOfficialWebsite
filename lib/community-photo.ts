/** Local path for a community member portrait synced from cep.ac.in */
export function communityMemberPhotoUrl(kind: string, order: number): string | undefined {
  if (kind === "SENATE") return `/images/community/senate/${order}.jpg`;
  return undefined;
}
