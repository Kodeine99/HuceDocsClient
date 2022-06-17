// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import tableDataFiles from "views/admin/dataTables/variables/tableDataFiles.json";
import {
  columnsDataCheck,
} from "views/admin/dataTables/variables/columnsData";
import { DeleteIcon } from "@chakra-ui/icons";



export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} mb='20px' align='center' p='20px'>
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "400px" }}
          me='36px'
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
              <Flex justify='center' mx='auto' mb='12px'>
                <Text fontSize='xl' fontWeight='700' color={brandColor}>
                  Upload Files
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
        <Flex direction='column' pe='44px'>
          
          <CheckTable columnsData={columnsDataCheck} tableData={tableDataFiles} />
          <Flex w='100%'>
            <Button
              me='5%'
              //mb='50px'
              w='120px'
              minW='120px'
              mt={{ base: "20px", "2xl": "auto" }}
              //variant='brand'
              colorScheme="purple"
              fontWeight='500'>
              Bóc tách
            </Button>
            <Button 
              leftIcon={<DeleteIcon />} 
              //variant="brand"
              me='5%'
              //mb='50px'
              w='120px'
              minW='120px'
              mt={{ base: "20px", "2xl": "auto" }}
              colorScheme="red"
              fontWeight='500'>
              Xoá
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
