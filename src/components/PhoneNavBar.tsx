import { ArrowBigLeft, RefreshCcw } from 'lucide-react';
import React from 'react'
import { useLocation, Link } from 'react-router';
import BorderedButton from './buttons/borderedbutton.tsx';
import FilledButton from './buttons/filledbutton.tsx';

export default function PhoneNavBar({isopen, SetphoneNav}: {isopen: boolean, SetphoneNav: React.Dispatch<React.SetStateAction<boolean>>}) {

  const currentpage = useLocation().pathname;
  const pages = [
          { to: "/Pricing", label: "Pricing" },
          { to: "/small-business", label: "Small Business" },
          { to: "/contact", label: "Contact" },
          { to: "/About", label: "About" },
          { to: "/content-creators", label: "Content Creators" },
        ]
  return (
    <div id='phone-nav-bar' style={{transform: isopen ? 'translateX(0)' : 'translateX(100%)'}} className="transition-all flex flex-col justify-around items-center lg:hidden bg-white w-[50%] p-8 right-0  h-screen fixed top-0 border-l border-accent/20  shadow-lg z-50">
      <div className='top-0 bg-secondary text-accent p-2  left-0 absolute cursor-pointer rounded-br-2xl' onClick={() => SetphoneNav(false)}><ArrowBigLeft/></div>
      <div className=" flex gap-1 font-bold text-xl items-center justify-center">
        <RefreshCcw className="text-accent size-9" />
        <h2>
          {" "}
          <Link to="/">Redistribute.io</Link>
        </h2>
      </div>
      <nav className="flex flex-col gap-4 ">
        {pages.map((nav) => (
          <Link key={nav.to} to={nav.to} className={`border-b-4 p-2 hover:border-accent border-transparent ${currentpage === nav.to && "!border-accent/50"}`}>
            {nav.label}
          </Link>
        ))}
      </nav>
      <div className="gap-2 flex flex-col">
        <BorderedButton text="Log in" to='/login' />
        <FilledButton text="Start Free Trial" to='/register' />
      </div>
    </div>
  );
}
