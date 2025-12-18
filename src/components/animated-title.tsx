"use client";

import { cn } from "@/lib/utils";

type AnimatedTitleProps = {
  text: string;
  className?: string;
  stagger?: number;
};

export function AnimatedTitle({ text, className, stagger = 0.05 }: AnimatedTitleProps) {
  const letters = text.split("");

  return (
    <h1 className={cn("flex", className)}>
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className="animate-title-letter"
          style={{ animationDelay: `${i * stagger}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
}
