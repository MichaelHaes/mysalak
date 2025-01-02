import React, { useState, useEffect } from "react";
import { Box, Image, Button, Text, Flex } from "@chakra-ui/react";
import { MdFlipCameraAndroid } from "react-icons/md";
import Webcam from "react-webcam";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCoordinate } from "../state";

const MainCamera = ({ changeCaptured, togglePredict }) => {
  const [facing, setFacing] = useState({ exact: "environment" });
  const [captured, setCaptured] = useState(null);
  const navigate = useNavigate();
  const { setLongitude, setLatitude } = useCoordinate();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLongitude(longitude);
          setLatitude(latitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Box
      w={"inherit"}
      h={"100vh"}
      overflowY={"hidden"}
      position="relative"
      zIndex={2}
    >
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
        w={"100%"}
        h={"17vh"}
        align={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        // bgGradient="linear(to top,
        // rgba(72, 72, 72, 0),
        // rgba(72, 72, 72, 0.5) 10%,
        // rgba(72, 72, 72, 0.8) 50%,
        // rgba(72, 72, 72, 1))"
      >
        <Flex
          justify={"center"}
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"white"}
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
          <IoIosArrowBack size={"auto"} />
        </Flex>
        <Text
          pos={"absolute"}
          top={"7vh"}
          w={"100%"}
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"2.5vh"}
          color={"white"}
          zIndex={10}
        >
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
                changeCaptured(getScreenshot());
                togglePredict();
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

export default MainCamera;
