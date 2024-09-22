import React, { useEffect, useState } from "react";
import { Flex, Button, Text, Image, Spinner, Box } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { getPreciseDistance } from "geolib";
import { useCoordinate } from "../state";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

const CameraPrediction = ({ togglePredict, captured }) => {
  const [loading, setLoading] = useState(true);
  const { latitude, longitude } = useCoordinate();
  const navigate = useNavigate();
  const [detected, setDetected] = useState({});
  const [able, setAble] = useState(false);
  const [kelompoks, setKelompoks] = useState([]);
  const [selected, setSelected] = useState({});
  const [saving, setSaving] = useState(false);
  const center = {
    latitude: -7.621672504970947,
    longitude: 110.39189700526022,
  };
  const [full, setFull] = useState(false);
  const [cover, setCover] = useState(false);

  const resetState = () => {
    setSelected({});
    setAble(false);
    setSaving(false);
  };

  const getPrediction = async () => {
    // const byteString = atob(captured.split(",")[1]);
    // const mimeString = captured.split(",")[0].split(":")[1].split(";")[0];
    // const ab = new ArrayBuffer(byteString.length);
    // const ia = new Uint8Array(ab);
    // for (let i = 0; i < byteString.length; i++) {
    //   ia[i] = byteString.charCodeAt(i);
    // }
    // const blob = new Blob([ab], { type: mimeString });

    // const formData = new FormData();
    // // formData.append("image", blob);
    // formData.append("image", captured);
    // console.log(formData)

    // const response = await axios.post(`${env.MODEL_URL}/yolo`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    const response = await axios.post(`${env.MODEL_URL}/yolo`, {
      image: captured,
    });

    setDetected(response.data);
    setLoading(false);
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
      // console.log(kel);
      const distance = getPreciseDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: kel.latitude, longitude: kel.longitude }
      );
      // console.log(distance);
      if (prevDistance === 0 || distance < prevDistance) {
        prevDistance = distance;
        setSelected(kel);
        // console.log("get");
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    resetState();
    getPrediction();
    getKelompokTani();
  }, []);

  useEffect(() => {
    checkPostEligibility();
  }, [kelompoks]);

  const postCalculation = async () => {
    setSaving(true);

    const payload = {
      id_kelompok_tani: selected.id,
      jumlah: detected.total,
    };
    const response = await axios.post(`${env.API_URL}/tangkapan-hama`, payload);
    // console.log(response);
    navigate("/manajemen-hama");
  };

  return (
    <>
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

        {/* {full && (
        <Image
          src={`data:image/jpeg;base64,${detected.image}`}
          w={full ? "85vw" : 0}
          h={full ? "85vh" : 0}
          bg={"lightgrey"}
          transition={".3s ease"}
          onClick={() => setFull(false)}
          mt={"14vh"}
          objectFit={"contain"}
        />
      )} */}

        <Flex flexDir={"column"} px={5} pt={"14vh"}>
          <Flex justify={"space-between"} align={"center"}>
            <Text fontSize={"2vh"} fontWeight={600}>
              Foto Hama
            </Text>
            <Flex
              variant={"unstyled"}
              bg={"white"}
              borderRadius={"50%"}
              onClick={() => setCover(!cover)}
              w={"25px"}
              h={"25px"}
              p={1}
            >
              {cover ? (
                <RxExitFullScreen size={"auto"} />
              ) : (
                <RxEnterFullScreen size={"aut0"} />
              )}
            </Flex>
          </Flex>
          <Flex h={full ? "68vh" : "30vh"} w={"100%"} mx={"auto"} mt={2} mb={8}>
            {!loading ? (
              <Image
                h={"inherit"}
                w={"inherit"}
                mx={"auto"}
                src={`data:image/jpeg;base64,${detected.image}`}
                // src={captured}
                borderRadius={"20px"}
                alt="hama"
                bg={"lightgrey"}
                onClick={() => setFull(!full)}
                transition={".3s"}
                objectFit={cover ? "cover" : "contain"}
                zIndex={10}
              />
            ) : (
              <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
                <Spinner size={"xl"} />
              </Flex>
            )}
          </Flex>
          <Box display={full ? "none" : "block"} transition={".3s linear"}>
            <Text lineHeight={"normal"} fontSize={"2vh"} fontWeight={600}>
              Jumlah Hama
            </Text>
            {!loading ? (
              <Text
                fontWeight={"800"}
                fontSize={"5vh"}
                mt={1}
                lineHeight={"normal"}
              >
                {detected.total}
              </Text>
            ) : (
              <Spinner />
            )}
          </Box>
          {able && (
            <Box display={full ? "none" : "block"} transition={".3s linear"}>
              <Text lineHeight={"normal"} fontSize={"2vh"} fontWeight={600}>
                Kelompok Tani
              </Text>
              <Text
                fontWeight={"800"}
                fontSize={"5vh"}
                mt={1}
                lineHeight={"normal"}
                display={loading ? "none" : "block"}
              >
                {selected.nama}
              </Text>
              <Spinner display={loading ? "block" : "none"} />
            </Box>
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
    </>
  );
};

export default CameraPrediction;
