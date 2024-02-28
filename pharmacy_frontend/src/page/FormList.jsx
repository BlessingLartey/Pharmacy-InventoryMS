import React, { useEffect, useState } from "react";
import Formlist from "../AllStyles/Formlist.module.css";
import { drugData } from "../db.js";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import UpdateDrug from "../component/ModalForm.jsx";
import {
  deleteDrugThunk,
  fetchDrugThunk,
  fetchSingleDrug,
  updateDrugThunk,
} from "../store/features/drugs/drugSlice.js";
import { toast } from "react-toastify";
import HeadStyles from "../AllStyles/Header.module.css";
import ViewModal from "../component/ViewModal.jsx";
import ModalStyles from "../AllStyles/ModalStyles.module.css";



function FormList() {
  // viewmodal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [viewedDrug, setViewedDrug] = useState(null);

  const [drugsId, setDrugsId] = useState("");

  // modal form
  const [modalClose, setModalClose] = useState(false);
  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [unitofPrice, setUnitofPrice] = useState("");
  const [price, setPrice] = useState("");
  const [confirmDeleteDrug, setConfirmDeleteDrug] = useState(null);


  const dispatch = useDispatch();

  const drugs = useSelector((state) => state.drugs.drugs);

  // const handleDelete = (drugId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete");

  //   if (confirmDelete) {
  //     dispatch(deleteDrugThunk(drugId));
  //     dispatch(fetchDrugThunk());
  //     toast.success("Deleted successfully");
  //   } else {
  //     toast.error("Drug not deleted");
  //   }
  // };

  const handleDeleteConfirmation = (drugId) => {
    dispatch(deleteDrugThunk(drugId));
    dispatch(fetchDrugThunk());
    setConfirmDeleteDrug(null);
    toast.success("Deleted successfully");
  };

  const handleDelete = (drugId) => {
    // Set the drug to delete confirmation
    setConfirmDeleteDrug(drugId);
  };

  // updating drug
  const updating = (id) => {
    setModalOpen(true);
    const drug = drugs.find((item) => item._id === id);
    setDrugName(drug.drugName);
    setDrugCode(drug.drugCode);
    setDescription(drug.description);
    setPrice(drug.price);
    setUnitofPrice(drug.unitofPrice);

    setDrugsId(drug._id);
  };

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
      price,
    };

    if (handleUpdate) {
      dispatch(updateDrugThunk(updatedDrug));
      toast.success("Drug updated successful");
    } else {
      return toast.error("Drug not updated");
    }

    // clear form fields after update
    setDrugName(""),
      setDescription(""),
      setDrugCode(""),
      setUnitofPrice(""),
      setPrice("");
    setModalOpen(false);
  }

  //viewDrug function
  const viewDrug = (id) => {
    const drug = drugs.find((data) => data._id === id);
    setViewedDrug(drug);
    setModalView(true);
  };

  return (
    <>
      <div className={Formlist.formContainer}>
      
        {/* <h2 style={{ padding: "0.5rem 2.5rem" }}>Drug List</h2> */}
        <div className="">

          <table className="">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Description</th>
                <th>Drug Code</th>
                <th>Unit of Pricing</th>
                <th>Price</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug._id}>
                  <td style={{ textAlign: "justify" }}>{drug.drugName}</td>
                  <td className="desc">{drug.description}</td>
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

                    <button onClick={() => viewDrug(drug._id)}>View</button>
                    <button onClick={() => updating(drug._id)}>Update</button>

                    <button onClick={() => handleDelete(drug._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={confirmDeleteDrug !== null}
          onRequestClose={() => setConfirmDeleteDrug(null)}
          className="confirmation-modal"
        >
          <div className="confirmation-content">
            <p className="delete-message">
              Are you sure you want to delete this drug?
            </p>
            <div className="confirmation-buttons">
              <button
                onClick={() => handleDeleteConfirmation(confirmDeleteDrug)}
              >
                Yes
              </button>
              <button onClick={() => setConfirmDeleteDrug(null)}>No</button>
            </div>

            <style jsx="true">
              {`
                .confirmation-modal {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 300px;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                }

                .confirmation-content {
                  text-align: center;
                }

                .confirmation-buttons {
                  margin-top: 20px;
                }

                .confirmation-buttons button {
                  margin: 0 10px;
                  padding: 8px 16px;
                  background-color: #46ab6a;
                  color: #fff;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                }

                .confirmation-buttons button:hover {
                  background-color: #398255;
                }
              `}
            </style>
          </div>
        </Modal>

        {/* <ViewModal open={modalView} onClose={() => setModalView(false)} /> */}
        {/* View modal */}
        <UpdateDrug open={modalView} className="view">
          <h2
            style={{
              color: "#151515",
              fontSize: "1.5rem",
              width: "100%",
              textAlign: "center",
              margin: "0",
              padding: "1rem",
              fontFamily: "fantasy",
            }}
          >
            View Drug Details
          </h2>
          <div className="viewContent">
            <div>
              <span>Drug Name:</span>
              {viewedDrug?.drugName}
            </div>
            <div className="textDes">
              <span>Description:</span> {viewedDrug?.description}
            </div>
            <div>
              <span>Drug Code: </span>
              {viewedDrug?.drugCode}
            </div>
            <div>
              <span>Unit of Pricing:</span> {viewedDrug?.unitofPrice}
            </div>
            <div>
              <span>Price: </span>
              {viewedDrug?.price}
            </div>

            <div className="btnClose">
              <button onClick={() => setModalView(false)}>Close</button>
            </div>

            <style jsx="true">
              {`

             h2Text: {
              
             }

             .viewContent  {
              text-align: justify;
              display:flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.8rem;
              
             } 

             .textDes {
              width: 20%
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis
             }

             .btnClose button {
              width: 50%;
              padding: 0.5rem;
              border: none;
              background-color: #46AB6A;
              border-radius: 3px;
              color: white
              
            }
            
            .btnClose {
              text-align: center;
              padding-top: 0.7rem

            }



           span {
            color: #151515;
            font-weight: 800
           }
            
            .view {
              heigth: 20%
             width: 40%;
             margin: 0;
             padding: 1rem
            
            }


             
             `}
            </style>
          </div>
        </UpdateDrug>

        {/* update modal */}
        <UpdateDrug open={modalOpen}>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontFamily: "fantasy",
              color: "#151515",
              margin: "0",
              marginBottom: "0.5rem"
            }}
          >
            Update drug
          </p>
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
              <button
                onClick={() => setModalOpen(false)}
                className={ModalStyles.close}
              >
                Close
              </button>
              <div className={ModalStyles.btn}>
                <button onClick={() => handleUpdate(drugsId)}>Update</button>
              </div>

            </div>
          </div>
        </UpdateDrug>
      </div>
    </>
  );
}

export default FormList;
