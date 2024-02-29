import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { fetchUnitPriceThunk } from "../store/features/drugs/drugSlice";
import { useDispatch , useSelector} from "react-redux";

function Chart() {

  const dispatch = useDispatch()
  const unitPrice = useSelector((state) =>  state.drugs.unitofPrice)
  console.log('unit of price..', unitPrice);


  useEffect(() => {
    dispatch(fetchUnitPriceThunk())
  }, [dispatch])
//  const data = unitPrice

//   const data = {
//   labels: [
//     'Red',
//     'Blue',
//     'Yellow'
//   ],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [300, 50, 100],
//     backgroundColor: [
//       'rgb(255, 99, 132)',
//       'rgb(54, 162, 235)',
//       'rgb(255, 205, 86)'
//     ],
//     hoverOffset: 4
//   }]
// };

const data = Object.entries(unitPrice).map(([label, value]) => [
  label,
  value,
]);

const dataHeader = [["Unit of Pricing", "Count"], ...data];

  return (
    
    <CChart
      type="doughnut"
      data={{
        labels: [dataHeader],
        datasets: [
          {
            // backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [dataHeader],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              // color: getStyle('--cui-body-color'),
              unitPrice
            },
          },
        },
      }}
    />


  );
}

export default Chart;
