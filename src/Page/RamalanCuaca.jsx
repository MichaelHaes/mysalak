import React, { useEffect, useState } from "react";
import IndikatorHeader from "../Components/IndikatorHeader";
import { Box, Flex, Text } from "@chakra-ui/react";
import IndikatorCard from "../Components/IndikatorCard";
import RamalanMingguan from "../Components/RamalanMingguan";
import RamalanMingguanFull from "../Components/RamalanMingguanFull";
import { useWeather } from "../state";
import axios from "axios";

const RamalanCuaca = () => {
  const { preds, setPreds, avgPreds, setAvgPreds } = useWeather();
  const [all, setAll] = useState(false);

  const getPred = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/ramalan`);
    setPreds(response.data);
  }

  const getAvgPreds = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/ramalan-avg`);
    setAvgPreds(response.data);
  }

  function toggleAll() {
    setAll(!all);
  }

  useEffect(() => {
    setAll(false);
    getPred();
    getAvgPreds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !all ? (
    <Box pb={"10vh"} w={"inherit"} h={"100%"}>
      <IndikatorHeader />
      <IndikatorCard item={preds}/>
      <RamalanMingguan
        item={avgPreds.slice(0, 3)}
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
    <RamalanMingguanFull item={avgPreds} toggleAll={toggleAll} />
  );
};

export default RamalanCuaca;
