import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Avatar,
  AvatarGroup,
  Icon,
  Link,
  Spacer,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Table,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import React from "react";
// Chakra imports
import {} from "@chakra-ui/react";
// Assets
import { MdTimer, MdVideoLibrary } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import ExtrResultTable from "views/admin/extractDetails/components/ExtrResultTable";
import { columnsDataExtrResultTable } from "views/admin/extractDetails/variables/columnsDataExtrResultTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import tableDataColumns from "../../views/admin/dataTables/variables/tableDataColumns.json";
import CustomEditable from "components/husky/CustomEditable";
import TableReal from "components/husky/TableReal";
import { createDocOcr } from "aaRedux/app/docOcrResultSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";


function ExtractResultCard(props) {
  const dispatch = useDispatch();
  const { type, data, icon, verifyLink, fullData } = props;
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let secondaryBg = useColorModeValue("gray.300", "whiteAlpha.100");
  let thirdBg = useColorModeValue("gray.100", "whiteAlpha.100");
  let mainText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

  console.log("DocType",type)
  console.log("ocrData:", data);
  console.log("verifyLink:", verifyLink);
  console.log("fullData:", fullData);

  let { MARK_TABLE, ECM_ID, ...cloneData } = data;
  const markTableObj = {};

  markTableObj["MARK_TABLE"] = data["MARK_TABLE"];
  const markTableData = markTableObj?.MARK_TABLE;
  console.log("markTableData:", markTableData);

  //Get documentType
  const getDocType = (type) => {
    let documentType = "";
    switch (type) {
      case "GIAY_XAC_NHAN_TOEIC":
        documentType = "GiayXacNhanToeic"
        break;
      
      case "BANG_DIEM_TIENG_ANH":
        documentType = "BangDiemTiengAnh"
        break;

      case "BANG_DIEM": 
        documentType = "BangDiem"
        break;
      
      case "GIAY_CAM_KET_TRA_NO":
        documentType = "GiayCamKetTraNo"
        break;
      default:
        break;
    }
    return documentType;
  }
  function convert(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const handleSaveOcrData = async (data, markTableData) => {
    const { ticket_Id, createTime, ocR_Status_Code, username } = fullData;
    let dataSubmit = {};
    const documentType = getDocType(type);

    typeof(markTableData) !== "undefined" && markTableData.length > 0 ? 
    (
      dataSubmit = {
        ...data,
        MARK_TABLE: JSON.stringify(markTableData),
        TICKET_ID: ticket_Id,
        CREATE_DATE: createTime,
        STATUS: ocR_Status_Code,
        USER_CREATE: username,
        HUCEDOCS_TYPE: documentType,
        
      }
    ) : (
      dataSubmit = {
        ...data,
        TICKET_ID: ticket_Id,
        CREATE_DATE: createTime,
        STATUS: ocR_Status_Code,
        USER_CREATE: username,
        HUCEDOCS_TYPE: documentType

      }
    )
    
    console.log(dataSubmit);


    console.log("DocumentType",documentType);

    console.log("Saving data...");
    
    const actionResult = await dispatch(createDocOcr(dataSubmit))
    const result = await unwrapResult(actionResult);
    console.log("Result",result)

  };
  return (
    <Flex
      borderRadius="20px"
      bg={secondaryBg}
      //h="px"
      //w={{ base: "500px", md: "550px" }}
      direction="column"
    >
      <Box p="20px">
        <Flex w="100%" mb="10px" direction="row">
          <Image src={icon} me="auto" w="50px" h="50px" />
          {/* <Button
            w="38px"
            h="38px"
            align="center"
            justify="center"
            borderRadius="12px"
            me="12px"
            bg={iconBox}
          >
            
            <Icon
              w="24px"
              h="24px"
              as={IoNewspaperOutline}
              color={iconColor}
            />
          </Button> */}
        </Flex>
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
          >
            {type}
          </Text>
        </Box>
      </Box>
      <Flex
        bg={thirdBg}
        w="100%"
        p="20px"
        borderBottomLeftRadius="inherit"
        borderBottomRightRadius="inherit"
        h="100%"
        direction="column"
      >
        <Box h="100%">
          <List spacing={2}>
            {Object.entries(cloneData)
              .map(([key, value]) => ({
                key,
                value,
              }))
              .map((dataItem, key) => {
                return (
                  <>
                    <ListItem key={key}>
                      <Text as={"span"} fontWeight={"bold"}>
                        {dataItem.key}:
                      </Text>{" "}
                      {dataItem.value}
                    </ListItem>
                  </>
                );
              })}
          </List>
          {typeof markTableData !== "undefined" && markTableData.length > 0 ? (
            <>
              <Text mt={"10px"} as={"span"} fontWeight={"bold"}>
                MARK_TABLE
              </Text>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      {Object.entries(markTableData[0])
                        .map(([key, value]) => ({
                          key,
                          value,
                        }))
                        .map((item, key) => {
                          return <Td>{item.key}</Td>;
                        })}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {markTableData.map((row, index) => {
                      return (
                        <Tr>
                          {Object.entries(row)
                            .map(([key, value]) => ({
                              key,
                              value,
                            }))
                            .map((cell, index) => {
                              return <Td>{cell.value}</Td>;
                            })}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <></>
          )}
        </Box>
        <Flex justifyContent={"space-between"} mt={"15px"}>
          {fullData?.ocR_Status_Code === 1 ? (
            <Button
              colorScheme="whatsapp"
              rightIcon={<DownloadIcon />}
              onClick={() => handleSaveOcrData(data, markTableData)}
            >
              Lưu kết quả bóc tách
            </Button>
          ) : (
            <></>
          )}
          <Spacer />
          <Flex mt="15px" direction={"row"}>
            <Link href={verifyLink} display={"inherit"}>
              <Text
                color={mainText}
                fontSize="sm"
                my="auto"
                fontWeight="500"
                mr={"10px"}
              >
                Chuyển tới trang soát lỗi
              </Text>
              <ExternalLinkIcon
                as={MdVideoLibrary}
                w="20px"
                h="20px"
                color="red.500"
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ExtractResultCard;
