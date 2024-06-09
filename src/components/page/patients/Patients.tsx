import AllPatients from "@/components/all-patients/Patients";
import Diagnosis from "@/components/diagnosis/Diagnosis";
import DiagnosisHistory from "@/components/diagnosis/DiagnosisHistory";
import LabResults from "@/components/label-results/LabResults";
import Profile from "@/components/profile/Profile";
import React from "react";

const Patients = () => {
  return (
    <main className="mx-7 flex items-start mt-5">
      <div className="">
        <AllPatients />
      </div>
      <div className="w-[200%]">
        <Diagnosis />
      </div>
      <div className="w-full space-y-5">
        <Profile />
        <LabResults />
      </div>
    </main>
  );
};

export default Patients;
