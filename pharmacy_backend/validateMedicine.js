import nhisMedicineList from "./nhisMedicineList.js";


// validateMedicine

function isValidMedicine(drugCodeOrdrugName) {
    // Perform a case-insensitive search in the nhisMedicineList array
    const lowercaseddrugCodeOrdrugName = drugCodeOrdrugName.toLowerCase();
 
    return nhisMedicineList.some(
      (medicine) => {
        medicine.drugCode.toLowerCase() === lowercaseddrugCodeOrdrugName ||
        medicine.drugName.toLowerCase() === lowercaseddrugCodeOrdrugName
      }
  );
}

export default isValidMedicine;