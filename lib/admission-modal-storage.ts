const STORAGE_KEY = "cep-admission-modal-dismissed-until";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function shouldShowAdmissionModal(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const until = localStorage.getItem(STORAGE_KEY);
    if (!until) return true;
    const dismissedUntil = Number.parseInt(until, 10);
    if (!Number.isFinite(dismissedUntil)) return true;
    return Date.now() > dismissedUntil;
  } catch {
    return true;
  }
}

export function dismissAdmissionModalFor30Days(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + THIRTY_DAYS_MS));
  } catch {
    /* ignore quota / private mode */
  }
}
