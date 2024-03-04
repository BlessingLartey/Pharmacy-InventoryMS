import mongoose, { model } from "mongoose";
import LabModel from "../model/labModel.js";
// adding a drug
export const addLab = async (req, res) => {
  try {
    const { labName, labType, mainCategory, subCategory, labCode, price } =
      req.body;

    const lab = new LabModel({
      labName,
      labType,
      mainCategory,
      subCategory,
      labCode,
      price,
    });

    const savedLab = await lab.save();
    if (savedLab) {
      return res.status(200).json({
        status: "success",
        lab: savedLab,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "error",
      message:
        "Please ensure that you input the accurate information in the required fields",
    });
  }
};

// fetching all labs
export const fetchLabs = async (req, res) => {
  try {
    const labs = await LabModel.find();
    res.status(200).send(labs);
  } catch (error) {
    console.log(error);
  }
};

// fetching a single lab
export const fetchLab = async (req, res) => {
  const { id } = req.params;
  //  console.log(_id)
  try {
    const lab = await LabModel.findById(id);

    if (!lab) {
      return res.status(404).send({ message: "Lab not found" });
    }

    res.status(200).send({ status: "success", lab });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// updating a lab
export const updateLab = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLab = await LabModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedLab) {
      return res.status(201).send(updatedLab).json({
        message: "Lab updated successfully",
        lab: updatedLab,
      })
    }
  } catch (error) {
    console.log(error);
  }
};

// deleting a lab
export const deleteLab = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLab = await LabModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Lab deleted successfully" });
  } catch (error) {
    console.log(error);
    
  }
};

// fetching UnitOfPrice
// export const getUnitOfPrice = async (req, res) => {
//   try {
//  // use aggregate pipeline to group and count
//   const unitofPriceCount =  await DrugModel.aggregate([

//     {
//       $group: {
//         _id: "$unitofPrice",
//         count: {$sum: 1},
//       }
//     }
//   ]);
// console.log(unitofPriceCount)
//   // error handling
//   if (!unitofPriceCount || unitofPriceCount.length === 0) {
//      return res.status(404).json({message: 'Unit of pricing not found'})
//   }

//   // transform result into key-value pair
//   const unitofPriceAcc = unitofPriceCount.reduce(
//     (acc, {_id, count}) => {
//       acc[_id] = count;
//       return acc;
//     },
//   {}

//     );

//     return res.status(200).json(unitofPriceAcc)
//     console.log(unitofPriceAcc)
//   } catch (error) {
//     console.log(error)
//   }
// }
