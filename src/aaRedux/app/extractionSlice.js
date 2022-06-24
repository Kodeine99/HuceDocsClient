import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import extractionApi from "aaRedux/api/extractionApi";

export const extraction = createAsyncThunk(
  "document/ectraction",
  // async (userId, extractType, files) => {
  //   const response = await extractionApi.extraction(
  //     userId,
  //     extractType,
  //     files
  //   )

  //   console.log("extract Response",extractType)
  //   return response;
  // }

  //
  async (extractReq) => {
    // const {userId, extractType, files} = {extractReq}
    const response = await extractionApi.extraction(
      extractReq
    )

    console.log(extractReq)
    // console.log("extract Response",extractType)
    return response;
  }
  
)

const extractionSlice = createSlice({
  name: "Extraction",
  initialState: {
    loading: false,
    errorrMessage:"",
  },
  reducer: {},
  extraReducers: {}
})

const {reducer: extractionReducer} = extractionSlice;
export default extractionReducer;

