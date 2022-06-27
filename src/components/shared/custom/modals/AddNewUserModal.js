import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
} from "@chakra-ui/react";
import { userSelector } from "aaRedux/app/userSlice";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import AddNewUserForm from "views/admin/userManage/components/AddNewUserForm";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearState } from "aaRedux/app/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { FastField, Form, Formik } from "formik";
import LoginInput from "components/shared/inputField/InputField";
import InputWithHide from "components/shared/inputField/InputFieldWithHide";
import { addNewUser } from "aaRedux/app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function AddNewUserModal(props) {
  const { isOpen, onClose, data, title, modalContent, overlay, ...rest } =
    props;

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
    Address: "",
    PhoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    Fullname: Yup.string().required("Fullname is require."),
    Username: Yup.string().required("Username is require."),
    Email: Yup.string().required("Email is require."),
    Password: Yup.string().required("Password is require."),
    Address: Yup.string().required("Address is require."),
    PhoneNumber: Yup.string().required("PhoneNumber is require."),
  });

  // const reloadData = () => {
  //   props.reload(props.loadIndex + 1);
  // }

  const handleSubmit = async (values) => {
    // console.log("Adding...");
    // console.log("Submit value:",values);
    // const actionResult = await dispatch(await addNewUser(values));
    // console.log("Action Result",actionResult);
    // const addResult = await unwrapResult(actionResult);
    // console.log(addResult);
    // await addResult &&
    //   addResult.isOk === true &&
    //   toast.success("Thêm mới người dùng thành công", {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });

    try {
      //console.log("Adding...");
      //console.log("Submit value:", values);
      const actionResult = await dispatch(await addNewUser(values));
      //console.log("Action Result", actionResult);
      const addResult = await unwrapResult(actionResult);
      //console.log(addResult);
      await addResult &&
        addResult.isOk === true &&
        toast.success("Thêm mới người dùng thành công", {
          position: toast.POSITION.TOP_CENTER,
        });

    } catch (rejectWithValueOrSerializedError) {
      //console.log("error", rejectWithValueOrSerializedError);
      toast.error(rejectWithValueOrSerializedError.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // reloadData();


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
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);
  return (
    <>
      <ToastContainer />

      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        {overlay}
        <ModalContent>
          <ModalHeader>Thêm mới người dùng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <AddNewUserForm /> */}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              // onSubmit={handleSubmit}
              onSubmit={(values, actions) => {
                setTimeout(async () => {
                  await handleSubmit(values);
                  actions.setSubmitting(false);
                  onClose();
                }, 1000);
                
              }}
            >
              {(formikProps) => {
                const { values, errors, touched, isSubmitting } = formikProps;
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
                      <Button
                        loadingText="Adding..."
                        isLoading={isSubmitting}
                        spinnerPlacement="start"
                        colorScheme="whatsapp"
                        mr={"10px"}
                        mt="20px"
                        maxW="250px"
                        type="submit"
                      >
                        Thêm
                      </Button>
                    </SimpleGrid>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose} colorScheme="whatsapp" mr={'10px'}>Yes</Button> */}
            <Button onClick={onClose} colorScheme="red">
              Huỷ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

AddNewUserModal.propTypes = {
  onSubmit: PropTypes.func,
};

AddNewUserModal.defaulProps = {
  onSubmit: null,
};
