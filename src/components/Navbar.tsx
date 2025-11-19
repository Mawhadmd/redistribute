import { RefreshCcw } from "lucide-react";
import { use } from "react";
import { Link, useLocation } from "react-router";
import BorderedButton from "./buttons/borderedbutton.tsx";
import FilledButton from "./buttons/filledbutton.tsx";


export default function Navbar() {
  const currentpage = useLocation().pathname;
  const pages = [
          { to: "/Pricing", label: "Pricing" },
          { to: "/small-business", label: "Small Business" },
          { to: "/contact", label: "Contact" },
          { to: "/About", label: "About" },
          { to: "/content-creators", label: "Content Creators" },
        ]
  return (
    <div className="flex justify-between items-center w-full p-8 mb-4 h-18">
      <div className="flex gap-1 font-bold text-2xl items-center justify-center">
        <RefreshCcw className="text-accent size-9" />
        <p>
          {" "}
          <Link to="/">Redistribute.io</Link>
        </p>
      </div>
      <nav className="flex gap-8 ">
        {pages.map((nav) => (
          <Link key={nav.to} to={nav.to} className={`border-b-4 p-2 hover:border-accent border-transparent ${currentpage === nav.to && "!border-accent/50"}`}>
            {nav.label}
          </Link>
        ))}
      </nav>
      <div className="gap-2 flex">
        <BorderedButton text="Log in" />
        <FilledButton text="Start Free Trial" />
      </div>
    </div>
  );
}
