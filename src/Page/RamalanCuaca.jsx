import React, { useEffect, useState } from "react";
import IndikatorHeader from "../Components/IndikatorHeader";
import { Box, Flex, Text } from "@chakra-ui/react";
import IndikatorCard from "../Components/IndikatorCard";
import RamalanMingguan from "../Components/RamalanMingguan";
import RamalanMingguanFull from "../Components/RamalanMingguanFull";

const RamalanCuaca = () => {
  const [all, setAll] = useState(false);

  const ramalanDetails = [
    {
      date: "2024-5-10",
      cuaca: "Cerah Berawan",
      suhu: "20",
    },
    {
      date: "2024-5-11",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
    {
      date: "2024-5-12",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
    {
      date: "2024-5-13",
      cuaca: "Cerah Berawan",
      suhu: "20",
    },
    {
      date: "2024-5-14",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
    {
      date: "2024-5-15",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
    {
      date: "2024-5-16",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
    {
      date: "2024-5-17",
      cuaca: "Hujan Lebat",
      suhu: "20",
    },
  ];

  function toggleAll() {
    setAll(!all);
    console.log("toggled");
  }

  useEffect(() => {
    setAll(false);
  }, []);

  return !all ? (
    <Box pb={"10vh"} w={"inherit"} h={"100%"}>
      <IndikatorHeader />
      <IndikatorCard />
      <RamalanMingguan
        item={ramalanDetails.slice(0, 3)}
        toggleAll={toggleAll}
      />

      <Flex
        pos={"relative"}
        direction={"column"}
        w={"85%"}
        h={"18vh"}
        borderRadius={"12px"}
        mx={"auto"}
        mt={7}
        border={"1px solid #CFCFCF"}
        py={3}
        px={3}
      >
        <Flex align={"center"} ps={1}>
          <Text
            width={"14px"}
            height={"14px"}
            fontSize={"9px"}
            textAlign={"center"}
            bg={"white"}
            borderRadius={"50%"}
            border={".5px solid #CFCFCF"}
          >
            i
          </Text>
          <Text fontWeight={"bold"} fontSize={"1.6vh"} ms={3}>
            Tentang Data Suhu & Kelembaban
          </Text>
        </Flex>

        <Text
          fontSize={"1.4vh"}
          mt={3}
          lineHeight={1.25}
          h={"80%"}
          overflowY={"auto"}
          style={{
            scrollbarWidth: "none",
          }}
        >
          Data suhu, kelembaban, keterangan cahaya dan curah hujan yang
          diperoleh berasal dari sensor sensor pada IoT (Internet of Things)
          yang diimplementasikan pada beberapa titik di lokasi perkebunan salak.
          Kemudian data mentah yang diperoleh tersebut akan diolah dengan
          menggunakan AI (Artificial Intelligence) sehingga dapat menghasilkan
          data perkiraan cuaca.
        </Text>
      </Flex>
    </Box>
  ) : (
    <RamalanMingguanFull item={ramalanDetails} toggleAll={toggleAll} />
  );
};

export default RamalanCuaca;
