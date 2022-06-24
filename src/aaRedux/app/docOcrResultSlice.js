import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docOcrResultApi from "../api/docOcrResultApi";

export const createDocOcr = createAsyncThunk(
  "docOcrResult/create",
  async (data) => {
     const docType = data?.HUCEDOCS_TYPE;
    console.log("data", data)
    console.log("type", docType)
    return await docOcrResultApi.create(data, docType);
  }
)

export const updateDocOcr = createAsyncThunk(
  "docOcrResult/update",
  async (data, documentType) => {
    return await docOcrResultApi.update(data, documentType);
  }
)


const docOcrResultSlice = createSlice({
  name: "docOcrResult",
  initialState:{
    loading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [createDocOcr.pending]: (state) => {
      state.loading = true;
    },
    [createDocOcr.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.error;
    },
    [createDocOcr.fulfilled]: (state, action) => {
      state.loading = false;
      // luu data vao state tren store
      //state.orderResult = action.payload.result;
      
    },

    // Update reducer
    [updateDocOcr.pending]: (state) => {
      state.loading = true;
    },
    [updateDocOcr.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.error;
    },
    [updateDocOcr.fulfilled]: (state, action) => {
      state.loading = false;
    },
  }
})

const {actions, reducer: docOcrResultReducer} = docOcrResultSlice;
export const {clearState} = actions;
export default docOcrResultReducer;
