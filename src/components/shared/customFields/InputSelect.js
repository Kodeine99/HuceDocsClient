import React from "react";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { ErrorMessage, Form } from "formik";

export function InputSelect(props) {
  const {
    field,
    form,
    type,
    label,
    placeholder,
    disabled,
    value,
    defaultValue,
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <FormControl {...field} isInvalid={form.errors.name && form.touched.name}> 
      <Flex direction={"column"}>
        <FormLabel
          mt="5px"
          ms="4px"
          fontSize="lg"
          fontWeight="500"
          color={textColor}
          //isRequired={true}
          display="flex"
        >
          {label}
          {/* <Text color={brandStars}>*</Text> */}
        </FormLabel>
        <Select placeholder={placeholder} defaultValue={defaultValue} size="lg">
          <option value="">Choose</option>
          <option value={0}>Female</option>
          <option value={1}>Male</option>
          <option value={2}>Other</option>
        </Select>
        <ErrorMessage
          name={name}
          size="lg"
          fontSize="12px"
          as="samp"
          color="crimson"
          component={Text}
        ></ErrorMessage>
      </Flex>
      </FormControl>
    </>
  );
}
