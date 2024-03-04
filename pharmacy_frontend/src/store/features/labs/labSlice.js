import { updateDrug } from "../../../../../pharmacy_backend/controller/drugController.js";
import { drugData } from "../../../db.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    labs: [],
    // unitofPrice: [],
    loading : false,
    error: null,
}

// Create a new lab
export const addLabThunk = createAsyncThunk('labs/addLab', async (lab, thunkAPI) => {
    try {
      const result = await fetch("http://localhost:3000/api/labs/addlab", {
        method: 'POST',
        body:JSON.stringify(lab),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const data = await result.json()
      // console.log('adding lab....', data)
      return data
      
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)

    }
  
})

// fetch single drug
export const fetchSingleDrug = createAsyncThunk('lab/singleLab', async (id) => {
  try {
    const request = await fetch(`http://localhost:3000/api/labs/${id}`, {
      method: 'GET',
      headers : {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json()
    return data

  } catch (error) {
    console.log(error)
  }
})

// upadte a drug
export const updateLabThunk = createAsyncThunk('labs/updateLab', async (lab) => {
  console.log('arguement' ,lab)
  try {
    const update = await fetch(`http://localhost:3000/api/labs/${lab.labsId}`, {
      method: 'PUT',
      body:JSON.stringify(lab),
      headers: {
        'Content-Type': 'application/json'
      }
  })

  const updatedLab = await update.json()

  return {success: true, data: updatedLab}

  } catch (error) {
    console.error('Update failed', error)
    return { success: false, error };
  }


})

// Fetch all drugs
export const fetchLabThunk = createAsyncThunk('labs/fetchLab', async () => {
  try {
    const  result = await fetch('http://localhost:3000/api/labs');
  
    const data = await result.json()
    return data
    
  } catch (error) {
    console.log(error)
  }

})


// delete a drug
export const deleteLabThunk = createAsyncThunk('labs/deleteLab', async (id, thunkAPI) => {
  
  try {
    const response = await fetch(`http://localhost:3000/api/labs/${id}`, {
  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
    });
  
    const data = await response.json()
    // console.log('deleted lab', data)
    return data
    
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.message)

  }
})



// fetching the unit of price
// export const fetchUnitPriceThunk = createAsyncThunk('labs/unitOfPrice', async (units, thunkAPI) => {
 
//   try {
//     const unitPrice = await fetch('http://localhost:3000/api/labs/unit-of-price');

//     const result = await unitPrice.json(units);

//     return result


//   } catch (error) {
//     console.log(error)
//     return thunkAPI.rejectWithValue(error.message)
    
//   }

// })


const labSlice = createSlice({
    name: 'lab',
    initialState,
    reducers: {
       addLab: (state, action) => {
        // console.log("action", action)
         state.labs.push(action.payload)
       },
    

       updatedLab: (state, action) => {
       state.labs = state.labs.map((lab) => {
        lab.id === action.payload.id
       })

       },

      deleteLab: (state, action) => {
        state.labs = state.labs.filter((lab) => lab._id !== action.payload) 
      }
    
    
    },


extraReducers: builder => {
  builder.addCase(addLabThunk.pending, (state, action) => {
    state.loading = true
  })


  .addCase(addLabThunk.fulfilled, (state, action) => {
    state.loading = false
    state.labs.push(action.payload)
  })

  .addCase(addLabThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message
  
  })
  
  
  // fetching labdata using thunk
  .addCase(fetchLabThunk.pending, (state, action) => {
    state.loading =true

  })

  .addCase(fetchLabThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.labs = action.payload
  })

  .addCase(fetchLabThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })


  //fetching Unit of price
//   .addCase(fetchUnitPriceThunk.pending, (state, action) => {
//     state.loading =true

//   })

//   .addCase(fetchUnitPriceThunk.fulfilled, (state, action) => {
//     state.loading = false;
//     state.unitofPrice = action.payload
//   })

//   .addCase(fetchUnitPriceThunk.rejected, (state, action) => {
//     state.loading = false;
//     state.error = action.error.message;
//   })


// updating lab data using thunk
.addCase(updateLabThunk.pending, (state, action) => {
  state.loading = true
})

.addCase(updateLabThunk.fulfilled, (state, action) => {
  if (action.payload.success) {
    state.loading = false;
    state.labs = state.labs.map((lab) =>
      lab._id === action.payload.data._id ? action.payload.data : lab
    );
  }
})
.addCase(updateLabThunk.rejected, (state, action) => {
  state.loading = false;
  // state.error.error.message;
  console.error('Update failed:', action.payload.error);
})


// deleting drugdata using thunk
.addCase(deleteLabThunk.pending, (state, action) => {
  state.loading = true;

})

.addCase(deleteLabThunk.fulfilled, (state, action) => {
  console.log('fulfilled action', action);
  state.loading = false;
  state.labs = state.labs.filter((lab) => lab._id !== action.payload.id)
})

.addCase(deleteLabThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
}


})


export const {addLab, updatedLab,fetchLab, deleteLab} = labSlice.actions;
export default labSlice.reducer