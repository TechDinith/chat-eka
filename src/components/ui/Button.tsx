import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "danger";

const base =
  "inline-flex items-center justify-center rounded font-bold py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white",
  danger: "bg-red-500 hover:bg-red-700 text-white",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
