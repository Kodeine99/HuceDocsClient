import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdDashboard,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdDescription
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Kanban from "views/admin/kanban";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  // {
  //   name: "Trang chủ",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  //   isShow: true,
  // },
  {
    name: "Bóc tách tài liệu",
    layout: "/admin",
    path: "/boctach",
    icon: (
      <Icon
        as={MdDescription}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    isShow: true,
    //secondary: true,
  },
  {
    name: "Lịch sử bóc tách",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/lichsuboctach",
    component: DataTables,
    isShow: true,
    secondary: true,
  },
  {
    name: "Kanban",
    layout: "/admin",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    path: "/kanban",
    component: Kanban,
    isShow: true,
  },
  {
    name: "Thông tin cá nhân",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    isShow: true,
  },
  {
    name: "Đăng nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    isShow: true,
  },
  {
    name: "Extraction Details",
    layout: "/extraction",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
    isShow: false,
  },
];

export default routes;
