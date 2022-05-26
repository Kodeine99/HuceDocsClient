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

 
 // Custom Chakra theme
 export default function Extraction(props) {
   const { ...rest } = props;
   // states and functions
   const [fixed] = useState(false);
   const [toggleSidebar, setToggleSidebar] = useState(false);
   // functions for changing the states from components
   const getRoute = () => {
     return window.location.pathname !== "/admin/full-screen-maps";
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
       <SidebarContext.Provider
         value={{
           toggleSidebar,
           setToggleSidebar,
         }}>
         <Sidebar routes={routes} display='none' {...rest} />
         <Box
           float='right'
           minHeight='100vh'
           height='100%'
           overflow='auto'
           position='relative'
           maxHeight='100%'
           w={{ base: "100%", xl: "calc( 100% - 290px )" }}
           maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
           transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
           transitionDuration='.2s, .2s, .35s'
           transitionProperty='top, bottom, width'
           transitionTimingFunction='linear, linear, ease'>
           <Portal>
             <Box>
               <Navbar
                 onOpen={onOpen}
                 logoText={"Huce Docs"}
                 brandText={getActiveRoute(routes)}
                 brandTextChild={getActiveNavbarText(routes)}
                 secondary={getActiveNavbar(routes)}
                 message={getActiveNavbarText(routes)}
                 fixed={fixed}
                 {...rest}
               />
             </Box>
           </Portal>
 
           {getRoute() ? (
             <Box
               //mx='auto'
               //p={{ base: "20px", md: "30px" }}
               //pe='20px'
               minH='100vh'
               pt= {{base: "150px", md: "100px", xl: "100px" }}>
               {/* <Switch>
                 {getRoutes(routes)}
                 <Redirect from='/' to='/admin/boctach' />
               </Switch> */}
               <Grid
                templateColumns={{
                  base: "1fr",
                  lg: "1.34fr 1fr 1.62fr",
                }}
                templateRows={{
                  base: "repeat(3, 1fr)",
                  lg: "1fr",
                }}
                gap={{ base: "20px", xl: "20px" }}>
                  <Upload
                    gridArea={{
                      base: "3 / 1 / 4 / 2",
                      lg: "1 / 3 / 2 / 4",
                    }}
                    minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
                    pe='20px'
                    pb={{ base: "100px", lg: "20px" }}
                  />
              </Grid>
               
             </Box>
           ) : null}
           <Box>
             <Footer />
           </Box>
         </Box>
       </SidebarContext.Provider>
     </Box>
   );
 }
 