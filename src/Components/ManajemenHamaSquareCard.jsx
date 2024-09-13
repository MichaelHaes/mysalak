import { Flex, Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import Moment from "react-moment";
import { useHama } from "../state";

const ManajemenHamaSquareCard = (props) => {
  const { setIndex, toggleDetail } = useHama();
  const data = props.item;

  return (
    <Flex
      key={props.index}
      pos={"relative"}
      h={"13.5vh"}
      w={"48.5%"}
      borderRadius={"20px"}
      onClick={() => {
        setIndex(props.index);
        toggleDetail();
      }}
      justifyContent={"space-between"}
      overflow={"hidden"}
    >
      <Image
        src={`/assets/lalat buah.png`}
        pos={"absolute"}
        right={0}
        h={"120%"}
        w={"120%"}
        objectFit={"cover"}
        objectPosition={0}
        zIndex={0}
        borderRadius={"20px"}
        style={{
          //   WebkitMaskImage:
          //     "linear-gradient(to left, rgba(44, 54, 49, 0), rgba(44, 54, 49, 1))",
          //   maskImage:
          //     "linear-gradient(to left, rgba(44, 54, 49, 0), rgba(44, 54, 49, 1))",
          transform: "scaleX(-1)",
        }}
      ></Image>
      <Box
        pos={"absolute"}
        h={"100%"}
        w={"100%"}
        top={0}
        left={0}
        bg={
          "linear-gradient(to right, rgba(44, 54, 49, 0) 40%, rgba(44, 54, 49, 0.5) 50%, rgba(44, 54, 49, 1) 75% 100%)"
        }
        opacity={0.8}
        borderRadius={"20px"}
      ></Box>
      <Box
        pos={"absolute"}
        h={"100%"}
        w={"100%"}
        top={0}
        left={0}
        bg={
          "linear-gradient(to bottom left, rgba(44, 54, 49, 0) 50%, rgba(44, 54, 49, 0.5), rgba(44, 54, 49, 1) 75% 100%)"
        }
        opacity={0.8}
        borderRadius={"20px"}
      ></Box>

      <Flex direction={"column-reverse"} py={2} px={1} zIndex={4} w={"65%"}>
        <Text
          color={"#E4EFE9"}
          fontWeight={800}
        >
          {data.KelompokTani.nama}
        </Text>
      </Flex>

      <Flex
        direction={"column"}
        justify={"space-between"}
        align={"end"}
        zIndex={4}
        h={"100%"}
        py={3}
        px={2}
        pos={"absolute"}
        right={0}
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
        <Box textAlign={"end"} color={"#E4EFE9"}>
          <Text fontSize={"2.5vh"} lineHeight={1} fontWeight={"bold"}>
            {data.jumlah}
          </Text>
          <Text fontSize={"1.2vh"} fontWeight={600}>
            Lalat Buah
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ManajemenHamaSquareCard;
