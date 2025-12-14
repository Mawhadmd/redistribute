import Link from "next/link";
import { RefreshCcw, List } from "lucide-react";

export default function Navbar() {
  const pages = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/shopping", label: "Shopping" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="flex justify-between items-center w-full p-8 mb-4 h-18 gap-2">
      <div className="flex gap-1 font-bold text-lg sm:text-2xl items-center justify-center">
        <RefreshCcw className="text-accent size-6 sm:size-9" />
        <h2>
          <Link href="/">Redistribute.io</Link>
        </h2>
      </div>

      <nav className="xl:gap-8 gap-4 lg:flex hidden text-[clamp(14px,1.5vw,18px)] whitespace-nowrap">
        {pages.map((nav) => (
          <Link
            key={nav.to}
            href={nav.to}
            className="border-b-4 p-2 hover:border-accent border-transparent"
          >
            {nav.label}
          </Link>
        ))}
      </nav>

      <div className="gap-2 lg:flex hidden">
        <Link
          href="/login"
          className="xl:block hidden border px-3 py-2 rounded"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="bg-accent text-white px-3 py-2 rounded"
        >
          Start Free Trial
        </Link>
      </div>

      <div className="flex gap-4 sm:hidden">
        <Link href="/register" className="sm:hidden text-accent">
          Start free trial
        </Link>
        <div className="cursor-pointer h-full lg:hidden">
          <List />
        </div>
      </div>
    </div>
  );
}
