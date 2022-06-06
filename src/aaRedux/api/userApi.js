import axiosClient from "./axiosClient";


// call apis
const userApi = {

  login: (username, password) => {
    const data = JSON.stringify({
      username: username,
      password: password,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      data
    );
  },
  
  register:(
    fullName, 
    username, 
    email, 
    phoneNumber, 
    password, 
    confirmPassword
  ) => {
    const data = JSON.stringify({
      FullName: fullName,
      Username: username,
      Email: email,
      PhoneNumber: phoneNumber,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/register`,
      data
    )
  },

  getUserByToken: () => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/user/getUserByToken`
    );
  },

  getUserById: (userId) => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/user/getUserById?userId=${userId}`
    );
  }
  
}

export default userApi;
