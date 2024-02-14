import mongoose, { Schema } from "mongoose";
import isValidMedicine from "../validateMedicine.js";

const drugSchema = new Schema({
  drugName: {
    type: String,
    required: true,
    // validate: {
    //   validator: async function (value) {
    //     return await isValidMedicine(value);
    //   },
    //   message: "Invalid medicine name. Please check the NHIS medicine list,",
    // },
  },

  description: {
    type: String,
    required: true,
  },

  drugCode: {
    type: String,
    required: true,
    // validate: {
    //   validator: async function (value) {
    //     return await isValidMedicine(value);
    //   },
    //   message: "Invalid medicine code. Please check the NHIS medicine list.",
    // },
  },

  unitofPrice: {
    type: String,
    required: true,
  },


  price: {
    type: Number,
    required: true
  },
});

const drug = mongoose.model("drug", drugSchema);
export default drug;
