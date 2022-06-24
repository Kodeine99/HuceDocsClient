// Chakra imports
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect } from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "../components/Dropzone";

import { DeleteIcon } from "@chakra-ui/icons";
import UploadFileTable from "./UploadFileTable";
import { ColumnUploadFileTable } from "../variables/columnUploadFileTable";
import UploadFileTableData from "../variables/uploadFiletableData.json";
import ExtrResultTable from "./ExtrResultTable";
import { columnsDataExtrResultTable } from "../variables/columnsDataExtrResultTable";
import extrResultData from "../variables/extrResultData.json";
import { useSelector, useDispatch } from "react-redux";
import { userGetAll } from "aaRedux/app/ocrRequestSlice";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ExtrUploadFile(props) {
  const { used, total, ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  const [loadingData, setLoadingData] = useState(false);
  const [ocrRequestData, setOcrRequestData] = useState([]);

  const map = extrResultData
    .map((item) => {
      return item.jsonData;
    })
    .map((child) => {
      return child;
    });

  console.log("map", map);

  const dispatch = useDispatch();

  const [initFilter, setInitFilter] = useState({
    ticket_Id: null,
    documentId: null,
    userId: null,
    fromDate: null,
    toDate: null,
    ocR_Status_Code: null,
  });

  const loadOcrRequestData = async () => {
    const actionResult = await dispatch(userGetAll(initFilter));

    const apiResult = await unwrapResult(actionResult);

    apiResult?.isOk === true ? setOcrRequestData(apiResult.result) :
    console.log("loi") 
    console.log("Api Result",apiResult);
  };

  useEffect(() => {
    const loadData = async () => {
      await loadOcrRequestData(initFilter);
      console.log("initFilter:",initFilter);
    };
    loadData();
    // eslint-disable-next-line
  }, [loadingData]);

  console.log("ocrReqData", ocrRequestData)

  return (
    <Card {...rest} mb="10px" align="center" p="10px" w="100%">
      <Tabs variant="line" colorScheme="purple">
        <TabList>
          <Tab>Bóc tách</Tab>
          <Tab>Kết quả</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Dropzone />
          </TabPanel>
          <TabPanel>
            {/* <Divider orientation="horizontal" /> */}
            <Flex
              px="25px"
              mb="20px"
              direction={{ base: "column", "2xl": "column" }}
              minH="50%"
              maxH="50%"
            >
              <Text
                color={textColorPrimary}
                fontWeight="bold"
                textAlign="start"
                fontSize="2xl"
                mt={{ base: "5px", "2xl": "10px" }}
              >
                Kết quả bóc tách
              </Text>
              <ExtrResultTable
                columnsData={columnsDataExtrResultTable}
                // tableData={extrResultData}
                tableData={ocrRequestData}
                // ocrData={extrResultData.map((item) => {
                //   return {
                //     item.jsonData,
                //   }
                // })}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
}
