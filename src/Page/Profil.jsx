import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineAccountCircle, MdVerified } from "react-icons/md";
import "../Components/Styles/Profil.css";
import { LuHistory } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();

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
            navigate("/")
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
        <Image
          src="/assets/curah hujan_indikator.png"
          h={"80%"}
          w={"100%"}
          objectFit={"cover"}
          objectPosition={"center"}
          zIndex={1}
          borderRadius={"20px"}
        ></Image>
        <Image
          pos={"relative"}
          src="/assets/lalat buah.png"
          h={"10vh"}
          w={"10vh"}
          mx={"auto"}
          objectFit={"cover"}
          borderRadius={"full"}
          border={"3.5px solid #F4F4F4"}
          zIndex={2}
          mt={"-13%"}
        ></Image>
      </Box>
      <Flex direction={"column"} id="identity" align={"center"}>
        <Text fontWeight={"bold"}>Endang Sri Lestari</Text>
        <Flex fontSize={"1.5vh"} alignItems={"center"} mt={-2}>
          <Text>Kebun 3</Text>
          <Text fontSize={"3vh"} mx={2}>
            {" "}
            •{" "}
          </Text>
          <Text>Kelompok Tani 10</Text>
        </Flex>
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
      </Flex>

      {/* Verifikasi */}
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
        <MdVerified fill="#328059" />
        <Text fontSize={"1.8vh"} ms={2} color={"#328059"}>
          Kebun terverifikasi
        </Text>
      </Flex>

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

      <Text fontSize={"1.2vh"} mt={5} color={"rgba(44, 54, 49, 0.5)"}>
        Versi 1.0.0
      </Text>
    </Flex>
  );
};

export default Profil;
