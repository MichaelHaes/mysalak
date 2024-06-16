import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import MapComponent from "../Components/Map";
import { IoIosArrowBack } from "react-icons/io";
import { usePage } from "../state";

const PersebaranHama = () => {
  const { home } = usePage();
  const [detail, setDetail] = useState({});
  const [total, setTotal] = useState(0);

  const sebaran = [
    {
      nama: "Kebun Bu Endang",
      luas: "250ha",
      lat: -7.61674751163635,
      lng: 110.40200419177316,
      hama: [
        {
          jenis: "Lalat Buah",
          jumlah: 200,
        },
        {
          jenis: "Tikus",
          jumlah: 20,
        },
      ],
    },
    {
      nama: "Bukan Kebun Bu Endang",
      luas: "250ha",
      lat: -7.611351174065228,
      lng: 110.40550925108614,
      hama: [
        {
          jenis: "Lalat Buah",
          jumlah: 20,
        },
        {
          jenis: "Tikus",
          jumlah: 2,
        },
      ],
    },
  ];

  function handleDetail(val) {
    console.log("clicked");
    console.log(val);
    setDetail(val);
  }

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
          home();
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
      <MapComponent sebaran={sebaran} handleDetail={handleDetail} />

      {detail.nama && (
        <Box
          position={"absolute"}
          w={"100%"}
          h={"fit-content"}
          bottom={"10%"}
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
            <Flex align={"center"} justify={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"2vh"}>
                {detail.nama}
              </Text>
              <Text
                bg={"#F5F5F5"}
                p={2}
                borderRadius={"full"}
                fontWeight={"bold"}
              >
                {detail.luas}
              </Text>
            </Flex>

            <Flex
              h={"fit-content"}
              p={2}
              borderRadius={"12px"}
              align={"center"}
              justify={"space-between"}
              bg={"#F5F5F5"}
            >
              <Flex direction={"column"}>
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
              </Flex>
            </Flex>

            <Flex
              align={"center"}
              justify={"space-between"}
              border={"1.5px solid #F5F5F5"}
              p={2}
              borderRadius={"12px"}
              fontWeight={"bold"}
            >
              <Text>Total Jumlah Hama</Text>
              <Text>220</Text>
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PersebaranHama;
