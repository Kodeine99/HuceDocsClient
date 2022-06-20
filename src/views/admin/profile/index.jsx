// Chakra imports
import {
  Box,
  Button,
  FormControl,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/tungramen.jpg";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { from } from "stylis";
import { userSelector } from "aaRedux/app/userSlice";
import { FastField, Form, Formik } from "formik";
import { InputSelect } from "components/shared/custom/fields/InputSelect";
import ProfileField from "components/shared/custom/fields/ProfileField";
import Card from "components/card/Card";
import * as Yup from "yup";

export default function Overview(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfor } = useSelector(userSelector);

  // const userInfo = {
  //   FullName: "Tung Ramen",
  //   Username: "tungramen99",
  //   Email: "tungramen99@gmail.com",
  //   Phone: "0989898989",
  //   Address: "Van Quan, Ha Dong, Ha Noi",
  //   Birthday: null,
  //   Age: 23,
  //   Gender: 1
  // };

  console.log("userIn4", userInfor);

  const [initialValues, setInitialValues] = useState({
    address: "",
    age: null,
    birthday: null,
    email: "",
    fullName: "",
    gender: null,
    phoneNumber: "",
    userName: "",
  });
  const converDate = (dateString) => {
    let date = new Date(dateString),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  };

  const onLoad = () => {
    //console.log("us2", userInfo);
    const {
      address,
      age,
      birthday,
      email,
      fullName,
      gender,
      phoneNumber,
      userName,
    } = userInfor;
    const newDOb = converDate(new Date(birthday));

    setInitialValues({
      fullName: fullName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      age: age,
      birthday: newDOb,
      gender: gender,
      address: address,
    });
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Fullname is required"),
    email: Yup.string().email("Email is invalid").required("Email is require."),
    phoneNumber: Yup.string().required("This field is require."),
    age: Yup.string().required("This field is require."),
    birthday: Yup.string().required("This field is require."),
    gender: Yup.string().required("This field is require."),
    address: Yup.string().required("This field is require."),
  });
  useEffect(() => {
    userInfor && onLoad();
    // eslint-disable-next-line
  }, [userInfor]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const handleSubmit = (values) => {
    console.log("Submmit:", values)
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name="Tung Ramen"
          job="HUCE Student 🤍"
          posts="25"
          followers="9.9k"
          following="1"
        />
        {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 1 / 1 / 3" }}
          used={25.6}
          total={50}
        /> */}
        <GridItem colSpan={2}>
          {/* <General
            userinfo={userInfo}
            //gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
            minH="365px"
            pe="20px"
          /> */}

          <Card mb={{ base: "0px", "2xl": "10px" }}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt="10px"
              mb="4px"
            >
              Thông tin cá nhân
            </Text>

            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              // onSubmit = {handleSubmit}
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
                      <SimpleGrid columns={2} gap="10px">
                        <FastField
                          component={ProfileField}
                          label={"Fullname"}
                          name={"fullName"}
                          type={"text"}
                          placeholder={"FullName"}
                          //defaultValue={"Tung Ramen"}
                          {...formikProps.getFieldProps("fullName")}
                          // {...formikProps.getFieldProps("Username")}
                        />
                        <FastField
                          component={ProfileField}
                          label={"Username"}
                          name={"userName"}
                          type={"text"}
                          placeholder={"Username"}
                          disabled={true}
                          //defaultValue={"tungramen99"}
                          {...formikProps.getFieldProps("userName")}
                          // {...formikProps.getFieldProps("Username")}
                        />

                        <FastField
                          component={ProfileField}
                          label={"Email"}
                          name={"email"}
                          placeholder={"Email"}
                          type={"email"}
                          disabled={true}
                          //defaultValue={"tungramen99@gmail.com"}
                          {...formikProps.getFieldProps("email")}
                          // {...formikProps.getFieldProps("Email")}
                        />
                        <FastField
                          component={ProfileField}
                          label={"Phone number"}
                          name={"phoneNumber"}
                          placeholder={"Phone Number"}
                          type={"text"}
                          //defaultValue={"0989898989"}
                          {...formikProps.getFieldProps("phoneNumber")}
                          // {...formikProps.getFieldProps("Email")}
                        />
                        <FastField
                          component={ProfileField}
                          label={"Age"}
                          name={"age"}
                          placeholder={"Age"}
                          type={"number"}
                          disabled={true}
                          //defaultValue={23}
                          {...formikProps.getFieldProps("age")}
                          // {...formikProps.getFieldProps("Email")}
                        />
                        <FastField
                          component={ProfileField}
                          label={"Birthday"}
                          name={"birthday"}
                          type={"date"}
                          {...formikProps.getFieldProps("birthday")}
                          // {...formikProps.getFieldProps("Email")}
                        />
                        <FastField
                          component={ProfileField}
                          label={"Address"}
                          name={"address"}
                          placeholder={"Address"}
                          type={"text"}
                          //defaultValue={"Van Quan, Ha Dong, Ha Noi"}
                          {...formikProps.getFieldProps("address")}
                          // {...formikProps.getFieldProps("Email")}
                        />

                        <FastField
                          component={InputSelect}
                          label={"Gender"}
                          name={"gender"}
                          type={"number"}
                          //defaultValue={0}
                          {...formikProps.getFieldProps("gender")}
                          // {...formikProps.getFieldProps("Email")}
                        />
                      </SimpleGrid>

                      {userInfor ? (
                        <Button
                        mt="24px"
                        loadingText="Saving ..."
                        isLoading={isSubmitting}
                        spinnerPlacement="start"
                        type="submit"
                        fontSize="lg"
                        variant="brand"
                        fontWeight="500"
                        w="100%"
                        h="50"
                        mb="10px"
                      >
                        Save profile Information
                      </Button>
                      ): (
                        <Button
                        mt="24px"
                        loadingText="Saving ..."
                        isLoading={isSubmitting}
                        spinnerPlacement="start"
                        type="submit"
                        fontSize="lg"
                        variant="brand"
                        fontWeight="500"
                        w="100%"
                        h="50"
                        mb="10px"
                        disabled={true}
                      >
                        Save profile Information
                      </Button>
                      )}
                      {/* <ErrorMessage type={'invalid'}>{form.errors.name}</ErrorMessage> */}
                    </FormControl>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
