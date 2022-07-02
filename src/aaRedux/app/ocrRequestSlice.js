import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ocrRequestApi from "../api/ocrRequestApi";

export const adminGetAll = createAsyncThunk(
  "OCR_Request/getall",
  async ({
    ticket_Id,
    documentId,
    userId,
    fromDate,
    toDate,
    ocR_Status_Code,
  }) => {
    const response = await ocrRequestApi.adminGetAll(
      ticket_Id,
      documentId,
      userId,
      fromDate,
      toDate,
      ocR_Status_Code
    );
    // console.log(response)
    return response;
  }
);

export const userGetAll = createAsyncThunk(
  "OCR_Request/getall",
  async ({
    ticket_Id,
    documentId,
    userId,
    fromDate,
    toDate,
    ocR_Status_Code,
  }) => {
    const response = await ocrRequestApi.userGetAll(
      ticket_Id,
      documentId,
      userId,
      fromDate,
      toDate,
      ocR_Status_Code
    );
    // console.log(response)
    return response;
  }
);

export const changeSaveStatus = createAsyncThunk(
  "OCR_Request/changeSaveStatus",
  async (
    ticket_Id,
  ) => {
    const response = await ocrRequestApi.changeSaveStatus(ticket_Id);
    // console.log(response);
    return response;
  }
)




const ocrRequestSlice = createSlice({
  name: "ocrRequest",

  initialState: {
    orderResult: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {


  },
  extraReducers: {
    [adminGetAll.pending]: (state) => {
      state.loading = true;
    },
    [adminGetAll.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.error;
    },
    [adminGetAll.fulfilled]: (state, action) => {
      state.loading = false;
      // luu data vao state tren store
      state.orderResult = action.payload.result;
    },

    [userGetAll.pending]: (state) => {
      state.loading = true;
    },
    [userGetAll.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.error;
    },
    [userGetAll.fulfilled]: (state, action) => {
      state.loading = false;
      // luu data vao state tren store
      state.orderResult = action.payload.result;
    },
  },

})

const {reducer: ocrRequestReducer} = ocrRequestSlice;

export default ocrRequestReducer;