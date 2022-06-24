 // Chakra imports
import { RoutesContext } from "../../../contexts/RoutesContext";

 import React, {useContext } from "react";
 import { Route, Switch, useLocation, useHistory, useRouteMatch } from "react-router-dom";
 import ExtractDetailsContent from "../../../views/admin/extractDetailsContent/index.jsx";
 import { SomeComponent } from "./components/SomeComponent";


 
 // Custom Chakra theme
 export default function ExtractDetails(props) {

  const {path} = useRouteMatch();
   return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <SomeComponent />
        </Route>
        <Route path={`${path}/thesinhvien`}>
          <ExtractDetailsContent extractType="THE_SINH_VIEN" />
        </Route>
        <Route path={`${path}/bangdiem`}>
          <ExtractDetailsContent extractType="BANG_DIEM" />
        </Route>
        <Route path={`${path}/bangdiemtienganh`}>
          <ExtractDetailsContent extractType="BANG_DIEM_TIENG_ANH" />
        </Route>
        <Route path={`${path}/camkettrano`}>
          <ExtractDetailsContent extractType ="GIAY_CAM_KET_TRA_NO" />
        </Route>
        <Route path={`${path}/donxinnhaphoc`}>
          <ExtractDetailsContent extractType ="DON_XIN_NHAP_HOC"/>
        </Route>
        <Route path={`${path}/giayxacnhantoeic`}>
          <ExtractDetailsContent extractType ="GIAY_XAC_NHAN_TOEIC"/>
        </Route>
        <Route path={`${path}/giayxacnhanvayvon`}>
          <ExtractDetailsContent extractType ="GIAY_XAC_NHAN_VAY_VON"/>
        </Route>
      </Switch>
    </>
   );
 }
 