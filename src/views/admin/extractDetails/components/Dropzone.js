// Chakra imports
import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React from "react";
import { useDropzone } from "react-dropzone";
import { MdCheckCircle } from "react-icons/md";

function Dropzone(props) {
  const { content, ...rest } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  const files = acceptedFiles.map((file) => (
    <ListItem key={file.path}>
      <ListIcon as={MdCheckCircle} color="green.500" />
      {file.path} - {file.size} bytes
    </ListItem>
  ));
  return (
    <>
      <SimpleGrid column={2} gap="20px">
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
          <Button variant="no-effects">{content}</Button>
        </Flex>
        <List spacing={3} size="lg">
          {files}
        </List>
      </SimpleGrid>
    </>
  );
}

export default Dropzone;
