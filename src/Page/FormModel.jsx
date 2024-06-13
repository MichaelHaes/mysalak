import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Form from "../Components/Form";
import { useWeatherPred } from "../state";

const FormModel = () => {
  const [models, setModels] = useState({
    temperatureModel: null,
    humidityModel: null,
    precipitationModel: null,
    luminosityModel: null,
  });

  const [pestPrediction, setPestPrediction] = useState("");

  const temp = useWeatherPred((state) => state.temp);
  const humidity = useWeatherPred((state) => state.humidity);
  const precipitation = useWeatherPred((state) => state.precipitation);
  const luminosity = useWeatherPred((state) => state.luminosity);

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

  useEffect(() => {
    if (models) {
      console.log("Model loaded:", models);
    } else {
      console.log("Model is not loaded yet.");
    }
  }, [models]);

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

  const isTikusBajing = (temp, humidity, light, rain) => {
    return (
      temp >= 19 &&
      temp <= 23 &&
      humidity >= 40 &&
      humidity <= 70 &&
      rain >= 25 &&
      rain <= 200
    );
  };

  // const isBajing = (temp, humidity, light, rain) => {
  //   return (
  //     temp >= 19 &&
  //     temp <= 23 &&
  //     humidity >= 40 &&
  //     humidity <= 70 &&
  //     rain >= 25 &&
  //     rain <= 200
  //   );
  // };

  useEffect(() => {
    let pest = "";
    if (isLalatBuah(temp, humidity, luminosity, precipitation)) {
      pest = "Lalat Buah";
    } else if (isKutuPutih(temp, humidity, luminosity, precipitation)) {
      pest = "Kutu Putih";
    } else if (isKumbangGirang(temp, humidity, luminosity, precipitation)) {
      pest = "Kumbang Girang";
    } else if (isTikusBajing(temp, humidity, luminosity, precipitation)) {
      pest = "Tikus dan Bajing";
    } 
    // else if (isBajing(temp, humidity, luminosity, precipitation)) {
    //   pest = "Bajing";
    // } 
    else {
      pest = "Tidak ada";
    }

    setPestPrediction(pest);
  }, [temp, humidity, luminosity, precipitation]);

  // const predictPest = () => {
  //   let pest = "";
  //   if (isLalatBuah(temp, humidity, luminosity, precipitation)) {
  //     pest = "Lalat Buah";
  //   } else if (isKutuPutih(temp, humidity, luminosity, precipitation)) {
  //     pest = "Kutu Putih";
  //   } else if (isKumbangGirang(temp, humidity, luminosity, precipitation)) {
  //     pest = "Kumbang Girang";
  //   } else if (isTikus(temp, humidity, luminosity, precipitation)) {
  //     pest = "Tikus";
  //   } else if (isBajing(temp, humidity, luminosity, precipitation)) {
  //     pest = "Bajing";
  //   } else {
  //     pest = "No significant pest predicted";
  //   }

  //   setPestPrediction(pest);
  // };

  return (
    <div>
      <Form
        humidityModel={models.humidityModel}
        temperatureModel={models.temperatureModel}
        precipitationModel={models.precipitationModel}
        luminosityModel={models.luminosityModel}
        pest={pestPrediction}
        // onPredict={predictPest}
      />
      Bantuan Input <br />
      27 - 80 - 50 - 2000 = Lalat Buah <br />
      33 - 55 - 50 - 1000 = Kutu Putih <br />
      33 - 100 - 50 - 1000 = Kumbang Girang <br />
      19 - 50 - 50 - 1000 = Tikus dan Bajing <br />
    </div>
  );
};

export default FormModel;
