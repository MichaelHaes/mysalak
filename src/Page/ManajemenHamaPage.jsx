import React, { useEffect, useState } from "react";
import ManajemenHamaCard from "../Components/ManajemenHamaCard";
import { Flex, Text } from "@chakra-ui/react";
import InformasiHama from "../Components/InformasiHama";

const ManajemenHamaPage = () => {
  const [detail, setDetail] = useState(false);
  const [index, setIndex] = useState(0);

  const hamaDetails = [
    {
      date: "2024-5-20",
      jenis: "Lalat Buah",
      jumlah: 400,
    },
    {
      date: "2024-4-20",
      jenis: "Lalat Buah",
      jumlah: 200,
    },
    {
      date: "2024-3-20",
      jenis: "Lalat Buah",
      jumlah: 300,
    },
  ];

  function handleDetail() {
    setDetail(!detail);
  }

  function handleIndex(val) {
    setIndex(val);
  }

  useEffect(() => {
    setDetail(false);
  }, [])

  return !detail ? (
    <Flex direction={"column"} w={"85%"} mx={"auto"} pos={"relative"}>
      <Flex pos={"relative"} mt={"7vh"} w={"100%"} mb={18} textAlign={"start"}>
        <Text
          fontWeight={"bold"}
          w={"100%"}
          fontSize={"2.3vh"}
          color={"#2c3631"}
        >
          Manajemen Hama
        </Text>
        <Flex
          justify={"center"}
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"#fcfcfc"}
          borderRadius={"50%"}
          p={2}
        >
          <Text>?</Text>
        </Flex>
      </Flex>

      <Flex direction={"column"} gap={5}>
        {hamaDetails.map((item, index) => (
          <ManajemenHamaCard item={item} index={index} handleDetail={handleDetail} handleIndex={handleIndex}/>
        ))}
      </Flex>
    </Flex>
  ) : (
    <InformasiHama item={hamaDetails[index]} handleDetail={handleDetail}/>
  );
};

export default ManajemenHamaPage;
