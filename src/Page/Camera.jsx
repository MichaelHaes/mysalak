import React, { useEffect, useState } from "react";
import MainCamera from "../Components/MainCamera";
import CameraPrediction from "../Components/CameraPrediction";
import axios from "axios";

const Camera = () => {
  const [predict, setPredict] = useState(false);
  const [captured, setCaptured] = useState(null);
  const [prediction, setPrediction] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrediction({});
    setLoading(true);
  }, []);

  const handleLoading = (val) => {
    setLoading(val);
  }

  const getPrediction = async (img) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/yolo`, {
      image: img,
    });

    // console.log(response.data);
    setPrediction(response.data);
    setLoading(false);
  };

  const changeCaptured = (img) => {
    // console.log(img);
    setCaptured(img);
    getPrediction(img);
  };

  const togglePredict = () => {
    setPredict(!predict);
  };

  return !predict ? (
    <MainCamera changeCaptured={changeCaptured} togglePredict={togglePredict} />
  ) : (
    <CameraPrediction
      togglePredict={togglePredict}
      captured={captured}
      changeCaptured={changeCaptured}
      prediction={prediction}
      loading={loading}
      handleLoading={handleLoading}
    />
  );
};

export default Camera;
