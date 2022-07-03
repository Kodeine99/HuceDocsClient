// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Assets
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import Project from "../components/Project";
import { userSelector } from "aaRedux/app/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { extraction } from "aaRedux/app/extractionSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import { MdUpload } from "react-icons/md";

function Dropzone(props) {
  const { content, extractType, ...rest } = props;
  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    // accept: {
    //   'application/pdf': [],
    //   'img/tiff': [],
    //   'application/msword': [],
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    // },
    maxFiles: 5,
  });

  // handle file upload state

  const [exType] = useState(extractType);

  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [loadListFile, setLoadListFile] = useState(1);
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);

  const { userInfor, loading, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  function bytesToSize(bytes, seperator = "") {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
  }

  // Remove file from listFiles
  const removeFile = (file) => () => {
    //console.log('removeFile...')
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setLoadListFile(loadListFile + 1);
    // setReload(reload + 1)
  };

  const removeAll = () => {
    console.log("removeAll...");
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    inputRef.current.value = "";
    console.log(acceptedFiles);
    setLoadListFile(loadListFile + 1);
  };

  const handleExtraction = async (userId, extractType, files) => {
    const extractReq = {
      userId: userId,
      extractType: extractType,
      files: files,
    };
    console.log("req", extractReq);

    // const actionResult = dispatch(extraction(userId, extractType, files));
    const actionResult = await dispatch(extraction(extractReq));
    console.log("actionResult", actionResult);

    const extractionResult = await unwrapResult(actionResult);
    console.log("extractionResult", extractionResult);

    if (extractionResult?.isOk === true) {
      toast.success(
        "Đang tiến hành bóc tách, vui lòng chờ kết quả bên Tab 'Kết quả' ",
        {
          position: toast.POSITION.TOP_CENTER,
          toastId: 2

        }
      );
    } else {
      toast.error("Bóc tách thất bại", {
        position: toast.POSITION.TOP_CENTER,
        toastId: 2

      });
    }
  };

  // const files = listFile?.map(
  //   (file) => (
  //     console.log(file),
  //     (
  //       <Project
  //         boxShadow={cardShadow}
  //         mb="20px"
  //         //image={Project1}
  //         fileExtension="1"
  //         filename={file.name}
  //         fileLength={bytesToSize(file.size)}
  //       />
  //     )
  //     // <ListItem key={file.path}>
  //     //   <ListIcon as={MdCheckCircle} color="green.500" />
  //     //   {file.path} - {file.size} bytes
  //     // </ListItem>
  //   )
  // );
  // useEffect(() => {}, [reload, acceptedFiles]);
  return (
    <>
      {/* <ToastContainer containerId={2} /> */}
      <Card {...rest} mb="10px" p="10px" w="100%" h="100vh">
        <Flex
          direction={{ base: "column", "2xl": "column" }}
          maxH={{ base: "25%", lg: "25%", "2xl": "28%" }}
          //minH="50%"
          minH={{ base: "25%", lg: "25%", "2xl": "28%" }}
          pb="20px"
        >
          <Flex
            align="center"
            justify="center"
            bg={bg}
            border="1px dashed"
            borderColor={borderColor}
            borderRadius="16px"
            w="100%"
            h="max-content"
            minH="100%"
            cursor="pointer"
            {...getRootProps({ className: "dropzone" })}
            {...rest}
          >
            <Input variant="main" {...getInputProps()} />
            <Button variant="no-effects">
              <Box>
                <Icon as={MdUpload} w="64px" h="64px" color={brandColor} />
                <Flex justify="center" mx="auto" mb="12px">
                  <Text fontSize="xl" fontWeight="700" color={brandColor}>
                    Upload Files
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  PDF, .DOCX, .DOC, .TIF and .TIFF files are allowed
                </Text>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  (5 files are the maximum number of files you can drop here)
                </Text>
              </Box>
            </Button>
          </Flex>

          <Box mt={"20px"} maxH="100%">
            {acceptedFiles?.map((file, index) => (
              <Project
                key={index}
                boxShadow={cardShadow}
                mb="20px"
                //image={Project1}
                fileExtension={file.type}
                filename={file.name}
                fileLength={bytesToSize(file.size)}
                onClick={removeFile(file)}
              />
            ))}
            <Button
              isLoading={spinning}
              spinnerPlacement="start"
              variant={"outline"}
              colorScheme={"teal"}
              onClick={async () => {
                await setSpinning(true);
                console.log("accepted file before", acceptedFiles);
                await handleExtraction(userInfor?.id, exType, acceptedFiles);
                setSpinning(false);
                removeAll();
                // acceptedFiles.forEach((file) => {
                //   removeFile(file);
                //   console.log(file);
                // });

                // setReload(reload + 1);
              }}
            >
              Bóc tách
            </Button>
            <Button
              ml={"25px"}
              variant={"outline"}
              colorScheme={"red"}
              onClick={() => removeAll()}
            >
              Remove All
            </Button>
          </Box>
        </Flex>
      </Card>
    </>
  );
}

export default Dropzone;
