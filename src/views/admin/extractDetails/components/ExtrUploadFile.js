// Chakra imports
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect } from "react";
// Assets
import Dropzone from "../components/Dropzone";

import ExtrResultTable from "./ExtrResultTable";
import { columnsDataExtrResultTable } from "../variables/columnsDataExtrResultTable";
import { useSelector, useDispatch } from "react-redux";
import { userGetAll } from "aaRedux/app/ocrRequestSlice";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { userSelector } from "aaRedux/app/userSlice";
import { Base64 } from "js-base64";

export default function ExtrUploadFile(props) {
  const { used, total, extractType, ...rest } = props;
  const { token } = useSelector(userSelector);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const [loadingData, setLoadingData] = useState(false);
  const [ocrRequestData, setOcrRequestData] = useState([]);

  // check role
  const getTokenRole = async (token) => {
    // const role = await token && JSON.parse(Base64.decode(token.split(".")[1])).typ === 'admin' ? (
    //   console.log(role)
    // ) : console.log("user")

    const role = token && JSON.parse(Base64.decode(token.split(".")[1])).typ;

    console.log(role);
  };

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

    apiResult?.isOk === true
      ? setOcrRequestData(apiResult.result)
      : console.log("loi");
    console.log("Api Result", apiResult);
  };

  useEffect(() => {
    const loadData = async () => {
      await loadOcrRequestData(initFilter);
      // console.log("initFilter:",initFilter);
    };
    loadData();
    // eslint-disable-next-line
  }, [loadingData]);

  // console.log("ocrReqData", ocrRequestData)

  return (
    <Card {...rest} mb="10px" align="center" p="10px" w="100%">
      <Button onClick={() => getTokenRole(token)}>check role</Button>
      <Tabs variant="line" colorScheme="purple">
        <TabList>
          <Tab>Bóc tách</Tab>
          <Tab>Kết quả</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Dropzone extractType={extractType} />
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
