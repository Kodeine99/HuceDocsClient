// Chakra imports
import { Portal, Box, useDisclosure, Grid } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../../routes/routes";
import Upload from "views/admin/profile/components/Upload";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";

// Custom Chakra theme
export default function ExtractDetailsContent(props) {
  return (
    <Box>
      <Box
        mx="auto"
        p={{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        pt="50px"
      >
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          {/* Main Fields */}
          <Grid
            templateRows={{
              base: "repeat(1, 1fr)",
              lg: "1fr",
            }}
            gap={{ base: "20px", xl: "20px" }}
          >
            <Upload />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
