const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Wy_Player";
const playlist = $(".playlist");
const player = $(".player");
const dashboard = $(".dashboard");
const heading = $(".song_name");
const cd = $(".cd");
const cdThumb = $(".cd_thumb");
const progress = $("#progress");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const songs = [
  {
    name: "Vì Mẹ Anh Bắt Chia Tay",
    singer: "Miu Lê, Karik, Châu Đăng Khoa",
    path: "./assets/Music/ViMeAnhBatChiaTay-MiuLeKarikChauDangKhoa-7479220.mp3",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/e/2/9/8/e2983a18669da0f3e941f159ce892b04.jpg",
  },
  {
    name: "Tệ thật, Anh nhớ em",
    singer: "Thanh Hưng",
    path: "./assets/Music/TeThatAnhNhoEm-ThanhHung-7132634.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/03/03/0/1/3/6/1646267009685_500.jpg",
  },
  {
    name: "Hai mươi hai",
    singer: "Amee",
    path: "./assets/Music/HaiMuoiHai22-HuaKimTuyenAMEE-7231237.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/05/24/9/6/e/a/1653363505428_500.jpg",
  },
  {
    name: "Từng thương",
    singer: "Phan Duy Anh, ACV",
    path: "./assets/Music/TungThuong-PhanDuyAnhACV-7196634.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/04/19/e/7/3/c/1650360805680_500.jpg",
  },
  {
    name: "Người Em Cố Đô",
    singer: "Rum, Đaa",
    path: "./assets/Music/NguoiEmCoDo-RumDaa-6914113.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2021/01/06/1/6/a/7/1609922114277_500.jpg",
  },
  {
    name: "Ánh Sao Và Bầu Trời",
    singer: "T.R.I",
    path: "./assets/Music/AnhSaoVaBauTroi-TRI-7085073.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631155238247_500.jpg",
  },
  {
    name: "Yêu Em Mỗi Ngày",
    singer: "Andiez",
    path: "./assets/Music/YeuEmHonMoiNgay-Andiez-7136374.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/03/11/1/a/0/3/1647001991460_500.jpg",
  },
  {
    name: "Gửi em",
    singer: "Hoa Vinh",
    path: "./assets/Music/GuiEm-HoaVinh-7197165.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2022/04/23/a/1/7/c/1650677087655_500.jpg",
  },
  {
    name: "Đường Tôi Chở Em Về",
    singer: "Bùi Trường Linh",
    path: "./assets/Music/DuongTaChoEmVe-buitruonglinh-6318765.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2020/07/02/5/d/c/9/1593687560557_500.jpg",
  },
  {
    name: "3 1 0 7 - 2",
    singer: "DuongG, Nâu, W/n",
    path: "./assets/Music/31072-DuonggNauWn-6937818.mp3",
    image:
      "https://avatar-ex-swe.nixcdn.com/song/2021/02/04/5/a/2/5/1612405167313_500.jpg",
  },
];
