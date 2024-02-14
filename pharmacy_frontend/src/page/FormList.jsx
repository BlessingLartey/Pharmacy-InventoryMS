import React, { useEffect, useState } from "react";
import Formlist from "../AllStyles/Formlist.module.css";
import { drugData } from "../db.js";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import UpdateDrug from "../component/ModalForm.jsx";
import { deleteDrugThunk, fetchDrugThunk } from "../store/features/drugs/drugSlice.js";
import { toast } from "react-toastify";
import HeadStyles from '../AllStyles/Header.module.css'

function FormList({ drug }) {

  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const drugs = useSelector((state) => state.drugs.drugs);
  console.log("drugs...", drugs);

   

  useEffect(() => {
    
 

      dispatch(fetchDrugThunk())
  }, [dispatch]);

  return (
    <>
  
      <div className={Formlist.formContainer}>
        <h2 style={{ padding: "0.5rem 2.5rem" }}>Drug List</h2>
        <div className="">
          <table className="">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Description</th>
                <th>Drug Code</th>
                <th>Unit of Pricing</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug._id}>
                  <td>{drug.drugName}</td>
                  <td>{drug.description}</td>
                  <td>{drug.drugCode}</td>
                  <td>{drug.unitofPrice}</td>
                  <td>{drug.price}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      textAlign: "center",
                    }}
                  >
                    <button onClick={() => dispatch(deleteDrugThunk(drug._id))}>
                      Delete
                    </button>

                    <UpdateDrug open={modalOpen}/>

                    <button onClick={() => setModalOpen(true)}>Update</button>
                    <button>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormList;
