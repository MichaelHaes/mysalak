import { Box, Image, Button, Text, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdFlipCameraAndroid, MdOutlineCamera } from "react-icons/md";
import Webcam from "react-webcam";
import { usePage } from "../state";
import { IoIosArrowBack } from "react-icons/io";

const Camera = () => {
  const [facing, setFacing] = useState("user");
  const [captured, setCaptured] = useState(null);
  const { setPage } = usePage();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facing,
  };

  function handleFacing() {
    setFacing((prevFacing) =>
      prevFacing === "user" ? { exact: "environment" } : "user"
    );
  }

  return (
    <Box w={"inherit"} h={"100vh"} position="relative" zIndex={2}>
      <Box
        id="masked"
        w={"inherit"}
        h={"100vh"}
        position={"absolute"}
        top={0}
        left={0}
        zIndex={1}
        bgGradient="linear(to-b, #202020, rgba(72, 72, 72, 0.5))"
        // style={{
        //   WebkitMaskImage: "-moz-element(#mask)",
        //   maskImage: "-moz-element(#mask)",
        //   maskRepeat: "no-repeat",
        //   maskPosition: "center",
        // }}
      ></Box>
      <Flex
        pos={"absolute"}
        top={0}
        w={"100%"}
        h={"17vh"}
        align={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        zIndex={11}
        // bgGradient="linear(to top,
        // rgba(72, 72, 72, 0),
        // rgba(72, 72, 72, 0.5) 10%,
        // rgba(72, 72, 72, 0.8) 50%,
        // rgba(72, 72, 72, 1))"
      >
        <Button
          variant={"unstyled"}
          bg={"white"}
          borderRadius={"50%"}
          h={"40px"}
          w={"40px"}
          p={2}
          ms={5}
          onClick={() => {
            setPage("Home");
          }}
        >
          <IoIosArrowBack size={"auto"} />
        </Button>
        <Text fontWeight={"bold"} w={"100%"} fontSize={"3vh"} color={"white"}>
          Hitung Hama
        </Text>
      </Flex>

      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        style={{
          width: "98%",
          height: "72%",
          borderRadius: "20px",
          objectFit: "cover",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9,
        }}
        videoConstraints={videoConstraints}
        disablePictureInPicture={true}
        screenshotQuality={1}
        mirrored={facing === "user" ? true : false}
      >
        {({ getScreenshot }) => (
          <Flex
            w={"100%"}
            height={"25vh"}
            // bgGradient="linear(to-b,
            // rgba(72, 72, 72, 0),
            // rgba(72, 72, 72, 0.5) 20%,
            // rgba(72, 72, 72, 0.8) 50%,
            // rgba(72, 72, 72, 1))"
            position="absolute"
            bottom={0}
            pt={20}
            justify={"center"}
            align={"center"}
            zIndex={10}
          >
            <Box w="60px" h="60px">
              {captured && (
                <Image
                  src={captured}
                  w={"inherit"}
                  h={"inherit"}
                  borderRadius={"20px"}
                  objectFit={"cover"}
                  border={"1px solid white"}
                />
              )}{" "}
            </Box>
            <Button
              variant={"unstyled"}
              w={"70px"}
              h={"70px"}
              bg={"white"}
              borderRadius={"full"}
              border={"4px solid lightgrey"}
              mx={10}
              onClick={() => {
                setCaptured(getScreenshot());
              }}
            ></Button>
            <Button
              h={"fit-content"}
              variant={"unstyled"}
              onClick={() => {
                handleFacing();
              }}
            >
              <MdFlipCameraAndroid fill="white" size={"60px"} />
            </Button>
          </Flex>
        )}
      </Webcam>
    </Box>
  );
};

export default Camera;
