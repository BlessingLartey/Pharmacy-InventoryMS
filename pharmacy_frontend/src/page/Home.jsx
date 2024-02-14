import React, { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid'
import Header from "../component/Header";
import HomeStyles from "../AllStyles/Home.module.css";
import FormList from "./FormList";
import { useSelector , useDispatch} from "react-redux";
import { addDrug, addDrugThunk, fetchDrugThunk } from "../store/features/drugs/drugSlice";
// import { drugReducer } from "../redux-store/redux-reducers/drugReducer.js";
import HeadStyles from '../AllStyles/Header.module.css'

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
    const [drugName, setDrugName] = useState("");
    const [description, setDescription] = useState("");
    const [drugCode, setDrugCode] = useState("");
    const [unitofPrice, setUnitofPrice] = useState("");
    const [price, setPrice] = useState("");
    
    const  drugs  = useSelector((state) => state.drugs);
    // console.log(drugs)

    const dispatch = useDispatch()


    // search function
    // const search = (drugs) => {
    //   return drugs.filter((drug) => drug.drugName.toLowerCase().includes(searchTerm) || drug.description.toLowerCase().includes(searchTerm))
    // }

    const handleSubmit = (e) => {
    e.preventDefault()
     
    const drug = {
        drugName,
        description,
        drugCode,
        unitofPrice,
        price
    };

     dispatch(addDrugThunk(drug));
     setDrugName(''),
     setDescription(''),
     setDrugCode(''),
     setUnitofPrice(''),
     setPrice('')

    
  }

  useEffect(() => {
    dispatch(fetchDrugThunk())
  }, [dispatch])
  return (
    <>
   <section className={HeadStyles.header}>
        <div className={HeadStyles.topnav}>
          <a className={""} href="https://medtrack.io">
            MedTrack
          </a>
          <div className={HeadStyles.searchContainer}>
            <form action="">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search.."
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* <div>{drugs}</div> */}
              <button>Search</button>
            </form>
          </div>
        </div>
      </section>

      <section className={HomeStyles.formContent}>
        <div className={HomeStyles.formdetails}>
          
          <form onSubmit={handleSubmit} className={HomeStyles.pharmform}>
            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugName">Drug Name</label>
              <input
                type="text"
                placeholder="Type Drug Name"
                id="drugName"
                name="drugName"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Drug description"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugCode">Drug Code</label>
              <input
                type="text"
                placeholder="A0c123FH"
                id="drugCode"
                value={drugCode}
                name="drugCode"
                onChange={(e) => setDrugCode(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="unitofPrice">Unit of Pricing</label>
              <input
                type="text"
                placeholder="Tablet"
                id="unitPrice"
                value={unitofPrice}
                name="unitofPrice"
                onChange={(e) => setUnitofPrice(e.target.value)}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="2.02"
                id="price"
                className={HomeStyles.labelInput}
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className={HomeStyles.btn}>
                <button type="submit"
                 disabled= {!drugName || !description || !drugCode || !unitofPrice  || !price }
                 style={!drugName || !description || !drugCode || !unitofPrice  || !price ? {cursor: 'not-allowed'}: {cursor: "pointer"}}
                >Add</button>
              </div>
            </div>
          </form>

          <div className={HomeStyles.graphContent}></div>
        </div>
      </section>

      <FormList drugs={drugs} />

    </>
  );
}

export default Home;
