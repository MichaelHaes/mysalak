import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsCloudRain } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { IoIosPartlySunny } from "react-icons/io";
import { IoRainyOutline } from "react-icons/io5";
import { WiDayCloudy, WiHumidity } from "react-icons/wi";

const Weather = () => {
  return (
    <Box pos={"relative"} my={9}>
      <Box
        w={"85%"}
        mx={"auto"}
        h={"20vh"}
        boxShadow={"0 2px 5px 1px #e5e9e6"}
        borderRadius={"20px"}
        pos={"relative"}
      >
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
          py={2}
          px={5}
        >
          <Flex flexDir={"column"} width={"50%"}>
            <Flex align={"center"} mt={1}>
              <Box w={"65px"} h={"65px"}>
                <IoIosPartlySunny size="auto" fill="white" />
              </Box>

              <Flex ms={1} direction={"column"} justify={"center"} mb={-4}>
                <Text fontSize={"8pt"} mb={-3}>
                  Saat ini
                </Text>
                <Text fontSize={"28pt"} fontWeight={"bold"}>
                  30°C
                </Text>
              </Flex>
            </Flex>
            <Text fontSize={"10pt"} mt={-1} mb={2}>
              Cerah Berawan
            </Text>

            <Flex gap={4}>
              <Flex direction={"column"}>
                <IoIosPartlySunny size={"35px"} />
                <Text fontSize={"10pt"} mt={"-10%"}>
                  12.00
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <IoIosPartlySunny size={"35px"} />
                <Text fontSize={"10pt"} mt={"-10%"}>
                  16.00
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <IoIosPartlySunny size={"35px"} />
                <Text fontSize={"10pt"} mt={"-10%"}>
                  20.00
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex w={"50%"} align={"center"} justify={"end"}>
            <Flex
              direction={"column"}
              bg={"#416d51"}
              h={"85%"}
              w={"75%"}
              borderRadius={"20px"}
              gap={2}
              justify={"center"}
              px={4}
            >
              <Flex align={"center"}>
                <Box
                  borderRadius={"50%"}
                  bg={"white"}
                  w={"25px"}
                  h={"25px"}
                  p={1}
                  me={2}
                >
                  <BsCloudRain fill="#416d51" size={"auto"} />
                </Box>
                <Flex direction={"column"}>
                  <Text fontSize={"6pt"} mb={-1}>
                    Curah Hujan
                  </Text>
                  <Text fontSize={"12pt"} fontWeight={"bold"}>
                    100%
                  </Text>
                </Flex>
              </Flex>

              <Flex align={"center"}>
                <Box
                  borderRadius={"50%"}
                  bg={"white"}
                  w={"25px"}
                  h={"25px"}
                  p={1}
                  me={2}
                >
                  <GoSun fill="#416d51" size={"auto"} />
                </Box>
                <Flex direction={"column"}>
                  <Text fontSize={"6pt"} mb={-1}>
                    Intensitas Cahaya
                  </Text>
                  <Text fontSize={"12pt"} fontWeight={"bold"}>
                    30cd
                  </Text>
                </Flex>
              </Flex>

              <Flex align={"center"}>
                <Box
                  borderRadius={"50%"}
                  bg={"white"}
                  w={"25px"}
                  h={"25px"}
                  me={2}
                >
                  <WiHumidity fill="#416d51" size={"auto"} />
                </Box>
                <Flex direction={"column"}>
                  <Text fontSize={"6pt"} mb={-1}>
                    Kelembaban
                  </Text>
                  <Text fontSize={"12pt"} fontWeight={"bold"}>
                    30%
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Weather;
