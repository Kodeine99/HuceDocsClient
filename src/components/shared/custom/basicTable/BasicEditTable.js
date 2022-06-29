import {
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
// import styled from "styled-components";
import { useTable, usePagination } from "react-table";

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

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }

//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `;

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
  const {onClick} = props;
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
      {/* <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
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
        </select>
      </div> */}
    </>
  );
}

function BasicEditTable(props) {
  const {markTableData} = props;

  console.log("markTableData",markTableData)
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

  const lastData = convertToJson(JSON.stringify(markTableData));
  console.log("lastData", lastData)
  const columns = React.useMemo(
    () => [
      {
        Header: "MARK_TABLE",
        accessor: "markTable",
        columns: [
          {
            Header: "SUBJECT CODE",
            accessor: "subjectCode",
          },
          {
            Header: "NAME OF SUBJECTS",
            accessor: "nameOfSubjects",
          },
          {
            Header: "CLASS HOURS",
            accessor: "classHours",
          },
          {
            Header: "CREDITS",
            accessor: "credits",
          },
          {
            Header: "GRADE POINT",
            accessor: "gradePoint",
          },
          {
            Header: "LETTER GRADE",
            accessor: "letterGrade",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState(dummyData);
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

  console.log("newData", data);
  return (
    // <Styles>
    <>
      
      <EditTable
        // onClick = {resetData}
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Button onClick={resetData}>Reset Data</Button>
    </>
    // </Styles>
  );
}

export default BasicEditTable;
