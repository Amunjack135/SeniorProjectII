import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import "./CareerPath.css"
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "No Degree (Retail → Self-Taught)",
      data: [32000, 35000, 40000, 55000, 70000, 85000, 100000, 115000, 125000, 135000],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
    },
    {
      fill: true,
      label: "Bachelor's",
      data: [0, 0, 0, 0, 85000, 95000, 105000, 115000, 125000, 135000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      fill: true,
      label: "Master's",
      data: [0, 0, 0, 0, 0, 0, 105000, 115000, 125000, 140000],
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.2)",
    },
    {
      fill: true,
      label: "PhD",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 130000, 145000],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.2)",
    },
  ],
};

const CareerPath = () => {
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )



}
export default CareerPath;