import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge(
        "w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-white/30",
        "transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}