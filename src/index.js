import React from "react";
import ReactDOM from "react-dom";
import store from "./aaRedux/app/store";
import { Provider } from "react-redux";
import "assets/css/App.css";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "./layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import ExtractionLayout from "layouts/extraction";
import { RoutesProvider } from "./contexts/RoutesContext";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <RoutesProvider>
          <BrowserRouter>
            <Switch>
              {/* Authenticate Route */}
              <Route path="/auth" component={AuthLayout} />

              {/* User Logined Route */}
              <Route path="/boctach" component={AdminLayout} />
              <Route path="/lichsuboctach" component={AdminLayout} />
              <Route path="/thongtincanhan" exact component={AdminLayout} />
              {/* <Route path="/extraction" component={ExtractionLayout} /> */}

              {/* RTL Route */}
              <Route path="/rtl" component={RTLLayout} />

              <Redirect exact from="*" to="/boctach" />
            </Switch>
          </BrowserRouter>
        </RoutesProvider>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
