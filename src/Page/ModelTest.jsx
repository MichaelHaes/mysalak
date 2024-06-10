import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from 'react';

const ModelTest = () => {
    const [model, setModel] = useState(null);

    useEffect(() => {
        async function loadModel() {
            try {
                const loadedModel = await tf.loadLayersModel("/model/converted_model/Lumen_LSTM.json");
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

    return (
        <div>ModelTest</div>
    );
};

export default ModelTest;
