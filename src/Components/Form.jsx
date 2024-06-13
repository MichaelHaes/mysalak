import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { useWeatherPred } from "../state";
import { Input, Button, Box, Heading, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const minRH_avg = 66;
const maxRH_avg = 98;

const minTavg = 22.9;
const maxTavg = 31.5;

const minRR = 0;
const maxRR = 92;

const minLumen = 2.7;
const maxLumen = 231468.2;

const Form = (props) => {
  const setTemp = useWeatherPred((state) => state.setTemp);
  const setHumid = useWeatherPred((state) => state.setHumid);
  const setPrecipitation = useWeatherPred((state) => state.setPrecipitation);
  const setLuminosity = useWeatherPred((state) => state.setLuminosity);

  // const temp = useWeatherPred((state) => state.temp)
  // const humidity = useWeatherPred((state) => state.humidity)
  // const precipitation = useWeatherPred((state) => state.precipitation)
  // const luminosity = useWeatherPred((state) => state.luminosity)

  const [inputs, setInputs] = useState({
    Temperatur: "",
    Kelembapan: "",
    "Curah Hujan": "",
    "Intensitas Cahaya": "",
  });

  const [predictions, setPredictions] = useState({
    Temperatur: 0,
    Kelembapan: 0,
    "Curah Hujan": 0,
    "Intensitas Cahaya": 0,
  });

  const normalize = (value, min, max) => (value - min) / (max - min);
  const denormalize = (value, min, max) => value * (max - min) + min;

  const handleInputChange = (event, inputName) => {
    const { value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: isNaN(value) ? 0 : value,
    }));
  };

  function addNoiseOrZero(value, zeroProbability) {
    if (Math.random() < zeroProbability) {
      return 0;
    }
    return value;
  }

  const handlePredict = () => {
    // Kelembapan
    const inputKelembapan = normalize(
      parseFloat(inputs.Kelembapan),
      minRH_avg,
      maxRH_avg
    );
    const reshapedKelembapan = tf.reshape([[inputKelembapan]], [1, 1, 1]);
    const resultKelembapan = props.humidityModel.predict(reshapedKelembapan);

    // Temperatur
    const inputTemperatur = normalize(
      parseFloat(inputs.Temperatur),
      minTavg,
      maxTavg
    );
    const reshapedTemperatur = tf.reshape([[inputTemperatur]], [1, 1, 1]);
    const resultTemperatur = props.temperatureModel.predict(reshapedTemperatur);

    // Curah Hujan masih kacau ini ga tau gimana
    const inputRR = normalize(parseFloat(inputs["Curah Hujan"]), minRR, maxRR);
    const finalRR = [
      addNoiseOrZero(inputRR, 0.1),
      addNoiseOrZero(inputRR, 0.1),
      addNoiseOrZero(inputRR, 0.1),
      addNoiseOrZero(inputRR, 0.1),
      addNoiseOrZero(inputRR, 0.1),
    ];
    const reshapedRR = tf.reshape([[finalRR]], [1, 5, 1]);
    const resultRR = props.precipitationModel.predict(reshapedRR);

    // Intensitas Cahaya
    const inputLumen = normalize(
      parseFloat(inputs["Intensitas Cahaya"]),
      minLumen,
      maxLumen
    );
    const reshapedLumen = tf.reshape([[inputLumen]], [1, 1, 1]);
    const resultLumen = props.luminosityModel.predict(reshapedLumen);

    setPredictions({
      Temperatur: denormalize(
        Array.from(resultTemperatur.dataSync()),
        minTavg,
        maxTavg
      ),
      Kelembapan: denormalize(
        Array.from(resultKelembapan.dataSync()),
        minRH_avg,
        maxRH_avg
      ),
      "Curah Hujan": denormalize(Array.from(resultRR.dataSync()), minRR, maxRR),
      "Intensitas Cahaya": denormalize(
        Array.from(resultLumen.dataSync()),
        minLumen,
        maxLumen
      ),
    });
  };

  useEffect(() => {
    if (predictions) {
      setTemp(predictions.Temperatur);
      setHumid(predictions.Kelembapan);
      setPrecipitation(predictions["Curah Hujan"]);
      setLuminosity(predictions["Intensitas Cahaya"]);
    }
  }, [predictions, setTemp, setHumid, setPrecipitation, setLuminosity]);

  return (
    <Box marginX={"10px"} padding={"10px"}>
      <Heading size="md">Prediksi Cuaca</Heading>
      {/* <div>
        <p>Min-Max</p>
        Temperatur : {minTavg} - {maxTavg} <br />
        Kelembapan : {minRH_avg} - {maxRH_avg} <br />
        Curah Hujan : {minRR} - {maxRR} <br />
        Intensitas Cahaya : {minLumen} - {maxLumen} <br />
      </div> */}
      <FormControl isRequired>
        <Flex flexDirection={"column"}>
          {Object.entries(inputs).map(([inputName, value], index) => (
            <Flex key={index}>
              <FormLabel w="100vw" margin={"auto"}>
                {inputName}
              </FormLabel>
              <Spacer />
              <Input
                value={value}
                variant="flushed"
                placeholder={inputName}
                onChange={(event) => handleInputChange(event, inputName)}
                isRequired
              />
            </Flex>
          ))}
          <Button
            marginX={"auto"}
            width={"50%"}
            marginY={"10px"}
            onClick={handlePredict}
          >
            Prediksi
          </Button>
        </Flex>
      </FormControl>

      <Card align="center" w={"90vw"} margin={"auto"}>
        <CardHeader>
          <Heading size="sm">Hasil Prediksi</Heading>
        </CardHeader>
        <CardBody>
          <Flex>
            <Text w="40vw">Temperatur</Text>
            <Text>
              {predictions.Temperatur !== 0
                ? `: ${parseFloat(predictions.Temperatur).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="40vw">Kelembapan</Text>
            <Text>
              {predictions.Kelembapan !== 0
                ? `: ${parseFloat(predictions.Kelembapan).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="40vw">Curah Hujan</Text>
            <Text>
              {predictions["Curah Hujan"] !== 0
                ? `: ${parseFloat(predictions["Curah Hujan"]).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="40vw">Intensitas Cahaya</Text>
            <Text>
              {predictions["Intensitas Cahaya"] !== 0
                ? `: ${parseFloat(predictions["Intensitas Cahaya"]).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Form;
