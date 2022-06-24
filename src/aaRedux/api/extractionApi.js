import axiosFormClient from "./axiosFormClient";

const extractionApi = {
  // extraction: (userId, extractType, files) => {
  //   console.log("ectractType", extractType)
  //   const dataFormBody = new FormData();

  //   dataFormBody.append("UserId", userId)
  //   dataFormBody.append("ExtractType", extractType)
  //   if (typeof(files) !== "undefined" && files?.length > 0) 
  //   files.forEach(file => {
  //     dataFormBody.append("file", file)
  //   })

  //   // console.log(dataFormBody);

  //   return axiosFormClient.post(
  //     `${process.env.REACT_APP_API_URL}/Document/extraction`,
  //     dataFormBody
  //   )
  // }


  extraction: (extractReq) => {
    console.log("extractReq", extractReq)
    // const {userId, extractType, files} = {extractReq};
    const abc = {...extractReq};

    console.log(abc)

    // console.log("exType", extractType)
    const dataFormBody = new FormData();

    dataFormBody.append("UserId", abc.userId)
    dataFormBody.append("ExtractType", abc.extractType)
    // dataFormBody.append("Files", abc.files)
    if (typeof(abc.files) !== "undefined" && abc.files.length > 0) 
    abc.files.forEach(file => {
      dataFormBody.append("Files", file)
    })

    console.log("dataform",dataFormBody);

    return axiosFormClient.post(
      `${process.env.REACT_APP_API_URL}/Document/extraction`,
      dataFormBody
    )
  }
}

export default extractionApi;