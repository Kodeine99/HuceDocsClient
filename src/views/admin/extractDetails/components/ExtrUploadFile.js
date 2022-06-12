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
import React from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";

import { DeleteIcon } from "@chakra-ui/icons";
import UploadFileTable from "./UploadFileTable";
import { ColumnUploadFileTable } from "../variables/columnUploadFileTable";
import UploadFileTableData from "../variables/uploadFiletableData.json";
import ExtrResultTable from "./ExtrResultTable";
import { columnsDataExtrResultTable } from "../variables/columnsDataExtrResultTable";
import extrResultData from "../variables/extrResultData.json";

export default function ExtrUploadFile(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} mb="10px" align="center" p="10px" w="100%">
      <Tabs variant="line" colorScheme="purple">
        <TabList>
          <Tab>Bóc tách</Tab>
          <Tab>Kết quả</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card {...rest} mb="10px" align="center" p="10px" w="100%" h="68vh">
              <Flex
                direction={{ base: "column", "2xl": "row" }}
                maxH={{ base: "60%", lg: "60%", "2xl": "100%" }}
                //minH="50%"
                minH={{ base: "60%", lg: "60%", "2xl": "100%" }}
                pb="20px"
              >
                <Dropzone
                  w={{ base: "100%", "2xl": "30%" }}
                  me="24px"
                  maxH={{ base: "25%", lg: "30%", "2xl": "100%" }}
                  minH={{ base: "25%", lg: "30%", "2xl": "100%" }}
                  content={
                    <Box>
                      <Icon
                        as={MdUpload}
                        w="64px"
                        h="64px"
                        color={brandColor}
                      />
                      <Flex justify="center" mx="auto" mb="12px">
                        <Text fontSize="xl" fontWeight="700" color={brandColor}>
                          Upload Files
                        </Text>
                      </Flex>
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        color="secondaryGray.500"
                      >
                        PNG, JPG files are allowed
                      </Text>
                    </Box>
                  }
                />

                <UploadFileTable
                  columnsData={ColumnUploadFileTable}
                  tableData={UploadFileTableData}
                />
              </Flex>
            </Card>
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
                tableData={extrResultData}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
}
