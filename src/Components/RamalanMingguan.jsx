import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import RamalanCard from "./RamalanCard";

const RamalanMingguan = (props) => {
  const data = props.item;

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
          onClick={() => {props.toggleAll()}}
        >
          Lihat Semua
        </Button>
      </Flex>
      <Flex direction={"column"} gap={3}>
        {data.map((item, index) => (
          <RamalanCard item={item} index={index}></RamalanCard>
        ))}
      </Flex>
    </Box>
  );
};

export default RamalanMingguan;
