import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdLock,
  MdDescription,
  MdBook,
  MdPersonSearch,
} from "react-icons/md";
import {HiDocumentSearch} from "react-icons/hi";
// Admin Imports
import UserManage from "views/admin/userManage";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DocumentView from "../views/admin/documents/index";
import DataTables from "views/admin/dataTables";
import DocumentManage from "views/admin/documentManage/index";
import Extract from "views/extraction/default";

// ICON
import CCCD from "assets/img/docs/CCCD.png";
import BaiThiTN from "assets/img/docs/BaithiTN.png";
import BocTachGiayTo from "assets/img/docs/Boctachgiayto.png";
import DKKD from "assets/img/docs/DKKD.png";
import TheTinDung from "assets/img/docs/TheTinDung.png";

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
    layout: "",
    path: "/boctach",
    icon: (
      <Icon as={MdDescription} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    isShow: true,
    childrens: [
      {
        path: "/thesinhvien",
        name: "THẺ SINH VIÊN",
        description:
          "Nhận diện thẻ sinh viên, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: CCCD,
        component: Extract,
        category: "Giấy tờ cá nhân"
      },
      {
        path: "/cccd",
        name: "CĂN CƯỚC CÔNG DÂN",
        description:
          "Nhận diện căn cước công dân, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: CCCD,
        component: Extract,
        category: "Giấy tờ cá nhân"
      },
      {
        path: "/bangdiem",
        name: "BẢNG ĐIỂM",
        description:
          "Nhận diện bảng điểm, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: BaiThiTN,
        component: Extract,
        category: "Bảng điểm"
      },
      {
        path: "/bangdiemtienganh",
        name: "BẢNG ĐIỂM TIẾNG ANH",
        description:
          "Nhận diện thẻ bảng điểm tiếng anh, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: BaiThiTN,
        component: Extract,
        category: "Bảng điểm"
      },
      {
        path: "/camkettrano",
        name: "CAM KẾT TRẢ NỢ",
        description:
          "Nhận diện giấy cam kết trả nợ, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: TheTinDung,
        component: Extract,
        category: "Khác"
      },
      {
        path: "/donxinnhaphoc",
        name: "ĐƠN XIN NHẬP HỌC",
        description:
          "Nhận diện đơn xin nhập học, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: BocTachGiayTo,
        component: Extract,
        category: "Đơn"
      },
      {
        path: "/giayxacnhantoeic",
        name: "GIẤY XÁC NHẬN TOEIC",
        description:
          "Nhận diện giấy xác nhận Toeic, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: BaiThiTN,
        component: Extract,
        category: "Khác"
      },
      {
        path: "/giayxacnhanvayvon",
        name: "GIẤY XÁC NHẬN VAY VỐN",
        description:
          "Nhận diện giấy xác nhận vay vốn, trích xuất thông tin nhanh chóng và chính xác",
        imgPath: DKKD,
        component: Extract,
        category: "Khác"
      },
    ],
    secondary: true,
  },
  {
    name: "Lịch sử bóc tách",
    layout: "",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/lichsuboctach",
    component: DataTables,
    isShow: true,
    childrens: [],
    secondary: true,
  },
  {
    name: "Quản lý người dùng",
    layout: "",
    path: "/quanlynguoidung",
    icon: (
      <Icon as={MdPersonSearch} width="20px" height="20px" color="inherit" />
    ),
    component: UserManage,
    isShow: true,
    childrens: [],
  },
  {
    name: "Quản lý tài liệu",
    layout: "",
    path: "/quanlytailieu",
    icon: (
      <Icon as={HiDocumentSearch} width="20px" height="20px" color="inherit" />
    ),
    component: DocumentManage,
    isShow: true,
    childrens: [],
  },
  {
    name: "Thông tin cá nhân",
    layout: "",
    path: "/thongtincanhan",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
    isShow: true,
    childrens: [],
  },
  {
    name: "Tài liệu hướng dẫn",
    layout: "",
    icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
    path: "/tailieuhuongdan",
    component: DocumentView,
    isShow: false,
    childrens: [],
  },
  
  {
    name: "Đăng nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
    isShow: false,
    childrens: [],
  }
];

// const extractRoutes = [
//   {

//   }
// ]
export default routes;
