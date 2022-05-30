import CCCD from "assets/img/docs/CCCD.png";
import BaiThiTN from "assets/img/docs/BaithiTN.png";
import BocTachGiayTo from "assets/img/docs/Boctachgiayto.png";
import DKKD from "assets/img/docs/DKKD.png";
import GiayPhepXayDung from "assets/img/docs/Giayphepxaydung.png";
import HoaDon from "assets/img/docs/HoaDon.png";
import TheTinDung from "assets/img/docs/TheTinDung.png";

const docTypeDataObj = [
  {
    name: "THẺ SINH VIÊN",
    description: "Nhận diện thẻ sinh viên, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: CCCD,
    path: "/thesinhvien",
  },
  {
    name: "BẢNG ĐIỂM",
    description: "Nhận diện bảng điểm, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: BaiThiTN,
    path: "/bangdiem",
  },
  {
    name: "BẢNG ĐIỂM TIẾNG ANH",
    description: "Nhận diện thẻ bảng điểm tiếng anh, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: BaiThiTN,
    path: "/bangdiemtienganh",
  },
  {
    name: "CAM KẾT TRẢ NỢ",
    description: "Nhận diện giấy cam kết trả nợ, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: TheTinDung,
    path: "/camkettrano",
  },
  {
    name: "ĐƠN XIN NHẬP HỌC",
    description: "Nhận diện đơn xin nhập học, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: BocTachGiayTo,
    path: "/donxinnhaphoc",
  },
  {
    name: "GIẤY XÁC NHẬN TOEIC",
    description: "Nhận diện giấy xác nhận Toeic, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: BaiThiTN,
    path: "/giayxacnhantoeic",
  },
  {
    name: "GIẤY XÁC NHẬN VAY VỐN",
    description: "Nhận diện giấy xác nhận vay vốn, trích xuất thông tin nhanh chóng và chính xác",
    imgPath: DKKD,
    path: "/giayxacnhanvayvon",
  }
]

export default docTypeDataObj;