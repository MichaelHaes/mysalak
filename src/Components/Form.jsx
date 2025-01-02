import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { useWeatherPred } from "../state";
import { Input, Button, Box, Grid } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

// const minRH_avg = 66;
// const maxRH_avg = 98;
const minRH_avg = 0;
const maxRH_avg = 100;

// const minTavg = 22.9;
// const maxTavg = 31.5;
const minTavg = 20;
const maxTavg = 33;

const minRR = 0;
const maxRR = 92;

const minLumen = 0;
const maxLumen = 2000;

const Form = (props) => {
  const setTemp = useWeatherPred((state) => state.setTemp);
  const setHumid = useWeatherPred((state) => state.setHumid);
  const setPrecipitation = useWeatherPred((state) => state.setPrecipitation);
  const setLuminosity = useWeatherPred((state) => state.setLuminosity);

  const [inputs, setInputs] = useState({
    Temperatur: null,
    Kelembapan: null,
    "Curah Hujan": null,
    "Intensitas Cahaya": null,
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
    if (null === inputs.Kelembapan ||
      null === inputs.Temperatur ||
      null === inputs["Curah Hujan"] ||
      null === inputs["Intensitas Cahaya"]
    ) {
      console.log('null')
      return;
    }

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
      addNoiseOrZero(inputRR, 0),
      addNoiseOrZero(inputRR, 0),
      addNoiseOrZero(inputRR, 0),
      addNoiseOrZero(inputRR, 0),
      addNoiseOrZero(inputRR, 0),
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
    <Box>
      <Grid
        width={'85%'}
        margin={"auto"}
        templateColumns='repeat(2, 1fr)'
        gap={5}
      >

        {Object.entries(inputs).map(([inputName, value], index) => (
          <FormControl key={index}>
            <FormLabel w={'100%'} marginBottom={'5px'} fontSize={'13px'}>
              {
                inputName === "Temperatur" ? "Suhu (°C)" :
                  inputName === "Kelembapan" ? "Kelembapan (%)" :
                    inputName === "Curah Hujan" ? "Curah Hujan (mm)" :
                      "Intensitas Cahaya (cd)"
              }
            </FormLabel>
            <Spacer />
            <Input
              type="number"
              value={value}
              variant="filled"
              placeholder={
                inputName === "Temperatur" ? "°C" :
                  inputName === "Kelembapan" ? "%" :
                    inputName === "Curah Hujan" ? "mm" :
                      "cd"
              }
              bg={"white"}
              textAlign={'right'}
              onChange={(event) => handleInputChange(event, inputName)}
              isRequired
            />
          </FormControl>
        ))}
      </Grid>
      <Flex>
        <Button
          marginX={"auto"}
          width={"85%"}
          borderRadius={'100px'}
          _hover={{
            bg: 'black'
          }}
          marginY={'20px'}
          bg={"#2C3631"}
          color={"white"}
          onClick={handlePredict}
        >
          Prediksi
        </Button>
      </Flex>
    </Box>
  );
};

export default Form;
