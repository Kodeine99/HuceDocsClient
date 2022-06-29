import React, { useEffect } from "react";
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
import AuthRoute from "routes/AuthRoute";
import NormalRoute from "routes/NormalRoute";
import { useCookies } from "react-cookie";
import { userSelector } from "aaRedux/app/userSlice";
import {useDispatch, useSelector} from "react-redux"
import { setAuth } from "aaRedux/app/userSlice";
import { getUserByToken } from "aaRedux/app/userSlice";
import ProtectedRoute from "routes/ProtectedRoute";




function App() {
  const [cookie] = useCookies();
  const dispatch = useDispatch();
  const user = useSelector(
    userSelector
  )
  const getData = () => {
    if (user.userInfo == null) {
      dispatch(getUserByToken());
    }
  }
  useEffect(() => {
    if (cookie['access_token']) {
      dispatch(setAuth(cookie['access_token']));
      getData();
    }
    // eslint-disable-next-line
  }, [])

  return (
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
                <ProtectedRoute
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
  )
}

export default App;