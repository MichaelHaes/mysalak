import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineAccountCircle, MdVerified } from "react-icons/md";
import "../Components/Styles/Profil.css";
import { LuHistory } from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { requestForToken } from "../firebaseNotification/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../custom-swal.css";
import { GoUnverified } from "react-icons/go";

const Profil = () => {
  const navigate = useNavigate();
  const profilePic = JSON.parse(localStorage.getItem("profile_pic"));
  const profileBackground = JSON.parse(localStorage.getItem("profile_background"));

  const logoutIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32"><path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z" fill="currentColor" /></svg>';

  useEffect(() => {
    if (!localStorage.getItem("fcmToken")) {
      requestForToken();
    }

  }, []);

  const showToast = (response) =>
    toast(
      <div>
        <p>{response}</p>
      </div>
    );

  const handleLogOut = () => {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("fcmToken");
    localStorage.removeItem("role_id");
    localStorage.removeItem("nama");
    localStorage.removeItem("user_id");
    localStorage.removeItem("kelompok_tani");
    localStorage.removeItem("profile_pic");
    localStorage.removeItem("profile_background");
    localStorage.removeItem("no_telp");
    localStorage.removeItem("is_verified");
    axios
      .post(`${process.env.REACT_APP_API_URL}/mysalak/delete-token`, {
        device_id: localStorage.getItem("deviceUUID"),
      })
      .then((response) => {
        showToast("Logout Success");
        navigate("/");
      });
  };

  const confirmLogout = () => {
    withReactContent(Swal)
      .fire({
        html: "<p>Apa anda yakin ingin</p><h3><strong>Keluar dari Akun Anda?</strong></h3>",
        showCancelButton: true,
        confirmButtonText: "Iya Yakin",
        cancelButtonText: "Tidak Ingin",
        reverseButtons: true,
        customClass: {
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
        },
        iconHtml: logoutIcon,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleLogOut();
        }
      });
  };

  return (
    <Flex
      className="container"
      direction={"column"}
      w={"85%"}
      mx={"auto"}
      align={"center"}
      pos={"relative"}
      pt={"15%"}
      pb={"25%"}
    >
      {/* Back & Title */}
      <Flex w={"100%"} pos={"relative"} justify={"center"} align={"center"}>
        <Flex
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"#2c3631"}
          borderRadius={"50%"}
          p={2}
          pos={"absolute"}
          left={0}
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack size={"auto"} fill="white" />
        </Flex>
        <Text fontWeight={"bold"} fontSize={"2.5vh"}>
          Profil
        </Text>
      </Flex>

      {/* Profile Header */}
      <Box id="pictures" h={"20vh"} w={"100%"} mt={8} mb={3}>
        {
          profileBackground === null ? (
            <Image
              src="/assets/curah hujan_indikator.png"
              h={"80%"}
              w={"100%"}
              objectFit={"cover"}
              objectPosition={"center"}
              zIndex={1}
              borderRadius={"20px"}
            ></Image>
          ) : (
            <Image
              src={`data:image/png;base64,${profileBackground}`}
              h={"80%"}
              w={"100%"}
              objectFit={"cover"}
              objectPosition={"center"}
              zIndex={1}
              borderRadius={"20px"}
            ></Image>
          )
        }
        { profilePic === null ? (
            <Image
              pos={"relative"}
              src={'/assets/defaultUser.jpg'}
              h={"10vh"}
              w={"10vh"}
              mx={"auto"}
              objectFit={"cover"}
              borderRadius={"full"}
              border={"3.5px solid #F4F4F4"}
              zIndex={2}
              mt={"-13%"}
              objectPosition={"63%"}
            />
          ) : (
            <Image
              pos={"relative"}
              src={`data:image/png;base64,${profilePic}`}
              h={"10vh"}
              w={"10vh"}
              mx={"auto"}
              objectFit={"cover"}
              borderRadius={"full"}
              border={"3.5px solid #F4F4F4"}
              zIndex={2}
              mt={"-13%"}
              objectPosition={"63%"}
            />
          )
        }
      </Box>
      <Flex direction={"column"} id="identity" align={"center"}>
        <Text fontWeight={"bold"}>{JSON.parse(localStorage.getItem("nama"))}</Text>
        <Flex fontSize={"1.5vh"} alignItems={"center"} mt={-2}>
          <Text>{JSON.parse(localStorage.getItem("no_telp"))}</Text>
          <Text fontSize={"3vh"} mx={2}>
            {" "}
            •{" "}
          </Text>
          {
            JSON.parse(localStorage.getItem("role_id")) === 5 ? (
              <Text>Kelompok Tani {JSON.parse(localStorage.getItem("kelompok_tani"))}</Text>
            ) : (
              <Text>{JSON.parse(localStorage.getItem("user_id"))}</Text>
            )
          }
        </Flex>
        <Link to={"/edit-profil"}>
          <Flex
            align={"center"}
            bg={"#2c3631"}
            px={3}
            mt={1}
            py={"3%"}
            borderRadius={"full"}
          >
            <FaRegEdit fill="white" size={"10px"} />
            <Text color={"white"} fontSize={"1vh"} ms={1}>
              Edit Profil
            </Text>
          </Flex>
        </Link>
      </Flex>

      {/* Verifikasi */}
      {
        JSON.parse(localStorage.getItem("role_id")) === 5 ? (
          <Flex
            align={"center"}
            justify={"center"}
            bg={"white"}
            w={"100%"}
            py={4}
            border={"1px solid #eeeeee"}
            borderRadius={"12px"}
            mt={4}
          >
            {
              JSON.parse(localStorage.getItem("is_verified")) === true ? (
                <MdVerified fill="#328059" />
              ) : (
                <GoUnverified fill="red"/>
              )
            }
            <Text fontSize={"1.8vh"} ms={2} color={localStorage.getItem("is_verified") === true ? "#328059" : "red"}>
              {JSON.parse(localStorage.getItem("is_verified")) === true ? "Akun terverifikasi" : "Akun belum terverifikasi"}
            </Text>
          </Flex>
        ) : (
          <></>
        )
      }

      {/* Krisar */}
      <Box
        pos={"relative"}
        w={"100%"}
        h={"17vh"}
        p={3}
        pe={"45%"}
        bg={"#e4efe9"}
        borderRadius={"12px"}
        mt={9}
      >
        <Text fontWeight={"bold"} fontSize={"1.7vh"} lineHeight={1.2}>
          Ada kritik atau saran <br />
          tentang aplikasi?
        </Text>
        <Text fontSize={"1.1vh"} lineHeight={1.3} mt={2}>
          Jika anda mempunyai kendala dalam penggunaan aplikasi ini silahkan
          tekan tombol dibawah ini
        </Text>
        <Text
          bg={"#2c3631"}
          color={"white"}
          w={"fit-content"}
          px={2}
          py={".7%"}
          borderRadius={"full"}
          fontSize={"1vh"}
          pos={"absolute"}
          bottom={3}
          left={2}
        >
          Kritik & Saran
        </Text>
      </Box>

      {/* Detail Akun */}
      <Flex direction={"column"} w={"100%"} mt={10}>
        <Text className="subheading">Detail Akun</Text>

        <Flex className="menu-item">
          <Flex align={"center"} w={"100%"}>
            <Flex className="menu-icon">
              <MdOutlineAccountCircle size={"auto"} />
            </Flex>
            <Flex className="menu-text-wrapper">
              <Text className="menu-title">Profil anda</Text>
              <Text className="menu-desc">
                Edit dan melihat informasi profil anda
              </Text>
            </Flex>
          </Flex>
          <Box className="menu-goto">
            <FaArrowRight size={"auto"} />
          </Box>
        </Flex>

        <Flex className="menu-item">
          <Flex align={"center"} w={"100%"}>
            <Flex className="menu-icon">
              <LuHistory size={"auto"} />
            </Flex>
            <Flex className="menu-text-wrapper">
              <Text className="menu-title">Riwayat aktivitas</Text>
              <Text className="menu-desc">
                Edit dan melihat informasi profil anda
              </Text>
            </Flex>
          </Flex>
          <Box className="menu-goto">
            <FaArrowRight size={"auto"} />
          </Box>
        </Flex>

        <Text className="subheading" mt={7}>
          Tentang Aplikasi
        </Text>

        <Flex className="menu-item">
          <Flex align={"center"} w={"100%"}>
            <Flex className="menu-icon">
              <IoIosHelpCircleOutline size={"auto"} />
            </Flex>
            <Flex className="menu-text-wrapper">
              <Text className="menu-title">Bantuan</Text>
              <Text className="menu-desc">
                Pusat bantuan dan kebijakan privasi
              </Text>
            </Flex>
          </Flex>
          <Box className="menu-goto">
            <FaArrowRight size={"auto"} />
          </Box>
        </Flex>
      </Flex>

      <Button
        onClick={() => {
          confirmLogout();
        }}
        variant={"unstyled"}
        // bg={"#FF8F8F"}
        color={"#2c3631"}
        _hover={{ bg: "#FF8F8F", color: "white" }}
        px={2}
        py={1}
        mt={5}
        borderRadius={"full"}
        h={"fit-content"}
        fontSize={"1.5vh"}
      >
        Logout
      </Button>

      <Text fontSize={"1.2vh"} mt={5} color={"rgba(44, 54, 49, 0.5)"}>
        Versi 1.0.0
      </Text>
    </Flex>
  );
};

export default Profil;
