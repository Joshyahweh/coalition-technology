"use client";
import { useAppContext } from "@/context";
import { CustomImage } from "@/ui/image/CustomImage";
import React from "react";
import { GoCalendar } from "react-icons/go";
import { MdOutlineCall } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import { TbGenderFemale } from "react-icons/tb";

const Profile = () => {
  const { data, error, jessicaTaylor } = useAppContext();
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!jessicaTaylor) {
    return <div>No data found for Jessica Taylor</div>;
  }
  const jessicaTaylorProfile = [
    {
      id: 1,
      icon: <GoCalendar color="#072635" size={22} />,
      title: "Date of birth",
      value: jessicaTaylor.date_of_birth,
    },
    {
      id: 2,
      icon: <TbGenderFemale color="#072635" size={25} />,
      title: "Gender",
      value: jessicaTaylor.gender,
    },
    {
      id: 3,
      icon: <MdOutlineCall color="#072635" size={25} />,
      title: "Contact Info.",
      value: jessicaTaylor.phone_number,
    },
    {
      id: 4,
      icon: <MdOutlineCall color="#072635" size={25} />,
      title: "Emergency Contacts",
      value: jessicaTaylor.emergency_contact,
    },
    {
      id: 5,
      icon: <RiShieldCheckLine color="#072635" size={25} />,
      title: "Insurance Provider",
      value: jessicaTaylor.insurance_type,
    },
  ];
  return (
    <main className=" bg-white p-5 rounded-2xl w-full">
      <div className="flex items-center justify-center flex-col">
        <CustomImage
          alt=""
          src={jessicaTaylor?.profile_picture}
          width={200}
          height={200}
        />
        <h4 className="text-[#072635]  text-2xl font-extrabold my-5">
          {jessicaTaylor.name}
        </h4>
      </div>
      <div className="space-y-5">
        {jessicaTaylorProfile.map((item) => (
          <div key={item.id} className="flex items-center gap-5">
            <div className="bg-[#f6f7f8] p-2 rounded-full">{item.icon}</div>
            <div className="text-sm text-[#072635]">
              <p className="font-meduim">{item.title}</p>
              <p className=" font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="text-[#072635] text-xs font-bold bg-[#01F0D0] px-8 py-3 rounded-full my-5">
          Show All Information
        </button>
      </div>
    </main>
  );
};

export default Profile;
