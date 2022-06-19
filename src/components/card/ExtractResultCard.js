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
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import React from "react";
// Chakra imports
import {} from "@chakra-ui/react";
// Assets
import { MdTimer, MdVideoLibrary } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function ExtractResultCard(props) {
  const { type, data, icon, verifyLink } = props;
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let secondaryBg = useColorModeValue("gray.300", "whiteAlpha.100");
  let thirdBg = useColorModeValue("gray.100", "whiteAlpha.100");
  let mainText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

  console.log("ocrData:",data);
  console.log("verifyLink:",verifyLink);
  return (
    <Flex
      borderRadius="20px"
      bg={secondaryBg}
      //h="px"
      w={{ base: "500px", md: "550px" }}
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
            {Object.entries(data)
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
        </Box>
        <Flex>
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
