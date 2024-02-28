import React from "react";
import { CChart } from "@coreui/react-chartjs";

function Chart() {

  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <>
    
    
    </>
    // <CChart
    //   type="doughnut"
    //   data={{
    //     labels: ["ReactJs"],
    //     datasets: [
    //       {
    //         backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
    //         data: [40, 20, 80, 10],
    //       },
    //     ],
    //   }}
    //   options={{
    //     plugins: {
    //       legend: {
    //         labels: {
    //           // color: getStyle('--cui-body-color'),
    //         },
    //       },
    //     },
    //   }}
    // />


  );
}

export default Chart;
