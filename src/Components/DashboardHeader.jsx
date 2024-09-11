import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";


const DashboardHeader = () => {
  const navigate = useNavigate();
  const today = new Date(); 

  return (
    <Box>
      <Box pos={"relative"} height={"28vh"}>
        <Box pos={"relative"} h={"100%"} w={"100%"}>
          <Image
            src="
            /assets/pohon salak.png"
            pos={"absolute"}
            top={0}
            left={0}
            h={"100%"}
            w={"100%"}
            objectFit={"cover"}
            zIndex={0}
            borderRadius={"0 0 65px 65px"}
          ></Image>
          <Box
            pos={"absolute"}
            h={"100%"}
            w={"100%"}
            top={0}
            left={0}
            bg={"linear-gradient(to right, #000000, #78F59B)"}
            opacity={0.6}
            borderRadius={"0 0 65px 65px"}
          ></Box>
        </Box>

        <Flex
          zIndex={1}
          pos={"absolute"}
          top={0}
          left={0}
          height={"100%"}
          width={"100%"}
          className="white-text"
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            ps={5}
            w={"50%"}
          >
            {/* <Text fontSize={"1.4vh"}>Selamat pagi, Bu Endang!</Text> */}
            <Text
              mt={{ base: 1, md: 2 }}
              mb={{ base: 2, md: 3 }}
              fontSize={"2.5vh"}
              fontWeight={"bold"}
            >
              Sudah berkebun
              <br />
              hari ini?
            </Text>
            <Flex alignItems={"center"}>
              <FaCalendarAlt size={"1.5vh"} fill="white" />
              <Text fontSize={"1.4vh"} ml={2}>
                <Moment format="dddd, DD MMMM YYYY">{today}</Moment>
              </Text>
            </Flex>
          </Box>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"end"}
            pe={10}
            w={"50%"}
            // onClick={() => {
            //   navigate("/profil")
            // }}
          >
            {/* <Link to={"/profil"}> */}
              <Image
                src="/assets/profil.png"
                borderRadius={"50%"}
                w={"85px"}
                h={"85px"}
                border={"2px solid #a6c4a6"}
                objectFit={"cover"}
                objectPosition={"63%"}
              />
            {/* </Link> */}
          </Flex>
        </Flex>
      </Box>

      <Flex
        w={"85%"}
        mx={"auto"}
        h={"9vh"}
        border={"1px solid #CFCFCF"}
        boxShadow={"0 2px 5px 1px #e5e9e6"}
        mt={"-8%"}
        borderRadius={"20px"}
      >
        <Box
          pos={"relative"}
          h={"100%"}
          w={"100%"}
          borderRadius={"20px"}
          bg={"rgba(237, 237, 237, 1)"}
          zIndex={3}
        >
          <Image
            src="/assets/lalat buah.png"
            pos={"absolute"}
            top={0}
            right={0}
            h={"100%"}
            w={"50%"}
            objectFit={"cover"}
            objectPosition={"right"}
            zIndex={3}
            borderRadius={"20px"}
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, rgba(237, 237, 237, 0), rgba(237, 237, 237, 1))",
              maskImage:
                "linear-gradient(to right, rgba(237, 237, 237, 0), rgba(237, 237, 237, 1))",
            }}
          />
          <Text
            pos={"absolute"}
            width={"15px"}
            height={"15px"}
            fontSize={"11px"}
            textAlign={"center"}
            right={"12px"}
            bottom={1}
            zIndex={4}
            bg={"white"}
            borderRadius={"50%"}
          >
            i
          </Text>
        </Box>
        <Box pos={"absolute"} zIndex={4} width={"45%"} py={"1.3vh"} ps={5}>
          <Text fontWeight={"bold"} fontSize={"1.57vh"} mb={1}>
            Waspada Lalat Buah!
          </Text>
          <Text
            fontSize={"1.15vh"}
            lineHeight={1}
            maxH={"3.3vh"}
            overflowY={"auto"}
            wordBreak={"break-word"}
            style={{
              scrollbarWidth: "none",
            }}
          >
            Cuaca saat ini berpotensi meningkatkan jumlah lalat buah
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
