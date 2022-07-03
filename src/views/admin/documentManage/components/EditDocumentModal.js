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

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createDocOcr } from "aaRedux/app/docOcrResultSlice";
import { toast, ToastContainer } from "react-toastify";
import { updateDocOcr } from "aaRedux/app/docOcrResultSlice";

export default function EditDocumentModal(props) {
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
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

  // console.log("old Data:", data);

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
  // console.log("Data", data);
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
  // console.log("initVL:", initialValues);

  let { marK_TABLE, ...cloneData } = data;
  // console.log("cloneData2", cloneData);
  // console.log("marK_TABLE", marK_TABLE);

  const dataKeyValue = Object.entries(cloneDATA).map(([key, value]) => ({
    key,
    value,
  }));
  // console.log("dataKV:", dataKeyValue);

  const handleUpdateDataWithoutTable = async (id, documentType, values) => {
    // console.log("Values", values);

    const dataSubmited = {
      ...values,
      id: id,
      status: 1,
      documentType: documentType,
    };

    console.log("dataSubmited", dataSubmited);

    try {
      const actionResult = await dispatch(updateDocOcr(dataSubmited));
      const updateResult = await unwrapResult(actionResult);

      console.log("updateResult", updateResult);
      // reload(loadIndex + 1)

      (await updateResult) &&
        updateResult?.isOk === true &&
        toast.success("Cập nhật thông tin thành công", {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => onClose(),
        });
      // return updateResult;
    } catch (rejectWithValueOrSerializedError) {
      toast.error("Cập nhật thất bại", {
        position: toast.POSITION.TOP_CENTER,
      });

      // return rejectWithValueOrSerializedError;
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      {/* <ToastContainer /> */}
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
                setSpinning(true);
                setTimeout(() => {
                  // console.log("ValueSubmit:", values);
                  handleUpdateDataWithoutTable(id, hucedocS_TYPE, values);
                  actions.setSubmitting(false);
                  setSpinning(false);
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
                                // console.log("dataItemNormal", dataItem);
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
                                // console.log("dataItemTable", dataItem.value);

                                return (
                                  <>
                                    <BasicEditTable
                                      onClose={onClose}
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
                            {typeof marK_TABLE === "undefined" ? (
                              <Button
                                isLoading={spinning}
                                spinnerPlacement="start"
                                mt={"25px"}
                                mr="20px"
                                colorScheme={"whatsapp"}
                                type="submit"
                              >
                                Cập nhật dữ liệu
                              </Button>
                            ) : (
                              <></>
                            )}
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
