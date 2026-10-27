import React from "react";
import AccountLinks from "./accountLinks";
import Link from "next/link";
import Search from "./search";

const Header = () => {
  return (
    <header className="p-4 border-b border-sushi flex  flex-wrap p-1.5 m-2.5 justify-between">
      <Link
        href="/"
        
        className="flex items-center gap-2 text-2xl font-black  text-pacifika hover:opacity-90 transition-opacity"
      >
        <span>
          Swedish <span className="text-saratoga">Hub</span>
        </span>
      </Link>
      <div className="w-full order-2 md:order-2 md:w-auto md:flex-1 md:max-w-xs">
        <Search />
      </div>
     <div className="order-3 md:order-3">
        <AccountLinks />
      </div>
    </header>
  );
};

export default Header;
