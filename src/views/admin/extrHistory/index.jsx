import { Route, Switch, Redirect } from "react-router-dom";
// Chakra imports
import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

import { columnsDataCheck } from "views/admin/dataTables/variables/columnsData";

import extrHistoryData from "views/admin/extrHistory/variables/extrHistoryData.json";

import React from "react";
import routes from "../../../routes/routes";
import ExtrHistoryTable from "./components/ExtrHistoryTable";
import { useState } from "react";
import { Base64 } from "js-base64";
import { useSelector, useDispatch } from "react-redux";
import { userGetAll } from "aaRedux/app/ocrRequestSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { userSelector } from "aaRedux/app/userSlice";
import { adminGetAll } from "aaRedux/app/ocrRequestSlice";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import {
  columnsDataExtrHistoryTable,
  columnsDataExtrResultTable,
} from "../extractDetails/variables/columnsDataExtrResultTable";
import IconBox from "components/icons/IconBox";
import MiniStatistics from "components/card/MiniStatistics";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";

export default function ExtrHistory() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // loadData State
  const [loadingData, setLoadingData] = useState(false);
  const [ocrRequestData, setOcrRequestData] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector(userSelector);

  const [initFilter, setInitFilter] = useState({
    ticket_Id: null,
    documentId: null,
    userId: null,
    fromDate: null,
    toDate: null,
    ocR_Status_Code: null,
  });

  // check role
  const getRoleByToken = (token) => {
    const role = token && JSON.parse(Base64.decode(token.split(".")[1])).typ;
    console.log("Role", role);
    return role;
  };

  const loadTikcetData = async () => {
    try {
      const role = getRoleByToken(token);
      let actionResult = null;
      if (role && role === "Admin") {
        actionResult = await dispatch(adminGetAll(initFilter));
      } else {
        actionResult = await dispatch(userGetAll(initFilter));
      }

      const apiResult = await unwrapResult(actionResult);
      apiResult?.isOk === true
        ? setOcrRequestData(apiResult.result)
        : console.log("loi");
      console.log("Api Result", apiResult);
    } catch (rejectedValueOrSerializedError) {
      toast.error("Có lỗi khi tải dữ liệu, vui lòng thử lại sau", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadTikcetData(initFilter);
    };
    loadData();
    // eslint-disable-next-line
  }, [loadingData]);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="64px"
              h="64px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={HiOutlineTicket}
                  color={brandColor}
                />
              }
            />
          }
          name="Total Ticket"
          value="25"
        />
      </SimpleGrid>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ExtrHistoryTable
          columnsData={columnsDataExtrHistoryTable}
          tableData={ocrRequestData}
        />
      </SimpleGrid>
    </Box>
  );
}
