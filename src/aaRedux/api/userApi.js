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
  },

  updateUserInfo: (
    fullName,
    userName,
    email,
    phoneNumber,
    age,
    address,
    birthday,
    gender,
  ) => {
    const data = JSON.stringify({
      username: userName,
      fullname: fullName,
      email: email,
      phoneNumber: phoneNumber,
      age: age,
      address: address,
      gender: gender,
      birthday: birthday,
    });
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/user/update`,
      data
    );
  },

  getAllUsers: (
    FullName,
    UserName,
    PhoneNumber,
    Active
  ) => {
    const reqBody = JSON.stringify({
    
      fullName: FullName,
      username: UserName,
      phoneNumber: PhoneNumber,
      active: Active,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/getallusers`,
      reqBody
    );
  },

  updateMemberActive: (isActive, memberId) => {
    const reqBody = JSON.stringify({
      isActive: isActive,
    });
    console.log("reqBody", reqBody);
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/user/adminactive/${memberId}`,
      reqBody
    );
  },

  changePassword: (params) => {
    const { CurrentPassword, NewPassword, ConfirmNewPassword } = params;
    const reqBody = JSON.stringify({
      CurrentPassword: CurrentPassword,
      NewPassword: NewPassword,
      ConfirmNewPassword: ConfirmNewPassword,
    });
    console.log(reqBody);
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/change-password`,
      reqBody
    );
  },
}



export default userApi;
