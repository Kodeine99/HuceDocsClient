import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  FormErrorMessage,
  Portal,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";
import { ErrorMessageInput } from "./ErrorMessageInput";

function LoginInput(props) {
  const { field, form, type, label, placeholder, disabled, defaultValue } =
    props;
  const { name, onChange, onBlur, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  //Chakra color mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <FormControl
        variant="floating"
        isInvalid={form.errors.name && form.touched.name}
      >
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="lg"
          fontWeight="500"
          color={textColor}
          mb="4px"
        >
          {label}
          <Text color={brandStars}>*</Text>
        </FormLabel>
        <Field
          id={name}
          as={Input}
          //isRequired={true}
          {...field}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "0px" }}
          type={type}
          placeholder={placeholder}
          //mb="24px"
          fontWeight="500"
          size="lg"
          value={value}
          defaultValue={defaultValue}
          isInvalid={showError}
        />
        <ErrorMessage
          name={name}
          fontSize="12px"
          as="samp"
          color="crimson"
          component={Text}
        ></ErrorMessage>
      </FormControl>
    </>
  );
}

LoginInput.propTypes = {
  // formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // props tu them
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

LoginInput.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

export default LoginInput;
