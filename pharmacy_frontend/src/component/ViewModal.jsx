import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

function ViewModal({ view }) {
  const [modalView, setModalView] = useState(false);

  const drugs = useSelector((state) => state.drugs.drugs);
  console.log(drugs);

  // const dispatch = useDispatch();

  return (
    <Modal
      isOpen={view}
      onRequestClose={() => setModalView(false)}
      contentLabel="View Drug Modal"
    ></Modal>
  );
}

export default ViewModal;
