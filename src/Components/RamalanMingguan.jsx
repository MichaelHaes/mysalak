import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import RamalanCard from "./RamalanCard";

const RamalanMingguan = () => {
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

  return (
    <Box w={"85%"} mx={"auto"} pos={"relative"} mt={10}>
      <Flex align={"center"} justify={"space-between"} mb={3}>
        <Text fontWeight={"bold"} fontSize={"2vh"}>
          Ramalan 7 Hari
        </Text>
        <Button
          variant={"unstyled"}
          fontWeight={"normal"}
          fontSize={"8pt"}
          h={"fit-content"}
          py={1}
          px={2}
        >
          Lihat Semua
        </Button>
      </Flex>
      <Flex direction={"column"} gap={3}>
        {ramalanDetails.slice(0,3).map((item, index) => (
            <RamalanCard item={item} index={index}></RamalanCard>
        ))}
      </Flex>
    </Box>
  );
};

export default RamalanMingguan;
