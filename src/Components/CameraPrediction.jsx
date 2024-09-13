import React, { useEffect, useState } from "react";
import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

const CameraPrediction = ({ togglePredict, captured }) => {
  const navigate = useNavigate();
  const [detected, setDetected] = useState(0);

  const getPrediction = async () => {
    // Convert base64 string to Blob
    const byteString = atob(captured.split(",")[1]); // Extract base64 content
    const mimeString = captured.split(",")[0].split(":")[1].split(";")[0]; // Extract mime type
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append("image", blob);

    // Send request
    const response = await axios.post(`${env.MODEL_URL}/yolo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    setDetected(response.data.num_detections);
  };

  useEffect(() => {
    getPrediction();
    console.log(`detected: ${detected}`);
  }, []);

  useEffect(() => {
    console.log(detected);
  }, [detected]);

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

      <Flex flexDir={"column"} px={5} pt={"14vh"}>
        <Text fontSize={"2vh"} fontWeight={600}>
          Foto Hama
        </Text>
        <Flex h={"30vh"} w={"100%"} mx={"auto"} mt={2} mb={8}>
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
        <Text lineHeight={"normal"} fontSize={"2vh"} fontWeight={600}>
          Jumlah Hama
        </Text>
        <Text fontWeight={"800"} fontSize={"5vh"} mt={1} lineHeight={"normal"}>
          {detected}
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
            navigate("/");
          }}
        >
          Simpan
        </Button>
      </Flex>
    </Flex>
  );
};

export default CameraPrediction;
