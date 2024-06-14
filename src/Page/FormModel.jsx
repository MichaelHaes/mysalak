import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Form from "../Components/Form";
import FormPrediksi from "../Components/FormPrediksi";
import FormHama from "../Components/FormHama";
import { IoIosArrowBack } from "react-icons/io";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { usePage } from "../state";

const FormModel = () => {
  const { home } = usePage();
  const [models, setModels] = useState({
    temperatureModel: null,
    humidityModel: null,
    precipitationModel: null,
    luminosityModel: null,
  });

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

  return (
    <Box overflow={"hidden"} paddingTop={'6vh'}>
      <Heading size="md" textAlign={"center"} marginBottom={'20px'}>Prediksi Cuaca</Heading>
      <Flex
        justify={"center"}
        align={"center"}
        w={"30px"}
        h={"30px"}
        bg={"#2C3631"}
        borderRadius={"50%"}
        top={"6%"}
        left={7}
        p={2}
        pos={"absolute"}
        zIndex={11}
        onClick={() => {
          home();
        }}
      >
        <IoIosArrowBack size={"auto"} fill="white" />
      </Flex>
      <Form
        humidityModel={models.humidityModel}
        temperatureModel={models.temperatureModel}
        precipitationModel={models.precipitationModel}
        luminosityModel={models.luminosityModel}
      />
      <FormPrediksi />
      <FormHama/>
      {/* Bantuan Input <br />
      27 - 80 - 50 - 2000 = Lalat Buah <br />
      33 - 55 - 50 - 1000 = Kutu Putih <br />
      33 - 100 - 50 - 1000 = Kumbang Girang <br />
      19 - 50 - 50 - 1000 = Tikus dan Bajing <br /> */}

    </Box>
  );
};

export default FormModel;
