 // Chakra imports
 import { Portal, Box, useDisclosure, Grid } from "@chakra-ui/react";
 import Footer from "components/footer/FooterAdmin.js";
 // Layout components
 import Navbar from "components/navbar/NavbarAdmin.js";
 import Sidebar from "components/sidebar/Sidebar.js";
 import { SidebarContext } from "contexts/SidebarContext";
 import React, { useState } from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import routes from "routes.js";
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
 export default function Extract(props) {
   const { ...rest } = props;
   // states and functions
   const [fixed] = useState(false);
   const [toggleSidebar, setToggleSidebar] = useState(false);
   // functions for changing the states from components
   const getRoute = () => {
     return window.location.pathname !== "/full-screen-maps";
   };
   const getActiveRoute = (routes) => {
     let activeRoute = "Bóc tách";
     for (let i = 0; i < routes.length; i++) {
       if (routes[i].collapse) {
         let collapseActiveRoute = getActiveRoute(routes[i].items);
         if (collapseActiveRoute !== activeRoute) {
           return collapseActiveRoute;
         }
       } else if (routes[i].category) {
         let categoryActiveRoute = getActiveRoute(routes[i].items);
         if (categoryActiveRoute !== activeRoute) {
           return categoryActiveRoute;
         }
       } else {
         if (
           window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
         ) {
           return routes[i].name;
         }
       }
     }
     return activeRoute;
   };
   const getActiveNavbar = (routes) => {
     let activeNavbar = false;
     for (let i = 0; i < routes.length; i++) {
       if (routes[i].collapse) {
         let collapseActiveNavbar = getActiveNavbar(routes[i].items);
         if (collapseActiveNavbar !== activeNavbar) {
           return collapseActiveNavbar;
         }
       } else if (routes[i].category) {
         let categoryActiveNavbar = getActiveNavbar(routes[i].items);
         if (categoryActiveNavbar !== activeNavbar) {
           return categoryActiveNavbar;
         }
       } else {
         if (
           window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
         ) {
           return routes[i].secondary;
         }
       }
     }
     return activeNavbar;
   };
   const getActiveNavbarText = (routes) => {
     let activeNavbar = false;
     for (let i = 0; i < routes.length; i++) {
       if (routes[i].collapse) {
         let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
         if (collapseActiveNavbar !== activeNavbar) {
           return collapseActiveNavbar;
         }
       } else if (routes[i].category) {
         let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
         if (categoryActiveNavbar !== activeNavbar) {
           return categoryActiveNavbar;
         }
       } else {
         if (
           window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
         ) {
           return routes[i].messageNavbar;
         }
       }
     }
     return activeNavbar;
   };
   const getRoutes = (routes) => {
     return routes.map((prop, key) => {
       if (prop.layout === "/extraction") {
         return (
           <Route
             path={prop.layout + prop.path}
             component={prop.component}
             key={key}
           />
         );
       }
       if (prop.collapse) {
         return getRoutes(prop.items);
       }
       if (prop.category) {
         return getRoutes(prop.items);
       } else {
         return null;
       }
     });
   };
   document.documentElement.dir = "ltr";
   const { onOpen } = useDisclosure();
   return (
     <Box>
      
      <Box
        mx='auto'
        p={{ base: "20px", md: "30px" }}
        pe='20px'
        minH='100vh'
        pt='50px'>
      
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          
          templateRows={{
            base: "repeat(1, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}>
          <Upload/>
        </Grid>
        
      </Box>
      </Box>
        
      
    </Box>
   );
 }
 