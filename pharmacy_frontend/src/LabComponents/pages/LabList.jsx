import React, { useEffect, useState } from "react";
// import { drugData } from "../db.js";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchLabThunk , updateLabThunk, deleteLabThunk} from "../../store/features/labs/labSlice.js";
import LabListStyles from "../../AllStyles/LabList.module.css";
// import UpdateDrug from "../../component/ModalForm.jsx";

import LabModal from  '../../LabComponents/LabModal.jsx'
import ModalStyles from "../../AllStyles/ModalStyles.module.css";
import Home from '../../AllStyles/Home.module.css'
import { FaSearch } from "react-icons/fa";



function LabList() {
  // viewmodal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [viewedLab, setViewedDrugLab] = useState(null);

  const [labsId, setLabsId] = useState("");

  // modal form
  const [modalClose, setModalClose] = useState(false);
  const [labName, setLabName] = useState("");
  const [labType, setLabType] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [labCode, setLabCode] = useState("");
  const [price, setPrice] = useState("");
  const [confirmDeleteLab, setConfirmDeleteLab] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLabs, setFilteredLabs] = useState([])

  Modal.setAppElement('#root'); 



  const dispatch = useDispatch();

  const labs = useSelector((state) => state.labs.labs);

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

  const handleDeleteConfirmation = (labId) => {
    dispatch(deleteLabThunk(labId));
    dispatch(fetchLabThunk());
    setConfirmDeleteLab(null);
    toast.success("Deleted successfully", {
      position: "bottom-center"
    });
  };

  const handleDelete = (labId) => {
    // Set the drug to delete confirmation
    setConfirmDeleteLab(labId);
  };

  // updating lab
  const updatingLab = (id) => {
    setModalOpen(true);
    const lab = labs.find((item) => item._id === id);
    setLabName(lab.labName);
    setLabType(lab.labType);
    setMainCategory(lab.mainCategory);
    setSubCategory(lab.subCategory);
    setLabCode(lab.labCode);
    setPrice(lab.price);
    // setUnitofPrice(drug.unitofPrice);
    setLabsId(lab._id);
  };

  useEffect(() => {
    dispatch(fetchLabThunk());
  }, [dispatch]);


  async function handleUpdate() {
    const updatedLab = {
      labsId,
      labName,
      labType,
      mainCategory,
      subCategory,
      labCode,
      price,
    };

  const success = await dispatch(updateLabThunk(updatedLab));

    // if (updateLabThunk) {
    //   toast.success("Drug updated successfully");
    // } else {
    //   toast.error("Drug not updated");
    // }


   // clear form fields after update
      // setLabName(""),
      // setLabType(""),
      // setMainCategory(""),
      // setSubCategory(""),
      // setLabCode("");
      // setPrice("");
      // setModalOpen(false)

      if (success) {
        toast.success("Lab updated successfully", {
          position: "bottom-left"
        });
        // clear form fields after update
        setLabName("");
        setLabType("");
        setMainCategory("");
        setSubCategory("");
        setLabCode("");
        setPrice("");
        setModalOpen(false);

        dispatch(fetchDrugThunk());

        
      } else {
        toast.error("Lab not updated");
      }
  }


  //viewDrug function
  const viewLab = (id) => {
    const lab = labs.find((data) => data._id === id);
    setViewedDrugLab(lab);
    setModalView(true);
  };




  const handleChange = (value) => {
    setSearchTerm(value);

    // Filter labs based on the search term
    const filtered = labs.filter(
      (lab) =>
        lab.labName.toLowerCase().includes(value.toLowerCase()) ||
        lab.labType.toLowerCase().includes(value.toLowerCase()) ||
        lab.labCode.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLabs(filtered);
  };

  const labsToDisplay = searchTerm ? filteredLabs : labs;

  return (
    <>
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
      <div className={LabListStyles.formContainer}>
        {/* <h2 style={{ padding: "0.5rem 2.5rem" }}>Drug List</h2> */}
        <div className="">
          <table className="">
            <thead>
              <tr>
                <th>Lab item name</th>
                <th>Lab Type</th>
                <th>Main category</th>
                <th>Sub Category</th>
                <th>Lab item code</th>
                <th>Price</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody >
              {labsToDisplay.map((lab) => (
                <tr key={lab._id}>
                  <td>{lab.labName}</td>
                  <td style={{ textAlign: "justify" }}>{lab.labType}</td>
                  <td className="desc">{lab.mainCategory}</td>
                  <td>{lab.subCategory}</td>
                  <td>{lab.labCode}</td>
                  <td>{lab.price}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      textAlign: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button onClick={() => viewLab(lab._id)}>View</button>
                    <button onClick={() => updatingLab(lab._id)}>Update</button>

                    <button onClick={() => handleDelete(lab._id)}>
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
          isOpen={confirmDeleteLab !== null}
          onRequestClose={() => setConfirmDeleteLab(null)}
          className="confirmation-modal"
        >
          <div className="confirmation-content">
            <p className="delete-message">
              Are you sure you want to delete this drug?
            </p>
            <div className="confirmation-buttons">
              <button
                onClick={() => handleDeleteConfirmation(confirmDeleteLab)}
              >
                Yes
              </button>
              <button onClick={() => setConfirmDeleteLab(null)}>No</button>
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

        {/* View modal */}
        <LabModal open={modalView} className="modalForm">
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
            Lab Details
          </h2>
          <div className="viewContent">
            <div className="textDes">
              <p className="text">Lab item name:</p>
              <p> {viewedLab?.labName}</p>
            </div>
            <div className="textDes">
              <p className="text">Lab type:</p>
              <p>{viewedLab?.labType}</p>
            </div>
            <div className="textDes">
              <p className="text">Main category: </p>
              <p>{viewedLab?.mainCategory}</p>
            </div>
            <div className="textDes">
              <p className="text">Sub category:</p>
              <p>{viewedLab?.subCategory}</p>
            </div>
            <div className="textDes">
              <p className="text">Lab item code: </p>
              <p> {viewedLab?.labCode}</p>
            </div>

            <div className="textDes">
              <p className="text">Price: </p>
              <p> {viewedLab?.price}</p>
            </div>

            <div className="btnClose">
              <button onClick={() => setModalView(false)}>Close</button>
            </div>

            <style jsx="true">
              {`
                .modalForm {
                  text-align: center;
                  font-family: fantasy;
                  max-width: 100px;
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
              `}
            </style>
          </div>
        </LabModal>

        {/* update modal */}
        <LabModal open={modalOpen}>
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
            Update Lab Details
          </p>
          <div className={ModalStyles.modalForm}>
            <div className={ModalStyles.formgroup}>
              <label htmlFor="labName">Lab item name</label>
              <input
                type="text"
                placeholder="Lab item name"
                id="labName"
                name="labName"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
              />
            </div>

            <div className={ModalStyles.formgroup}>
              <label htmlFor="labType">Lab type</label>
              <select
                className={Home.inputText}
                name="labType"
                id="labtype"
                value={labType}
                onChange={(e) => setLabType(e.target.value)}
              >
                <option value="radiology">Radiology</option>
                <option value="laboratory">Laboratory</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={ModalStyles.formgroup}>
              <label htmlFor="mainCategory">Main category</label>
              <select
                className={Home.inputText}
                name="mainCategory"
                id="maincategory"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="x-ray">X-Ray</option>
                <option value="ct-scan">CT-Scan</option>
                <option value="Blood-count">Full blood count</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={ModalStyles.formgroup}>
              <label htmlFor="subCategory">Sub category</label>
              <input
                type="text"
                placeholder="Tablet"
                id="subCategory"
                value={subCategory}
                name="subCategory"
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            <div className={ModalStyles.formgroup}>
              <label htmlFor="labCode">Lab item code</label>
              <input
               className={ModalStyles.price}
                type="text"
                placeholder="Item code"
                id="price"
                value={labCode}
                name="labcode"
                onChange={(e) => setLabCode(e.target.value)}
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
                <button onClick={() => handleUpdate(labsId)}>Update</button>
              </div>
            </div>
          </div>
        </LabModal>
      </div>
    </>
  );
}

export default LabList;
