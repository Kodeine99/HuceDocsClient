import React from 'react';
import { FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  InputGroup,
  Icon,
  InputRightElement } from '@chakra-ui/react';
import PropTypes from 'prop-types'
import {ErrorMessage} from "formik";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";



function InputWithHide(props) {
  const {field, form,
    type, label, placeholder, disabled, value, defaultValue
  } = props;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
      <FormLabel
        ms='4px'
        fontSize='sm'
        fontWeight='500'
        color={textColor}
        //isRequired={true}
        display='flex'>
        {label}<Text color={brandStars}>*</Text>
      </FormLabel>
      <InputGroup size='md'>
        <Input
          id={name}
          //isRequired={true}
          {...field}
          fontSize='sm'
          placeholder={placeholder}
          mb='24px'
          size='lg'
          type={show ? "text" : "password"}
          variant='auth'
          value={value}
        />
        <InputRightElement display='flex' alignItems='center' mt='4px'>
          <Icon
            color={textColorSecondary}
            _hover={{ cursor: "pointer" }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
    </>
  )
}

InputWithHide.propTypes = {
  // formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // props tu them
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputWithHide.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

export default InputWithHide;