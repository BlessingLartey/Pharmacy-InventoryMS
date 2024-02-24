import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useSelector,  useDispatch } from "react-redux";
import { fetchDrugThunk } from "../store/features/drugs/drugSlice";



function ViewModal({view}) {
  const [modalView, setModalView] = useState(false)
  const drugs = useSelector((state) => state.drugs.drugs)
  console.log(drugs)

  const dispatch = useDispatch();
  
//   useEffect(() => {

//     dispatch(fetchDrugThunk())
//   })

  return (
    <Modal
    isOpen={view}
    onRequestClose={() => setModalView(false)}
  >
      <div>
   {drugs.map((drug) => (
        <ul key={drug._id}>
            <li>{drug.drugName}</li>
            <li>{drug.description}</li>
            <li>{drug.drugCode}</li>
            <li>{drug.unitofPrice}</li>
            <li>{drug.price}</li>
        </ul>

))}
</div>
<button
            onClick={() => setModalView(false)}
            // className={ModalStyles.close}
          >
            Close
          </button>
  
  </Modal>
  )
}

export default ViewModal;