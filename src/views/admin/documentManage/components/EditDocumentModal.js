import {
  Button,
  FormControl,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import ExtractResultCard from "components/card/ExtractResultCard";
import DocumentField from "../../../../components/shared/custom/fields/DocumentField";
import ProfileField from "../../../../components/shared/custom/fields/ProfileField";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function EditDocumentModal(props) {
  const { isOpen, onClose, data, modalTitle, overlay, size } = props;
  const arrayToObject = (arr) => {
    return arr.reduce((obj, item) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
      return obj;
    }, {});
  };
  //console.log(data)
  let {
    ID,
    TICKET_ID,
    HUCEDOCS_TYPE,
    USER_CREATE,
    CREATE_DATE,
    UPDATE_DATE,
    STATUS,
    ...cloneDATA
  } = data;
  //console.log("CloneData:", cloneDATA);
  const initialValues = { ...cloneDATA };
  //console.log("initVL:",initialValues);

  // setup Yup
  const yupConfig = Object.keys(cloneDATA).map((key) => ({
    [key]: Yup.string().required("This field is require."),
  }));
  const yupCopnfigToArr = arrayToObject(yupConfig);

  const validationSchema = Yup.object().shape({ ...yupCopnfigToArr });

  const dataKeyValue = Object.entries(cloneDATA).map(([key, value]) => ({
    key,
    value,
  }));
  //console.log("dataKV:", dataKeyValue);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      {overlay}
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={1} gap="20px">
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
                const { values, errors, touched, isSubmitting } = formikProps;
                return (
                  <Grid>
                    <GridItem colSpan={1}>
                      <Card mb={{ base: "0px", "2xl": "10px" }} bg="">
                        <Text
                          color={textColorPrimary}
                          fontWeight="bold"
                          fontSize="2xl"
                          mt="10px"
                          mb="4px"
                        >
                          {modalTitle}
                        </Text>
                        <Form>
                          {dataKeyValue.map((dataItem, key) => {
                            return (
                              <SimpleGrid columns={2} gap={"10px"}>
                                <FastField
                                  component={DocumentField}
                                  label={dataItem.key}
                                  name={dataItem.key}
                                  type={"text"}
                                  placeholder={dataItem.key}
                                  defaultValue={dataItem.value}
                                  {...formikProps.getFieldProps(dataItem.key)}
                                  // {...formikProps.getFieldProps("Username")}
                                />
                              </SimpleGrid>
                            );
                          })}
                        </Form>
                      </Card>
                    </GridItem>
                  </Grid>
                );
              }}
            </Formik>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
