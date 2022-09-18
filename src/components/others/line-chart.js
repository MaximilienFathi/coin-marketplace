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
  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Historic Data",
        data: historicData,
        pointRadius: 0,
        // tension: 0.4,
          backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 200);
              gradient.addColorStop(0, "rgba(250,174,50,1)");
              gradient.addColorStop(1, "rgba(250,174,50,0)");
              return gradient;
          }
        // borderColor: gradient2, // Add custom color border (Line)
        // backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        // borderColor: ["rgb(75, 192, 192)"],
        borderWidth: 1,
      },
    ],
  };
  return <Line data={data} options={options} />;
}

export default LineChart;
