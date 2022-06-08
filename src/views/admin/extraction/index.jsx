
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../../../routes/routes";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import DocCard from "components/card/DocCard.js";
import ComplexTable from "views/admin/default/components/ComplexTable";
import {
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";


//Icons
import {TimeIcon} from "@chakra-ui/icons";

// Assets
import docTypeDataObj from "views/admin/marketplace/variables/docTypeDataObj.js";

export default function Extract() {



  const getRoute = () => {
    return window.location.pathname !== "/full-screen-maps";
  };
  const getChildRoute = (routes) => {
    return routes.map((route, index) => {
     if (route.layout === "" && typeof(route.childrens) !== "undefined" && route.childrens.length > 0) {
      //console.log(route.children);
      route.childrens.map((child, index) => {
        return <Route key={index} path={`/${route.path}/${child.path}`} component={child.component} />;
      })
     } else {
       return null;
     }
    });
  };
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Danh mục tài liệu
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  All
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Giấy tờ cá nhân
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Bảng điểm
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Đơn
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Khác
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
               {/* render DoctypeCard */}
              {routes.map((route) => (
                (route.layout === "" && typeof(route.childrens) !== "undefined" && route.childrens.length > 0) ? (
                  route.childrens.map((child, index) => (
                    <DocCard
                      name={child.name}
                      description={child.description}
                      image={child.imgPath}
                      docPath = {child.path}
                      key={index}
                    />
                  )
                ) ): null
              ))} 
              {/* {getRoute() ? (
                <Box
                  mx='auto'
                  p={{ base: "20px", md: "30px" }}
                  pe='20px'
                  minH='100vh'
                  pt='50px'>
                  <Switch>
                    {getChildRoute(routes)}
                    
                    <Redirect from='*' to='/boctach' />
                  </Switch>
                </Box>
              ) : null} */}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            {/* <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            /> */}
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
