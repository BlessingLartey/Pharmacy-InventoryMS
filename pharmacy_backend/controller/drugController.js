import mongoose from "mongoose";
import DrugModel from "../model/drugModel.js";

// Adding a drug
export const addDrug = async (req, res) => {
  try {
    const { drugName, description, drugCode, unitofPrice, price } = req.body;
    const drug = new DrugModel({
      drugName,
      description,
      drugCode,
      unitofPrice,
      price,
    });
    const response = await drug.save();
    if (response) {
      res.status(201).send(response);
    }
  } catch (error) {
    console.log(error);
  }
};

// Fetching all drugs
export const fetchDrugs = async (req, res) => {
  try {
    const drugs = await DrugModel.find();
    res.status(200).send(drugs);
  } catch (error) {
    console.log(error);
  }
};

// Fetching a single drug
export const fetchDrug = async (req, res) => {
  try {
    const drug = await DrugModel.findById(req.params.id);
    res.status(201).send({
      status: "success",
      drug,
    });
  } catch (error) {
    console.log(error);
  }
};

// Updating a drug
export const updateDrug = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDrug = await DrugModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedDrug) {
      res.status(201).send(updatedDrug);
    }
  } catch (error) {
    console.log(error);
  }
};

// Deleting a drug
export const deleteDrug = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDrug = await DrugModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Drug deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Fetching UnitOfPrice
export const getUnitOfPrice = async (req, res) => {
  try {
    const unitofPriceCount = await DrugModel.aggregate([
      {
        $group: {
          _id: "$unitofPrice",
          count: { $sum: 1 },
        },
      },
    ]);
    if (!unitofPriceCount || unitofPriceCount.length === 0) {
      return res.status(404).json({ message: "Unit of pricing not found" });
    }
    const unitofPriceAcc = unitofPriceCount.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});
    res.status(200).json(unitofPriceAcc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
