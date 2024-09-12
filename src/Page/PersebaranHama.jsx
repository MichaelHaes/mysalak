import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MapComponent from "../Components/Map";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

const PersebaranHama = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [kelompok, setKelompok] = useState([]);

  const getKelompokTani = async () => {
    const response = await axios.get(`${env.API_URL}/tangkapan-hama-latest`);
    setKelompok(response.data);
  };

  useEffect(() => {
    getKelompokTani();
  }, []);

  function handleDetail(val) {
    setDetail(val);
  }

  function resetDetail() {
    setDetail({
      nama: "",
    });
  }

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
      <MapComponent sebaran={kelompok} handleDetail={handleDetail} />

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
            py={5}
            px={5}
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
                bg={"#F5F5F5"}
                variant={"unstyled"}
                onClick={() => resetDetail()}
                fontSize={"2vh"}
                display={"flex"}
                justifyContent={"center"}
              >
                <IoMdClose />
              </Button>
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
              <Text fontSize={"1.5vh"}>Jumlah Lalat Buah</Text>
              <Text fontSize={"1.5vh"}>{detail.jumlah}</Text>
            </Flex>

            <Flex
              align={"center"}
              justify={"space-between"}
              border={"1.5px solid #F5F5F5"}
              p={2}
              borderRadius={"12px"}
              fontWeight={"bold"}
              boxShadow={
                detail.jumlah > 50
                  ? "inset 0 0 5px .5px #A9D2B5"
                  : detail.jumlah > 10
                  ? "inset 0 0 5px .5px #F4F091"
                  : "inset 0 0 5px .5px #EBB5B5"
              }
            >
              <Text>Status</Text>
              {detail.jumlah > 50 ? (
                <Text>Bahaya</Text>
              ) : detail.jumlah > 10 ? (
                <Text>Waspada</Text>
              ) : (
                <Text>Aman</Text>
              )}
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PersebaranHama;
