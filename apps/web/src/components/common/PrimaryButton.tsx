import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string; // Optional href for Link
  onClick?: () => void; // Handler for button click
  variant?: "big" | "small"; // Optional variant
  icon?: string; // Optional icon URL
  iconAlt?: string; // Alt text for the icon
  className?: string; // Additional classNames
  disabled?: boolean; // Disabled state
}

export default function Button({
  children,
  href,
  onClick,
  variant = "small",
  icon,
  iconAlt,
  className = "",
  disabled = false, // Default is false for enabled buttons
}: ButtonProps): JSX.Element {
  const sizeClass = variant === "big" ? "py-2 px-6 text-lg" : "py-2 px-4 text-sm";
  const disabledClasses = disabled
    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
    : "bg-zapierOrange text-almostWhite cursor-pointer";
  const baseClasses = `flex items-center justify-center border rounded-full ${sizeClass} ${disabledClasses} ${className}`;

  const buttonContent = (
    <div className="flex items-center justify-center">
      {icon && <img src={icon} alt={iconAlt} className="w-5 h-5 mr-2" />} {/* Adjust icon size */}
      <span className="truncate">{children}</span> {/* Ensure text truncation if necessary */}
    </div>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        <button
          type="button"
          className={baseClasses}
          disabled={disabled} // Apply disabled state to link buttons as well
        >
          {buttonContent}
        </button>
      </Link>
    );
  }

  return (
    <button
      type="button" 
      className={baseClasses}
      onClick={onClick}
      disabled={disabled} // Disable non-link buttons
    >
      {buttonContent}
    </button>
  );
}
