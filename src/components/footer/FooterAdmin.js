/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "50px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          HuceDocs. All Rights Reserved. Made with ❤️ by
          <Link
            mx='3px'
            color={textColor}
            href='https://github.com/Kodeine99'
            target='_blank'
            fontWeight='700'>
            Tung Ramen!
          </Link>
        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <NavLink
            fontWeight='500'
            color={textColor}
            to='/tailieuhuongdan'>
            Documentation
          </NavLink>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <NavLink
            fontWeight='500'
            color={textColor}
            to='/tailieuhuongdan'>
            Contact
          </NavLink>
        </ListItem>
        {/* <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={textColor}
            href='https://simmmple.com/terms-of-service'>
            Terms of Use
          </Link>
        </ListItem> */}
        {/* <ListItem>
          <Link
            fontWeight='500'
            color={textColor}
            href='https://www.blog.simmmple.com/'>
            Blog
          </Link>
        </ListItem> */}
      </List>
    </Flex>
  );
}
