import React, { useEffect, useState } from "react";
import { useWeatherPred } from "../state";
import { Box, Card, Flex, Text } from "@chakra-ui/react";

const FormHama = () => {
  const [pestPrediction, setPestPrediction] = useState("");

  const temp = useWeatherPred((state) => state.temp);
  const humidity = useWeatherPred((state) => state.humidity);
  const precipitation = useWeatherPred((state) => state.precipitation);
  const luminosity = useWeatherPred((state) => state.luminosity);

  const isLalatBuah = (temp, humidity, light, rain) => {
    return (
      temp >= 20 &&
      temp <= 32 &&
      humidity >= 60 &&
      humidity <= 75 &&
      light >= 500 &&
      light <= 2000 &&
      rain >= 50 &&
      rain <= 250
    );
  };

  const isKutuPutih = (temp, humidity, light, rain) => {
    return (
      temp >= 27 &&
      temp <= 37 &&
      humidity >= 50 &&
      humidity <= 60 &&
      light >= 600 &&
      light <= 1000 &&
      rain >= 0 &&
      rain <= 225
    );
  };

  const isKumbangGirang = (temp, humidity, light, rain) => {
    return (
      temp >= 23 &&
      temp <= 33 &&
      humidity >= 75 &&
      humidity <= 85 &&
      light >= 900 &&
      light <= 1700 &&
      rain >= 0 &&
      rain <= 225
    );
  };

  const isTikusBajing = (temp, humidity, light, rain) => {
    return (
      temp >= 19 &&
      temp <= 23 &&
      humidity >= 40 &&
      humidity <= 70 &&
      rain >= 25 &&
      rain <= 200
    );
  };

  useEffect(() => {
    let pest = "";
    if (isLalatBuah(temp, humidity, luminosity, precipitation)) {
      pest = "Lalat Buah";
    } else if (isKutuPutih(temp, humidity, luminosity, precipitation)) {
      pest = "Kutu Putih";
    } else if (isKumbangGirang(temp, humidity, luminosity, precipitation)) {
      pest = "Kumbang Girang";
    } else if (isTikusBajing(temp, humidity, luminosity, precipitation)) {
      pest = "Tikus dan Bajing";
    } else {
      pest = "Tidak ada";
    }

    setPestPrediction(pest);
  }, [temp, humidity, luminosity, precipitation]);

  return (
    <Box>
      <Card
        marginTop={'25px'}
        marginX={"auto"}
        width={"85%"}
        borderRadius={'20px'}
      >
        <Flex
          justifyContent="space-between"
        >
          <Box
            bgImage={"/assets/lalat buah.png"}
            bgPos={"right"}
            bgSize={'100%'}
            transform={'scaleX(-1)'}
            borderRadius={'20px'}
            h={"11.5vh"}
            w={"50%"}
          >
          </Box>
          <Box
            borderRadius={'20px'}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))"
          >
          </Box>
          <Flex
            flexDirection={'column'}
            textAlign={'right'}
            justifyContent={"center"}
            paddingRight={'15px'}
            zIndex={10}
          >
            <Text fontSize={10}>
              Prediksi Hama
            </Text>
            <Text as='b'>
              {pestPrediction}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

export default FormHama