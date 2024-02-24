import mongoose, { Schema } from "mongoose";
import isValidMedicine from "../validateMedicine.js";

const labSchema = new Schema({
  drugName: {
    type: String,
    required: [true, 'Drug name is required'],
    // validate: {
    //   validator: function (value) {
    //     return  isValidMedicine(value).then(isValid => isValid);
    //   },
    //   message: "Invalid medicine name. Please check the NHIS medicine list,",
    // },
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  drugCode: {
    type: String,
    required: [true, 'Drug code is required']
    // validate: {
    //   validator: function (value) {
    //     return  isValidMedicine(value);
    //   },
    //   message: "Invalid medicine code. Please check the NHIS medicine list.",
    // },
  },

  unitofPrice: {
    type: String,
    required: [true, 'Unit of price is required']
  },


  price: {
    type: Number,
    required: [true, 'Price is required']
  },
}, {timestamps: true});

const drug = mongoose.model("lab", labSchema);
export default drug;
