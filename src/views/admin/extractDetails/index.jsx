 // Chakra imports
import { RoutesContext } from "../../../contexts/RoutesContext";

 import React, {useContext } from "react";
 import { Route, Switch, useLocation, useHistory } from "react-router-dom";
 import ExtractDetailsContent from "../../../views/admin/extractDetailsContent/index.jsx";


 
 // Custom Chakra theme
 export default function ExtractDetails(props) {
  
  const dict  = useContext(RoutesContext).dictionary;
  const location = useLocation().pathname;  

  const docCode = dict.routes[location];
   return (
     <Switch>
       <Route path="/boctach/*" component={ExtractDetailsContent}></Route>
     </Switch>
   );
 }
 