"use client";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Patient, Patients } from "@/interface/tech-care";
import { getAPI } from "@/service/service";

interface AppContextProperties {
  data: Patients;
  error: string;
  jessicaTaylor: Patient | undefined;
}

export const AppContext = createContext<AppContextProperties | undefined>(
  undefined
);

export const AppWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Patients>([]);
  const [error, setError] = useState<string>("");
  const jessicaTaylor = data.find((item) => item.name === "Jessica Taylor");
  console.log(jessicaTaylor);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAPI(
          process.env.NEXT_PUBLIC_ALL_PATIENTS,
          "coalition",
          "skills-test"
        );
        const data = await res?.json();
        console.log("Data", data);
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  

  const contextValue: AppContextProperties = {
    data,
    error,
    jessicaTaylor,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
};
