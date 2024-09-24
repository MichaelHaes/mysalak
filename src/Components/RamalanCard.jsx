import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment/locale/id";

const RamalanCard = (props) => {
  moment.locale("id");
  const data = props.item;
  const index = props.index;
  const now = new Date();

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
            <Moment format="DD">
              {new Date(new Date().setDate(new Date().getDate() + index + 1))}
            </Moment>
          </Text>
          <Text fontSize={"0.8vh"} lineHeight={1}>
              {now.getDate() + index >= 30 ? (
                <Moment format="MMMM">
                  {new Date(new Date().setMonth(new Date().getMonth() + 1))}
              </Moment>
              ) : (<Moment format="MMMM">
                  {new Date(new Date().setDate(new Date().getMonth()))}
              </Moment>)}
          </Text>
        </Flex>

        <Flex direction={"column"} ms={4}>
          <Text fontSize={"1.8vh"} fontWeight={"bold"} lineHeight={1}>
            {index === 0
              ? "Besok"
              : index === 1
              ? "Lusa"
              : `${index + 1} hari lagi`}
          </Text>
          {/* <Text fontWeight={"bold"} fontSize={"1.8vh"} lineHeight={1.3}>
            {data.cuaca}
          </Text> */}
        </Flex>
      </Flex>

      <Text fontWeight={"bold"} fontSize={"2.2vh"}>
        {data.tavg.toPrecision(3)}°C
      </Text>
    </Flex>
  );
};

export default RamalanCard;
