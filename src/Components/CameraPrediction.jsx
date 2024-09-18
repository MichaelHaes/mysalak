import React, { useEffect, useState } from "react";
import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { getPreciseDistance } from "geolib";
import { useCoordinate } from "../state";

const CameraPrediction = ({ togglePredict, captured }) => {
  const { latitude, longitude } = useCoordinate();
  const navigate = useNavigate();
  const [detected, setDetected] = useState(0);
  const [able, setAble] = useState(false);
  const [kelompoks, setKelompoks] = useState([]);
  const [selected, setSelected] = useState({});
  const [saving, setSaving] = useState(false);
  const center = {
    latitude: -7.621672504970947,
    longitude: 110.39189700526022,
  };

  const getPrediction = async () => {
    const byteString = atob(captured.split(",")[1]);
    const mimeString = captured.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append("image", blob);

    const response = await axios.post(`${env.MODEL_URL}/yolo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setDetected(response.data.num_detections);
  };

  const getKelompokTani = async () => {
    const response = await axios.get(`${env.API_URL}/kelompok-tani`);
    setKelompoks(response.data);
  };

  const checkPostEligibility = () => {
    const distanceCalc = getPreciseDistance(
      { latitude: latitude, longitude: longitude },
      { latitude: center.latitude, longitude: center.longitude }
    );
    if (distanceCalc >= 8000) return;
    else {
      setAble(true);
      getNearest();
    }
  };

  const getNearest = () => {
    let prevDistance = 0;
    kelompoks.forEach((kel) => {
      console.log(kel);
      const distance = getPreciseDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: kel.latitude, longitude: kel.longitude }
      );
      console.log(distance);
      if (prevDistance === 0 || distance < prevDistance) {
        prevDistance = distance;
        setSelected(kel);
        console.log("get");
      }
    });
  };

  useEffect(() => {
    getPrediction();
    getKelompokTani();
  }, []);

  useEffect(() => {
    checkPostEligibility();
  });

  const postCalculation = async () => {
    setSaving(true);

    const payload = {
      id_kelompok_tani: selected.id,
      jumlah: detected,
    };
    const response = await axios.post(`${env.API_URL}/tangkapan-hama`, payload);
    console.log(response);
    navigate("/manajemen-hama");
  };

  return (
    <Flex
      flexDir={"column"}
      w={"inherit"}
      h={"100vh"}
      overflowY={"hidden"}
      position="relative"
    >
      <Flex
        justify={"center"}
        align={"center"}
        w={"30px"}
        h={"30px"}
        bg={"#2C3631"}
        borderRadius={"50%"}
        top={"7.2vh"}
        left={7}
        p={2}
        pos={"absolute"}
        zIndex={11}
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowBack size={"auto"} fill="white" />
      </Flex>
      <Text
        pos={"absolute"}
        top={"7vh"}
        position={"absolute"}
        zIndex={10}
        w={"100%"}
        textAlign={"center"}
        fontWeight={"600"}
        fontSize={"2.5vh"}
      >
        Hitung Hama
      </Text>

      <Flex flexDir={"column"} px={5} pt={"14vh"}>
        <Text fontSize={"2vh"} fontWeight={600}>
          Foto Hama
        </Text>
        <Flex h={"30vh"} w={"100%"} mx={"auto"} mt={2} mb={8}>
          <Image
            h={"inherit"}
            w={"inherit"}
            mx={"auto"}
            src={captured}
            borderRadius={"20px"}
            objectFit={"cover"}
            alt="hama"
          />
        </Flex>
        <Text lineHeight={"normal"} fontSize={"2vh"} fontWeight={600}>
          Jumlah Hama
        </Text>
        <Text fontWeight={"800"} fontSize={"5vh"} mt={1} lineHeight={"normal"}>
          {detected}
        </Text>
        {able && (
          <>
            <Text lineHeight={"normal"} fontSize={"2vh"} fontWeight={600}>
              Kelompok Tani
            </Text>
            <Text
              fontWeight={"800"}
              fontSize={"5vh"}
              mt={1}
              lineHeight={"normal"}
            >
              {selected.nama}
            </Text>
          </>
        )}
      </Flex>

      <Flex
        justifyContent={"center"}
        position={"absolute"}
        bottom={"5%"}
        w={"100%"}
        gap={5}
      >
        <Button
          bg={"transparent"}
          borderRadius={"20px"}
          border={"1px solid #2c3631"}
          onClick={() => togglePredict()}
          w={!able ? "90%" : "42%"}
        >
          Foto Ulang
        </Button>
        {able && (
          <Button
            w={"42%"}
            borderRadius={"20px"}
            bg={"#2c3631"}
            color={"white"}
            onClick={() => {
              postCalculation();
            }}
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default CameraPrediction;
