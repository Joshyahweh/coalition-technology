"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CustomChartProps {
  data: {
    month: string;
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  }[];
  title?: string;
}

const CustomChart: React.FC<CustomChartProps> = ({ data, title }) => {
  const [filter, setFilter] = useState<number>(6);
  const [clickedSystolicValue, setClickedSystolicValue] = useState<number>(0);
  const [clickedSystolicLevel, setClickedSystolicLevel] = useState<
    "Higher than Average" | "Lower than Average" | "Normal"
  >("Normal");
  const [clickedDiastolicValue, setClickedDiastolicValue] = useState<number>(0);
  const [clickedDiastolicLevel, setClickedDiastolicLevel] = useState<
    "Higher than Average" | "Lower than Average" | "Normal"
  >("Normal");

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
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
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
      },
      y: {
        title: {
          display: false,
          text: "Blood Pressure",
        },
      },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const value = chart.data.datasets[datasetIndex].data[index];
        if (datasetIndex === 0) {
          setClickedSystolicValue(value as number);
          setClickedSystolicLevel(
            filteredData[index].systolic.levels as
              | "Higher than Average"
              | "Lower than Average"
              | "Normal"
          );
        } else {
          setClickedDiastolicValue(value as number);
          setClickedDiastolicLevel(
            filteredData[index].diastolic.levels as
              | "Higher than Average"
              | "Lower than Average"
              | "Normal"
          );
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
