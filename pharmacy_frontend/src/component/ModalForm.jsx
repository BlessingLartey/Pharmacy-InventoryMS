import React from "react";
import { useSelector } from "react-redux";
import ModalStyles from "../AllStyles/ModalStyles.module.css";
import { useState } from "react";
import  Modal  from 'react-modal'

function UpdateDrug({open}) {
  // const [modalOpen, setModalOpen] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  // const [drugName, setDrugName] = useState(drugName);
  // console.log(drugName)
  // const [description, setDescription] = useState(description);
  // const [drugCode, setDrugCode] = useState(drugCode);
  // const [unitofPrice, setUnitofPrice] = useState(unitofPrice);
  // const [price, setPrice] = useState(price);

  // const { drugs } = useSelector((state) => state.drugs);
  // const existingDrug = drugs.filter((d => d.id === id));
  // const {drugName, description, drugCode, unitofPrice, price} = existingDrug[0]

  return (
    // <fieldset>
    //   <legend>Edit Drug</legend>
    <Modal
      className={ModalStyles.formContent}
      isOpen={open}
      onRequestClose={() => setModalOpen(false)}
    >
      
      <form
        // onSubmit={handleSubmit}
        className={ModalStyles.modalForm}
      >
        <div className={ModalStyles.formgroup}>
          <label htmlFor="drugName">Drug Name</label>
          <input
            type="text"
            placeholder="Type Drug Name"
            id="drugname"
            name="drugname"
            // value={drugName}
            // onChange={(e) => setDrugName(e.target.value)}
          />
        </div>

        <div className={ModalStyles.formgroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Drug description"
            // value={description}
            name="description"
            id="description"
            // onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={ModalStyles.formgroup}>
          <label htmlFor="drugCode">Drug Code</label>
          <input
            type="text"
            placeholder="A0c123FH"
            id="drugCode"
            // value={drugCode}
            name="drugCode"
            // onChange={(e) => setDrugCode(e.target.value)}
          />
        </div>

        <div className={ModalStyles.formgroup}>
          <label htmlFor="unitofPrice">Unit of Pricing</label>
          <input
            type="text"
            placeholder="Tablet"
            id="unitofPrice"
            // value={unitofPrice}
            name="unitofPrice"
            // onChange={(e) => setUnitofPrice(e.target.value)}
          />
        </div>


        <div className={ModalStyles.formgroup}>
          <label htmlFor="price">Price</label>
          <input
          className = {ModalStyles.price}
            type="text"
            placeholder="2.02"
            id="price"
            // className={ModalStyles.labelInput}
            // value={price}
            name="price"
            // onChange={(e) => setPrice(e.target.value)}
            
          />
          <div className={ModalStyles.btn}>
            <button>Update</button>
          </div>
        </div>
        <div className={ModalStyles.buttons}>
          
          <button
            onClick={() => setModalOpen(false)}
            className={ModalStyles.close}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>

    // </fieldset>
  );
}

export default UpdateDrug;
