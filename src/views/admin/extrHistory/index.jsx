
import { Route, Switch, Redirect} from "react-router-dom";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import {
  columnsDataCheck,
} from "views/admin/dataTables/variables/columnsData";

import extrHistoryData from "views/admin/extrHistory/variables/extrHistoryData.json";

import React from "react";
import routes from "../../../routes/routes";
import ExtrHistoryTable from "./components/ExtrHistoryTable";


export default function ExtrHistory() {

  
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        /> */}
        <ExtrHistoryTable columnsData={columnsDataCheck} tableData={extrHistoryData} />
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        /> */}
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
        
      </SimpleGrid>
    </Box>
  );
}
