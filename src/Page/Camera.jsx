import React, { useState } from "react";
import MainCamera from "../Components/MainCamera";
import CameraPrediction from "../Components/CameraPrediction";

const Camera = () => {
  const [predict, setPredict] = useState(false);
  const [captured, setCaptured] = useState(null);

  const changeCaptured = (img) => {
    setCaptured(img);
  };

  const togglePredict = () => {
    setPredict(!predict);
  };

  return !predict ? (
    <MainCamera changeCaptured={changeCaptured} togglePredict={togglePredict} />
  ) : (
    <CameraPrediction togglePredict={togglePredict} captured={captured} changeCaptured={changeCaptured}/>
  );
};

export default Camera;
