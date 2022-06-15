import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton, 
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  ModalFooter,
  Button,
  useDisclosure,
  ModalOverlay
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// Icons
import {ViewIcon, DeleteIcon, EditIcon, UnlockIcon, LockIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon} from '@chakra-ui/icons';

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError, MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";
import ExtractResultCard from "components/card/ExtractResultCard";
export default function UserManageTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   page,
  //   prepareRow,
  //   initialState,
  // } = tableInstance;
  // initialState.pageSize = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Quản lý users
        </Text>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "12px", lg: "14px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Username") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Email") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Trạng thái") {
                    data = (
                      <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value === "Active"
                              ? "green.500"
                              : cell.value === "Deactive"
                              ? "red.500"
                              : null
                          }
                          as={
                            cell.value === "Active"
                              ? MdCheckCircle
                              : cell.value === "Deactive"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize='md' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Ngày tạo") {
                    data = (
                      <Text color={textColor} fontSize='md' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Thao tác") {
                    data = (
                      <Flex align='center'>
                        {/* <IconButton  
                          //as={MdEdit}
                          colorScheme='purple' 
                          icon={<EditIcon />} 
                          variant='ghost'
                          size="md"
                        /> */}
                        <IconButton  
                          //as={MdEdit}
                          colorScheme='purple' 
                          icon={row.values.status === "Active" ?<LockIcon /> : <UnlockIcon/>} 
                          variant='ghost'
                          size="md"
                          onClick={() => {
                            setOverlay(<OverlayTwo />);
                            row.values.status === "Active" ? setModalTitle("Khóa tài khoản") : setModalTitle("Mở khóa tài khoản");
                            row.values.status === "Active" ? setModalText("Bạn muốn khoá tài khoản này?") : setModalText("Bạn muốn mở khóa tài khoản này?");
                            onOpen();
                          }}
                        />
                        
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      //onClick={() => console.info(row, cell.value)}
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        {overlay}
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'24px'} fontWeight="bold" >{modalText}</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={'20px'} colorScheme={'whatsapp'} onClick={onClose}>Yes</Button>
            <Button colorScheme={'red'} onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
}
