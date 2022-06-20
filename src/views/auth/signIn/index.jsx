import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// Formik Control
import { Formik, Field, FastField, ErrorMessage, Form } from "formik";
// Yup
import * as Yup from "yup";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Coookie
import { useCookies } from "react-cookie";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import loginBackground from "assets/img/auth/LoginPage.png";
import {
  login,
  userSelector,
  clearState,
  getUserByToken,
} from "../../../aaRedux/app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import LoginInput from "components/shared/inputField/InputField";
import InputWithHide from "components/shared/inputField/InputFieldWithHide";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const { loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  // setup formik
  const initialValues = {
    username: "",
    password: "",
  };
  // setup Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  // Get user data
  const getUserData = () => {
    const userData = dispatch(getUserByToken());
    console.log(userData);
  };
  // Handle submit
  const handleSubmit = async (values) => {
    console.log("Submit", values);
    const action = await login(values);
    const actionResult = await dispatch(action);
    const loginResult = unwrapResult(actionResult);

    if (loginResult.isOk) {
      const token = loginResult.result.token;
      setCookie("access_token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      await getUserData();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/boctach");
    } else if (isError) {
      dispatch(clearState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <DefaultAuth
      illustrationBackground={loginBackground}
      image={loginBackground}
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your <b>username & password</b> to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            //onSubmit = {handleSubmit}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(formikProps) => {
              // do somethings
              const { values, errors, touched, isSubmitting } = formikProps;

              return (
                <Form>
                  <FormControl>
                    <FastField
                      component={LoginInput}
                      label={"Username"}
                      name={"username"}
                      type={"text"}
                      placeholder={"Username"}
                    />

                    <FastField
                      component={InputWithHide}
                      label={"Password"}
                      name={"password"}
                      placeholder={"Min. 8 characters"}
                    />
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      mb="24px"
                    >
                      {/* <FormControl display='flex' alignItems='center'>
                      <Checkbox
                        id='remember-login'
                        colorScheme='brandScheme'
                        me='10px'
                      />
                      <FormLabel
                        htmlFor='remember-login'
                        mb='0'
                        fontWeight='normal'
                        color={textColor}
                        fontSize='sm'>
                        Keep me logged in
                      </FormLabel>
                    </FormControl> */}
                      <NavLink to="/auth/forgot-password">
                        <Text
                          color={textColorBrand}
                          fontSize="sm"
                          w="124px"
                          fontWeight="500"
                          mt={"20px"}
                        >
                          Forgot password?
                        </Text>
                      </NavLink>
                    </Flex>
                    <Button
                      loadingText="Signing in..."
                      isLoading={isSubmitting}
                      spinnerPlacement="start"
                      type="submit"
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                    >
                      Sign In
                    </Button>
                    {/* <ErrorMessage type={'invalid'}>{form.errors.name}</ErrorMessage> */}
                  </FormControl>
                </Form>
              );
            }}
          </Formik>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Contact to Admin to create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}
SignIn.propTypes = {
  onSubmit: PropTypes.func,
};

SignIn.defaulProps = {
  onSubmit: null,
};
export default SignIn;
