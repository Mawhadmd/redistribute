import { List, ListCheck, RefreshCcw } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import BorderedButton from "./buttons/borderedbutton.tsx";
import FilledButton from "./buttons/filledbutton.tsx";
import PhoneNavBar from "./PhoneNavBar.tsx";

export default function Navbar() {
  const location = useLocation();
  const [phoneNav, SetphoneNav] = useState(false);

  useEffect(() => {
    
    SetphoneNav(false)
  }, [location]);
  useEffect(() => {
    if (!phoneNav) return;
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        SetphoneNav(false);
      }
      
    }; //closes the phone nav if size is increased beyond lg breakpoint

    const handleClick = (e: MouseEvent) => {
      
      if (phoneNav) {
        const phoneNavElement = document.querySelector(
          "#phone-nav-bar"
        ) as HTMLElement;
        console.log(phoneNavElement);
        if (phoneNavElement && !phoneNavElement.contains(e.target as Node)) {
          SetphoneNav(false);
        }
    }
  }
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);
   
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, [phoneNav]);
  
  const currentpage = useLocation().pathname;
  const pages = [
    {to:"/" , label:"Home"},
    { to: "/Pricing", label: "Pricing" },
    { to: "/shopping", label: "Shopping" },
    { to: "/contact", label: "Contact" 
    }
    ,{to: "/about", label:"About"}
  ];
  return (
    <div className="  flex justify-between items-center w-full p-8 mb-4 h-18 gap-2">
      <div className="flex gap-1 font-bold text-lg sm:text-2xl  items-center justify-center">
        <RefreshCcw className="text-accent size-6 sm:size-9" />
        <h2>
          {" "}
          <Link to="/">Redistribute.io</Link>
        </h2>
      </div>

      <nav className=" xl:gap-8 gap-4 lg:flex hidden text-[clamp(14px,1.5vw,18px)] whitespace-nowrap ">
        {pages.map((nav) => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`border-b-4 p-2 hover:border-accent border-transparent ${
              currentpage === nav.to && "!border-accent/50"
            }`}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
      <div className="gap-2 lg:flex  hidden">
        <BorderedButton style="xl:block hidden" text="Log in" to="/login" />
        <FilledButton text="Start Free Trial" to='/register' />
      </div>
      <div className="flex gap-4 sm:hidden">
        <Link to={'/register'} className="sm:hidden text-accent">Start free trial</Link>
      <div
        onClick={(e) => {  e.stopPropagation(); SetphoneNav(true)}}
        className="cursor-pointer h-full lg:hidden"
      >
        <List></List>
      </div>
      </div>
      <PhoneNavBar isopen={phoneNav} SetphoneNav={SetphoneNav}></PhoneNavBar>
    </div>
  );
}
