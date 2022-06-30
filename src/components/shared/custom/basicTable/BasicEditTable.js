import {
  Button,
  ButtonGroup,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import styled from "styled-components";
import { useTable, usePagination } from "react-table";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { createDocOcr } from "aaRedux/app/docOcrResultSlice";
import { toast, ToastContainer } from "react-toastify";
import { updateDocOcr } from "aaRedux/app/docOcrResultSlice";

// import makeData from "./makeData";

const dummyData = [
  {
    subjectCode: "580101",
    nameOfSubjects: "English 1",
    classHours: "120",
    credits: "2",
    gradePoint: "8.5",
    letterGrade: "A",
  },
  {
    subjectCode: "580102",
    nameOfSubjects: "English 2",
    classHours: "120",
    credits: "2",
    gradePoint: "8.5",
    letterGrade: "A",
  },
];

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      color={textColor}
      size="sm"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function EditTable({ columns, data, updateMyData, skipPageReset, ...props }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  );
  const { onClick } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Render the UI for your table
  return (
    <>
      {/* <Button onClick={onClick}>Reset Data</Button> */}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th borderColor={borderColor} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      fontSize={{ sm: "14px" }}
                      // minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

function BasicEditTable(props) {
  const { markTableData, documentId, documentType, fieldValues, reload, loadIndex } = props;

  const dispatch = useDispatch();
  // Data get tu Db cos type === "string"
  console.log("markTableDataQLTL", markTableData);
  console.log("documentId", documentId);
  console.log("documentType", documentType);
  console.log("fieldValues", fieldValues);

  const columns = React.useMemo(
    () => [
      {
        Header: "MARK_TABLE",
        accessor: "markTable",
        columns: [
          {
            Header: "SUBJECT CODE",
            accessor: "SUBJECT_CODE",
          },
          {
            Header: "NAME OF SUBJECTS",
            accessor: "NAME_OF_SUBJECTS",
          },
          {
            Header: "CLASS HOURS",
            accessor: "CLASS_HOURS",
          },
          {
            Header: "CREDITS",
            accessor: "CREDITS",
          },
          {
            Header: "GRADE POINT",
            accessor: "GRADE_POINT",
          },
          {
            Header: "LETTER GRADE",
            accessor: "LETTER_GRADE",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState(JSON.parse(markTableData));
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  // const  {marK_TABLE, ...fieldValueSubmit} = fieldValues;
  // console.log("fieldValueSubmit",fieldValueSubmit)
  // console.log("newData", data);

  console.log("newData", data);

  const updateData = async (id, documentType, markTableData4Update) => {
    // get data of normal fields
    const { marK_TABLE, ...fieldValueSubmit } = fieldValues;
    console.log("fieldValueSubmit", fieldValueSubmit);

    let dataSubmited = {};
    // const documentType =
    typeof data !== "undefined" && data.length > 0
      ? (dataSubmited = {
          ...fieldValueSubmit,
          id: id,
          status: 1,
          MARK_TABLE: markTableData4Update,
          documentType: documentType
        })
      : (dataSubmited = {
          ...fieldValueSubmit,
          id: id,
          status: 1,
          documentType: documentType
        });

    console.log("dataSubmited", dataSubmited);

    try {
      const actionResult = await dispatch(
        updateDocOcr(dataSubmited)
      );
      const updateResult = await unwrapResult(actionResult);

      console.log("updateResult", updateResult);
      // reload(loadIndex + 1)

      (await updateResult) &&
        updateResult?.isOk === true &&
        toast.success("Cập nhật thông tin thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
      // return updateResult;
    } catch (rejectWithValueOrSerializedError) {
      toast.error("Cập nhật thất bại", {
        position: toast.POSITION.TOP_CENTER,
      });

      // return rejectWithValueOrSerializedError;
    }
    
  };

  return (
    // <Styles>
    <>
    <ToastContainer/>
      <EditTable
        // onClick = {resetData}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Flex>
        <ButtonGroup>
          <Button
            colorScheme={"whatsapp"}
            onClick={() =>
              updateData(documentId, documentType, JSON.stringify(data))
            }
          >
            Cập nhật dữ liệu
          </Button>
          <Button colorScheme={"red"} onClick={() => resetData()}>
            Reset dữ liệu bảng
          </Button>
        </ButtonGroup>
      </Flex>
    </>
    // </Styles>
  );
}

export default BasicEditTable;
