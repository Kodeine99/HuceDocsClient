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
    username: "",
    password: "",
  };
  // setup Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const userInfo = props.userInfo;
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
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
                <SimpleGrid columns={2} gap="20px">
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
