import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Styles/IndikatorCard.css";
import { IoIosPartlySunny } from "react-icons/io";
import moment from "moment";

const IndikatorCard = (props) => {
  const cardDetails = props.item;

  return (
    <Box w={"85%"} mx={"auto"} pos={"relative"}>
      <Text fontWeight={"bold"} fontSize={"2vh"} mt={8} mb={4}>
        Ramalan 24 Jam
      </Text>

      <Box h={"fit-content"} pos={"relative"}>
        <Swiper spaceBetween={30} slidesPerView={3.5} slidesOffsetAfter={30}>
          {cardDetails
            .filter(
              (item) =>
                moment(item.date).format("DD") === moment().format("DD") ||
                moment(item.date).format("DD") ===
                  moment().add(1, "days").format("DD")
            )
            .slice(moment().add(1, 'hours').format("HH"), moment().format("HH") + 24)
            .map((item) => (
              <SwiperSlide>
                <Box className="ramalan-card">
                  <Box className="ramalan-card-header white-text">
                    <Text>{moment(item.date).format("HH")}:00</Text>
                  </Box>
                  <Box className="ramalan-card-body">
                    <Box>
                      <IoIosPartlySunny size={"auto"} />
                    </Box>
                    <Text>{item.temperature.toPrecision(3)}°C</Text>
                  </Box>
                  <Box className="ramalan-card-footer">
                    <Text>H:{item.humidity.toPrecision(3)}%</Text>
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
