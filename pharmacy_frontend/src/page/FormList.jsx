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
import HomeStyles from "../AllStyles/Home.module.css";
import { FaSearch } from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState([]);

  Modal.setAppElement("#root");

  const dispatch = useDispatch();

  const drugs = useSelector((state) => state.drugs.drugs);

  const handleDeleteConfirmation = (drugId) => {
    dispatch(deleteDrugThunk(drugId));
    dispatch(fetchDrugThunk());
    setConfirmDeleteDrug(null);
    toast.success("Deleted successfully", {
      position: "bottom-center",
    });
  };

  const handleDelete = (drugId) => {
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

  async function handleUpdate() {
    const updatedDrug = {
      drugsId,
      drugName,
      description,
      drugCode,
      unitofPrice,
      price,
    };

    const success = await dispatch(updateDrugThunk(updatedDrug));

    if (success) {
      toast.success("Drug updated successfully", {
        position: "bottom-left",
      });
      setDrugName(""),
        setDescription(""),
        setDrugCode(""),
        setUnitofPrice(""),
        setPrice("");
      setModalOpen(false);
    } else {
      toast.error("Drug not updated");
    }
  }

  //viewDrug function
  const viewDrug = (id) => {
    const drug = drugs.find((data) => data._id === id);
    setViewedDrug(drug);
    setModalView(true);
  };

  const handleChange = (value) => {
    setSearchTerm(value);

    // Filter labs based on the search term
    const filtered = drugs.filter(
      (drug) =>
        drug.drugName.toLowerCase().includes(value.toLowerCase()) ||
        drug.drugCode.toLowerCase().includes(value.toLowerCase()) ||
        drug.description.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDrugs(filtered);
  };

  const DrugsToDisplay = searchTerm ? filteredDrugs : drugs;

  return (
    <>
      <div className={Formlist.formContainer}>
        <div className={HomeStyles.searchbar}>
          <FaSearch style={{ color: "#46AB6A" }} />
          <input
            type="text"
            className={HomeStyles.inputBar}
            value={searchTerm}
            placeholder="Search drug....."
            name="search"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="">
          <table className="">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th className="ssi">Description</th>
                <th className="ssi">Drug Code</th>
                <th className="ssi">Unit of Pricing</th>
                <th>Price</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {DrugsToDisplay.map((drug) => (
                <tr key={drug._id}>
                  <td style={{ textAlign: "justify" }}>
                    <div
                      style={{
                        overflow: "hidden",
                        width: "50px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {drug.drugName}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        overflow: "hidden",
                        width: "50px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span className="ssi">{drug.description}</span>
                    </div>
                  </td>
                  <td className="ssi">{drug.drugCode}</td>
                  <td className="ssi">{drug.unitofPrice}</td>
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
                  top: 15%;
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
        <UpdateDrug open={modalView} className="modalForm">
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
            Drug Details
          </h2>
          <div className="viewContent">
            <div className="textDes">
              <p className="text">Drug Name:</p>
              <p> {viewedDrug?.drugName}</p>
            </div>
            <div className="textDes">
              <p className="text">Description:</p>{" "}
              <p>{viewedDrug?.description}</p>
            </div>
            <div className="textDes">
              <p className="text">Drug Code: </p>
              <p>{viewedDrug?.drugCode}</p>
            </div>
            <div className="textDes">
              <p className="text">Unit of Pricing:</p>
              <p>{viewedDrug?.unitofPrice}</p>
            </div>
            <div className="textDes">
              <p className="text">Price: </p>
              <p> {viewedDrug?.price}</p>
            </div>

            <div className="btnClose">
              <button onClick={() => setModalView(false)}>Close</button>
            </div>

            <style jsx="true">
              {`


                .modalForm {
                  dispaly: flex
                  text-align: center;
                  font-family: fantasy;
                  // max-width: 100px;
                  margin: 0 auto;
                }

                .viewContent {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  gap: 0.5rem;
                  font-family: fantasy;
                  width: 70%;
                  margin: auto;
                }

                .textDes {
                  display: flex;
                  flex-direction: row;
                  // justify-content: center
                }

                .btnClose button {
                  width: 50%;
                  padding: 0.7rem;
                  border: none;
                  background-color: #46ab6a;
                  border-radius: 30px;
                  color: white;
                  cursor: pointer
                }

                .btnClose {
                  text-align: center;
                  padding-top: 0.7rem;
                  margin-bottom: 1rem;
                }

                .text {
                  color: #151515;
                  font-weight: 800;
                  text-align: justify;
                  margin-right: 10px;
                }

                .view {
                  width: 40% !important;
                }

                @media (max-width: 768px) {
                  .viewContent {
                    width: 100%;
                  }
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
              marginBottom: "0.5rem",
              paddingTop: "0.5rem",
            }}
          >
            Update Drug Info
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
