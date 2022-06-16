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
  Button,
  TableContainer,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Assets
import { ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import NotifyModal from "components/shared/custom/modals/NotifyModal";
export default function UploadFileTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

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

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
      //h=""
      //overflowY={{ sm: "scroll", lg: "scroll" }}
    >
      <Flex
        px="25px"
        my="20px"
        justify="space-between"
        mb="20px"
        align="center"
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Danh sách files tải lên
        </Text>
        {/* <Menu /> */}
      </Flex>
      <TableContainer overflowY="scroll">
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
                          <Checkbox
                            defaultChecked={cell.value[1]}
                            colorScheme="brandScheme"
                            me="10px"
                          />
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
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
                              cell.value === "Tải thành công"
                                ? "green.500"
                                : cell.value === "Tải thất bại"
                                ? "red.500"
                                : null
                            }
                            as={
                              cell.value === "Tải thành công"
                                ? MdCheckCircle
                                : cell.value === "Tải thất bại"
                                ? MdCancel
                                : null
                            }
                          />
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "SỐ TRANG") {
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
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
                            icon={<DeleteIcon />}
                            variant="ghost"

                            onClick={() => {
                              setOverlay(<OverlayTwo />);
  
                              setModalTitle(row.values.HUCEDOCS_TYPE);
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
        <NotifyModal
          isOpen={isOpen}
          onClose={onClose}
          overlay={overlay}
          title="Xóa file"
          modalContent={`Bạn có chắc chắn muốn xóa file này`}
        />
      </TableContainer>
      <Flex w="100%" mt="20px">
        <Button
          me="5%"
          //mb='50px'
          w="120px"
          minW="120px"
          mt={{ base: "20px", "2xl": "auto" }}
          //variant='brand'
          colorScheme="purple"
          fontWeight="500"
        >
          Bóc tách
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
          //variant="brand"
          me="5%"
          //mb='50px'
          w="120px"
          minW="120px"
          mt={{ base: "20px", "2xl": "auto" }}
          colorScheme="red"
          fontWeight="500"
        >
          Xoá
        </Button>
      </Flex>
    </Card>
  );
}
