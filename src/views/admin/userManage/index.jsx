// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdOutlinePeopleOutline
} from "react-icons/md";
import CheckTable from "views/admin/userManage/components/CheckTable";
import ComplexTable from "views/admin/userManage/components/ComplexTable";
import DailyTraffic from "views/admin/userManage/components/DailyTraffic";
import PieCard from "views/admin/userManage/components/PieCard";
import Tasks from "views/admin/userManage/components/Tasks";
import TotalSpent from "views/admin/userManage/components/TotalSpent";
import WeeklyRevenue from "views/admin/userManage/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  columnsUserManageData,
} from "views/admin/userManage/variables/columnsData";
import tableDataCheck from "views/admin/userManage/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/userManage/variables/tableDataComplex.json";
import userTableData from "views/admin/userManage/variables/userTableData.json";
import Banner from "views/admin/marketplace/components/Banner";
import UserManageTable from "./components/UserManageTable";

export default function UserManage() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
                <Icon w="32px" h="32px" as={MdOutlinePeopleOutline} color={brandColor} />
              }
            />
          }
          name="Total Users"
          value="10"
        />
      </SimpleGrid>

      {
        // Statics chart monthly & weekly
      }
      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid> */}

      {
        //
      }
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <UserManageTable
          columnsData={columnsUserManageData}
          tableData={userTableData}
        />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}