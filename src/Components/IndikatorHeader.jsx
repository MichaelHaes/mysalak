import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosPartlySunny } from "react-icons/io";
import { BsCloudRain } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { WiHumidity } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../state";
import axios from "axios";
import env from "react-dotenv";

const IndikatorHeader = () => {
  const navigate = useNavigate();

  const { latest, setLatest } = useWeather();
  const [show, setShow] = useState(false);

  const getWeather = async () => {
    const response = await axios.get(`${env.API_URL}/raspi-latest`);
    setLatest(response.data);
    setShow(true);
  };

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <Box>
      <Box pos={"relative"} height={"39vh"}>
        <Box pos={"relative"} h={"100%"} w={"100%"}>
          <Image
            src="
            /assets/intensitas cahaya_indikator.png"
            pos={"absolute"}
            top={0}
            left={0}
            h={"100%"}
            w={"100%"}
            objectFit={"cover"}
            zIndex={0}
            borderRadius={"0 0 50px 50px"}
          ></Image>
          <Box
            pos={"absolute"}
            h={"100%"}
            w={"100%"}
            top={0}
            left={0}
            bg={
              "linear-gradient(to bottom, rgba(102, 169, 134, 0.35), rgba(58, 96, 76, 0.8) 22%, #0C2315 80%)"
            }
            opacity={0.9}
            borderRadius={"0 0 50px 50px"}
          ></Box>
        </Box>

        <Flex
          zIndex={1}
          direction={"column"}
          pos={"absolute"}
          top={0}
          left={0}
          height={"100%"}
          width={"100%"}
          className="white-text"
          align={"center"}
        >
          <Flex pos={"relative"} mt={"7vh"} w={"100%"} textAlign={"center"}>
            <Flex
              justify={"center"}
              align={"center"}
              w={"30px"}
              h={"30px"}
              bg={"white"}
              borderRadius={"50%"}
              p={2}
              pos={"absolute"}
              left={7}
              onClick={() => {
                navigate("/");
              }}
            >
              <IoIosArrowBack size={"auto"} fill="black" />
            </Flex>
            <Text
              fontWeight={"bold"}
              w={"100%"}
              fontSize={"2.5vh"}
              color={"white"}
            >
              Prediksi Cuaca
            </Text>
          </Flex>

          <Text fontSize={"1.55vh"} my={2}>
            Saat Ini
          </Text>
          <Text
            fontSize={"7vh"}
            lineHeight={1}
            fontWeight={"bold"}
            bg={"linear-gradient(to bottom, #FFFFFF 33%, #999999)"}
            backgroundClip={"text"}
            style={{
              WebkitTextFillColor:
                "linear-gradient(to bottom, #FFFFFF, #999999, 33%)",
              WebkitBackgroundClip: "text",
            }}
          >
            {show && latest.temperature.toPrecision(3)}°C
          </Text>
          {/* <Flex align={"center"}>
            <IoIosPartlySunny />
            <Text fontSize={"1.5vh"} ms={2}>
              Cerah Berawan
            </Text>
          </Flex> */}

          {/*3 Box indikator */}

          <Flex
            gap={5}
            pos={"absolute"}
            bottom={7}
            align={"center"}
            justify={"center"}
            color={"white"}
          >
            {Array.from({length:3}).map((item, index) => (
              <Flex
                className="indikator-header-card"
                direction={"column"}
                bg={"rgba(65, 109, 81, 0.7)"}
                blur={"1px"}
                w={"11.5vh"}
                h={"11vh"}
                borderRadius={"12px"}
                justify={"space-between"}
                align={"center"}
                textAlign={"center"}
                px={2}
                py={3}
              >
                <Box
                  borderRadius={"50%"}
                  bg={"white"}
                  w={"2.5vh"}
                  h={"2.5vh"}
                  p={index !== 3 ? 1 : 0}
                >
                  {index === 0 ? (
                    <BsCloudRain fill="black" size={"auto"} />
                  ) : index === 2 ? (
                    <GoSun fill="black" size={"auto"} />
                  ) : (
                    <WiHumidity fill="black" size={"auto"} />
                  )}
                </Box>
                <Box>
                  <Text fontSize={"2.2vh"} fontWeight={"bold"}>
                    {index === 0 ? latest.tips:
                    index === 1 ? latest.lux:
                    latest.humidity}
                    {index === 1 ? "cd" : "%"}
                  </Text>
                  <Text fontSize={"1vh"} fontWeight={"light"}>
                    {index === 0
                      ? "Curah Hujan"
                      : index === 1
                      ? "Intensitas Cahaya"
                      : "Kelembaban"}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default IndikatorHeader;
