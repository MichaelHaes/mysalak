import { Flex, Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import Moment from "react-moment";
import { useHama } from "../state";

const ManajemenHamaCard = (props) => {
  const { setIndex, toggleDetail } = useHama();
  const data = props.item;

  return (
    <Box
      key={props.index}
      pos={"relative"}
      h={"11.5vh"}
      boxShadow={"0 2px 5px 1px #e5e9e6"}
      borderRadius={"20px"}
      onClick={() => {
        setIndex(props.index);
        toggleDetail();
      }}
    >
      <Box
        pos={"absolute"}
        h={"100%"}
        w={"100%"}
        borderRadius={"20px"}
        bg={"rgba(255, 255, 255, 1)"}
        zIndex={3}
      >
        <Image
          src={`/assets/lalat buah.png`}
          pos={"absolute"}
          top={0}
          left={0}
          h={"100%"}
          w={"70%"}
          objectFit={"cover"}
          objectPosition={"right"}
          zIndex={3}
          borderRadius={"20px"}
          style={{
            WebkitMaskImage:
              "linear-gradient(65deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 1)",
            maskImage:
              "linear-gradient(65deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 1)",
            transform: "scaleX(-1)",
          }}
        />
      </Box>
      <Flex
        direction={"column"}
        justify={"space-between"}
        align={"end"}
        pos={"absolute"}
        right={0}
        zIndex={4}
        h={"100%"}
        px={5}
        py={2}
      >
        <Text
          bg={"#f9f9f9"}
          w={"fit-content"}
          py={1}
          px={2}
          borderRadius={"full"}
          fontSize={"1vh"}
        >
          <Moment format="DD/M/YYYY">{data.createdAt}</Moment>
        </Text>
        <Box textAlign={"end"}>
          <Text fontSize={"2.5vh"} lineHeight={1} fontWeight={"bold"}>
            {data.jumlah}
          </Text>
          <Text fontSize={"1.2vh"} fontWeight={600}>
            {data.KelompokTani.nama}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ManajemenHamaCard;
