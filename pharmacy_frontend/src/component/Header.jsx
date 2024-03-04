import React, { useState } from "react";
import HeadStyles from "../AllStyles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
// import FormList from "../page/FormList";
import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchMedications({ searchTerm }));
  };

  const drugs = useSelector((state) => state.drugs.drugs);
  console.log(drugs.filter(drug => drug.drugName.toUpperCase().includes));
  
  return (
    <>
     


    </>
  );
}

export default Header;
