import {
  Flex,
  Table,
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
  Input,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { matchSorter } from "match-sorter";

// Assets
import {
  ViewIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ViewOffIcon,
  DownloadIcon,
} from "@chakra-ui/icons";

import {
  MdOutlinePendingActions,
  MdDomainVerification,
  MdCancelPresentation,
} from "react-icons/md";

import IoNewspaperOutline from "../../../../assets/img/docs/documentCheck.png";

// Custom components
import Card from "components/card/Card";
import ExtractResultCard from "../../../../components/card/ExtractResultCard";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createDocOcr } from "aaRedux/app/docOcrResultSlice";
import { toast, ToastContainer } from "react-toastify";
import { changeSaveStatus } from "aaRedux/app/ocrRequestSlice";
import moment from "moment";

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
export default function ExtrResultTable(props) {
  const { columnsData, tableData, modalTitle, reload, loadIndex } = props;

  const [ocrData, setOcrData] = useState([]);
  const [fullData, setFullData] = useState();
  const [verifyLink, setVerifyLink] = useState("");
  const [reloadData, setReloadData] = useState(0);

  //const [loadData, setLoadData] = useState(false);
  const dispatch = useDispatch();

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  //console.log("data", data);

  // const filterTypes = useMemo(
  //   () => ({
  //     // Add a new fuzzyTextFilterFn filter type.
  //     fuzzyText: fuzzyTextFilterFn,
  //     // Or, override the default text filter to use
  //     // "startWith"
  //     text: (rows, id, filterValue) => {
  //       return rows.filter((row) => {
  //         const rowValue = row.values[id];
  //         return rowValue !== undefined
  //           ? String(rowValue)
  //               .toLowerCase()
  //               .startsWith(String(filterValue).toLowerCase())
  //           : true;
  //       });
  //     },
  //   }),
  //   []
  // );

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
    visibleColumns,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex },
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

  const convertToJson = (data) => {
    //console.log("old Data:", data);
    let dataAfterReplace = JSON.parse(
      data
        .replace('\\"', '"')
        .replace('"[', "[")
        .replace(']"', "]")
        .replace("\\", "")
        .split("\\")
        .join("")
    );
    //console.log("new Data:", dataAfterReplace);
    //console.log("js",js);
    return dataAfterReplace;
  };

  const handleStateChange = async (fullData, ocrData, verifyLink) => {
    await setFullData(fullData);
    //console.log("fullData:", fullData);

    await setOcrData(convertToJson(ocrData));
    console.log("ocrData:", ocrData);

    await setVerifyLink(verifyLink);
    //console.log("verifyLink:", verifyLink);
  };

  function convertDate(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  //Get documentType
  const getDocType = (type) => {
    let documentType = "";
    switch (type) {
      case "GIAY_XAC_NHAN_TOEIC":
        documentType = "GiayXacNhanToeic";
        break;

      case "THE_SINH_VIEN":
        documentType = "TheSinhVien";
        break;

      case "CCCD":
        documentType = "CCCD";
        break;

      case "BANG_DIEM_TIENG_ANH":
        documentType = "BangDiemTiengAnh";
        break;

      case "BANG_DIEM":
        documentType = "BangDiem";
        break;

      case "GIAY_CAM_KET_TRA_NO":
        documentType = "GiayCamKetTraNo";
        break;

      case "GIAY_XAC_NHAN_VAY_VON":
        documentType = "GiayXacNhanVayVon";
        break;

      case "DON_XIN_NHAP_HOC":
        documentType = "DonXinNhapHoc";
        break;

      default:
        break;
    }
    return documentType;
  };

  // Save data: type: loai tai lieu
  // fullData: lay thoong tin ticket, user create,...
  const saveOcrData = async (
    data4Save,
    fullData,
    markTableData,
    type,
    index
  ) => {
    const { ticket_Id, createTime, ocR_Status_Code, username } = fullData;
    let dataSubmit = {};
    const documentType = getDocType(type);

    typeof markTableData !== "undefined" && markTableData.length > 0
      ? (dataSubmit = {
          ...data4Save,
          MARK_TABLE: JSON.stringify(markTableData),
          TICKET_ID: ticket_Id,
          CREATE_DATE: createTime,
          STATUS: ocR_Status_Code,
          USER_CREATE: username,
          HUCEDOCS_TYPE: documentType,
        })
      : (dataSubmit = {
          ...data4Save,
          TICKET_ID: ticket_Id,
          CREATE_DATE: createTime,
          STATUS: ocR_Status_Code,
          USER_CREATE: username,
          HUCEDOCS_TYPE: documentType,
        });

    // dataSubmit: du lieu cuoi cung mang di luu
    console.log(dataSubmit);
    // console.log("DocumentType", documentType);

    try {
      const actionResult = await dispatch(createDocOcr(dataSubmit));
      const saveResult = await unwrapResult(actionResult);
      console.log("Result", saveResult);
      (await saveResult) &&
        saveResult.isOk === true &&
        toast.success(
          `Lưu kết quả bóc tách của ticket ${ticket_Id} thành công`,
          {
            position: toast.POSITION.TOP_CENTER,
            toastId: 1

          }
        );

      return saveResult;
    } catch (rejectWithValueOrSerializedError) {
      toast.error(rejectWithValueOrSerializedError.message, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 1
      });

      return rejectWithValueOrSerializedError;
    }
  };

  const changeTicketSaveStatus = async (ticket_Id, isSaved) => {
    try {
      const actionResult = await dispatch(changeSaveStatus(ticket_Id, isSaved));
      const changeResult = await unwrapResult(actionResult);
      console.log("Change result:", changeResult);
      reload(loadIndex + 1);
    } catch (rejectWithValueOrSerializedError) {
      toast.error(rejectWithValueOrSerializedError.message, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 1
      });
    }
  };

  const handleSaveOcrData = async (fullData, saveData) => {
    // console.log("Full data", fullData);
    // console.log("4Save Data", saveData);
    await saveData?.map(async (blocksData, index) => {
      typeof blocksData.DATA !== "undefined" && blocksData.DATA.length > 0
        ? blocksData.DATA.map(async (data4Save, index) => {
            // Hanlde input data
            // console.log("block data:", data4Save);
            let { MARK_TABLE, ECM_ID, ...cloneData } = data4Save;
            const markTableObj = {};
            // console.log("Clone data", cloneData);

            markTableObj["MARK_TABLE"] = data4Save["MARK_TABLE"];
            const markTableData = markTableObj?.MARK_TABLE;
            // console.log("markTableData:", markTableData);
            // console.log("marktableDataString", JSON.stringify(markTableData));

            // Save Ocr Data
            await saveOcrData(
              data4Save,
              fullData,
              markTableData,
              blocksData.TYPE,
              index
            );
            await changeTicketSaveStatus(fullData?.ticket_Id);
            // lastResult &&
            //   lastResult.isOk === true &&
            //   toast.success(
            //     `Lưu kết quả bóc tách của file ${index} thành công`,
            //     {
            //       position: toast.POSITION.TOP_CENTER,
            //     }
            //   );
          })
        : toast.error("Có lỗi xảy ra khi lưu kết quả, vui lòng thử lại sau", {
            position: toast.POSITION.TOP_CENTER,
            toastId: 1

          });

      // return lastRes;
      // await lastRes && console.log("lastRes", lastRes);
    });

    // try {

    // } catch (error) {
    //   toast.error("Có lỗi xảy ra khi lưu kết quả, vui lòng thử lại sau", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }
    // console.log("Saving data...");
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <>
      {/* <ToastContainer containerId={1} /> */}
      <Card
        direction="column"
        w="100%"
        px="0px"
        //overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        {/* <Button onClick={() => }>F5</Button> */}
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
                    // console.log("rowData", row.original);
                    let data = "";
                    if (cell.column.Header === "TICKET ID") {
                      data = (
                        <Flex align="center">
                          <Text
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
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "TÊN FILE") {
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {/* {cell.value[0].fileName} */}
                            {/* {console.log("file name cell:", cell.value)} */}
                            {typeof row.original.hFiles !== "undefined" &&
                            row.original.hFiles.length > 0 ? (
                              row.original.hFiles.map((file, index) => {
                                return `${file.fileName} \r\n`;
                              })
                            ) : (
                              <Text>Chưa có file</Text>
                            )}
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
                              cell.value === 1 || cell.value === 3
                                ? "green.500"
                                : cell.value === 2
                                ? "grey.500"
                                : cell.value === 0
                                ? "red.500"
                                : null
                            }
                            as={
                              cell.value === 1 || cell.value === 3
                                ? MdDomainVerification
                                : cell.value === 2
                                ? MdOutlinePendingActions
                                : cell.value === 0
                                ? MdCancelPresentation
                                : null
                            }
                          />
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {cell.value === 1 || cell.value === 3
                              ? "Bóc tách thành công"
                              : cell.value === 2
                              ? "Đang xử lý"
                              : cell.value === 0
                              ? "Bóc tách thất bại"
                              : null}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "SỐ TRANG") {
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="md"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "NGÀY TẠO") {
                      data = (
                        <Text color={textColor} fontSize="md" fontWeight="700">
                          {/* {convertDate(cell.value)} */}
                          {moment(cell.value).format('LLL')}
                        </Text>
                      );
                    } else if (cell.column.Header === "THAO TÁC") {
                      data =
                        row.values.ocR_Status_Code === 1 ||
                        row.values.ocR_Status_Code === 3 ? (
                          <Flex align="center">
                            <Tooltip label="Xem kết quả" fontSize="md">
                              <IconButton
                                colorScheme="purple"
                                icon={<ViewIcon />}
                                variant="ghost"
                                onClick={async () => {
                                  setOverlay(<OverlayTwo />);
                                  // await setFullData(row.original);
                                  // console.log("fullData:", fullData);
                                  // await setOcrData(
                                  //   convertToJson(row.original.jsonData)
                                  // );
                                  // console.log("data", ocrData);
                                  // await setVerifyLink(row.original.verifyLink);
                                  // console.log("verifyLink", verifyLink);

                                  await handleStateChange(
                                    row.original,
                                    row.original.jsonData,
                                    row.original.verifyLink
                                  );
                                  onOpen();
                                }}
                                key={size}
                              />
                            </Tooltip>
                            {row.original.isSaved === 0 ? (
                              <Tooltip
                                label="Lưu kết quả bóc tách"
                                fontSize="md"
                              >
                                <IconButton
                                  colorScheme="purple"
                                  icon={<DownloadIcon />}
                                  variant="ghost"
                                  onClick={async () => {
                                    // await handleStateChange(
                                    //   row.original,
                                    //   row.original.jsonData,
                                    //   row.original.verifyLink
                                    // );
                                    const abc = await handleSaveOcrData(
                                      row.original,
                                      convertToJson(row.original.jsonData)
                                    );
                                    // console.log("abc", abc);
                                  }}
                                />
                              </Tooltip>
                            ) : (
                              <IconButton
                                colorScheme="purple"
                                icon={<DownloadIcon />}
                                variant="ghost"
                                disabled
                              />
                            )}

                            {/* {if (cells.)} */}
                          </Flex>
                        ) : (
                          <Flex align="center">
                            <IconButton
                              colorScheme="purple"
                              icon={<ViewOffIcon />}
                              variant="ghost"
                              disabled
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
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
          {overlay}
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
                {ocrData?.map((item, index) => {
                  console.log("item data", item.DATA);
                  return (
                    <>
                      {typeof item.DATA !== "undefined" &&
                      item.DATA.length > 0 ? (
                        item.DATA.map((childItem, index) => {
                          // console.log("child:", childItem);
                          return (
                            <ExtractResultCard
                              // ocR_Status_Code = {}
                              key={index}
                              type={item?.TYPE}
                              data={childItem}
                              icon={IoNewspaperOutline}
                              verifyLink={verifyLink}
                              fullData={fullData}
                              forSaveData={item.DATA}
                            />
                          );
                        })
                      ) : (
                        <Text>Không có dữ liệu</Text>
                      )}
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
    </>
  );
}
