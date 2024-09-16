import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string; // Make href optional
  onClick?: () => void; // Handler for button click
  variant?: "big" | "small"; // Optional variant
  icon?: string; // Optional icon URL
  iconAlt?: string; // Alt text for the icon
}

export default function Button({
  children,
  href,
  onClick,
  variant = "small",
  icon,
  iconAlt,
}: ButtonProps): JSX.Element {
  const sizeClass = variant === "big" ? "py-3 px-6 text-lg w-72" : "py-2 px-4 text-sm";
  const baseClasses = `flex items-center justify-center border rounded-full ${sizeClass} `; // Fixed size

  const buttonContent = (
    <div className="flex items-center justify-center">
      {icon && <img src={icon} alt={iconAlt} className="w-5 h-5 mr-2" />} {/* Adjust icon size */}
      <span className="truncate">{children}</span> {/* Ensure text truncation if necessary */}
    </div>
  );

  return href ? (
    <Link href={href} passHref>
      <button
        type="button"
        className={`${baseClasses} bg-zapierOrange text-almostWhite border-none`}
      >
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`${baseClasses} border-black`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
}
