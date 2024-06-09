import React from "react";
import DiagnosisHistory from "./DiagnosisHistory";
import CustomCard from "@/ui/card/Card";
import DiagnosticList from "./DiagnosticList";

const Diagnosis = () => {
  return (
    <main className="mx-5">
      <div className="bg-white px-5 py-4 rounded-2xl">
        <h4 className="mt-4 mb-10 font-extrabold text-[20px]">Diagnosis History</h4>
        <div className=" bg-[#F4F0FE] p-5 rounded-xl  mx-3">
          <DiagnosisHistory />
        </div>
        <div className="my-5 flex items-center justify-between">
          <CustomCard
            cardBackgroundColor="#E0F3FA"
            cardImage="/respiratory rate.svg"
            cardStateLevel="Normal"
            cardTitle="Respiratory Rate"
            cardValue={20}
            cardValueUnit="bpm"
          />
          <CustomCard
            cardBackgroundColor="#FFE6E9"
            cardImage="/temperature.svg"
            cardStateLevel="Normal"
            cardTitle="Temperature"
            cardValue={98.6}
            cardValueUnit="°F"
          />
          <CustomCard
            cardBackgroundColor="#FFE6F1"
            cardImage="/HeartBPM.svg"
            cardStateLevel="Lower than Average"
            cardTitle="Heart Rate"
            cardValue={78}
            cardValueUnit="bpm"
          />
        </div>
      </div>
      <div className="bg-white px-5 py-4 rounded-2xl mt-5">
        <DiagnosticList />
      </div>
    </main>
  );
};

export default Diagnosis;
