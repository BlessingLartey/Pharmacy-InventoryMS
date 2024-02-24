import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalStyles from "../AllStyles/ModalStyles.module.css";
import { useState } from "react";
import  Modal  from 'react-modal'
import { fetchDrugThunk, } from "../store/features/drugs/drugSlice";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

function UpdateDrug({open,drugId, children }) {
  const {id } = useParams()

  const {success, error, drugs }= useSelector((state) => state.drugs)
  const drug = drugs.find((item) => item._id === drugId)

  
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


  const dispatch = useDispatch()
  const navigate = useNavigate()


  // useEffect(() => {
  //   if(success) {
  //     navigate('/app')
  //     return toast.success('Updated successfully')
  //   } 
      
  //   if(error) {
  //     return toast.error('Drug is not updated')
  //   }
      
   
  //   dispatch(fetchDrugThunk())
  // }, [navigate, success, error, dispatch])


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

export default UpdateDrug;
