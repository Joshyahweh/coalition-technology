import { CustomImage } from "@/ui/image/CustomImage";
import React from "react";
import Nav from "../nav/Nav";
import { MdOutlineSettings } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Header = async () => {
  return (
    <main className="flex items-center justify-between px-8 bg-white mx-5 rounded-full py-2">
      <CustomImage
        alt="Test Logo"
        src="/TestLogo.svg"
        width={100}
        height={100}
      />
      <Nav />
      <div className="flex items-center gap-2">
        <CustomImage
          alt="Test Logo"
          src="/header-profile-image.png"
          width={30}
          height={30}
        />
        <div className="border-r pr-3">
          <strong className="text-[#072635] text-[0.7rem]">Dr. Jose Simmons</strong>
          <p className="text-[#707070] text-[0.7rem]">General Practitional</p>
        </div>
        <MdOutlineSettings color="#072635" size={20} />
        <HiOutlineDotsVertical color="#072635"/>
      </div>
    </main>
  );
};

export default Header;
