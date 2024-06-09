"use client";
import { useAppContext } from "@/context";
import React from "react";

const DiagnosticList = () => {
  const { jessicaTaylor } = useAppContext();
  return (
    <main>
      <h4 className="font-extrabold text-[#072635] text-[20px]">Diagnostic List</h4>
      <table className="text-sm text-left w-full mt-8">
        <thead>
          <tr className="bg-[#F6F7F8] rounded-t-full font-bold">
            <th className="py-2 px-4 rounded-bl-full rounded-tl-full">
              Problem/Diagnosis
            </th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4 rounded-br-full rounded-tr-full">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="max-h-60 overflow-y-auto">
          <tr>
            <td className="py-8 px-4">
              {jessicaTaylor?.diagnostic_list.map((item) => (
                <p key={item.name} className="mb-8">
                  {item.name}
                </p>
              ))}
            </td>
            <td className="py-8 px-4">
              {jessicaTaylor?.diagnostic_list.map((item) => (
                <p key={item.name} className="mb-8">
                  {item.description}
                </p>
              ))}
            </td>
            <td className="py-8 px-4">
              {jessicaTaylor?.diagnostic_list.map((item) => (
                <p key={item.name} className="mb-8">
                  {item.status}
                </p>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default DiagnosticList;
