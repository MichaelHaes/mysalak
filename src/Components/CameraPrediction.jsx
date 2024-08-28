import React from "react";
import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CameraPrediction = ({ togglePredict, captured }) => {
  const navigate = useNavigate();

  const postCalculation = () => {
    console.log("saved");
  };

  return (
    <Flex
      flexDir={"column"}
      w={"inherit"}
      h={"100vh"}
      overflowY={"hidden"}
      position="relative"
    >
      <Flex
        justify={"center"}
        align={"center"}
        w={"30px"}
        h={"30px"}
        bg={"#2C3631"}
        borderRadius={"50%"}
        top={"7.2vh"}
        left={7}
        p={2}
        pos={"absolute"}
        zIndex={11}
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowBack size={"auto"} fill="white" />
      </Flex>
      <Text
        pos={"absolute"}
        top={"7vh"}
        position={"absolute"}
        zIndex={10}
        w={"100%"}
        textAlign={"center"}
        fontWeight={"600"}
        fontSize={"2.5vh"}
      >
        Hitung Hama
      </Text>

      <Flex flexDir={"column"} px={5} pt={'14vh'}>
        <Text fontSize={'2vh'} fontWeight={600}>Foto Hama</Text>
        <Flex h={"30vh"} w={"90vw"} mx={"auto"} mt={2} mb={8}>
          <Image
            h={"inherit"}
            w={"inherit"}
            mx={"auto"}
            src={captured}
            borderRadius={"20px"}
            objectFit={"cover"}
            alt="hama"
          />
        </Flex>
        <Text lineHeight={"normal"} fontSize={'2vh'} fontWeight={600}>Jumlah Hama</Text>
        <Text fontWeight={"800"} fontSize={"4.5vh"} mt={1} lineHeight={"normal"}>
          20
        </Text>
      </Flex>

      <Flex
        justifyContent={"center"}
        position={"absolute"}
        bottom={"5%"}
        w={"100%"}
        gap={5}
      >
        <Button
          bg={"transparent"}
          borderRadius={"20px"}
          border={"1px solid #2c3631"}
          onClick={() => togglePredict()}
          w={"42%"}
        >
          Foto Ulang
        </Button>
        <Button
          w={"42%"}
          borderRadius={"20px"}
          bg={"#2c3631"}
          color={"white"}
          onClick={() => {
            postCalculation();
          }}
        >
          Simpan
        </Button>
      </Flex>
    </Flex>
  );
};

export default CameraPrediction;
