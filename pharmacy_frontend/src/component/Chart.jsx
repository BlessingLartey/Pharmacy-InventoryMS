import React from 'react'
import { CChart }  from '@coreui/react-chartjs'

function Chart() {
  return (

<CChart
  type="doughnut"
  data={{
    labels: ['ReactJs'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        labels: {
          // color: getStyle('--cui-body-color'),
        }
      }
    },
  }}
/>
  )
}

export default Chart