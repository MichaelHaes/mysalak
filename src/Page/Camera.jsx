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
    width: "100%",
    height: "100%",
    facingMode: facing,
  };

  function handleFacing() {
    setFacing((prevFacing) =>
      prevFacing === "user" ? { exact: "environment" } : "user"
    );
  }

  return (
    <Box w={"inherit"} h={"100vh"} position="relative">
      {/* <Box
        id="masked"
        w={"inherit"}
        h={"100vh"}
        position={"absolute"}
        top={0}
        left={0}
        zIndex={5}
        bgGradient="linear(to-b, #202020, rgba(72, 72, 72, 0.5))"
        // style={{
        //   WebkitMaskImage: "-moz-element(#mask)",
        //   maskImage: "-moz-element(#mask)",
        //   maskRepeat: "no-repeat",
        //   maskPosition: "center",
        // }}
      ></Box> */}
      <Flex
        pos={"absolute"}
        top={"8%"}
        w={"100%"}
        align={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        zIndex={10}
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
        style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        videoConstraints={videoConstraints}
        disablePictureInPicture={true}
        screenshotQuality={1}
      >
        {({ getScreenshot }) => (
          <Flex
            position="absolute"
            bottom={"15%"}
            left="50%"
            transform="translateX(-50%)"
            justify={"space-around"}
            align={"center"}
            gap={10}
          >
            <Button
              variant={"unstyled"}
              onClick={() => {
                setCaptured(getScreenshot());
              }}
              width="60px"
              height="60px"
            >
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
            </Button>
            <Button
              h={"fit-content"}
              variant={"unstyled"}
              onClick={() => {
                setCaptured(getScreenshot());
              }}
            >
              <MdOutlineCamera fill="white" size={"80px"} />
            </Button>
            <Button
              h={"fit-content"}
              variant={"unstyled"}
              onClick={handleFacing}
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
