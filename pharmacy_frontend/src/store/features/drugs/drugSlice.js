import { drugData } from "../../../db.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    drugs: [],
    loading : false,
    error: null
}

export const addDrugThunk = createAsyncThunk('drugs/addDrug', async (drug) => {
    try {
      const result = await fetch('http://localhost:5000/api/drugs', {
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


export const fetchDrugThunk = createAsyncThunk('drugs/fetchDrug', async (drug) => {
  const  result = await fetch('http://localhost:5000/api/drugs', {
    method: 'GET',
    body:JSON.stringify(drug),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await result.json()
  console.log('adding drug...', data)
  return data

})


export const deleteDrugThunk = createAsyncThunk('drugs/deleteDrug', async (id) => {
  
  try {
    const response = await fetch(`http://localhost:5000/api/drugs/${id}`, {
  
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

export const {addDrug} = drugSlice.actions;
export default drugSlice.reducer