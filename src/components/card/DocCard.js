// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
//import { Link as ReachLink } from "@reach/router"
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import ImgTest from "assets/img/docs/CCCD.png";
import { Route, NavLink } from "react-router-dom";

export default function DocCard(props) {
  const { name, description,  download, currentBid, image, docPath } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  //uppercase name
  
  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "10px", "2xl": "10px" }} position='relative'>
          {/* <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius='20px'
          /> */}
          
          {/* <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='0px'
            right='0px'
            borderRadius='50%'
            minW='24px'
            h='24px'
            onClick={() => {
              setLike(!like);
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button> */}
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column' >
              <Flex direction='row' > 
                <Image
                  borderRadius='full'
                  //boxSize='45px'
                  w='45px' h='45px'
                  src={image}
                  //alt='Dan Abramov'
                  mr='10px'
                />
                <Text
                  //align='center'
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px'>
                  {name}
                </Text>
              
              </Flex>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {description}
              </Text>
            </Flex>
            {/* <AvatarGroup
              max={3}
              color={textColorBid}
              size='sm'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize='12px'>
              {bidders.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup> */}
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='12px'>
              <NavLink
                
                to={`/boctach${docPath}`}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}>
                <Button
                  variant='darkBrand'
                  color='white'
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='70px'
                  px='12px'
                  py='5px'>
                  Bóc tách ngay
                </Button>
              </NavLink>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
