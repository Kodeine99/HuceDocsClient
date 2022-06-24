import axiosClient from "./axiosClient"


const docOcrResultApi = {
  create:(data, docType) => {
    //console.log("Api url:",`${process.env.REACT_APP_API_URL}/${docType}/update`)
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/${docType}/create`,
      data
    )
  },

  update: (data, documentType) => {
      return axiosClient.post(
        `${process.env.REACT_APP_API_URL}/${documentType}/update`,
        data
      )
      
  },
}

export default docOcrResultApi;