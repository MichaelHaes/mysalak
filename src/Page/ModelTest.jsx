import React, { useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import Form from "../Components/Form";

const ModelTest = () => {
    const [models, setModels] = useState({
        temperatureModel: null,
        humidityModel: null,
        precipitationModel: null,
        luminosityModel: null
    });

    useEffect(() => {
        async function loadModel() {
            try {
                const temperatureModel = await tf.loadLayersModel("/model/converted_model/Tavg_LSTM.json");
                const humidityModel = await tf.loadLayersModel("/model/converted_model/RH_avg_LSTM.json");
                const precipitationModel = await tf.loadLayersModel("/model/converted_model/RR_LSTM.json");
                const luminosityModel = await tf.loadLayersModel("/model/converted_model/Lumen_LSTM.json");

                setModels({
                    temperatureModel,
                    humidityModel,
                    precipitationModel,
                    luminosityModel
                });
            } catch (error) {
                console.error("Error loading model:", error);
            }
        }

        loadModel();
    }, []);

    useEffect(() => {
        if (models) {
            console.log("Model loaded:", models);
        } else {
            console.log("Model is not loaded yet.");
        }
    }, [models]);

    return (
        <div>
            <Form 
            humidityModel={models.humidityModel} 
            temperatureModel={models.temperatureModel}
            precipitationModel={models.precipitationModel}
            luminosityModel={models.luminosityModel}
            />
        </div>
    );
};

export default ModelTest;
