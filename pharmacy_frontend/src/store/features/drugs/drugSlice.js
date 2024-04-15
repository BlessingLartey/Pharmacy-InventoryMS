import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  drugs: [],
  unitofPrice: [],
  loading: false,
  error: null,
};

// Create a new drug
export const addDrugThunk = createAsyncThunk("drugs/addDrug", async (drug) => {
  try {
    const result = await fetch("http://localhost:8000/api/drugs", {
      method: "POST",
      body: JSON.stringify(drug),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Fetch single drug
export const fetchSingleDrug = createAsyncThunk(
  "drug/singleDrug",
  async (id) => {
    try {
      const request = await fetch(`http://localhost:8000/api/drugs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Update a drug
export const updateDrugThunk = createAsyncThunk(
  "drugs/updateDrug",
  async (drug, { getState }) => {
    try {
      const update = await fetch(
        `http://localhost:8000/api/drugs/${drug.drugsId}`,
        {
          method: "PUT",
          body: JSON.stringify(drug),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedDrug = await update.json();
      return { success: true, data: updatedDrug };
    } catch (error) {
      console.error("Update failed", error);
      return { success: false, error };
    }
  }
);

// Fetch all drugs
export const fetchDrugThunk = createAsyncThunk("drugs/fetchDrug", async () => {
  try {
    const result = await fetch("http://localhost:8000/api/drugs");
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Delete a drug
export const deleteDrugThunk = createAsyncThunk(
  "drugs/deleteDrug",
  async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/drugs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("deleted drug", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Fetching the unit of price
export const fetchUnitPriceThunk = createAsyncThunk(
  "drugs/unitOfPrice",
  async (units, thunkAPI) => {
    try {
      const unitPrice = await fetch(
        "http://localhost:8000/api/drugs/unit-of-price"
      );
      const result = await unitPrice.json(units);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const drugSlice = createSlice({
  name: "drug",
  initialState,
  reducers: {
    addDrug: (state, action) => {
      state.drugs.push(action.payload);
    },
    updatedDrug: (state, action) => {
      state.drugs = (state.drugs ?? []).map((drug) => {
        drug._id === action.payload.id ? action.payload.data : drug;
      });
    },
    deleteDrug: (state, action) => {
      state.drugs = state.drugs.filter((drug) => drug._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDrugThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addDrugThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drugs.push(action.payload);
      })
      .addCase(addDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDrugThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDrugThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.drugs = action.payload;
      })
      .addCase(fetchDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUnitPriceThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUnitPriceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.unitofPrice = action.payload;
      })
      .addCase(fetchUnitPriceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDrugThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateDrugThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.drugs = state.drugs.map((drug) =>
            drug._id === action.payload.data._id ? action.payload.data : drug
          );
        }
      })
      .addCase(updateDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.error.message;
        console.error("Update failed:", action.payload.error);
      })
      .addCase(deleteDrugThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteDrugThunk.fulfilled, (state, action) => {
        console.log("fulfilled action", action);
        state.loading = false;
        state.drugs = state.drugs.filter(
          (drug) => drug._id !== action.payload.id
        );
      })
      .addCase(deleteDrugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addDrug, updatedDrug, deleteDrug, unitofPrice } =
  drugSlice.actions;

export default drugSlice.reducer;
