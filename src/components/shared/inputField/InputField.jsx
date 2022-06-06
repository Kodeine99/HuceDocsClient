import React from 'react';
import { FormControl, FormLabel, Input, useColorModeValue, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types'
import {ErrorMessage, Field} from "formik";




function LoginInput(props) {
  const {field, form,
    type, label, placeholder, disabled, value, defaultValue
  } = props;
  const {name} = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  //Chakra color mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");

  return (
    <>
      <FormControl>
        <FormLabel
          display='flex'
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mb='8px'>
          {label}<Text color={brandStars}>*</Text>
        </FormLabel>
        <Field
          id={name}
          as = {Input}
          //isRequired={true}
          {...field}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          type={type}
          placeholder={placeholder}
          mb='24px'
          fontWeight='500'
          size='lg'
          value={value}
          defaultValue={defaultValue}

          isInvalid={showError}
        />
      </FormControl>
    </>
  )
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
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

export default LoginInput;