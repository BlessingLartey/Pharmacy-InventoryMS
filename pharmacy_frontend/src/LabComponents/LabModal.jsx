import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalStyles from "../AllStyles/ModalStyles.module.css";

import { useState } from "react";
import  Modal  from 'react-modal'
import { fetchDrugThunk, } from "../store/features/drugs/drugSlice";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

function LabModal({open,labId, children }) {
 const [modalOpen, setModalOpen] = useState('false')
  
  //  const findDrug = updatedDrug.find((drug) => {
  //    return drug._id === id
  //  })

  // const findDrug = updatedDrug.find((drug) => drug._id === id)

  //  console.log("findDrug", findDrug);

  // const [modalOpen, setModalOpen] = useState(false);

  // const { drugs } = useSelector((state) => state.drugs);
  // const existingDrug = drugs.filter((d => d.id === id));
  // const {drugName, description, drugCode, unitofPrice, price} = existingDrug[0]
  
  // const {loading, error,  } = useSelector((state) => state.drugs.drugs);





 
  return (
    <>
    <Modal
      className={ModalStyles.formContent}
      isOpen={open}
      onRequestClose={() => setModalOpen(false)}
    >
      
    {children}
    </Modal>

    </>

  );
}

export default LabModal;
