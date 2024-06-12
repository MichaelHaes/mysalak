import React, { useEffect, useState } from "react";
import { useWeatherPred } from "../state";
import * as tf from "@tensorflow/tfjs";
import Form from "../Components/Form";

const FormModel = () => {
  const temp = useWeatherPred((state) => state.temp)
  const humidity = useWeatherPred((state) => state.humidity)
  const precipitation = useWeatherPred((state) => state.precipitation)
  const luminosity = useWeatherPred((state) => state.luminosity)

  useEffect(() => {
    console.log('Temp:', temp);
    console.log('Humidity:', humidity);
    console.log('Precipitation:', precipitation);
    console.log('Luminosity:', luminosity);
  }, [temp, humidity, precipitation, luminosity]);

  const [models, setModels] = useState({
    temperatureModel: null,
    humidityModel: null,
    precipitationModel: null,
    luminosityModel: null
  });

  const [pestPrediction, setPestPrediction] = useState("");

  useEffect(() => {
    async function loadModel() {
      try {
        const temperatureModel = await tf.loadLayersModel(
          "/model/converted_model/Tavg_LSTM.json"
        );
        const humidityModel = await tf.loadLayersModel(
          "/model/converted_model/RH_avg_LSTM.json"
        );
        const precipitationModel = await tf.loadLayersModel(
          "/model/converted_model/RR_LSTM.json"
        );
        const luminosityModel = await tf.loadLayersModel(
          "/model/converted_model/Lumen_LSTM.json"
        );

        setModels({
          temperatureModel,
          humidityModel,
          precipitationModel,
          luminosityModel,
        });
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }

    loadModel();
  }, []);

  // useEffect(() => {
  //   if (models) {
  //     console.log("Model loaded:", models);
  //   } else {
  //     console.log("Model is not loaded yet.");
  //   }
  // }, [models]);

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

  const isTikus = (temp, humidity, light, rain) => {
    return (
      temp >= 19 &&
      temp <= 23 &&
      humidity >= 40 &&
      humidity <= 70 &&
      rain >= 25 &&
      rain <= 200
    );
  };

  const isBajing = (temp, humidity, light, rain) => {
    return (
      temp >= 19 &&
      temp <= 23 &&
      humidity >= 40 &&
      humidity <= 70 &&
      rain >= 25 &&
      rain <= 200
    );
  };

  const predictPest = async (
    temperature,
    humidity,
    precipitation,
    luminosity
  ) => {
    const tempPrediction = (
      await models.temperatureModel
        .predict(tf.tensor2d([temperature], [1, 1]))
        .array()
    )[0][0];
    const humidityPrediction = (
      await models.humidityModel
        .predict(tf.tensor2d([humidity], [1, 1]))
        .array()
    )[0][0];
    const precipitationPrediction = (
      await models.precipitationModel
        .predict(tf.tensor2d([precipitation], [1, 1]))
        .array()
    )[0][0];
    const luminosityPrediction = (
      await models.luminosityModel
        .predict(tf.tensor2d([luminosity], [1, 1]))
        .array()
    )[0][0];

    let pest = "";
    if (
      isLalatBuah(
        tempPrediction,
        humidityPrediction,
        luminosityPrediction,
        precipitationPrediction
      )
    ) {
      pest = "Lalat Buah";
    } else if (
      isKutuPutih(
        tempPrediction,
        humidityPrediction,
        luminosityPrediction,
        precipitationPrediction
      )
    ) {
      pest = "Kutu Putih";
    } else if (
      isKumbangGirang(
        tempPrediction,
        humidityPrediction,
        luminosityPrediction,
        precipitationPrediction
      )
    ) {
      pest = "Kumbang Girang";
    } else if (
      isTikus(
        tempPrediction,
        humidityPrediction,
        luminosityPrediction,
        precipitationPrediction
      )
    ) {
      pest = "Tikus";
    } else if (
      isBajing(
        tempPrediction,
        humidityPrediction,
        luminosityPrediction,
        precipitationPrediction
      )
    ) {
      pest = "Bajing";
    } else {
      pest = "No significant pest predicted";
    }

    setPestPrediction(pest);
  };

  return (
    <div>
      <Form
        humidityModel={models.humidityModel}
        temperatureModel={models.temperatureModel}
        precipitationModel={models.precipitationModel}
        luminosityModel={models.luminosityModel}
        onPredict={predictPest}
      />
      <div>
        <h3>Predicted Pest: {pestPrediction}</h3>
      </div>
    </div>
  );
};

export default FormModel;
