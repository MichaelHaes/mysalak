import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import RamalanCard from "./RamalanCard";
import { IoIosArrowBack } from "react-icons/io";
import moment from "moment";

const RamalanMingguanFull = (props) => {
  const data = props.item;

  return (
    <Flex direction={"column"} w={"85%"} mx={"auto"} pos={"relative"}>
      <Flex pos={"relative"} mt={"7vh"} w={"100%"} mb={18} textAlign={"center"}>
        <Flex
          justify={"center"}
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"#2c3631"}
          borderRadius={"50%"}
          p={2}
          pos={"absolute"}
          onClick={() => {
            props.toggleAll();
          }}
        >
          <IoIosArrowBack size={"auto"} fill="white" />
        </Flex>
        <Text
          fontWeight={"bold"}
          w={"100%"}
          fontSize={"2.3vh"}
          color={"#2c3631"}
        >
          Ramalan 7 hari
        </Text>
      </Flex>

      <Flex direction={"column"} gap={3} mt={5}>
        {data.map((item, index) => (
          <RamalanCard item={item} index={index}></RamalanCard>
        ))}
      </Flex>
    </Flex>
  );
};

export default RamalanMingguanFull;
