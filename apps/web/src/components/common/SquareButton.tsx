import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string; // Make href optional
  onClick?: () => void; // Handler for button click
  variant?: "big" | "small"; // Optional variant
  icon?: string; // Optional icon URL
  iconAlt?: string; // Alt text for the icon
  className?: string;
}

export default function SquareButton({
  children,
  href,
  onClick,
  variant = "small",
  icon,
  iconAlt,
  className,
}: ButtonProps): JSX.Element {
  const sizeClass =
    variant === "big" ? `py-3 px-6 text-lg ` : `py-2 px-4 text-sm `;
  const baseClasses = `flex items-center justify-center border rounded ${className} ${sizeClass}`;

  const buttonContent = (
    <div className="flex items-center justify-center ">
      {icon && <img src={icon} alt={iconAlt} className="w-5 h-5  bg-white mr-2 " />}{" "}
      {/* Adjust icon size */}
      <span className="truncate">{children}</span>{" "}
      {/* Ensure text truncation if necessary */}
    </div>
  );

  return href ? (
    <Link href={href} passHref>
      <button type="button" className={baseClasses}>
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button type="button" className={baseClasses} onClick={onClick}>
      {buttonContent}
    </button>
  );
}
