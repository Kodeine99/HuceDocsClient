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
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import DocumentField from "../../../../components/shared/custom/fields/DocumentField";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import BasicEditTable from "components/shared/custom/basicTable/BasicEditTable";

export default function EditDocumentModal(props) {
  const {
    isOpen,
    onClose,
    data,
    modalTitle,
    overlay,
    size,
    reload,
    loadIndex,
  } = props;
  const arrayToObject = (arr) => {
    return arr.reduce((obj, item) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
      return obj;
    }, {});
  };

  const convertToJson = (data) => {
    //console.log("old Data:", data);
    let dataAfterReplace = JSON.parse(
      data
        .replace('\\"', '"')
        .replace('"[', "[")
        .replace(']"', "]")
        .replace("\\", "")
        .split("\\")
        .join("")
    );
    //console.log("new Data:", dataAfterReplace);
    //console.log("js",js);
    return dataAfterReplace;
  };
  console.log("Data", data);
  let {
    id,
    tickeT_ID,
    hucedocS_TYPE,
    useR_CREATE,
    creatE_DATE,
    updatE_DATE,
    status,
    ...cloneDATA
  } = data;
  //console.log("CloneData:", cloneDATA);
  const initialValues = { ...cloneDATA };
  console.log("initVL:", initialValues);

  let { marK_TABLE, ...cloneData } = data;
  console.log("cloneData2", cloneData);
  console.log("marK_TABLE", marK_TABLE);

  // const stringMarkTable = JSON.stringify(marK_TABLE);
  // console.log("stringMarkTable",stringMarkTable)

  // const markTableData = convertToJson(stringMarkTable);

  // console.log("markTableData",markTableData)
  // const markTableObj = {};

  // markTableObj["marK_TABLE"] = data["marK_TABLE"];
  // const markTableData = markTableObj?.marK_TABLE;
  // console.log("markTableData:", markTableData);

  // const abc = JSON.stringify(markTableData);
  // console.log("abc", abc)

  // const {marK_TABLE} = data ;
  // console.log("marK_TABLE", marK_TABLE)
  // setup Yup
  // const yupConfig = Object.keys(cloneDATA).map((key) => ({
  //   [key]: Yup.string().required("This field is require."),
  // }));

  // const yupCopnfigToArr = arrayToObject(yupConfig);

  // const validationSchema = Yup.object().shape({ ...yupCopnfigToArr });

  const dataKeyValue = Object.entries(cloneDATA).map(([key, value]) => ({
    key,
    value,
  }));
  console.log("dataKV:", dataKeyValue);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      {overlay}
      <ModalContent>
        <ModalHeader>
          {hucedocS_TYPE} - Id: {data.id}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={1} gap="20px">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              // onSubmit = {handleSubmit}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  console.log("Submitted");
                  console.log("ValueSubmit:", values);
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
                          <FormControl>
                            {dataKeyValue.map((dataItem, key) => {
                              // console.log("dataKeyValue",dataKeyValue)
                              if (dataItem.key !== "marK_TABLE") {
                                console.log("dataItemNormal", dataItem);
                                return (
                                  <SimpleGrid
                                    columns={2}
                                    gap={"10px"}
                                    key={key}
                                  >
                                    <FastField
                                      component={DocumentField}
                                      label={dataItem.key.toUpperCase()}
                                      name={dataItem.key}
                                      type={"text"}
                                      placeholder={dataItem.key}
                                      defaultValue={dataItem.value}
                                      {...formikProps.getFieldProps(
                                        dataItem.key
                                      )}
                                      // {...formikProps.getFieldProps("Username")}
                                    />
                                  </SimpleGrid>
                                );
                              } else {
                                console.log("dataItemTable", dataItem.value);

                                return (
                                  <>
                                    <BasicEditTable
                                      fieldValues={values}
                                      documentId={data?.id}
                                      documentType={hucedocS_TYPE}
                                      markTableData={dataItem.value}
                                      {...formikProps.getFieldProps(
                                        dataItem.key
                                      )}
                                      loadIndex={reload}
                                      reload={(loadIndex) => reload(loadIndex)}
                                    />
                                  </>
                                );
                              }
                            })}
                            {/* <Button
                              mr="20px"
                              colorScheme={"whatsapp"}
                              type="submit"
                            >
                              Lưu
                            </Button> */}
                          </FormControl>
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
          <Button
            onClick={() => {
              onClose();
              reload(loadIndex + 1);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
