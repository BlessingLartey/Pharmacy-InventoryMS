import mongoose, { model } from "mongoose";
import DrugModel  from '../model/drugModel.js'

// adding a drug
 export const addDrug =  async (req, res) => {
    try {
        
     const {drugName, description, drugCode, unitofPrice, price} = req.body;
     
       const drug = new DrugModel({
         drugName,
         description,
         drugCode,
         unitofPrice,
         price
       })
    
       const response = await drug.save();
       if(response) {
        res.status(201).send(response)
       }
    } catch (error) {
        console.log(error)
    }
 }
 // fetching all drugs
export  const fetchDrugs = async (req, res) => {
    try {
        const drugs = await DrugModel.find();
        res.status(200).send(drugs);
        
    } catch (error) {
      console.log(error)  
    }
}

// fetching a single drug
export const fetchDrug = async (req, res) => {
    const {id} = req.params;

    try {
      const drug = await DrugModel.findById(id);
       res.status(201).send({
        status: 'success',
        drug
       })
    } catch (error) {
        console.log(error)
    }
}

// updating a drug
export const updateDrug = async (req, res) => {
    const {id} = req.params;

    try {
      const updatedDrug = await DrugModel.findByIdAndUpdate(id, req.body, {new:true})
      if (updatedDrug) {
        res.status(201).send(updatedDrug)
      }
       
    } catch (error) {
        console.log(error)
    }
}


// deleting a drug
export const deleteDrug = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedDrug = await DrugModel.findByIdAndDelete(id);
        // res.status(200).send(`Drug with id ${id} deteted successfully`);
        res.status(200).json({message: 'Drug with id deleted successfully', id})

        // if(deleteDrug) {
        //   alert(`are you sure you want to delete drug with id ${id}`)
        // }
    } catch (error) {
        console.log(error)
        res.status(500).send(`Cannot delete drug with id ${id} or id does not exit. Please try again`)
    }
}


 