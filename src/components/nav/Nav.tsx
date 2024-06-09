"use client";
import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineCreditCard, MdOutlinePeopleAlt } from "react-icons/md";
import { useRouter } from "next/navigation";

interface NavProperties {
  id: NavTabKeys;
  icon: React.ReactElement;
  title: string;
}

type NavTabKeys = 1 | 2 | 3 | 4 | 5;

const Nav = () => {
  const router = useRouter();
  const [active, setActive] = useState<NavTabKeys>(1);

  const nav: NavProperties[] = [
    {
      id: 1,
      icon: <GrHomeRounded />,
      title: "Overview",
    },
    {
      id: 2,
      icon: <MdOutlinePeopleAlt />,
      title: "Patients",
    },
    {
      id: 3,
      icon: <CiCalendar />,
      title: "Schedule",
    },
    {
      id: 4,
      icon: <FiMessageSquare />,
      title: "Message",
    },
    {
      id: 5,
      icon: <MdOutlineCreditCard />,
      title: "Transactions",
    },
  ];

  const navTab: { [key in NavTabKeys]: string } = {
    1: "/overview",
    2: "/patients",
    3: "/schedule",
    4: "/message",
    5: "/transaction",
  };

  const activeHandler = (id: NavTabKeys) => {
    setActive(id);
    router.push(navTab[id]);
  };

  const navSection = nav.map((item) => (
    <div
      className={`flex items-center gap-2 text-sm text-[#072635] cursor-pointer ${
        active === item.id && "bg-[#01F0D0] px-3 py-2 rounded-full"
      }`}
      onClick={() => activeHandler(item.id)}
      key={item.id}
    >
      {item.icon}
      {item.title}
    </div>
  ));

  return (
    <div>
      <div className="flex items-center gap-10">{navSection}</div>
    </div>
  );
};

export default Nav;
