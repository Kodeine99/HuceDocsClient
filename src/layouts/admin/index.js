// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import Extract from "../../views/admin/extraction/index";
import Profile from "views/admin/profile";
import Kanban from "views/admin/kanban";
import ExtrHistory from "../../views/admin/extrHistory/index";
import ExtractDetails from "../../views/admin/extractDetails/index";

export default function Dashboard(props) {
  const { ...rest } = props;
  const {url} = useRouteMatch();
  const location = useLocation();
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    const urlArray = location.pathname
      .split("/")
      .slice(1)
      .map((url) => `/${url}`);
      console.log("urlArray", urlArray);
    
    const result = urlArray.map((item) => {
      const index = routes.findIndex((route) => route.path === item);
      if (index !== -1) {
        return routes[index].name;
      }
      for (let i = 0; i <= routes.length; ++i) {
        if (typeof routes[i]?.childrens !== "undefined" && routes.length > 0) {
          const routeChildIndex = routes[i]?.childrens.findIndex((route) => route.path === item);
          if (routeChildIndex !== -1) {
            return routes[i].childrens[routeChildIndex].name;
          }
        }
      }
      return "";
    });
    return result;





    // let activeRoute = "Default Brand Text";
    // for (let i = 0; i < routes.length; i++) {
    //   if (routes[i].collapse) {
    //     let collapseActiveRoute = getActiveRoute(routes[i].items);
    //     if (collapseActiveRoute !== activeRoute) {
    //       return collapseActiveRoute;
    //     }
    //   } else if (routes[i].category) {
    //     let categoryActiveRoute = getActiveRoute(routes[i].items);
    //     if (categoryActiveRoute !== activeRoute) {
    //       return categoryActiveRoute;
    //     }
    //   } else {
    //     if (
    //       window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
    //     ) {
    //       return routes[i].name;
    //     }
    //   }
    // }
    // return activeRoute;
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
    //console.log(routes);
    return routes.map((prop, key) => {
      if (prop.layout === "") {
        return (
          <Route path={prop.path} component={prop.component} key={key}>
            {/* {
            typeof prop.children !== 'undefined' && prop.children.length > 0 ? 
            prop.children.map((prop1, index) =>  
            <Route
              path={`/${prop.path}/${prop1.path}`}
              //path="boctach/:slug"
              component={ExtractionLayout}
              key={index}
            />
            ) : null} */}
          </Route>
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
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Huce Docs"}
                brandText={getActiveRoute(routes)}
                //brandTextChild="abcdef"
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          <Box
            mx="auto"
            p={{ base: "20px", md: "30px" }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            <Switch>
              {/* <Route path="/boctach" component={Extract} /> */}
              <Route path="/boctach" >
                <ExtractDetails />
              </Route>
              <Route path="/lichsuboctach" component={ExtrHistory} />
              <Route path="/thongtincanhan" component={Profile} />
              {/* <Redirect from='*' to='/boctach' /> */}
            </Switch>
          </Box>
          
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
