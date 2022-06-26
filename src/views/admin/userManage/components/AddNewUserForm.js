import React, { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Button, FormControl, Grid, SimpleGrid } from "@chakra-ui/react";
import InputWithHide from "components/shared/inputField/InputFieldWithHide";
import { toast, ToastContainer } from "react-toastify";
import { userSelector } from "aaRedux/app/userSlice";
import { changePassword } from "aaRedux/app/userSlice";
import { clearState } from "aaRedux/app/userSlice";
import { position } from "stylis";
import InputField from "components/shared/custom/fields/InputField";
import LoginInput from "components/shared/inputField/InputField";

function AddNewUserForm(props) {
  const [cookies, setCookies, removeCookie] = useCookies();
  const history = useHistory();
  const { loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const initialValues = {
    Fullname: "",
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Address: "",
    PhoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    Fullname: Yup.string().required("Fullname is require."),
    Username: Yup.string().required("Username is require."),
    Email: Yup.string().required("Email is require."),
    Password: Yup.string().required("Password is require."),
    ConfirmPassword: Yup.string().required("ConfirmPassword is require."),
    Address: Yup.string().required("Address is require."),
    PhoneNumber: Yup.string().required("PhoneNumber is require."),
  });
  const logOut = () => {
    removeCookie("access_token");
    // history.push({
    //   pathname: "/auth",
    //   state: {
    //     message: "Password has been changed, please login again!",
    //   },
    // });
  };
  const handleSubmit = async (values) => {
    console.log("Adding...");
    // console.log(values);
    // const actionResult = await dispatch(await changePassword(values));
    // console.log(actionResult);
    // const changeResult = await unwrapResult(actionResult);
    // console.log(changeResult);
    // (await changeResult) &&
    //   changeResult.isOk === true &&
    //   toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại", {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    // changeResult && changeResult.isOk === true && (await logOut());
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
    }
    if (isError) {
      // toast.error(errorMessage);
      console.log("Error", errorMessage);
      console.log("typeOf:", typeof errorMessage);
      // typeof(errorMessage) !== 'undefined' && typeof(errorMessage) !== 'string' && errorMessage.length > 0 ?
      // toast.error(errorMessage[0], {position: toast.POSITION.TOP_CENTER}) :
      // errorMessage && toast.error(errorMessage, {position: toast.POSITION.TOP_CENTER});

      if (typeof errorMessage === "string") {
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error(errorMessage[0], { position: toast.POSITION.TOP_CENTER });
      }
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);
  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form className="d-flex flex-column">
              <SimpleGrid columns={1} gap="10px">
                <FormControl>
                  <FastField
                    component={LoginInput}
                    label={"Fullname"}
                    name={"Fullname"}
                    type={"text"}
                    placeholder={"Fullname"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("Fullname")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  <FastField
                    component={LoginInput}
                    label={"Username"}
                    name={"Username"}
                    type={"text"}
                    placeholder={"Username"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("Username")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  <FastField
                    component={LoginInput}
                    label={"Email"}
                    name={"Email"}
                    type={"email"}
                    placeholder={"Email"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("Email")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  
                  {/* <FastField
                    component={InputWithHide}
                    label={"Confirm password"}
                    name={"ConfirmPassword"}
                    type={"password"}
                    placeholder={"Confirm password"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("ConfirmPassword")}
                    // {...formikProps.getFieldProps("Username")}
                  /> */}
                  <FastField
                    component={LoginInput}
                    label={"Address"}
                    name={"Address"}
                    type={"text"}
                    placeholder={"Address"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("Address")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  <FastField
                    component={LoginInput}
                    label={"PhoneNumber"}
                    name={"PhoneNumber"}
                    type={"text"}
                    placeholder={"PhoneNumber"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("PhoneNumber")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  <FastField
                    component={InputWithHide}
                    label={"Password"}
                    name={"Password"}
                    type={"password"}
                    placeholder={"Password"}
                    //defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps("Password")}
                    // {...formikProps.getFieldProps("Username")}
                  />
                </FormControl>
              </SimpleGrid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default AddNewUserForm;
