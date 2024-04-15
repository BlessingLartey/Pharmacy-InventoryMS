import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalStyles from "../AllStyles/ModalStyles.module.css";
import Modal from "react-modal";

import { useNavigate, useParams } from "react-router-dom";

function UpdateDrug({ open, drugId, children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Modal
        className={ModalStyles.formContent}
        isOpen={open}
        // onRequestClose={() => setModalOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
}

export default UpdateDrug;
