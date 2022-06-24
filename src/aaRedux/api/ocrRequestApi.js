import axiosClient from "./axiosClient";

const ocrRequestApi = {

  adminGetAll: (
    ticket_Id, 
    documentId, 
    userId, 
    fromDate, 
    toDate, 
    ocR_Status_Code 
    ) => {
      const reqBody = JSON.stringify({
        ticket_Id: ticket_Id,
        documentId: documentId,
        userId: userId,
        fromDate: fromDate,
        toDate: toDate,
        ocR_Status_Code: ocR_Status_Code
      })
      return axiosClient.post(`${process.env.REACT_APP_API_URL}/OCR_Request/getall`,
      reqBody
      )
  },

  userGetAll: (
    ticket_Id, 
    documentId, 
    userId, 
    fromDate, 
    toDate, 
    ocR_Status_Code 
    ) => {
      const reqBody = JSON.stringify({
        ticket_Id: ticket_Id,
        documentId: documentId,
        userId: userId,
        fromDate: fromDate,
        toDate: toDate,
        ocR_Status_Code: ocR_Status_Code
      })
      return axiosClient.post(`${process.env.REACT_APP_API_URL}/OCR_Request/usergetall`,
      reqBody
      )
  },
}

export default ocrRequestApi;