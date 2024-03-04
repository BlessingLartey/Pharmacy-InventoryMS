import mongoose, { Schema } from "mongoose";

const labSchema = new Schema({
  labName: {
    type: String,
    required: [true, 'Lab name is required'],
  
  },

  labType: {
    type: String,
    required: [true, 'Lab type is required']
  },

  mainCategory: {
    type: String,
    required: [true, 'Main category is required'],
  },

  subCategory: {
    type: String,
    required: [true, 'Sub Category is required']
  
  },

  labCode: {
    type: String,
    required: [true, 'Lab code is required']
     
  },


  price: {
    type: Number,
    required: [true, 'Price is required']
  },
}, {timestamps: true});

const lab = mongoose.model("lab", labSchema);
export default lab;
