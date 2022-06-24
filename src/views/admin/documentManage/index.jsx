import { Route, Switch, Redirect } from "react-router-dom";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { columnsDataCheck } from "views/admin/dataTables/variables/columnsData";
import tableDataFiles from "./variables/tableDataFiles.json";
import React from "react";
import DocumentManageTable from "./components/DocumentManageTable";
import { columnsDataDocTable } from "./variables/columnsDataDocTable";

export default function DocumentManage() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        
        <DocumentManageTable
          columnsData={columnsDataDocTable}
          tableData={tableDataFiles}
        />
        
      </SimpleGrid>
    </Box>
  );
}
