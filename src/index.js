import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import ExtractionLayout from "layouts/extraction";
import { Provider } from "react-redux";
import store from "./aaRedux/app/store";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthLayout} />
            <Route path="/" component={AdminLayout} >
              {/* <Route path={`:docId`} component={ExtractionLayout} /> */}
            </Route>
            <Route path="/rtl" component={RTLLayout} />
            {/* <Route path="/extraction" component={ExtractionLayout} /> */}
            <Redirect exact from='/' to='/boctach' />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
