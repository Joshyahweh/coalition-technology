"use client";
import { useAppContext } from "@/context";
import { Patients } from "@/interface/tech-care";
import { getAPI } from "@/service/service";
import CustomChart from "@/ui/chart/chart";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const DiagnosisHistory = () => {
  const { data, error, jessicaTaylor } = useAppContext();
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const jessicaDiagnosisHistory = jessicaTaylor?.diagnosis_history.map(
    ({ month, blood_pressure }) => ({
      month,
      systolic: {
        value: blood_pressure.systolic.value,
        levels: blood_pressure.systolic.levels,
      },
      diastolic: {
        value: blood_pressure.diastolic.value,
        levels: blood_pressure.diastolic.levels,
      },
    })
  );

  if (jessicaDiagnosisHistory === undefined) {
    return <div>No data available</div>;
  }

  return (
    <main className="">
      <CustomChart data={jessicaDiagnosisHistory} title="Blood pressure" />
    </main>
  );
};

export default DiagnosisHistory;
