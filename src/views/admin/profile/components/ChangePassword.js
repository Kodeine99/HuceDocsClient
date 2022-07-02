import React, { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Button, FormControl } from "@chakra-ui/react";
import InputWithHide from "components/shared/inputField/InputFieldWithHide";
import { toast, ToastContainer } from "react-toastify";
import { userSelector } from "aaRedux/app/userSlice";
import { changePassword } from "aaRedux/app/userSlice";
import { clearState } from "aaRedux/app/userSlice";
import { position } from "stylis";

function ChangePassword(props) {
  const [cookies, setCookies, removeCookie] = useCookies();
  const history = useHistory();
  const { loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const initialValues = {
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  };
  const validationSchema = Yup.object().shape({
    CurrentPassword: Yup.string().required("Current Password is require."),
    NewPassword: Yup.string().required("Password is require."),
    ConfirmNewPassword: Yup.string().required("Confirm password is require."),
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

  const successNotify = () => {
    toast.success("I cannot be duplicated!", {
      position: toast.POSITION.TOP_CENTER,
      toastId: 1,
    });
  };
  const errorNotify = (errorMessage) => {
    toast.success(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
      toastId: 2,
    });
  };
  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      const actionResult = await dispatch(await changePassword(values));
      // console.log(actionResult);
      const changeResult = await unwrapResult(actionResult);
      // console.log(changeResult);
      (await changeResult) &&
        changeResult.isOk === true &&
        toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => logOut(),
        });

      // changeResult && changeResult.isOk === true && await logOut();
    } catch (rejectWithValueOrSerializedError) {
      // toast.error(rejectWithValueOrSerializedError, {
      // position: toast.POSITION.TOP_CENTER,
      // });
      errorNotify(rejectWithValueOrSerializedError);
    }
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
      // console.log("Error", errorMessage);
      // console.log("typeOf:",typeof(errorMessage))
      // typeof(errorMessage) !== 'undefined' && typeof(errorMessage) !== 'string' && errorMessage.length > 0 ?
      // toast.error(errorMessage[0], {position: toast.POSITION.TOP_CENTER}) :
      // errorMessage && toast.error(errorMessage, {position: toast.POSITION.TOP_CENTER});

      if (typeof errorMessage === "string") {
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(errorMessage[0], { position: toast.POSITION.TOP_CENTER });
      }
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);
  return (
    <>
      {/* <ToastContainer /> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form className="d-flex flex-column">
              <FormControl>
                <FastField
                  component={InputWithHide}
                  label={"Current Password"}
                  name={"CurrentPassword"}
                  type={"password"}
                  placeholder={"Current Password"}
                  //defaultValue={"Tung Ramen"}
                  {...formikProps.getFieldProps("CurrentPassword")}
                  // {...formikProps.getFieldProps("Username")}
                />
                <FastField
                  component={InputWithHide}
                  label={"New password"}
                  name={"NewPassword"}
                  type={"password"}
                  placeholder={"New Password"}
                  //defaultValue={"Tung Ramen"}
                  {...formikProps.getFieldProps("NewPassword")}
                  // {...formikProps.getFieldProps("Username")}
                />
                <FastField
                  component={InputWithHide}
                  label={"Confirm new password"}
                  name={"ConfirmNewPassword"}
                  type={"password"}
                  placeholder={"Confirm new password"}
                  //defaultValue={"Tung Ramen"}
                  {...formikProps.getFieldProps("ConfirmNewPassword")}
                  // {...formikProps.getFieldProps("Username")}
                />
              </FormControl>

              <Button
                colorScheme={"linkedin"}
                mt={"20px"}
                variant="outline"
                type="submit"
              >
                Change password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ChangePassword;
