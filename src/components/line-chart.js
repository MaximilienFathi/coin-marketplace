import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function LineChart({ historicData }) {
  const labels = new Array(historicData.length);
  const data = {
    labels,
    datasets: [
      {
        label: "Historic Data",
        data: historicData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line data={data} />;
}

export default LineChart;
