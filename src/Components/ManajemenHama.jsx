import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useHama } from "../state";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const ManajemenHama = () => {
  const navigate = useNavigate();
  const { setIndex, toggleDetail, setFrom, hama, setHama } = useHama();

  const fetchHama = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tangkapan-hama-latest`);
      setHama(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchHama();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box w={"85%"} mx={"auto"} pos={"relative"}>
      <Flex align={"center"} justify={"space-between"} mb={3}>
        <Text fontWeight={"bold"} fontSize={"2vh"}>
          Manajemen Hama
        </Text>
        <Button
          bg={"white"}
          fontWeight={"normal"}
          fontSize={"8pt"}
          h={"fit-content"}
          py={1}
          px={2}
          borderRadius={"30px"}
        >
          <Link to="/manajemen-hama">Lihat Semua</Link>
        </Button>
      </Flex>

      <Box h={"fit-content"} pos={"relative"}>
        <Swiper spaceBetween={'25px'} slidesOffsetAfter={30}
        breakpoints={{
          // Define the minimum and maximum slides per view
          0: {
            slidesPerView: 2.3, // Minimum slides per view for small screens
          },
          400: {
            slidesPerView: 2.6, 
          },
        }}
        >
          {hama.map((item, index) => (
            <SwiperSlide key={index}>
              <Button
                variant={"unstyled"}
                pos={"relative"}
                h={"150px"}
                w={"130px"}
                borderRadius={"20px"}
                bg={"white"}
                onClick={() => {
                  setIndex(index);
                  setFrom("Home");
                  toggleDetail();
                  navigate("/manajemen-hama");
                }}
              >
                <Image
                  src={`/assets/lalat buah.png`}
                  pos={"absolute"}
                  right={0}
                  h={"60%"}
                  w={"100%"}
                  objectFit={"cover"}
                  zIndex={0}
                  borderRadius={"20px 20px 0 0"}
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(237, 237, 237, 0), rgba(237, 237, 237, 1))",
                    maskImage:
                      "linear-gradient(to top, rgba(237, 237, 237, 0), rgba(237, 237, 237, 1))",
                  }}
                ></Image>

                <Flex
                  direction={"column-reverse"}
                  align={"end"}
                  h={"100%"}
                  px={2}
                  pb={"0.8vh"}
                  zIndex={1}
                  gap={2}
                >
                  <Flex
                    alignItems={"center"}
                    justify={"space-between"}
                    w={"100%"}
                  >
                    <Text
                      fontSize={"7pt"}
                      lineHeight={1}
                      fontWeight={"normal"}
                      textAlign={"start"}
                    >
                      Jumlah <br />
                      Hama
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"16pt"}>
                      {item.jumlah}
                    </Text>
                  </Flex>

                  <Flex direction={"column"} w={"30%"} align={"end"}>
                    <Text
                      fontWeight={"bold"}
                      textAlign={"end"}
                      fontSize={"8pt"}
                      lineHeight={1}
                    >
                      {item.KelompokTani.nama}
                    </Text>
                    <Text fontSize={"6pt"} color={"#d4d4d4"}>
                    <Moment format="DD/M/YYYY">{item.createdAt}</Moment>
                    </Text>
                  </Flex>
                </Flex>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ManajemenHama;
