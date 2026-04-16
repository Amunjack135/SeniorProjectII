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
            label: "No Degree",
            data: [30000, 30000, 35000, 35000],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
        },
         {
            fill: true,
            label: "Bachelor's",
            data: [0, 0, 0, 0, 94000, 99000, 104000, 110000, 116000, 122000],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
        },
        {
            fill: true,
            label: "Master's",
            data: [0,0, 0, 0, 0, 0, 110000, 114000, 118000, 123000],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
        },
        {
            fill: true,
            label: "PhD",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 150000, 152000, 155000],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
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