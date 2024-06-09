import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
  ChartTypeRegistry,
  TooltipItem,
} from "chart.js";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useDiagnosisContext } from "@/context/diagnosis-context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Legend
);

interface DiagnosisHistoryEntry {
  month: string;
  year: number;
  blood_pressure: {
    systolic: {
      value: number;
      levels: string;
    };
    diastolic: {
      value: number;
      levels: string;
    };
  };
  heart_rate: {
    value: number;
    levels: string;
  };
  respiratory_rate: {
    value: number;
    levels: string;
  };
  temperature: {
    value: number;
    levels: string;
  };
}

interface CustomChartProps {
  data: {
    month: string;
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  }[];
  title?: string;
  diagnosisHistory: DiagnosisHistoryEntry[];
}

const CustomChart: React.FC<CustomChartProps> = ({
  data,
  title,
  diagnosisHistory,
}) => {
  const [filter, setFilter] = useState<number>(6);
  const [clickedSystolicValue, setClickedSystolicValue] = useState<number>(0);
  const [clickedSystolicLevel, setClickedSystolicLevel] = useState<
    "Higher than Average" | "Lower than Average" | "Normal"
  >("Normal");
  const [clickedDiastolicValue, setClickedDiastolicValue] = useState<number>(0);
  const [clickedDiastolicLevel, setClickedDiastolicLevel] = useState<
    "Higher than Average" | "Lower than Average" | "Normal"
  >("Normal");

  const {
    setHeartRate,
    setRespiratoryRate,
    setTemperature,
    setHeartRateLevel,
    setRespiratoryRateLevel,
    setTemperatureLevel,
  } = useDiagnosisContext();

  const filteredData = data.slice(-filter);

  const chartData = {
    labels: filteredData.map((entry) => entry.month),
    datasets: [
      {
        label: "",
        data: filteredData.map((entry) => entry.systolic.value),
        fill: true,
        borderColor: "#C26EB4",
        tension: 0.4,
        pointBackgroundColor: "#E66FD2",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "",
        data: filteredData.map((entry) => entry.diastolic.value),
        fill: false,
        borderColor: "#7E6CAB",
        tension: 0.4,
        pointBackgroundColor: "#8C6FE6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Blood Pressure over the Months",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const label = context.dataset.label || "";
            const value = context.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "Blood Pressure",
        },
        grid: {
          drawBorder: true,
          color: (context: any) => {
            if (context.tick.value === 0) {
              return "#000"; // Color for the primary line
            }
            return "rgba(0, 0, 0, 0.1)"; // Color for other grid lines
          },
        },
      },
    },
    onClick: (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: ChartJS<keyof ChartTypeRegistry, (number | null)[], unknown>
    ) => {
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const value = chart.data.datasets[datasetIndex].data[index] as number;
        if (chart.data.labels === undefined) {
          return;
        }
        const clickedMonth = chart.data.labels[index] as string;

        const entry = diagnosisHistory.find(
          (history) => history.month === clickedMonth
        );

        if (entry) {
          setHeartRate(entry.heart_rate.value);
          setHeartRateLevel(entry.heart_rate.levels);
          setRespiratoryRate(entry.respiratory_rate.value);
          setRespiratoryRateLevel(entry.respiratory_rate.levels);
          setTemperature(entry.temperature.value);
          setTemperatureLevel(entry.temperature.levels);

          if (datasetIndex === 0) {
            setClickedSystolicValue(value as number);
            setClickedSystolicLevel(
              entry.blood_pressure.systolic.levels as
                | "Higher than Average"
                | "Lower than Average"
                | "Normal"
            );
          } else {
            setClickedDiastolicValue(value as number);
            setClickedDiastolicLevel(
              entry.blood_pressure.diastolic.levels as
                | "Higher than Average"
                | "Lower than Average"
                | "Normal"
            );
          }
        }
      }
    },
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(parseInt(event.target.value));
  };

  const levelDisplay: Record<
    "Higher than Average" | "Lower than Average" | "Normal",
    JSX.Element | string
  > = {
    "Higher than Average": <BiSolidUpArrow color="#072635" />,
    "Lower than Average": <BiSolidDownArrow color="#072635" />,
    Normal: "",
  };

  return (
    <main className="flex items-start gap-5">
      <div className="" style={{ width: "70%" }}>
        <div className="flex items-center justify-between ">
          <strong>{title}</strong>
          <select
            id="monthFilter"
            value={filter}
            onChange={handleFilterChange}
            className="text-xs text-[#072635] bg-transparent appearance-none"
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          >
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
            <option value={24}>Last 24 months</option>
          </select>
        </div>
        <Line data={chartData} options={options} className="w-full" />
      </div>
      <div>
        <div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{
                backgroundColor: "#E66FD2",
                height: "15px",
                width: "15px",
              }}
            />
            <span className="text-xs font-bold">Systolic</span>
          </div>
          <p className="text-[#072635] text-lg font-bold py-3">
            {clickedSystolicValue !== null ? clickedSystolicValue : "0"}
          </p>
          <div className="flex items-center gap-2">
            {levelDisplay[clickedSystolicLevel]}
            <p className="text-xs">
              {clickedSystolicLevel !== null ? clickedSystolicLevel : ""}
            </p>
          </div>
          <div className="py-3">
            <hr />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{
                backgroundColor: "#8C6FE6",
                height: "15px",
                width: "15px",
              }}
            />
            <span className="text-xs font-bold">Diastolic</span>
          </div>
          <p className="text-[#072635] font-bold text-lg py-3">
            {clickedDiastolicValue !== null ? clickedDiastolicValue : "0"}
          </p>
          <div className="flex items-center gap-2">
            {levelDisplay[clickedDiastolicLevel]}
            <p className="text-xs">
              {clickedDiastolicLevel !== null ? clickedDiastolicLevel : ""}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomChart;
