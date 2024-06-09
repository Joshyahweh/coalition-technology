"use client";
import { useAppContext } from "@/context";
import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

const LabResults = () => {
  const { jessicaTaylor } = useAppContext();
  return (
    <main className="bg-white p-5 rounded-2xl">
      <h4 className="font-extrabold text-[#072635] text-[20px]">Lab Results</h4>
      <div>
        <div className="mt-5 max-h-36 overflow-y-auto">
          {jessicaTaylor?.lab_results.map((item, index) => (
            <div key={index} className="flex items-center justify-between mt-5">
              <p className="text-sm">{item}</p>
              <MdOutlineFileDownload color="#000000" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LabResults;
