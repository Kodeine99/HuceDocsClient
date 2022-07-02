import routes from "../../../../routes/routes";
import Banner from "views/admin/marketplace/components/Banner";
import Card from "components/card/Card.js";
import DocCard from "components/card/DocCard.js";
import ComplexTable from "views/admin/userManage/components/ComplexTable";
import { columnsDataComplex } from "views/admin/userManage/variables/columnsData";
import tableDataComplex from "views/admin/userManage/variables/tableDataComplex.json";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

export const SomeComponent = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const docTypeDatas = routes
    .filter((route) => route.name === "Bóc tách tài liệu")
    .map((route) => route.childrens)[0];

  const [dataTypeArr, setDataTypeArr] = React.useState(docTypeDatas);
  //console.log("dataTypeArr", dataTypeArr);

  const filterDocType = (category) => {
    let newDocTypeArr = docTypeDatas.filter(
      (child) => child.category === category
    );
    //console.log("docTypeArr after filter:",newDocTypeArr);
    setDataTypeArr(newDocTypeArr);
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(2, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid", md: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Danh mục tài liệu
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Button
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "12px", md: "15px" }}
                  //to="#art"
                  variant="ghost"
                  onClick={() => setDataTypeArr(docTypeDatas)}
                >
                  All
                </Button>
                <Button
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "12px", md: "15px" }}
                  //to="#music"
                  variant="ghost"
                  onClick={() => filterDocType("Giấy tờ cá nhân")}
                >
                  Giấy tờ cá nhân
                </Button>
                <Button
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "12px", md: "15px" }}
                  //to="#collectibles"
                  variant="ghost"
                  onClick={() => filterDocType("Bảng điểm")}
                >
                  Bảng điểm
                </Button>
                <Button
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "12px", md: "15px" }}
                  //to="#collectibles"
                  variant="ghost"
                  onClick={() => filterDocType("Đơn")}
                >
                  Đơn
                </Button>
                <Button
                  color={textColorBrand}
                  fontWeight="500"
                  variant="ghost"
                  onClick={() => filterDocType("Khác")}
                >
                  Khác
                </Button>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {/* render DoctypeCard */}
              {/* {routes.map((route) =>
                route.layout === "" &&
                typeof route.childrens !== "undefined" &&
                route.childrens.length > 0
                  ? route.childrens.map((child, index) => (
                      <DocCard
                        name={child.name}
                        description={child.description}
                        image={child.imgPath}
                        docPath={child.path}
                        key={index}
                      />
                    ))
                  : null
              )} */}
              {dataTypeArr.map((docType, index) => (
                <DocCard
                  name={docType.name}
                  description={docType.description}
                  image={docType.imgPath}
                  docPath={docType.path}
                  key={index}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        {/* <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
};
