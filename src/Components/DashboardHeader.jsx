import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const DashboardHeader = ({ profilePic, isLoadingProfilePic }) => {
  const today = new Date();
  console.log('profilePic', profilePic)

  return (
    <Box>
      <Box pos={"relative"} height={"28vh"}>
        <Box pos={"relative"} h={"100%"} w={"100%"}>
          <Image
            src="/assets/pohon salak.png"
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
          >
            <Link to={"/profil"}>
              <Box
                w={"85px"}
                h={"85px"}
                borderRadius={"50%"}
                border={"2px solid #a6c4a6"}
                overflow={"hidden"}
              >
                {isLoadingProfilePic ? (
                  <Spinner size="lg" color="green.500" />
                ) : (
                  <Image
                    src={
                      profilePic
                        ? `data:image/png;base64,${profilePic}`
                        : "/assets/defaultUser.jpg"
                    }
                    alt="Profile"
                    w={"100%"}
                    h={"100%"}
                    objectFit={"cover"}
                    borderRadius={"50%"}
                  />
                )}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Flex
        w={"85%"}
        mx={"auto"}
        h={"8vh"}
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
        </Box>
        <Box
          alignSelf={"center"}
          pos={"absolute"}
          zIndex={4}
          width={"90%"}
          py={"1.3vh"}
        >
          <Text fontWeight={"bold"} fontSize={"2vh"} mb={1} ps={5}>
            Waspada Lalat Buah!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
