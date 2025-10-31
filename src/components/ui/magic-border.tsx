'use client';

import { cn } from "@/lib/utils";
import React from "react";

export const MagicBorder = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-xl border border-white/[0.1]",
        className
      )}
      style={{
        maskImage: `radial-gradient(350px at 50% 50%, white, transparent)`,
        WebkitMaskImage: `radial-gradient(350px at 50% 50%, white, transparent)`,
      }}
    >
      <div className="absolute inset-0.5 rounded-xl bg-black/80" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-fuchsia-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
