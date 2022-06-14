import {
  Flex,
  Table,
  Checkbox,
  Icon,
  IconButton,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Assets
import {
  ViewIcon,
  DeleteIcon,
  EditIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdOutlinePendingActions,
  MdDomainVerification,
  MdCancelPresentation,
} from "react-icons/md";

import personalIdentificationCard from "../../../../assets/img/docs/personal-identification-card.png";
import IoNewspaperOutline from "../../../../assets/img/docs/documentCheck.png";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import ExtractResultCard from "../../../../components/card/ExtractResultCard";
export default function ExtrResultTable(props) {
  const ocrData = [
    {
      TYPE: "GIAY_XAC_NHAN_TOEIC",
      DATA: [
        {
          HO_TEN: "Trương Việt Hà",
          NGAY_SINH: "22/8/1998",
          MSSV: "68661",
          LOP: "61MNE",
          NGANH_HOC: "Kỹ thuật Cấp thoát nước",
          HE_DAO_TAO: "Đại học chính quy",
          KHOA: "Kỹ thuật Môi trường",
          NDXN: "Đã tham gia kỳ thi đánh giá trình độ tiếng Anh nội bộ theo dạng thức TOEIC.",
          DIEM_THI: "490/990",
          DOT_THI: "8/2020",
          NGAY_XAC_NHAN: "17/12/2021",
          ECM_ID: "",
        },
        {
          HO_TEN: "Nguyễn Văn Tùng",
          NGAY_SINH: "25/10/1999",
          MSSV: "228062",
          LOP: "62PM1",
          NGANH_HOC: "Công nghệ phần mềm",
          HE_DAO_TAO: "Đại học chính quy",
          KHOA: "Công nghệ thông tin",
          NDXN: "Đã tham gia kỳ thi đánh giá trình độ tiếng Anh nội bộ theo dạng thức TOEIC.",
          DIEM_THI: "825/990",
          DOT_THI: "1/2022",
          NGAY_XAC_NHAN: "17/1/2021",
          ECM_ID: "",
        },
      ],
    },
  ];
  const { columnsData, tableData, modalTitle } = props;

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
  // Test Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      //overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Table {...getTableProps()} variant="simple" color="gray.500">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
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
                  if (cell.column.Header === "TÊN FILE") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "TRẠNG THÁI") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Bóc tách thành công"
                              ? "green.500"
                              : cell.value === "Đang xử lý"
                              ? "grey.500"
                              : cell.value === "Lỗi"
                              ? "red.500"
                              : null
                          }
                          as={
                            cell.value === "Bóc tách thành công"
                              ? MdDomainVerification
                              : cell.value === "Đang xử lý"
                              ? MdOutlinePendingActions
                              : cell.value === "Lỗi"
                              ? MdCancelPresentation
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "SỐ TRANG") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "NGÀY TẠO") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "THAO TÁC") {
                    data = (
                      <Flex align="center">
                        <IconButton
                          colorScheme="purple"
                          icon={<ViewIcon />}
                          variant="ghost"
                          onClick={() => {
                            setOverlay(<OverlayTwo />);
                            onOpen();
                          }}
                          key={size}
                        />
                        {/* {if (cells.)} */}
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                      
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        {overlay}
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 3, md: 3 }} gap="20px" >
              {ocrData.map((item, index) => {
                return (
                  <>
                    {typeof item.DATA !== "undefined" && item.DATA.length > 0
                      ? item.DATA.map((childItem, index) => {
                          return (
                            <ExtractResultCard
                              type={item?.TYPE}
                              data={childItem}
                              icon={IoNewspaperOutline}
                            />
                          );
                        })
                      : null}
                  </>
                );
              })}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
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
          {/* <Select
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
          </Select> */}
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
