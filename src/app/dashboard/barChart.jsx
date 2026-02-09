import { Box } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexBarChart = ({ barChartData }) => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "待處理金額",
        data: barChartData?.pending,
      },
      {
        name: "已收金額",
        data: barChartData?.received,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [...barChartData?.categories],
      },
      yaxis: {
        title: {
          text: "金額",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val;
          },
        },
      },
    },
  });

  return (
    <Box>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </Box>
  );
};

export default ApexBarChart;
