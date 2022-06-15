// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";
// Formik Control
import { Formik, Field, FastField, ErrorMessage, Form } from "formik";
// Yup
import * as Yup from "yup";
import LoginInput from "components/shared/inputField/InputField";
import InputWithHide from "components/shared/inputField/InputFieldWithHide";
import { NavLink } from "react-router-dom";
import ProfileField from "components/shared/customFields/ProfileField";
import { InputSelect } from "components/shared/customFields/InputSelect";
// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [show, setShow] = React.useState(false);
  //const handleClick = () => setShow(!show);
  //const history = useHistory();
  //const [setCookie] = useCookies();
  //const dispatch = useDispatch();
  // const { loading, isSuccess, isError, errorMessage } =
  //   useSelector(userSelector);

  // setup formik
  const initialValues = {
    fullname: "Tung Ramen",
    username: "tungramen99",
    email: "tungramen99@gmail.com",
    phoneNumber: "0989898989",
    age: 23,
    birthday: "",
    address: "Van Quan, Ha Dong, Ha Noi",
    gender: 0
  };
  // setup Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email("Email is invalid").required("Email is require."),
    phoneNumber: Yup.string().required("This field is require."),
    age: Yup.string().required("This field is require."),
    birthday: Yup.string().required("This field is require."),
    gender: Yup.string().required("This field is require."),
    address: Yup.string().required("This field is require."),
  });
  const userInfo = props.userInfo;
  return (
    <Card mb={{ base: "0px", "2xl": "10px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Thông tin cá nhân
      </Text>

      {/* <SimpleGrid columns="2" gap="20px">
        {Object.entries(userInfo)
          .map(([key, value]) => ({
            key,
            value,
          }))
          .map((dataItem, key) => {
            return (
              <Information
                boxShadow={cardShadow}
                key={key}
                title={dataItem.key}
                value={dataItem.value}
              />
            );
          })}
      </SimpleGrid> */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit = {handleSubmit}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log("Submitted");
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
                    name={"fullname"}
                    type={"text"}
                    placeholder={"FullName"}
                    defaultValue={"Tung Ramen"}
                    {...formikProps.getFieldProps(
                      "fullname"
                    )}
                    // {...formikProps.getFieldProps("Username")}
                  />
                  <FastField
                    component={ProfileField}
                    label={"Username"}
                    name={"username"}
                    type={"text"}
                    placeholder={"Username"}
                    disabled={true}
                    defaultValue={"tungramen99"}
                    {...formikProps.getFieldProps(
                      "username"
                    )}
                    // {...formikProps.getFieldProps("Username")}
                  />

                  <FastField
                    component={ProfileField}
                    label={"Email"}
                    name={"email"}
                    placeholder={"Email"}
                    type={"email"}
                    disabled={true}
                    defaultValue={"tungramen99@gmail.com"}
                    {...formikProps.getFieldProps(
                      "email"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />
                  <FastField
                    component={ProfileField}
                    label={"Phone number"}
                    name={"phoneNumber"}
                    placeholder={"Phone Number"}
                    type={"text"}
                    defaultValue={"0989898989"}
                    {...formikProps.getFieldProps(
                      "phoneNumber"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />
                  <FastField
                    component={ProfileField}
                    label={"Age"}
                    name={"age"}
                    placeholder={"Age"}
                    type={"number"}
                    disabled={true}
                    defaultValue={23}
                    {...formikProps.getFieldProps(
                      "age"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />
                  <FastField
                    component={ProfileField}
                    label={"Birthday"}
                    name={"birthday"}
                    type={"date"}
                    {...formikProps.getFieldProps(
                      "birthday"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />
                  <FastField
                    component={ProfileField}
                    label={"Address"}
                    name={"address"}
                    placeholder={"Address"}
                    type={"text"}
                    defaultValue={"Van Quan, Ha Dong, Ha Noi"}
                    {...formikProps.getFieldProps(
                      "address"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />

                  

                  <FastField
                    component={InputSelect}
                    label={"Gender"}
                    name={"gender"}
                    type={"number"}
                    defaultValue={0}
                    {...formikProps.getFieldProps(
                      "gender"
                    )}
                    // {...formikProps.getFieldProps("Email")}
                  />
                </SimpleGrid>

                {/* <Button
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
                </Button> */}
                {/* <ErrorMessage type={'invalid'}>{form.errors.name}</ErrorMessage> */}
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
}
