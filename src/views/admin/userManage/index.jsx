// Chakra imports
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect } from "react";
import {
  MdOutlinePeopleOutline,
} from "react-icons/md";

import { columnsUserManageData } from "views/admin/userManage/variables/columnsData";
import UserManageTable from "./components/UserManageTable";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAllUsers } from "aaRedux/app/userSlice";

export default function UserManage() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // get & manage data
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [values, setValues] = useState({});
  const [reload, setReload] = useState(0);

  const onLoadData = async (values) => {
    const actionResult = await dispatch(getAllUsers({ ...values }));

    const apiResult = await unwrapResult(actionResult);
    const users = apiResult.result;

    setListUser(users);
  };

  useEffect(() => {
    const loadData = async () => {
      await onLoadData(values);
    };
    loadData();
    //console.log("values state",values);
    // eslint-disable-next-line
  }, [loading, reload]);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        /> */}
        <MiniStatistics
          startContent={
            <IconBox
              w="64px"
              h="64px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdOutlinePeopleOutline}
                  color={brandColor}
                />
              }
            />
          }
          name="Total Users"
          value={listUser?.length}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <UserManageTable
          columnsData={columnsUserManageData}
          tableData={listUser}
          loadIndex={reload}
          reload={(loadIndex) => setReload(loadIndex)}
        />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
