import React, { useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import { Input, Button } from '@chakra-ui/react'

const minRH_avg = 66
const maxRH_avg = 98

const minTavg = 22.9
const maxTavg = 31.5

const minRR = 0
const maxRR = 92

const minLumen = 2.7
const maxLumen = 231468.2

const Form = (props) => {
    const [inputs, setInputs] = useState({
        "Temperatur": '',
        "Kelembapan": '',
        "Curah Hujan": '',
        "Intensitas Cahaya": ''
    });

    const [predictions, setPredictions] = useState({
        "Temperatur": null,
        "Kelembapan": null,
        "Curah Hujan": null,
        "Intensitas Cahaya": null
    });

    const normalize = (value, min, max) => (value - min) / (max - min);
    const denormalize = (value, min, max) => value * (max - min) + min;

    const handleInputChange = (event, inputName) => {
        const { value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [inputName]: value
        }));
        console.log(inputs.Kelembapan)
        console.log(inputs.Temperatur)
    };

    const handlePredict = () => {
        // Kelembapan
        const inputKelembapan = normalize(parseFloat(inputs.Kelembapan), minRH_avg, maxRH_avg)
        const reshapedKelembapan = tf.reshape([[inputKelembapan]], [1, 1, 1]);
        const resultKelembapan = props.humidityModel.predict(reshapedKelembapan);

        // Temperatur
        const inputTemperatur = normalize(parseFloat(inputs.Temperatur), minTavg, maxTavg)
        const reshapedTemperatur = tf.reshape([[inputTemperatur]], [1, 1, 1]);
        const resultTemperatur = props.temperatureModel.predict(reshapedTemperatur);

        // Curah Hujan
        const inputRR = normalize(parseFloat(inputs['Curah Hujan']), minRR, maxRR)
        const reshapedRR = tf.reshape([[inputRR]], [1, 1, 1]);
        const resultRR = props.temperatureModel.predict(reshapedRR);

        // Intensitas Cahaya
        const inputLumen = normalize(parseFloat(inputs['Intensitas Cahaya']), minLumen, maxLumen)
        const reshapedLumen = tf.reshape([[inputLumen]], [1, 1, 1]);
        const resultLumen = props.temperatureModel.predict(reshapedLumen);

        setPredictions({
            "Temperatur": denormalize(Array.from(resultTemperatur.dataSync()), minTavg, maxTavg),
            "Kelembapan": denormalize(Array.from(resultKelembapan.dataSync()), minRH_avg, maxRH_avg),
            // "Curah Hujan": denormalize(Array.from(resultRR.dataSync()), minRR, maxRR),
            // "Intensitas Cahaya": denormalize(Array.from(resultLumen.dataSync()), minLumen, maxLumen)
        });
    };

    return (
        <div>
            <h2>Prediksi</h2>

            {Object.entries(inputs).map(([inputName, value], index) => (
                <Input
                    key={index}
                    value={value}
                    variant='flushed'
                    placeholder={inputName}
                    onChange={(event) => handleInputChange(event, inputName)} />
            ))}
            <Button onClick={handlePredict}>Predict</Button>


            <div>
                <h3>Temperatur: {predictions.Temperatur}</h3>
                <h3>Kelembapan: {predictions.Kelembapan}</h3>
                <h3>Temperatur: {predictions['Curah Hujan']}</h3>
                <h3>Kelembapan: {predictions['Intensitas Cahaya']}</h3>
            </div>
        </div>
    )
}

export default Form