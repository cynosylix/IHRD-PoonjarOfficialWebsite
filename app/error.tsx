"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <p className="text-sm font-semibold text-red-600">Something went wrong</p>
      <h1 className="mt-2 text-2xl font-bold text-brand-950">Unexpected error</h1>
      <p className="mt-2 max-w-md text-center text-slate-600">
        Please try again. If the problem persists, contact the site administrator.
      </p>
      <Button className="mt-6" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}
