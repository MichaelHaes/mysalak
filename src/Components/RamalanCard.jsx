import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment/locale/id";

const RamalanCard = (props) => {
  moment.locale("id");
  const data = props.item;
  const index = props.index;

  return (
    <Flex
      bg={"white"}
      borderRadius={"12px"}
      h={"7vh"}
      w={"100%"}
      px={3}
      align={"center"}
      justifyContent={"space-between"}
      boxShadow={"0 1px 5px 1px #e5e9e6"}
    >
      <Flex align={"center"}>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          h={"4.6vh"}
          w={"4.6vh"}
          bg={"#e4efe9"}
          borderRadius={"50%"}
          p={1}
        >
          <Text fontWeight={"bold"} lineHeight={1}>
            <Moment format="DD">{data.date}</Moment>
          </Text>
          <Text fontSize={"0.8vh"} lineHeight={1}>
            <Moment format="MMMM">{data.date}</Moment>
          </Text>
        </Flex>

        <Flex direction={"column"} ms={4}>
          <Text fontSize={"1vh"} lineHeight={1}>
            {index === 0
              ? "Hari ini"
              : index === 1
              ? "Besok"
              : index === 2
              ? "Lusa"
              : `${index} hari lagi`}
          </Text>
          <Text fontWeight={"bold"} fontSize={"1.8vh"} lineHeight={1.3}>
            {data.cuaca}
          </Text>
        </Flex>
      </Flex>

      <Text fontWeight={"bold"} fontSize={"2.2vh"}>
        {data.suhu}°C
      </Text>
    </Flex>
  );
};

export default RamalanCard;
