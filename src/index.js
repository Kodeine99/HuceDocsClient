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
import AuthRoute from "routes/AuthRoute";
import NormalRoute from "routes/NormalRoute";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutesProvider>
            <BrowserRouter>
              <Switch>
                {/* Authenticate Route */}
                <NormalRoute path="/auth" component={AuthLayout} />

                {/* User Logined Route */}
                <AuthRoute path="/boctach" component={AdminLayout} />
                <AuthRoute path="/lichsuboctach" component={AdminLayout} />
                <AuthRoute
                  path="/thongtincanhan"
                  exact
                  component={AdminLayout}
                />
                <AuthRoute
                  path="/tailieuhuongdan"
                  exact
                  component={AdminLayout}
                />
                <AuthRoute
                  path="/quanlynguoidung"
                  exact
                  component={AdminLayout}
                />
                <AuthRoute
                  path="/quanlytailieu"
                  exact
                  component={AdminLayout}
                />
                {/* <Route path="/extraction" component={ExtractionLayout} /> */}

                {/* RTL Route */}
                <AuthRoute path="/rtl" component={RTLLayout} />

                <Redirect exact from="*" to="/boctach" />
              </Switch>
            </BrowserRouter>
          </RoutesProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
