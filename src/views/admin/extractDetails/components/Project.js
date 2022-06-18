// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdDelete, MdEdit } from "react-icons/md";

export default function Project(props) {
  const { filename, fileExtension, link, fileLength, onClick, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="10px">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        {/* <Image h='80px' w='80px' src={image} borderRadius='8px' me='20px' /> */}
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
            display={"inline-block"}
            mr="40px"
          >
            {filename}
          </Text>
          <Text
            fontWeight="500"
            color={textColorSecondary}
            fontSize="sm"
            mr="20px"
            display={"inline-block"}

          >
            Định dạng:
            <Text marginX={"4px"} display={"inline-block"} color={brandColor}>
              {" "}
              .pdf{" "}
            </Text>
            • dung lượng:{" "}
            <Text
              fontWeight="500"
              color={brandColor}
              fontSize="sm"
              display={"inline-block"}
            >
              {fileLength}
            </Text>
          </Text>
        </Box>
        <Button me="16px" ms="auto" p="0px !important" onClick={onClick}>
          <Icon as={MdDelete} color="red.500" h="18px" w="18px" />
        </Button>
      </Flex>
    </Card>
  );
}
