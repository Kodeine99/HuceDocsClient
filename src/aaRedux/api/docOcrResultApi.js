import axiosClient from "./axiosClient"


const docOcrResultApi = {
  create:(data, docType) => {
    // const docType = data?.documentType
    //console.log("Api url:",`${process.env.REACT_APP_API_URL}/${docType}/update`)
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/${docType}/create`,
      data
    )
  },

  update: (data) => {
    const documentType  = data?.documentType
      return axiosClient.post(
        `${process.env.REACT_APP_API_URL}/${documentType}/update`,
        data
      )
      
  },

  userGetAll: (reqBody, documentType) => {
    const requestBody = JSON.stringify(reqBody);
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/${documentType}/search`,
      requestBody
    )
  },

  adminGetAll: (reqBody, documentType) => {
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/${documentType}/search-admin`,
      reqBody
    )
  }
}

export default docOcrResultApi;