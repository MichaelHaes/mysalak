import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
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
  const [inputs, setInputs] = useState({
    Temperatur: "",
    Kelembapan: "",
    "Curah Hujan": "",
    "Intensitas Cahaya": "",
  });

  const [predictions, setPredictions] = useState({
    Temperatur: null,
    Kelembapan: null,
    "Curah Hujan": null,
    "Intensitas Cahaya": null,
  });

  const normalize = (value, min, max) => (value - min) / (max - min);
  const denormalize = (value, min, max) => value * (max - min) + min;

  const handleInputChange = (event, inputName) => {
    const { value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: value,
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

    if (!isNaN(Array.from(resultTemperatur.dataSync()))) {
      setPredictions({
        Temperatur: denormalize(
          Array.from(resultTemperatur.dataSync()),
          minTavg,
          maxTavg
        ),
        Kelembapan: null,
        "Curah Hujan": null,
        "Intensitas Cahaya": null,
      });
    } else if (!isNaN(Array.from(resultKelembapan.dataSync()))) {
      setPredictions({
        Temperatur: null,
        Kelembapan: denormalize(
          Array.from(resultKelembapan.dataSync()),
          minRH_avg,
          maxRH_avg
        ),
        "Curah Hujan": null,
        "Intensitas Cahaya": null,
      });
    } else if (!isNaN(Array.from(resultRR.dataSync()))) {
      setPredictions({
        Temperatur: null,
        Kelembapan: null,
        "Curah Hujan": denormalize(
          Array.from(resultRR.dataSync()),
          minRR,
          maxRR
        ),
        "Intensitas Cahaya": null,
      });
    } else if (!isNaN(Array.from(resultLumen.dataSync()))) {
      setPredictions({
        Temperatur: null,
        Kelembapan: null,
        "Curah Hujan": null,
        "Intensitas Cahaya": denormalize(
          Array.from(resultLumen.dataSync()),
          minLumen,
          maxLumen
        ),
      });
    }
  };

  return (
    <Box marginX={"10px"} padding={"10px"}>
      <Heading size="md">Prediksi Cuaca</Heading>
      <div>
        <p>Min-Max</p>
        Temperatur : {minTavg} - {maxTavg} <br />
        Kelembapan : {minRH_avg} - {maxRH_avg} <br />
        Curah Hujan : {minRR} - {maxRR} <br />
        Intensitas Cahaya : {minLumen} - {maxLumen} <br />
      </div>
      <FormControl>
        {Object.entries(inputs).map(([inputName, value], index) => (
          <Flex>
            <FormLabel w="15vw" margin={"auto"}>
              {inputName}
            </FormLabel>
            <Spacer />
            <Input
              key={index}
              value={value}
              variant="flushed"
              placeholder={inputName}
              onChange={(event) => handleInputChange(event, inputName)}
            />
          </Flex>
        ))}
        <Button margin={"auto"} onClick={handlePredict}>
          Prediksi
        </Button>
      </FormControl>

      <Card align="center" w={"75%"} margin={"auto"}>
        <CardHeader>
          <Heading size="sm">Hasil Prediksi</Heading>
        </CardHeader>
        <CardBody>
          <Flex>
            <Text w="15vw">Temperatur</Text>
            <Text>
              {predictions.Temperatur !== null
                ? `: ${parseFloat(predictions.Temperatur).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="15vw">Kelembapan</Text>
            <Text>
              {predictions.Kelembapan !== null
                ? `: ${parseFloat(predictions.Kelembapan).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="15vw">Curah Hujan</Text>
            <Text>
              {predictions["Curah Hujan"] !== null
                ? `: ${parseFloat(predictions["Curah Hujan"]).toFixed(2)}`
                : ":"}
            </Text>
          </Flex>
          <Flex>
            <Text w="15vw">Intensitas Cahaya</Text>
            <Text>
              {predictions["Intensitas Cahaya"] !== null
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
