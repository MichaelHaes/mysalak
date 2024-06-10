import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Input, Button } from "@chakra-ui/react";

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

    props.predictPest(inputTemperatur, inputKelembapan, inputRR, inputLumen);
  };

  return (
    <div>
      <h2>Prediksi</h2>
      <div>
        <p>Min-Max</p>
        Temperatur : {minTavg} - {maxTavg} <br />
        Kelembapan : {minRH_avg} - {maxRH_avg} <br />
        Curah Hujan : {minRR} - {maxRR} <br />
        Intensitas Cahaya : {minLumen} - {maxLumen} <br />
      </div>
      {Object.entries(inputs).map(([inputName, value], index) => (
        <Input
          key={index}
          value={value}
          variant="flushed"
          placeholder={inputName}
          onChange={(event) => handleInputChange(event, inputName)}
        />
      ))}
      <Button onClick={handlePredict}>Predict</Button>
      <div>
        {Object.entries(predictions).map(([key, value], index) => (
          <div key={index}>
            <h3>{key}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
