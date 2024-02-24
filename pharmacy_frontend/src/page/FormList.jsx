import React, { useEffect, useState } from "react";
import Formlist from "../AllStyles/Formlist.module.css";
import { drugData } from "../db.js";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import UpdateDrug from "../component/ModalForm.jsx";
import {
  deleteDrugThunk,
  fetchDrugThunk,
  updateDrugThunk,
} from "../store/features/drugs/drugSlice.js";
import { toast } from "react-toastify";
import HeadStyles from "../AllStyles/Header.module.css";
import ViewModal from "../component/ViewModal.jsx";
import ModalStyles from '../AllStyles/ModalStyles.module.css'

function FormList() {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [drugsId, setDrugsId] = useState("");

  // modal form
  const [modalClose, setModalClose] = useState(false);
  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [unitofPrice, setUnitofPrice] = useState("");
  const [price, setPrice] = useState("");


  const dispatch = useDispatch();

  const drugs = useSelector((state) => state.drugs.drugs);

  const handleDelete = (drugId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");

    if (confirmDelete) {
      dispatch(deleteDrugThunk(drugId));
      toast.success("Deleted successfully");
    }
  };

  const updating = (id) => {
    setModalOpen(true);
    const drug = drugs.find((item) => item._id === id)
    setDrugName(drug.drugName);
    setDrugCode(drug.drugCode);
    setDescription(drug.description);
    setPrice(drug.price);
    setUnitofPrice(drug.unitofPrice)

    setDrugsId(drug._id)
  }

  useEffect(() => {
    dispatch(fetchDrugThunk());
  }, [dispatch]);


  function handleUpdate() {
    const updatedDrug = {
      drugsId,
      drugName,
      description,
      drugCode,
      unitofPrice,
      price
  };

   dispatch(updateDrugThunk(updatedDrug));

   // clear form fields after update
   setDrugName(''),
   setDescription(''),
   setDrugCode(''),
   setUnitofPrice(''),
   setPrice('')
   setModalOpen(false)
  }

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
                  <td style={{ textAlign: "justify" }}>{drug.drugName}</td>
                  <td style={{ textAlign: "justify" }}>{drug.description}</td>
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
                    <button onClick={() => handleDelete(drug._id)}>
                      Delete
                    </button>

                

                    <button
                      onClick={() =>updating(drug._id)}
                    >
                      Update
                    </button>

                    {/* <ViewModal open={modalView}/> */}
                    <button onClick={() => setModalView(true)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateDrug open={modalOpen}>
                      <div className={ModalStyles.modalForm}>
                        <div className={ModalStyles.formgroup}>
                          <label htmlFor="drugName">Drug Name</label>
                          <input
                            type="text"
                            placeholder="Type Drug Name"
                            id="drugname"
                            name="drugname"
                            value={drugName}
                            onChange={(e) => setDrugName(e.target.value)}
                          />
                        </div>

                        <div className={ModalStyles.formgroup}>
                          <label htmlFor="description">Description</label>
                          <input
                            type="text"
                            placeholder="Drug description"
                            value={description}
                            name="description"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div className={ModalStyles.formgroup}>
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

                        <div className={ModalStyles.formgroup}>
                          <label htmlFor="unitofPrice">Unit of Pricing</label>
                          <input
                            type="text"
                            placeholder="Tablet"
                            id="unitofPrice"
                            value={unitofPrice}
                            name="unitofPrice"
                            onChange={(e) => setUnitofPrice(e.target.value)}
                          />
                        </div>

                        <div className={ModalStyles.formgroup}>
                          <label htmlFor="price">Price</label>
                          <input
                            className={ModalStyles.price}
                            type="text"
                            placeholder="2.02"
                            id="price"
                            // className={ModalStyles.labelInput}
                            value={price}
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className={ModalStyles.buttons}>
                          <div className={ModalStyles.btn}>
                            <button onClick={() => handleUpdate(drugsId)}>Update</button>
                          </div>

                          <button
                            onClick={() => setModalOpen(false)}
                            className={ModalStyles.close}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </UpdateDrug>
      </div>
    </>
  );
}

export default FormList;
