function asDate(d: Date | string): Date {
  return typeof d === "string" ? new Date(d) : d;
}

export const format = {
  date(d: Date | string) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(asDate(d));
  },
  /** e.g. "31 March 2025" — for notices and announcements */
  dateLong(d: Date | string) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(asDate(d));
  },
  datetime(d: Date | string) {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(asDate(d));
  },
};
