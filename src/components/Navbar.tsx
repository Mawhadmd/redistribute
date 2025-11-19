import { RefreshCcw } from "lucide-react";
import { use } from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const currentpage = useLocation().pathname;
  const pages = [
          { to: "/Pricing", label: "Pricing" },
          { to: "/small-business", label: "Small Business" },
          { to: "/E-commerce", label: "E-commerce" },
          { to: "/Agency", label: "Agency" },
        ]
  return (
    <div className="flex justify-between items-center w-full p-14">
      <div className="flex gap-1 font-bold text-2xl items-center justify-center">
        <RefreshCcw className="text-accent size-9" />
        <p>
          {" "}
          <Link to="/">Redistribute.io</Link>
        </p>
      </div>
      <nav className="flex gap-10 text-xl">
        {pages.map((nav) => (
          <Link key={nav.to} to={nav.to} className={`border-b-4 p-2 hover:border-accent border-transparent ${currentpage === nav.to && "!border-accent/50"}`}>
            {nav.label}
          </Link>
        ))}
      </nav>
      <div className="gap-2 flex">
        <button className="w-44 h-10 border border-accent rounded-lg text-xl text-accent font-bold">
          Login
        </button>
        <button className="w-44 h-10 border bg-accent rounded-lg text-xl text-primary font-bold">
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
