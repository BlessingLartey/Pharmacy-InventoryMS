import React, { useEffect, useState } from "react";
import Home from "../../AllStyles/Home.module.css";
// import FormList from "./FormList";
import { useSelector, useDispatch } from "react-redux";
// import Chart from "../component/Chart.jsx";
import { fetchLabThunk , addLabThunk} from "../../store/features/labs/labSlice.js";
import LabList from  "../../LabComponents/pages/LabList.jsx"
 import HeadStyles from '../../AllStyles/Header.module.css'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify'
import Chart from "../../component/Chart.jsx";

function LabHome() {
  const [labName, setLabName] = useState("");
  const [labType, setLabType] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [labCode, setLabCode] = useState("");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const labs = useSelector((state) => state.labs);
  console.log(labs)

  const dispatch = useDispatch();

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validate the input fields
    if(
      !labName ||
      !labType ||
      !mainCategory ||
      !subCategory ||
      !labCode ||
      !price
    ) {
      // Show error toast and return if any field is empty
      toast.error("Please fill in all the fields", {
        position: "top-left",
      });
      return;
    } 

    const lab = {
      labName,
      labType,
      mainCategory,
      subCategory,
      labCode,
      price,
    };

    const success = await dispatch(addLabThunk(lab))
    
    if(success) {
      dispatch(fetchLabThunk())
      toast.success("Lab added successfully", {
        position: "top-left"
      })
      
      
      setLabName(""),
      setLabType(""),
      setMainCategory(""),
      setSubCategory(""),
      setLabCode("")
      setPrice("");
      
    } else {
      toast.error('Failed to add')
    }
  };
  
  
  // useEffect(() => {
  //   dispatch(fetchLabThunk());
  // }, [dispatch]);

  return (
    <>
   
   <div style={{}}>
        <div className={HeadStyles.searchContainer}>
          <h3
            style={{
              lineHeight: "0.1",
              letterSpacing: "2px",
              fontFamily: "fantasy",
              color: "white"
            }}
          >
            Laboratory Inventory
          </h3>
        
        <div className={Home.searchbar}>
            <FaSearch style={{color: "#46AB6A"}} />
            <input
              type="text"
              className={Home.inputBar}
              value={searchTerm}
              placeholder="Search drug....."
              name="search"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
        </div>
      <section className={Home.formContent}>
        <div>
          {/* <SearchBar setResults= {setResults} />
       <SearchResultList  results={results}/> */}
        </div>

        <div className={Home.formdetails}>
          <form  onSubmit={handleSubmit} className={Home.pharmform}>
            <div className={Home.formgroup}>
              <label htmlFor="LabName" style={{}}>
                Lab item name
              </label>
              <input
                type="text"
                className={Home.inputText}
                placeholder="Lab item name"
                id="labName"
                name="labName"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
              />
            </div>

            <div className={Home.formgroup}>
              <label htmlFor="labType">Lab Type</label>
             
              <select
                className={Home.inputText}
                name="labType"
                id="labType"
                value={labType}
                onChange={(e) => setLabType(e.target.value)}
              >
                <option value="radiology">Radiology</option>
                <option value="laboratory">Laboratory</option>
              </select>
            </div>

            <div className={Home.formgroup}>
              <label htmlFor="mainCategory">Main category</label>
      
              <select
              className= {Home.inputText}
                name="mainCategory"
                id="maincategory"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="x-ray">X-Ray</option>
                <option value="ct-scan">CT-Scan</option>
                <option value="Blood-count">Full blood count</option>
              </select>
            </div>

            <div className={Home.formgroup}>
              <label htmlFor="subCategory">Sub Category</label>

              <input
                type="text"
                className={Home.inputText}
                placeholder="Sub category"
                id="subcategory"
                value={subCategory}
                name="subCategory"
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            <div className={Home.formgroup}>
              <label htmlFor="labCode">Lab item code</label>
              <input
                type="text"
                className={Home.inputText}
                placeholder="Item code"
                id="price"
                value={labCode}
                name="labcode"
                onChange={(e) => setLabCode(e.target.value)}
              />
            </div>

         

            <div className={Home.formgroup}>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className={Home.inputText}
                placeholder="Price"
                id="price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={Home.btn}>
              <button
              // type="submit"
              // disabled={
              //   !drugName ||
              //   !description ||
              //   !drugCode ||
              //   !unitofPrice ||
              //   !price
              // }
              // style={
              //   !drugName ||
              //   !description ||
              //   !drugCode ||
              //   !unitofPrice ||
              //   !price
              //     ? { cursor: "not-allowed" }
              //     : { cursor: "pointer" }
              // }
              >
                Add
              </button>
            </div>
          </form>

          <div className={Home.graphContent}>
            <Chart />
          </div>
        </div>
      </section>

      <LabList labs={labs} />
    </>
  );
}

export default LabHome;
