"use client";

import { cn } from "@/lib/utils";

type AnimatedTitleProps = {
  text: string;
  className?: string;
};

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  return (
    <h1
      className={cn(
        "font-headline text-5xl md:text-7xl font-bold text-primary animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-primary pr-2",
        className
      )}
      style={{ width: `${text.length}ch` }}
    >
      {text}
    </h1>
  );
}
