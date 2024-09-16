import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href: string;
}

export default function Button({ children, href }: ButtonProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <button
        type="button"
        className="hover:bg-gray-100 rounded px-5 py-1.5"
      >
        {children}
      </button>
    </Link>
  );
}
