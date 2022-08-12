import React from "react";
import Chart from "react-apexcharts";
import GraphContainer from "../UI/GraphContainer";
import "../Weather/weather.css";
import "../Weather/weather.css";
const Chart1 = ({ array }) => {
  var obj = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        // categories: ["","9","10","11","12","1","2","3","4","5","6","7","8","9"]
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "series-1",
        data: [...array],
      },
    ],
  };

  return (
    <GraphContainer className="">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={obj.options}
            series={obj.series}
            type="area"
            width="100%"
            align="center"
          />
        </div>
      </div>
    </GraphContainer>
  );
};

export default Chart1;
