import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MapComponent from "../Components/Map";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PersebaranHama = () => {
  const nama = JSON.parse(localStorage.getItem('nama'));
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [hama, setHama] = useState([]);

  const getKelompokTani = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tangkapan-hama-latest`);
    setHama(response.data);
  };

  useEffect(() => {
    getKelompokTani();
  }, []);

  function handleDetail(val) {
    setDetail(hama[val]);
  }

  function resetDetail() {
    setDetail({
      nama: "",
    });
  }

  const updateJumlahPerangkap = (newJumlah) => {
    setDetail((prevState) => {
      const updatedState = {
        ...prevState,
        KelompokTani: {
          ...prevState.KelompokTani,
          jumlah_perangkap: newJumlah,
          ftd: parseFloat(detail.jumlah / (detail.KelompokTani.jumlah_perangkap * 1)).toFixed(2),
          // ftd disini buat sekarang masih naive implementation
        },
      };
      axios.put(`${process.env.REACT_APP_API_URL}/update-perangkap`, updatedState);
      axios.put(`${process.env.REACT_APP_API_URL}/update-ftd`, updatedState);
      getKelompokTani();

      return updatedState;
    });
  };

  const incrementJumlahPerangkap = () => {
    const newJumlah = detail.KelompokTani.jumlah_perangkap + 1;
    updateJumlahPerangkap(newJumlah);
  };

  const decrementJumlahPerangkap = () => {
    const newJumlah = detail.KelompokTani.jumlah_perangkap - 1;
    updateJumlahPerangkap(newJumlah);
  };


  // useEffect(() => {
  //   if (detail.hama && detail.hama.length > 0) {
  //     const totalHama = detail.hama.reduce((acc, item) => acc + item.jumlah, 0);
  //     setTotal(totalHama);
  //   }
  // }, [detail.hama]);

  return (
    <Flex direction={"column"} pos={"relative"} w={"100%"} h={"100vh"}>
      <Box
        pos={"absolute"}
        zIndex={10}
        top={0}
        left={0}
        bg={"#ffffff"}
        h={"19vh"}
        w={"100%"}
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(245,245,245,1) 68%, rgba(245,245,245,0.3) 85%, rgba(245,245,245,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(245,245,245,1) 68%, rgba(245,245,245,0.3) 85%, rgba(245,245,245,0) 100%)",
        }}
      ></Box>
      <Flex
        justify={"center"}
        align={"center"}
        w={"30px"}
        h={"30px"}
        bg={"#2C3631"}
        borderRadius={"50%"}
        top={"6%"}
        left={7}
        p={2}
        pos={"absolute"}
        zIndex={11}
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowBack size={"auto"} fill="white" />
      </Flex>
      <Text
        pos={"absolute"}
        top={"6%"}
        position={"absolute"}
        zIndex={10}
        w={"100%"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={"2.5vh"}
      >
        Persebaran Hama
      </Text>
      <MapComponent sebaran={hama} handleDetail={handleDetail} />

      {detail.jumlah && (
        <Box
          position={"absolute"}
          w={"100%"}
          h={"fit-content"}
          bottom={"11vh"}
          zIndex={10}
        >
          <Flex
            direction={"column"}
            pos={"relative"}
            mx={"auto"}
            w={"85%"}
            h={"100%"}
            bg={"rgba(255,255,255,.9)"}
            borderRadius={"12px"}
            color={"#2C3631"}
            gap={3}
            pb={4}
            pt={2}
            px={4}
          >
            {/* <Button
              position={"absolute"}
              borderRadius={"50%"}
              bg={"rgba(255,255,255,.9)"}
              top={-5}
              right={-5}
              variant={"unstyled"}
              onClick={() => resetDetail()}
              fontSize={"2.5vh"}
              display={"flex"}
              justifyContent={"center"}
              p={0}
            >
              <IoMdClose/>
            </Button> */}
            <Flex align={"center"} justify={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"2vh"}>
                {detail.KelompokTani.nama}
              </Text>
              {/* <Text
                bg={"#F5F5F5"}
                p={2}
                borderRadius={"full"}
                fontWeight={"bold"}
              >
                {detail.luas}
              </Text> */}
              <Button
                borderRadius={"full"}
                // bg={"#F5F5F5"}
                right={-2}
                variant={"unstyled"}
                onClick={() => resetDetail()}
                fontSize={"2vh"}
                display={"flex"}
                justifyContent={"center"}
              >
                <IoMdClose
                  size={20}
                />
              </Button>
            </Flex>


            <Flex
              align={"center"}
              justify={"space-between"}
              border={"1.5px solid #F5F5F5"}
              pl={2}
              borderRadius={"12px"}
              bg={
                detail.KelompokTani.ftd > 1
                  ? "#850707"
                  : detail.KelompokTani.ftd > 0.5
                    ? "#ACA714"
                    : "#377B4E"
              }
            >
              <Text
                color={"white"}
                fontSize={"1.75vh"}
              >Status</Text>
              <Box
                bg={"white"}
                maxW={"30%"}
                w={"30%"}
                py={1.5}
                m={1}
                textAlign={"center"}
                borderRadius={"8px"}
                fontSize={"1.75vh"}
                fontWeight={"bold"}
                color={
                  detail.KelompokTani.ftd > 1
                    ? "#850707"
                    : detail.KelompokTani.ftd > 0.5
                      ? "#ACA714"
                      : "#377B4E"
                }
              >
                {detail.KelompokTani.ftd > 1 ? (
                  <Text>Bahaya</Text>
                ) : detail.KelompokTani.ftd > 0.5 ? (
                  <Text>Waspada</Text>
                ) : (
                  <Text>Aman</Text>
                )}
              </Box>
            </Flex>
            <Flex
              h={"fit-content"}
              p={2}
              borderRadius={"12px"}
              align={"center"}
              justify={"space-between"}
              bg={"#F5F5F5"}
            >
              {/* <Flex direction={"column"}>
                <Text fontSize={"1.5vh"}>Jenis Hama</Text>
                <UnorderedList fontWeight={"bold"}>
                  {detail.hama && detail.hama.length > 0 ? (
                    detail.hama.map((item, index) => (
                      <ListItem key={index}>{item.jenis}</ListItem>
                    ))
                  ) : (
                    <></>
                  )}
                </UnorderedList>
              </Flex>

              <Flex direction={"column"} textAlign={"end"}>
                <Text fontSize={"1.5vh"}>Jumlah Hama</Text>
                <Flex direction={"column"} fontWeight={"bold"}>
                  {detail.hama && detail.hama.length > 0 ? (
                    detail.hama.map((item, index) => (
                      <Text key={index}>{item.jumlah}</Text>
                    ))
                  ) : (
                    <></>
                  )}
                </Flex>
              </Flex> */}
              <Text fontSize={"1.5vh"}>FTD</Text>
              <Text fontSize={"1.5vh"} fontWeight={"bold"}>{detail.KelompokTani.ftd}</Text>
            </Flex>
            <Flex gap={2}>
              <Flex
                h={"fit-content"}
                w={"100%"}
                p={2}
                borderRadius={"12px"}
                align={"center"}
                justify={"space-between"}
                bg={"#F5F5F5"}
              >
                <Text fontSize={"1.5vh"}>Jumlah Perangkap</Text>
                <Text fontSize={"1.5vh"} fontWeight={"bold"}>{detail.KelompokTani.jumlah_perangkap}</Text>
              </Flex>
              {nama === detail.KelompokTani.ketua ?
                <Flex
                  bg={"#F5F5F5"}
                  justify={"space-between"}
                  p={1}
                  borderRadius={"12px"}
                >
                  <Button
                    variant={"unstyled"}
                    justifyItems={"center"}
                    mr={1}
                    h={"inherit"}
                    borderRadius={"8px"}
                    bg={"white"}
                    onClick={() => incrementJumlahPerangkap()}
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    variant={"unstyled"}
                    justifyItems={"center"}
                    h={"inherit"}
                    borderRadius={"8px"}
                    bg={"white"}
                    onClick={() => decrementJumlahPerangkap()}
                  >
                    <FaMinus />
                  </Button>
                </Flex>
                :
                <></>}
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PersebaranHama;
