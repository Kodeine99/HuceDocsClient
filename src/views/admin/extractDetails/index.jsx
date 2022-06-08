 // Chakra imports
import { RoutesContext } from "../../../contexts/RoutesContext";

 import React, {useContext } from "react";
 import { Route, Switch, useLocation, useHistory, useRouteMatch } from "react-router-dom";
 import ExtractDetailsContent from "../../../views/admin/extractDetailsContent/index.jsx";
 import { SomeComponent } from "./components/SomeComponent";


 
 // Custom Chakra theme
 export default function ExtractDetails(props) {
  
  const dict  = useContext(RoutesContext).dictionary;
  const location = useLocation().pathname;  

  const docCode = dict.routes[location];

  const {path} = useRouteMatch();
   return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <SomeComponent />
        </Route>
        <Route path={`${path}/thesinhvien`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/bangdiem`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/bangdiemtienganh`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/camkettrano`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/donxinnhaphoc`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/giayxacnhantoeic`}>
          <ExtractDetailsContent />
        </Route>
        <Route path={`${path}/giayxacnhanvayvon`}>
          <ExtractDetailsContent />
        </Route>
      </Switch>
    </>
   );
 }
 