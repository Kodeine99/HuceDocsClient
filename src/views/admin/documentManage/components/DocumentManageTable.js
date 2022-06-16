import {
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { MdCheckCircle, MdOutlineError } from "react-icons/md";
import EditDocumentModal from "./EditDocumentModal";
import NotifyModal from "components/shared/custom/modals/NotifyModal";
export default function DocumentManageTable(props) {
  const { columnsData, tableData } = props;
  const [renderModal, setRenderModal] = useState(false);

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

  // Modal actions
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [rowData, setRowData] = useState({});

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Quản lý tài liệu bóc tách
        </Text>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        {/* Table Header */}
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
        {/* Table Content */}
        <Tbody {...getTableBodyProps()}>
          {page.map((row, indexx) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()} key={indexx}>
                {row.cells.map((cell, index) => {
                  //console.log(row.original);
                  let data = "";
                  if (cell.column.Header === "TICKET ID") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="md" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "TYPE") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="md"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "NGƯỜI TẠO") {
                    data = (
                      <Text color={textColor} fontSize="md" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "NGÀY TẠO") {
                    data = (
                      <Text color={textColor} fontSize="md" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "NGÀY CẬP NHẬT") {
                    data = (
                      <Text color={textColor} fontSize="md" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TRẠNG THÁI") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === 1
                              ? "green.500"
                              : cell.value === 0
                              ? "red.500"
                              : null
                          }
                          as={
                            cell.value === 1
                              ? MdCheckCircle
                              : cell.value === 0
                              ? MdOutlineError
                              : null
                          }
                        />
                        {cell.value === 1 ? (
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {"Active"}
                          </Text>
                        ) : (
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {"Đã xoá"}
                          </Text>
                        )}
                      </Flex>
                    );
                  } else if (cell.column.Header === "THAO TÁC") {
                    data = (
                      <Flex align="center">
                        <IconButton
                          colorScheme="purple"
                          icon={<EditIcon />}
                          variant="ghost"
                          onClick={() => {
                            setRenderModal(false);
                            setOverlay(<OverlayTwo />);

                            setModalTitle(row.values.HUCEDOCS_TYPE);
                            setRowData(row.original);
                            onOpen();
                          }}
                        />
                        <IconButton
                          colorScheme="purple"
                          icon={<DeleteIcon />}
                          variant="ghost"
                          onClick={() => {
                            setRenderModal(true);
                            setOverlay(<OverlayTwo />);

                            setModalTitle(row.values.HUCEDOCS_TYPE);
                            setRowData(row.original);
                            onOpen();
                          }}
                        />
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
      {renderModal === false ? (
        <EditDocumentModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          modalTitle={modalTitle}
          overlay={overlay}
          data={rowData}
          size={"full"}
        />
      ) : (
        <NotifyModal
          isOpen={isOpen}
          onClose={onClose}
          overlay={overlay}
          title="Xóa tài liệu"
          modalContent={`Bạn có chắc chắn muốn xóa tài liệu này`}
        />
      )}

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
