"use client";
import { useAppContext } from "@/context";
import React from "react";

const DiagnosticList = () => {
  const { jessicaTaylor } = useAppContext();
  return (
    <main>
      <h4 className="font-extrabold text-[#072635] text-[20px]">
        Diagnostic List
      </h4>
      <div className="relative mt-8 max-h-48 overflow-y-auto">
        <table className="text-sm text-left w-full text-[#072635] table-fixed">
          <thead className="sticky top-0 bg-[#F6F7F8]">
            <tr className="rounded-t-full font-bold">
              <th className="py-2 px-4 rounded-bl-full rounded-tl-full w-1/3">
                Problem/Diagnosis
              </th>
              <th className="py-2 px-4 w-2/3">Description</th>
              <th className="py-2 px-4 rounded-br-full rounded-tr-full w-1/3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jessicaTaylor?.diagnostic_list.map((item) => (
              <tr key={item.name}>
                <td className="py-5 px-4 w-1/3 whitespace-nowrap  text-ellipsis">
                  {item.name}
                </td>
                <td className="py-5 px-4 w-1/3 whitespace-nowrap  text-ellipsis">
                  {item.description}
                </td>
                <td className="py-5 px-4 w-1/3 whitespace-nowrap  text-ellipsis">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default DiagnosticList;
