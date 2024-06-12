import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Styles/IndikatorCard.css";
import { IoIosPartlySunny } from "react-icons/io";

const IndikatorCard = () => {
  const cardDetails = [
    {
      jam: "12.00",
      suhu: "20°C",
      cuaca: "Cerah Berawan",
    },
    {
      jam: "16.00",
      suhu: "20°C",
      cuaca: "Cerah Berawan",
    },
    {
      jam: "20.00",
      suhu: "20°C",
      cuaca: "Cerah Berawan",
    },
    {
      jam: "00.00",
      suhu: "20°C",
      cuaca: "Cerah Berawan",
    },
  ];

  return (
    <Box w={"85%"} mx={"auto"} pos={"relative"}>
      <Text fontWeight={"bold"} fontSize={"2vh"} mt={8} mb={4}>
        Ramalan 24 Jam
      </Text>

      <Box h={"fit-content"} pos={"relative"}>
        <Swiper slidesPerView={3.5} slidesOffsetAfter={30}>
          {cardDetails.map((item) => (
            <SwiperSlide>
              <Box className="ramalan-card">
                <Box className="ramalan-card-header white-text">
                  <Text>{item.jam}</Text>
                </Box>
                <Box className="ramalan-card-body">
                  <Box>
                    <IoIosPartlySunny size={"auto"} />
                  </Box>
                  <Text>{item.suhu}</Text>
                </Box>
                <Box className="ramalan-card-footer">
                  <Text>{item.cuaca}</Text>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default IndikatorCard;
