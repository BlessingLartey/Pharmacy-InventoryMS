import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "../component/Header";
import HomeStyles from "../AllStyles/Home.module.css";
import FormList from "./FormList";
import { useSelector, useDispatch } from "react-redux";
import {
  // addDrug,
  addDrugThunk,
  fetchDrugThunk,
} from "../store/features/drugs/drugSlice";
// import { drugReducer } from "../redux-store/redux-reducers/drugReducer.js";
import HeadStyles from "../AllStyles/Header.module.css";
import Chart from "../component/Chart.jsx";
import { set } from "mongoose";
import SearchBar from "../component/SearchBar.jsx";
import SearchResultList from "../component/SearchResultList.jsx";

function Home() {
  const [laName, setLabName] = useState("");
  const [description, setDescription] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [unitofPrice, setUnitofPrice] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);


  // const drugs = useSelector((state) => state.drugs);
  // console.log(drugs)

  const dispatch = useDispatch();

  // search function
  // const search = (drugs) => {
  //   return drugs.filter((drug) => drug.drugName.toLowerCase().includes(searchTerm) || drug.description.toLowerCase().includes(searchTerm))
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const drug = {
  //     drugName,
  //     description,
  //     drugCode,
  //     unitofPrice,
  //     price,
  //   };

  //   dispatch(addDrugThunk(drug));
  //   setDrugName(""),
  //     setDescription(""),
  //     setDrugCode(""),
  //     setUnitofPrice(""),
  //     setPrice("");
  // };

  useEffect(() => {
    dispatch(fetchDrugThunk());
  }, [dispatch]);



  return (
    <>
      {/* <section className={HeadStyles.header}>
        <div className={HeadStyles.topnav}>
          <a className={""} href="https://medtrack.io">
            MedTrack
          </a>
         
        </div>
      </section> */}
      {/* <PharmNav /> */}

      <section className={HomeStyles.formContent}>
        <div>
       <SearchBar setResults= {setResults} />
       <SearchResultList  results={results}/>

        </div>
        
        <div className={HomeStyles.formdetails}>
          <form onSubmit={handleSubmit} className={HomeStyles.pharmform}>
            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugName" style={{}}>
                Lab item name
              </label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Lab item name"
                id="labName"
                name="labName"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="description">Lab Type</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Drug description"
                name="description"
                id="description"
                value={labType}
                onChange={(e) => setLabType(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugCode">Main category</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="A0c123FH"
                id="drugCode"
                value={mainCategory}
                name="drugCode"
                onChange={(e) => setMainCategory(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="unitofPrice">Sub Category</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Tablet"
                id="unitPrice"
                value={subCategory}
                name="unitofPrice"
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className={HomeStyles.inputText}
                placeholder="2.02"
                id="price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className={HomeStyles.btn}>
                <button
                  type="submit"
                  disabled={
                    !drugName ||
                    !description ||
                    !drugCode ||
                    !unitofPrice ||
                    !price
                  }
                  style={
                    !drugName ||
                    !description ||
                    !drugCode ||
                    !unitofPrice ||
                    !price
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className={HomeStyles.graphContent}>
            <Chart />
          </div>
        </div>
      </section>

      <FormList drugs={drugs} />
    </>
  );
}

export default Home;
