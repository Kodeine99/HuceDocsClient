import { Route, Switch, Redirect } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { columnsDataCheck } from "views/admin/dataTables/variables/columnsData";
import tableDataFiles from "./variables/tableDataFiles.json";
import React from "react";
import DocumentManageTable from "./components/DocumentManageTable";
import { columnsDataDocTable } from "./variables/columnsDataDocTable";
import { IoReload } from "react-icons/io5";
import { InputSeclectDoc } from "components/shared/custom/fields/InputSelect";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { userSelector } from "aaRedux/app/userSlice";
import { Base64 } from "js-base64";
import { userGetAll } from "aaRedux/app/docOcrResultSlice";
import { adminGetAll } from "aaRedux/app/docOcrResultSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { MdFilterAlt } from "react-icons/md";

export default function DocumentManage() {
  const dispatch = useDispatch();
  const { token } = useSelector(userSelector);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [initialValues, setInitialValues] = useState({
    docType: "GiayXacNhanToeic",
  });
  const [initFilter, setInitFilter] = useState({
    tickeT_ID: null,
    useR_CREATE: null,
    froM_DATE: null,
    tO_DATE: null,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [reload, setReload] = useState(0);

  const [spinning, setSpinning] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getTokenRole = (token) => {
    const role = token && JSON.parse(Base64.decode(token.split(".")[1])).typ;
    return role;
  };

  // console.log("InitValue", initialValues);
  // console.log("InitFilter", initFilter);
  // console.log("Token", token);
  // const newValues = {
  //   ...initialValues,
  //   payload: initFilter,
  // };
  // console.log(newValues);

  const loadDocOcrData = async () => {
    const newValues = {
      ...initialValues,
      payload: initFilter,
    };
    const role = getTokenRole(token);
    // console.log("Role", role);
    // console.log("new value:", newValues);
    try {
      // console.log("new Values", newValues);
      let actionResult = null;

      role && role === "Admin"
        ? (actionResult = await dispatch(adminGetAll(newValues)))
        : (actionResult = await dispatch(userGetAll(newValues)));
      // const actionResult = await dispatch(userGetAll(initFilter, docType));

      const apiResult = await unwrapResult(actionResult);
      // console.log("Api result", apiResult);

      apiResult.isOk === true && apiResult.result && setTableData(apiResult.result);
    } catch (error) {
      toast.error("Có lỗi khi tải dữ liệu, vui lòng thử lại sau", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadDocOcrData(initialValues, initFilter);
      // console.log("initFilter:",initFilter);
    };
    loadData();
    // eslint-disable-next-line
  }, [loadingData, reload, initialValues]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Quản lý tài liệu bóc tách
          </Text>
          
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={
              async (values, actions) => {
                await setInitialValues({docType: values.docType})
                // console.log("Init after set", initialValues)

              // loadDocOcrData(values, token);
              loadDocOcrData();

              // setSpinning(true);

              // setTimeout(async () => {
              //   await loadDocOcrData(values?.docType);

              //   console.log("Submitting...", values?.docType);
              //   //actions.setSubmitting(false);
              //   setSpinning(false);
              //   // console.log(initialValues);
              // }, 1000);
            }}
          >
            {(formikProps) => {
              const { values, errors, touched, isSubmitting } = formikProps;
              return (
                <Form>
                  <FormControl>
                    <Flex alignItems={"center"}>
                      <FastField
                        component={InputSeclectDoc}
                        label={"Chọn loại tài liệu"}
                        name={"docType"}
                        type={"text"}
                        //defaultValue={0}
                        {...formikProps.getFieldProps("docType")}
                        // {...formikProps.getFieldProps("Email")}
                      />

                      <IconButton
                        ml={"25px"}
                        isLoading={spinning}
                        spinnerPlacement="start"
                        colorScheme="whatsapp"
                        type="submit"
                        icon={<MdFilterAlt />}
                      >
                        Lọc
                      </IconButton>
                    </Flex>
                  </FormControl>
                </Form>
              );
            }}
          </Formik>
        </Flex>
        <DocumentManageTable
          columnsData={columnsDataDocTable}
          // tableData={tableDataFiles}
          tableData={tableData}
        />
      </SimpleGrid>
    </Box>
  );
}
