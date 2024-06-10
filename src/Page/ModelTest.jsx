import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from 'react';

const min = 66
const max = 98

const ModelTest = () => {
    const [model, setModel] = useState(null);
    const [input, setInput] = useState('');
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        async function loadModel() {
            try {
                const loadedModel = await tf.loadLayersModel("/model/converted_model/RH_avg_LSTM.json");
                setModel(loadedModel);
            } catch (error) {
                console.error("Error loading model:", error);
            }
        }

        loadModel();
    }, []);

    useEffect(() => {
        if (model) {
            console.log("Model loaded:", model);
        } else {
            console.log("Model is not loaded yet.");
        }
    }, [model]);


    // MinMaxNormalization
    const normalize = (value, min, max) => (value - min) / (max - min);
    const denormalize = (value, min, max) => value * (max - min) + min;

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handlePredict = () => {
        const inputValue = parseFloat(input);
        const normalizedInput = normalize(inputValue, min, max)

        const formattedInput = [[normalizedInput]];
        const reshapedInput = tf.reshape(formattedInput, [1, 1, 1]);

        const result = model.predict(reshapedInput);
        console.log(normalizedInput)
        console.log(denormalize(Array.from(result.dataSync()), min, max))
        setPrediction(denormalize(Array.from(result.dataSync()), min, max));
    };

    return (
        <div>
            <h2>ModelTest</h2>
            <input
                type="number"
                value={input}
                onChange={handleInputChange}
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction !== null && (
                <div>
                    <h3>Prediction: {prediction}</h3>
                </div>
            )}
        </div>
    );
};

export default ModelTest;
