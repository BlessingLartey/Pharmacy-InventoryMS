import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchDrugThunk } from "../store/features/drugs/drugSlice";

function ViewModal({view, props}) {
  const [modalView, setModalView] = useState(false);

  const drugs = useSelector((state) => state.drugs.drugs);
  console.log(drugs);

  const dispatch = useDispatch();

  //   useEffect(() => {

  //     dispatch(fetchDrugThunk())
  //   })

  return (
    <Modal 
     isOpen={view} onRequestClose={() => setModalView(false)}
      contentLabel="View Drug Modal"
       >
{/* 
      {props.drug && (
        <div>
          <h2>View Drug Details</h2>
          <p>Drug Name: {props.drug.drugName}</p>
          <p>Description: {props.drug.description}</p>
          <p>Drug Code: {props.drug.drugCode}</p>
          <p>Unit of Pricing: {props.drug.unitofPrice}</p>
          <p>Price: {props.drug.price}</p>
          <button onClick={props.onClose}>Close</button>
        </div>
      )} */}

    </Modal>
  );
}

export default ViewModal;
