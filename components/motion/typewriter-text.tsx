"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypewriterText({
  text,
  className,
  speed = 45,
  startDelay = 600,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, started]);

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-gold-400 align-middle" />
      )}
    </span>
  );
}
