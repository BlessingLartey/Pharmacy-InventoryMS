import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { fetchUnitPriceThunk } from "../store/features/drugs/drugSlice";
import { useDispatch, useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";

function Chart() {
  const dispatch = useDispatch();
  const unitPrice = useSelector((state) => state.drugs.unitofPrice);

  useEffect(() => {
    dispatch(fetchUnitPriceThunk());
  }, [dispatch]);

  const data = Object.entries(unitPrice).map(([label, value]) => ({
    label,
    value,
  }));

  console.log("data", data);

  const dataHeader = [["Unit of Pricing", "Count"], ...data];
  console.log("data head", dataHeader);
  return (
    <>
      <div style={{}}>
        <h3
          style={{
            fontSize: "16px",
            textAlign: "center",
            paddingTop: "0.7rem",
          }}
        >
          Drug Statistical Chart
        </h3>
        <p
          style={{
            fontSize: "16px",
            textAlign: "center",
            paddingTop: "0.7rem",
          }}
        >
          Showing percentage of drugs available using the unit of pricing
        </p>

        <PieChart
          series={[
            {
              data: dataHeader,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </>
  );
}

export default Chart;
