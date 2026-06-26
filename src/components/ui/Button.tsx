import { type ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold py-2.5 px-5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/10",
        danger: "bg-red-500/80 hover:bg-red-500 text-white",
        gradient: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export function Button({
  variant,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger" | "gradient" }) {
  return <button className={twMerge(button({ variant }), className)} {...props} />;
}