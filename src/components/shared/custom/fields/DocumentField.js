import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  InputGroup,
  Icon,
  InputRightElement,
  FormErrorMessage,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";

function DocumentField(props) {
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
  const { name, onChange, onBlur } = field;
  const { colorMode, toggleColorMode } = useColorMode();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  //const { name } = field;
  const { errors, touched } = form;
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
      <FormControl
        variant="floating"
        isInvalid={form.errors.name && form.touched.name}
      >
        <Flex direction={"row"} gap={'10px'} mt="10px">
          <FormLabel
            mt="5px"
            ms="4px"
            fontSize="md"
            fontWeight="500"
            color={textColor}
            //isRequired={true}
            display="flex"
            alignItems={'center'}
          >
            {label}
            {/* <Text color={brandStars}>*</Text> */}
          </FormLabel>
          <Field
            id={name}
            as={Input}
            //isRequired={true}
            ms={{ base: "0px", md: "0px" }}
            {...field}
            fontSize="md"
            placeholder={placeholder}
            color={colorMode === "light" ? "gray.700" : "white"}
            //mb="24px"
            size="md"
            type={type}
            value={value}
            isDisabled={disabled}
            isInvalid={showError}
            defaultValue={defaultValue}
            errorBorderColor="crimson"
            variant="outline"
          />
          <ErrorMessage
            name={name}
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

DocumentField.propTypes = {
  // formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // props tu them
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

DocumentField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

export default DocumentField;
