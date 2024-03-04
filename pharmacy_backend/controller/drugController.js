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
    // const {_id} = req.params;

    try {
      const drug = await DrugModel.findById(req.params.id);
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
        // res.status(400).json({message: error.message})
    }
}


// deleting a drug
export const deleteDrug = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedDrug = await DrugModel.findByIdAndDelete(id);
        // res.status(200).send(`Drug with id ${id} deteted successfully`);
        res.status(200).json({message: 'Drug deleted successfully'})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


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
//     console.log(unitofPriceAcc)
//     res.status(200).json(unitofPriceAcc)
 
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: error.message });

//   }
// }

// fetching UnitOfPrice
export const getUnitOfPrice = async (req, res) => {
  try {
    // use aggregate pipeline to group and count
    const unitofPriceCount = await DrugModel.aggregate([
      {
        $group: {
          _id: "$unitofPrice",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(unitofPriceCount);

    // error handling
    if (!unitofPriceCount || unitofPriceCount.length === 0) {
      return res.status(404).json({ message: 'Unit of pricing not found' });
    }

    // transform result into key-value pair
    const unitofPriceAcc = unitofPriceCount.reduce(
      (acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      },
      {}
    );

    console.log(unitofPriceAcc);

    res.status(200).json(unitofPriceAcc); // Move this line outside of the if statement
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



 