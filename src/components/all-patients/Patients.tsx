"use client";

import { useAppContext } from "@/context";
import { Patients } from "@/interface/tech-care";
import { getAPI, getData } from "@/service/service";
import { CustomImage } from "@/ui/image/CustomImage";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const AllPatients = () => {
  const { data, error } = useAppContext();
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main className="w-72 bg-white px-4 py-5 rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-[#072635] font-bold">Patients</h4>
        <AiOutlineSearch />
      </div>
      <div className="h-[50rem] overflow-y-auto">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between mt-5"
          >
            <div className="flex items-center gap-3">
              <CustomImage
                src={item.profile_picture}
                alt="Profile Picture"
                loader={() => item.profile_picture}
                width={30}
                height={30}
              />
              <div>
                <strong className="text-xs text-[#072635]">{item.name}</strong>
                <p className="text-xs text-[#707070]">
                  {item.gender}, {item.age}
                </p>
              </div>
            </div>
            <BsThreeDots color="#072635" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllPatients;
