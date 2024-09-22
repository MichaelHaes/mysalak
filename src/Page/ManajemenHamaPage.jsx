import React, { useEffect, useState } from "react";
import ManajemenHamaCard from "../Components/ManajemenHamaCard";
import ManajemenHamaSquareCard from "../Components/ManajemenHamaSquareCard";
import { Flex, Text } from "@chakra-ui/react";
import InformasiHama from "../Components/InformasiHama";
import { useHama } from "../state";
import axios from "axios";
import env from "react-dotenv";
import Moment from "react-moment";

const ManajemenHamaPage = () => {
  const { from, index, detail, resetDetail, hama, setHama } = useHama();

  const fetchHama = async () => {
    try {
      const response = await axios.get(`${env.API_URL}/tangkapan-hama-latest`);
      setHama(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  
  useEffect(() => {
    if (from !== "Home") resetDetail();
    fetchHama();
  }, []);

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
        {/* <Flex
          justify={"center"}
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"#fcfcfc"}
          borderRadius={"50%"}
          p={2}
        >
          <Text>?</Text>
        </Flex> */}
      </Flex>

      {/* <Flex direction={"column"} gap={5}>
        {hama.map((item, index) => (
          <ManajemenHamaCard item={item} index={index}/>
        ))}
      </Flex> */}

      <Flex flexWrap={"wrap"} justifyContent={"space-between"} w={"100%"} rowGap={4}>
        {hama.map((item, index) => (
          <ManajemenHamaSquareCard item={item} index={index}/>
        ))}
      </Flex>
    </Flex>
  ) : (
    <InformasiHama index={index} />
  );
};

export default ManajemenHamaPage;
