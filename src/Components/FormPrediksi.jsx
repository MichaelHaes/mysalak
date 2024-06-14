import React from "react";
import { useWeatherPred } from "../state";
import { Box, Flex, Text, Grid, Card } from "@chakra-ui/react";
import { TiThermometer } from "react-icons/ti";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWbSunny } from "react-icons/md";

const FormPrediksi = () => {
  const temp = useWeatherPred((state) => state.temp);
  const humidity = useWeatherPred((state) => state.humidity);
  const precipitation = useWeatherPred((state) => state.precipitation);
  const luminosity = useWeatherPred((state) => state.luminosity);

  const svg = `
  <svg width="97" height="50" viewBox="0 0 97 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M69.4665 36.6625C97.6199 32.3823 96.4117 -12.7755 96.4117 3.9856C96.4117 20.7467 82.4377 50.1331 62.2516 49.4483C58.6652 49.3266 25.4897 49.4746 0.976587 49.4323C4.56371 43.1126 15.9471 21.1755 29.7515 26.8255C35.6849 29.254 45.8071 40.2596 69.4665 36.6625Z" fill="#2C3631" fill-opacity="0.05" />
  </svg>
  `;

  const bgHasil = `data:image/svg+xml;base64,${btoa(svg)}`;
  return (
    <Box>
      <Grid
        width={'85%'}
        margin={"auto"}
        templateColumns='repeat(2, 1fr)'
        gap={5}
      >
        <Card
          bg={'#E4EFE9'}
          bgImg={bgHasil}
          bgRepeat={"no-repeat"}
          bgPos={"bottom right"}
          borderRadius={'15px'}
        >
          <Box padding={'10px'}>
            <Flex alignItems="center" marginBottom={'5px'}>
              <Flex
                bg={"#2C3631"}
                boxSize={'25px'}
                borderRadius={'100px'}
                alignItems="center"
                justifyContent="center"
              >
                <TiThermometer fill="white" size={'20px'} />
              </Flex>
              <Text paddingLeft={'5px'} fontSize={'15px'}>Suhu</Text>
            </Flex>
            <Text as={'b'}>
              {temp !== 0
                ? `${temp.toFixed(2)}°C`
                : ""}
            </Text>
          </Box>
        </Card>

        <Card
          bg={'#E4EFE9'}
          bgImg={bgHasil}
          bgRepeat={"no-repeat"}
          bgPos={"bottom right"}
          borderRadius={'15px'}
        >
          <Box padding={'10px'}>
            <Flex alignItems="center" marginBottom={'5px'}>
              <Flex
                bg={"#2C3631"}
                boxSize={'25px'}
                borderRadius={'100px'}
                alignItems="center"
                justifyContent="center"
              >
                <WiHumidity fill="white" size={'20px'} />
              </Flex>
              <Text paddingLeft={'5px'} fontSize={'15px'}>Kelembapan</Text>
            </Flex>
            <Text as={'b'}>
              {humidity !== 0
                ? `${humidity.toFixed(2)}%`
                : ""}
            </Text>
          </Box>
        </Card>

        <Card
          bg={'#E4EFE9'}
          bgImg={bgHasil}
          bgRepeat={"no-repeat"}
          bgPos={"bottom right"}
          borderRadius={'15px'}
        >
          <Box padding={'10px'}>
            <Flex alignItems="center" marginBottom={'5px'}>
              <Flex
                bg={"#2C3631"}
                boxSize={'25px'}
                borderRadius={'100px'}
                alignItems="center"
                justifyContent="center"
              >
                <BsCloudRainHeavy fill="white" size={'15px'} />
              </Flex>
              <Text paddingLeft={'5px'} fontSize={'15px'}>Curah Hujan</Text>
            </Flex>
            <Text as={'b'}>
              {precipitation !== 0
                ? `${precipitation.toFixed(2)} mm`
                : ""}
            </Text>
          </Box>
        </Card>

        <Card
          bg={'#E4EFE9'}
          bgImg={bgHasil}
          bgRepeat={"no-repeat"}
          bgPos={"bottom right"}
          borderRadius={'15px'}
        >
          <Box padding={'10px'}>
            <Flex alignItems="center" marginBottom={'5px'}>
              <Flex
                bg={"#2C3631"}
                boxSize={'25px'}
                borderRadius={'100px'}
                alignItems="center"
                justifyContent="center"
              >
                <MdOutlineWbSunny fill="white" size={'18px'} />
              </Flex>
              <Text paddingLeft={'5px'} fontSize={'15px'}>Intensitas C.</Text>
            </Flex>
            <Text as={'b'}>
              {luminosity !== 0
                ? `${luminosity.toFixed(2)} cd`
                : ""}
            </Text>
          </Box>
        </Card>
      </Grid>
    </Box>
  )
}

export default FormPrediksi