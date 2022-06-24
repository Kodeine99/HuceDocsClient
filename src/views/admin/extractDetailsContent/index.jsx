// Chakra imports
import { Portal, Box, useDisclosure, Grid } from "@chakra-ui/react";
// Layout components
import React, { useState } from "react";


import ExtrUploadFile from "../extractDetails/components/ExtrUploadFile";

// Custom Chakra theme
export default function ExtractDetailsContent(props) {
  const {extractType }= props;
  return (
    <Box>
      <Box
      
        mx="auto"
        p={{ base: "20px", md: "30px" }}
        pe="20px"
        minH="100vh"
        
        pt="50px"
      >
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
          {/* Main Fields */}
          <Grid
            templateRows={{
              base: "repeat(1, 1fr)",
              lg: "1fr",
            }}
            gap={{ base: "20px", xl: "20px" }}
          >
            <ExtrUploadFile extractType={extractType} />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
