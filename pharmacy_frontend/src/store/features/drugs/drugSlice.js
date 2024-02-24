import { updateDrug } from "../../../../../pharmacy_backend/controller/drugController.js";
import { drugData } from "../../../db.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    drugs: [],
    loading : false,
    error: null,
}

// Create a new drug
export const addDrugThunk = createAsyncThunk('drugs/addDrug', async (drug) => {
    try {
      const result = await fetch('http://localhost:8000/api/drugs', {
        method: 'POST',
        body:JSON.stringify(drug),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const data = await result.json()
      console.log('adding drug....', data)
      return data
      
    } catch (error) {
      console.log(error)
    }
  
})

// upadte a drug
export const updateDrugThunk = createAsyncThunk('drugs/updateDrug', async (drug) => {
  console.log('arguement' ,drug)
  try {
    const update = await fetch(`http://localhost:8000/api/drugs/${drug.drugsId}`, {
      method: 'PUT',
      body:JSON.stringify(drug),
      headers: {
        'Content-Type': 'application/json'
      }
  })

  const updatedDrug = await update.json()
  console.log('updated drug', updatedDrug )
  return updatedDrug
  } catch (error) {
    console.log(error)
  }


})

// Fetch all drugs
export const fetchDrugThunk = createAsyncThunk('drugs/fetchDrug', async () => {
  try {
    const  result = await fetch('http://localhost:8000/api/drugs', {
      method: 'GET',
      // body:JSON.stringify(drug),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await result.json()
    return data
    
  } catch (error) {
    console.log(error)
  }

})


// delete a drug
export const deleteDrugThunk = createAsyncThunk('drugs/deleteDrug', async (id) => {
  
  try {
    const response = await fetch(`http://localhost:8000/api/drugs/${id}`, {
  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
    });
  
    const data = await response.json()
    console.log('deleted drug', data)
    return data
    
  } catch (error) {
    console.log(error)
  }
})






const drugSlice = createSlice({
    name: 'drug',
    initialState,
    reducers: {
       addDrug: (state, action) => {
        // console.log("action", action)
         state.drugs.push(action.payload)
       },
    

       updatedDrug: (state, action) => {
       state.drugs = state.drugs.map((drug) => {
        drug.id === action.payload.id
       })
       },

      deleteDrug: (state, action) => {
        state.drugs = state.drugs.filter((drug) => drug._id !== action.payload) 
      }
    
    
    },


extraReducers: builder => {
  builder.addCase(addDrugThunk.pending, (state, action) => {
    state.loading = true
  })


  .addCase(addDrugThunk.fulfilled, (state, action) => {
    state.loading = false
    state.drugs.push(action.payload)
  })

  .addCase(addDrugThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message
  
  })
  
  
  // fetching drugdata using thunk
  .addCase(fetchDrugThunk.pending, (state, action) => {
    state.loading =true

  })

  .addCase(fetchDrugThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.drugs = action.payload
  })

  .addCase(fetchDrugThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })

// updating data using thunk
.addCase(updateDrugThunk.pending, (state, action) => {
  state.loading = true
})

.addCase(updateDrugThunk.fulfilled, (state, action) => {
  console.log(action);
  state.loading = false;
  state.drugs = state.drugs.map((drug) => 
    drug._id === action.payload._id ? action.payload : drug
  )

  
  // state.status = 'succeeded';
  // const index = state.drugs.findIndex((drug) => drug._id === action.payload._id);
  // if(index !== -1) {
  //   state.drugs[index] = action.payload
  // }
})

.addCase(updateDrugThunk.rejected, (state, action) => {
  state.loading = false;
  state.error.error.message;
})


// deleting drugdata using thunk
.addCase(deleteDrugThunk.pending, (state, action) => {
  state.loading = true;

})

.addCase(deleteDrugThunk.fulfilled, (state, action) => {
  console.log('fulfilled action', action);
  state.loading = false;
  state.drugs = state.drugs.filter((drug) => drug._id !== action.payload.id)
})

.addCase(deleteDrugThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
}




})

export const {addDrug, updatedDrug, deleteDrug} = drugSlice.actions;
export default drugSlice.reducer