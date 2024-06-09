"use client";
import React, { createContext, useContext, useState } from "react";

interface DiagnosisContextType {
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  setHeartRate: (value: number) => void;
  setHeartRateLevel: (level: string) => void;
  setRespiratoryRate: (value: number) => void;
  setRespiratoryRateLevel: (level: string) => void;
  setTemperature: (value: number) => void;
  setTemperatureLevel: (level: string) => void;
  heartRateLevel: string;
  respiratoryRateLevel: string;
  temperatureLevel: string;
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(
  undefined
);

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [heartRate, setHeartRate] = useState(78);
  const [heartRateLevel, setHeartRateLevel] = useState("Normal");
  const [respiratoryRate, setRespiratoryRate] = useState(20);
  const [respiratoryRateLevel, setRespiratoryRateLevel] = useState("Normal");
  const [temperature, setTemperature] = useState(98.6);
  const [temperatureLevel, setTemperatureLevel] = useState(
    "Higher than Average"
  );

  const setHeartRateLevelHandler = (level: string) => setHeartRateLevel(level);
  const setRespiratoryRateLevelHandler = (level: string) =>
    setRespiratoryRateLevel(level);
  const setTemperatureLevelHandler = (level: string) =>
    setTemperatureLevel(level);

  

  return (
    <DiagnosisContext.Provider
      value={{
        heartRate,
        respiratoryRate,
        temperature,
        setHeartRate,
        setRespiratoryRate,
        setTemperature,
        setHeartRateLevel: setHeartRateLevelHandler,
        setRespiratoryRateLevel: setRespiratoryRateLevelHandler,
        setTemperatureLevel: setTemperatureLevelHandler,
        heartRateLevel,
        respiratoryRateLevel,
        temperatureLevel,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosisContext = () => {
  const context = useContext(DiagnosisContext);
  if (context === undefined) {
    throw new Error(
      "useDiagnosisContext must be used within a DiagnosisProvider"
    );
  }
  return context;
};
