// Chakra imports
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/tungramen.jpg";
import React from "react";

export default function Overview(props) {
  const userInfo = {
    FullName: "Tung Ramen",
    Username: "tungramen99",
    Email: "tungramen99@gmail.com",
    Phone: "0989898989",
    Address: "Van Quan, Ha Dong, Ha Noi",
    Birthday: null,
    Age: 23,
    Gender: 1
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name="Tung Ramen"
          job="HUCE Student 🤍"
          posts="25"
          followers="9.9k"
          following="1"
        />
        {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 1 / 1 / 3" }}
          used={25.6}
          total={50}
        /> */}
        <GridItem colSpan={2}>
          <General
            userInfo={userInfo}
            //gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
            minH="365px"
            pe="20px"
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
