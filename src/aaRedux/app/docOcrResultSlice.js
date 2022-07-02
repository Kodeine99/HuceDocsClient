import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docOcrResultApi from "../api/docOcrResultApi";

export const createDocOcr = createAsyncThunk(
  "docOcrResult/create",
  async (data) => {
     const docType = data?.HUCEDOCS_TYPE;
    // console.log("data", data)
    console.log("type", docType)
    return await docOcrResultApi.create(data, docType);
  }
)

export const updateDocOcr = createAsyncThunk(
  "docOcrResult/update",
  async (data) => {
    return await docOcrResultApi.update(data);
  }
)

export const userGetAll = createAsyncThunk(
  "docOcrResult/userGetAll",
  async (values) => {
    // console.log("reqBody", values?.payload);
    // console.log("docType", values?.docType);
    return await docOcrResultApi.userGetAll(values.payload, values.docType)
  }
)

export const adminGetAll = createAsyncThunk(
  "docOcrResult/adminGetAll",
  async (values) => {
    // console.log("reqBody", values?.payload);
    // console.log("docType", values?.docType);
    return await docOcrResultApi.adminGetAll(values.payload, values.docType)
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
