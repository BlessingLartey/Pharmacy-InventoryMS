import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "../component/Header";
import HomeStyles from "../AllStyles/Home.module.css";
import FormList from "./FormList.jsx";

import { useSelector, useDispatch } from "react-redux";
import {
  addDrugThunk,
  fetchDrugThunk,
} from "../store/features/drugs/drugSlice";
import HeadStyles from "../AllStyles/Header.module.css";
import Chart from "../component/Chart.jsx";
import { set } from "mongoose";
import { toast } from "react-toastify";
import avatar from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../component/SideBar.jsx";

function Home() {
  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [unitofPrice, setUnitofPrice] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);
  const [newUnitOfPrice, setnewUnitOfPrice] = useState("");
  const drugs = useSelector((state) => state.drugs);

  const dispatch = useDispatch();

  const newUnitOfPriceOptions = () => {
    if (!Array.isArray(drugs)) {
      return null; // or return an appropriate fallback if drugs is not an array
    }
    const uniqueUnitPrices = [
      ...new Set(drugs.map((drug) => drug.unitofPrice)),
    ];
    return (
      <>
        {uniqueUnitPrices.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
        <option value="other">Other</option>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validate the input fields
    if (!drugName || !description || !drugCode || !unitofPrice || !price) {
      // Show error toast and return if any field is empty
      toast.error("Please fill in all the fields", {
        position: "top-left",
      });
      return;
    }

    const drug = {
      drugName,
      description,
      drugCode,
      unitofPrice: unitofPrice === "other" ? newUnitOfPrice : unitofPrice,
      price,
    };

    const success = await dispatch(addDrugThunk(drug));

    if (success) {
      dispatch(fetchDrugThunk());
      toast.success("Drug added successfully", {
        position: "top-left",
      });

      // dispatch(addDrugThunk(drug));
      setDrugName(""),
        setDescription(""),
        setDrugCode(""),
        setUnitofPrice(""),
        setPrice("");
    } else {
      toast.error("Failed to add drug");
    }
  };

  useEffect(() => {
    dispatch(fetchDrugThunk());
  }, [dispatch]);

  //serach functionality

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };

  const handleChange = (value) => {
    if (value === "other") {
      setUnitofPrice("other");
      setnewUnitOfPrice("");
    } else {
      setUnitofPrice(value);
      setnewUnitOfPrice("");
    }
  };

  return (
    <>
      <div className={HomeStyles.homebody}>
        <div>
          <Sidebar />
        </div>
        <div className={HomeStyles.homebodyright}>
          <div style={{}}>
            <div className={HeadStyles.searchContainer}>
              <Link
                to="/"
                style={{
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Pharmacy Inventory
              </Link>
            </div>
          </div>
          <section className={HomeStyles.formContent}>
            <div className={HomeStyles.formdetails}>
              <form onSubmit={handleSubmit} className={HomeStyles.pharmform}>
                <div className={HomeStyles.formgroup}>
                  <label className={HomeStyles.labelInfo} htmlFor="drugName">
                    Drug Name
                  </label>
                  <input
                    type="text"
                    className={HomeStyles.inputText}
                    placeholder="Type Drug Name"
                    id="drugName"
                    name="drugName"
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className={HomeStyles.formgroup}>
                  <label className={HomeStyles.labelInfo} htmlFor="description">
                    Description
                  </label>
                  <input
                    type="text"
                    className={HomeStyles.inputText}
                    placeholder="Drug description"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // autoComplete="off"
                    autoComplete="off"
                  />
                </div>

                <div className={HomeStyles.formgroup}>
                  <label className={HomeStyles.labelInfo} htmlFor="drugCode">
                    Drug Code
                  </label>
                  <input
                    type="text"
                    className={HomeStyles.inputText}
                    placeholder="A0c123FH"
                    id="drugCode"
                    value={drugCode}
                    name="drugCode"
                    onChange={(e) => setDrugCode(e.target.value)}
                    autoComplete="off"
                    // autoCapitalize= {true}
                  />
                </div>

                <div className={HomeStyles.formgroup}>
                  <label className={HomeStyles.labelInfo} htmlFor="unitofPrice">
                    Unit of Pricing
                  </label>

                  <select
                    className={HomeStyles.inputTextSelect}
                    name="unitofPrice"
                    id="unitofPrice"
                    value={unitofPrice}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option value="ampoule">Ampoule</option>
                    <option value="tablet">Tablet</option>
                    <option value="1 ml">1 mL</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Render input for custom unit of price if "Other" is selected */}
                  {unitofPrice === "other" && (
                    <input
                      type="text"
                      className={HomeStyles.inputUp}
                      placeholder="New Unit"
                      id="newUnitOfPrice"
                      value={newUnitOfPrice}
                      onChange={(e) => setnewUnitOfPrice(e.target.value)}
                      autoComplete="off"
                    />
                  )}
                </div>

                <div className={HomeStyles.formgroup}>
                  <label className={HomeStyles.labelInfo} htmlFor="price">
                    Price
                  </label>
                  <input
                    type="text"
                    className={HomeStyles.inputText}
                    placeholder="Price"
                    id="price"
                    value={price}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className={HomeStyles.btn}>
                  <button type="submit">Add</button>
                </div>
              </form>

              <div className={HomeStyles.graphContent}>
                <Chart />
              </div>
            </div>
          </section>

          <FormList drugs={drugs} />
        </div>
      </div>
    </>
  );
}

export default Home;
