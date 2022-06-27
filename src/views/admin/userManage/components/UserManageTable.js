import {
  Flex,
  Table,
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
  ModalFooter,
  Button,
  useDisclosure,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useFilters,
  useAsyncDebounce,
} from "react-table";
// Icons
import {
 
  UnlockIcon,
  LockIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  AddIcon,
} from "@chakra-ui/icons";

// Custom components
import Card from "components/card/Card";

// Assets
import {
  MdCheckCircle,
  MdOutlineError,
} from "react-icons/md";
import { matchSorter } from "match-sorter";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { adminUpdateActive } from "aaRedux/app/userSlice";
import { toast, ToastContainer } from "react-toastify";
import AddNewUserModal from "components/shared/custom/modals/AddNewUserModal";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <Input
        mt={"10px"}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "14px",
          border: "0",
        }}
        color="gray.500"
      />
    </span>
  );
}

// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length;

//   return (
//     <Input
//       value={filterValue || ""}
//       onChange={(e) => {
//         setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   );
// }

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

export default function UserManageTable(props) {
  const dispatch = useDispatch();
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  // const defaultColumn = useMemo(
  //   () => ({
  //     // Let's set up our default Filter UI
  //     Filter: DefaultColumnFilter,
  //   }),
  //   []
  // );

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
    visibleColumns,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      filterTypes,

      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderModal, setRenderModal] = useState(false);

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
  const [isActive, setIsActive] = useState();
  const [userId, setUserId] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const updateActive = async (isActive, userId) => {
    let reqObj = {
      isActive: !isActive,
      memberId: userId,
    };

    console.log("req", reqObj);
    const actionResult = await dispatch(adminUpdateActive(reqObj));
    const result = await unwrapResult(actionResult);
    console.log("Result", result);

    (await result?.isOk) === true
      ? toast.success("Cập nhật thành công", {
          position: toast.POSITION.TOP_CENTER,
        })
      : toast.error("Cập nhật thất bại", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });

    props.reload(props.loadIndex + 1);
    //await getUserData();
  };
  return (
    <>
      <ToastContainer />
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex px="25px" justify="space-between" mb="10px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Quản lý users
          </Text>
          <Button
            onClick={() => {
              setRenderModal(false);
              setOverlay(<OverlayTwo />);

              onOpen();
            }}
            colorScheme="whatsapp"
            rightIcon={<AddIcon />}
          >
            Thêm mới
          </Button>
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
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
                      fontSize={{ sm: "12px", lg: "14px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                      {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
            <Tr>
              <Th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </Th>
            </Tr>
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
                        <Text color={textColor} fontSize="md" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Email") {
                      data = (
                        <Text color={textColor} fontSize="md" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Trạng thái") {
                      data = (
                        <Flex align="center">
                          <Icon
                            w="24px"
                            h="24px"
                            me="5px"
                            color={
                              cell.value === true
                                ? "green.500"
                                : cell.value === false
                                ? "red.500"
                                : null
                            }
                            as={
                              cell.value === true
                                ? MdCheckCircle
                                : cell.value === false
                                ? MdOutlineError
                                : null
                            }
                          />
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {cell.value === true ? "Hoạt động" : "Bị khoá"}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "Phone number") {
                      data = (
                        <Text color={textColor} fontSize="md" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Thao tác") {
                      data = (
                        <Flex align="center">
                          {/* <IconButton  
                          //as={MdEdit}
                          colorScheme='purple' 
                          icon={<EditIcon />} 
                          variant='ghost'
                          size="md"
                        /> */}
                          <IconButton
                            //as={MdEdit}
                            colorScheme="purple"
                            icon={
                              row.values.active === true ? (
                                <LockIcon />
                              ) : (
                                <UnlockIcon />
                              )
                            }
                            variant="ghost"
                            size="md"
                            onClick={() => {
                              setRenderModal(true);
                              setOverlay(<OverlayTwo />);

                              row.values.active === true
                                ? setModalTitle("Khóa tài khoản")
                                : setModalTitle("Mở khóa tài khoản");
                              row.values.active === true
                                ? setModalText("Bạn muốn khoá tài khoản này?")
                                : setModalText(
                                    "Bạn muốn mở khóa tài khoản này?"
                                  );
                              onOpen();
                              setIsActive(row.values.active);
                              setUserId(row.original.id);
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
                        maxH="30px !important"
                        py="8px"
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
          // <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          //   {overlay}
          //   <ModalContent>
          //     <ModalHeader>Thêm mới người dùng</ModalHeader>
          //     <ModalCloseButton />
          //     <ModalBody>
          //       <Text fontSize={"24px"} fontWeight="bold">
          //         Thêm mới form
          //       </Text>
          //     </ModalBody>
          //     <ModalFooter>
          //       <Button
          //         mr={"20px"}
          //         colorScheme={"whatsapp"}
          //         onClick={async () => {
          //           await updateActive(isActive, userId);
          //           onClose();
          //         }}
          //       >
          //         Thêm
          //       </Button>
          //       <Button colorScheme={"red"} onClick={onClose}>
          //         Huỷ
          //       </Button>
          //     </ModalFooter>
          //   </ModalContent>
          // </Modal>
          <AddNewUserModal
            onClose={onClose}
            isOpen={isOpen}
            overlay={overlay}
            loadIndex={props.reload}
            reload={(loadIndex) => props.setReload(loadIndex)}
          />
        ) : (
          <Modal onClose={onClose} size="xl" isOpen={isOpen}>
            {overlay}
            <ModalContent>
              <ModalHeader>{modalTitle}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize={"24px"} fontWeight="bold">
                  {modalText}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={"20px"}
                  colorScheme={"whatsapp"}
                  onClick={async () => {
                    await updateActive(isActive, userId);
                    onClose();
                  }}
                >
                  Yes
                </Button>
                <Button colorScheme={"red"} onClick={onClose}>
                  No
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
    </>
  );
}
