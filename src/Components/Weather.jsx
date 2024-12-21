import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCloudRain } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { IoIosPartlySunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import "./Styles/Weather.css";
import { Link } from "react-router-dom";
import { useWeather } from "../state";
import axios from "axios";
import env from "react-dotenv";
import moment from "moment";

const Weather = () => {
  const { preds, setPreds, latest, setLatest } = useWeather();
  const [show, setShow] = useState(false);
  const [humidity, setHumidity] = useState(0);

  const getWeather = async () => {
    const response = await axios.get(`${env.API_URL}/raspi-latest`);
    setLatest(response.data);
    setHumidity(response.data.humidity);
    setShow(true);
  };

  const getPred = async () => {
    const response = await axios.get(`${env.API_URL}/ramalan`);
    setPreds(response.data);
  };

  useEffect(() => {
    getWeather();
    getPred();
  }, []);

  return (
    <Flex justifyContent={"center"} pos={"relative"} my={9}>
      <Button
        variant={"unstyled"}
        w={"85%"}
        mx={"auto"}
        h={"19vh"}
        boxShadow={"0 2px 5px 1px #e5e9e6"}
        borderRadius={"20px"}
        pos={"relative"}
      >
        <Link to="/ramalan-cuaca">
          {/* bg */}
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
              borderRadius={"20px"}
            ></Image>
            <Box
              pos={"absolute"}
              h={"100%"}
              w={"100%"}
              top={0}
              left={0}
              bg={"linear-gradient(to bottom right, #80B996, #1E5232)"}
              opacity={0.8}
              borderRadius={"20px"}
            ></Box>
            <Box
              pos={"absolute"}
              h={"100%"}
              w={"100%"}
              top={0}
              left={0}
              bg={"linear-gradient(to left, #000000, #78F59B)"}
              opacity={0.6}
              borderRadius={"20px"}
            ></Box>
          </Box>

          <Flex
            pos={"absolute"}
            w={"100%"}
            h={"100%"}
            top={0}
            left={0}
            zIndex={1}
            className="white-text"
            px={3}
            align={"center"}
          >
            {/* Kiri */}
            <Flex
              flexDir={"column"}
              width={"50%"}
              align={"start"}
              h={"100%"}
              pb={2}
              ps={1}
              justify={"space-around"}
            >
              <Flex align={"center"}>
                {/* <Box w={"7vh"} h={"7vh"}>
                  <IoIosPartlySunny size="auto" fill="white" />
                </Box> */}

                <Flex ms={1} direction={"column"} align={"start"} mb={-4}>
                  <Text fontSize={"1.5vh"} mb={"-1vh"}>
                    Saat ini
                  </Text>
                  <Text fontSize={"5.5vh"} fontWeight={"bold"}>
                    {show && latest.temperature.toPrecision(3)}°C
                  </Text>
                </Flex>
              </Flex>
              {/* <Text fontSize={"1.5vh"} mt={0} fontWeight={500} mb={3}>
                Cerah Berawan
              </Text> */}

              <Flex gap={4} textAlign={"center"} fontSize={"1.4vh"}>
                {preds
                  .filter((item) =>
                    moment(item.date).isBetween(
                      moment(),
                      moment().add(3, "hours")
                    )
                  )
                  .map((item) => (
                    <Flex direction={"column"} justify={"center"}>
                      <Text fontWeight={"bold"} fontSize={"1.7vh"}>{item.temperature.toPrecision(3)}°C</Text>
                      <Text fontWeight={"normal"}>
                        {moment(item.date).format("HH")}:00
                      </Text>
                    </Flex>
                  ))}
              </Flex>
            </Flex>

            {/* Kanan */}
            <Flex w={"50%"} h={"95%"} align={"center"} justify={"end"}>
              <Flex
                direction={"column"}
                bg={"#416d51"}
                h={"85%"}
                w={"75%"}
                borderRadius={"20px"}
                gap={2}
                justify={"center"}
                ps={3}
              >
                <Flex className="indikator-list">
                  <Box className="icon-wrapper">
                    <BsCloudRain fill="#416d51" size={"auto"} />
                  </Box>
                  <Flex className="text-wrapper">
                    <Text>Curah Hujan</Text>
                    <Text>{latest.tips}mm/h</Text>
                  </Flex>
                </Flex>

                <Flex className="indikator-list">
                  <Box className="icon-wrapper">
                    <GoSun fill="#416d51" size={"auto"} />
                  </Box>
                  <Flex className="text-wrapper">
                    <Text>Intensitas Cahaya</Text>
                    <Text>{latest.lux}Cd</Text>
                  </Flex>
                </Flex>

                <Flex className="indikator-list">
                  <Box className="icon-wrapper no-padding">
                    <WiHumidity fill="#416d51" size={"auto"} />
                  </Box>
                  <Flex className="text-wrapper">
                    <Text>Kelembaban</Text>
                    <Text>{humidity.toPrecision(3)}%</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </Button>
    </Flex>
  );
};

export default Weather;
