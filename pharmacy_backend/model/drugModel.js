import mongoose, { Schema } from "mongoose";
import isValidMedicine from "../validateMedicine.js";

const drugSchema = new Schema({
  drugName: {
    type: String,
    required: [true, 'Drug name is required'],
//     validate: {
//       validator: async function (value) {
// try {
//   const isValid = await isValidMedicine(value)
  
//   if (!isValid) {
//     throw new Error("Invalid medicine name . Please check the NHIS medicine list.");
//   }
  
// } catch (error) {
//   throw new Error("Error validating medicine name.")
// }
//       },
//     },
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  drugCode: {
    type: String,
    required: [true, 'Drug code is required'],
    uppercase: true,
    // validate: {
    //   validator: async function (value) {
    //     try {
          
    //       const isValid = await isValidMedicine(value)
    //       if (!isValid) {
    //         throw new Error("Invalid medicine code. Please check the NHIS medicine list.");
    //       }
    //     } catch (error) {
    //       throw new Error("Error validating medicine code.")
    //     }
    //   },
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



const drug = mongoose.model("drug", drugSchema);
export default drug;
