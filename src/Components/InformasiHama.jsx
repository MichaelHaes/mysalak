import {
  Flex,
  Box,
  Image,
  Text,
  Slider,
  SliderMark,
  SliderTrack,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "./Styles/InformasiHama.css";
import { IoIosArrowBack, IoIosArrowDropdownCircle } from "react-icons/io";
import Chart from "react-apexcharts";
import { FaChartLine } from "react-icons/fa6";
import { useHama } from "../state";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const InformasiHama = (props) => {
  const { from, setFrom, resetDetail, hama, index } = useHama();
  const navigate = useNavigate();
  const data = hama[index];
  const [history, setHistory] = useState([]);
  const thisMonth = moment().format("M");
  const thisYear = moment().format("YYYY");
  const [month, setMonth] = useState(thisMonth);

  const getHistory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tangkapan-hama/${data.id_kelompok_tani}/${month}/${thisYear}`
    );

    const sortedData = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    let tmp = [];
    sortedData.forEach((item) => {
      const obj = { x: moment(item.createdAt).format("D"), y: item.jumlah };
      tmp.push(obj);
    });
    setHistory(tmp);
  };

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    getHistory();
    console.log(month);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const chartOptions = {
    chart: {
      id: "basic-line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      min: 1,
      max: history.length,
    },
    yaxis: {
      tickAmount: 3,
      min: 0,
      max: 150,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    colors: ["#2C3631"],
  };

  const chartSeries = [
    {
      name: "Jumlah Hama",
      data: history,
    },
  ];

  return (
    <Flex direction={"column"} height={"fit-content"}>
      <Flex
        justify={"center"}
        align={"center"}
        w={"30px"}
        h={"30px"}
        bg={"#FAFAFA"}
        borderRadius={"50%"}
        boxShadow={"0 1.5px 7px .1px #2C3631"}
        p={2}
        pos={"absolute"}
        onClick={() => {
          if (from === "Home") {
            navigate("/");
            setFrom("");
          }
          resetDetail();
        }}
        zIndex={3}
        top={20}
        left={7}
      >
        <IoIosArrowBack size={"auto"} fill="#2C3631" />
      </Flex>
      <Box pos={"absolute"} top={0} left={0} h={"40vh"} w={"100%"}>
        <Image
          src={`/assets/lalat buah.png`}
          h={"100%"}
          w={"100%"}
          objectFit={"cover"}
          objectPosition={"center"}
          zIndex={1}
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0), rgba(156,156,156,0.63) 75%, rgba(201,201,201,0.82), #F5F5F5)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0), rgba(156,156,156,0.63) 75%, rgba(201,201,201,0.82), #F5F5F5)",
          }}
        />
      </Box>

      <Box pos={"relative"} zIndex={2} w={"85%"} mt={"35vh"} mx={"auto"}>
        <Flex align={"center"} w={"100%"} justify={"space-between"}>
          <Flex direction={"column"}>
            <Text
              bg={"#f4f4f4"}
              w={"fit-content"}
              px={2}
              borderRadius={"full"}
              fontSize={"1.2vh"}
              mb={2.5}
            >
              <Moment format="DD/M/YYYY">{data.createdAt}</Moment>
            </Text>
            <Text fontSize={"2.2vh"} lineHeight={1} fontWeight={"bold"}>
              {data.KelompokTani.nama}
            </Text>
          </Flex>

          <Text
            px={2}
            py={1}
            borderRadius={"12px"}
            bg={"#2C3631"}
            color={"white"}
            fontSize={"2.5vh"}
            mb={1}
          >
            {data.jumlah}
          </Text>
        </Flex>
        <Text mt={2} fontSize={"1.3vh"}>
          Jumlah lalat buah yang tertangkap oleh kelompok tani{" "}
          {data.KelompokTani.nama} pada tanggal{" "}
          <Moment format="DD MMMM YYYY">{data.createdAt}</Moment>. Tercatat ada{" "}
          {data.jumlah} lalat yang tertangkap, dan kondisi kebun berada pada
          kondisi{" "}
          {data.jumlah > 50 ? "bahaya" : data.jumlah > 10 ? "waspada" : "aman"}.
        </Text>
        {/* {data.jenis.toLocaleLowerCase() === "lalat buah" ? (
          <Text mt={2} fontSize={"1.3vh"}>
            Hama yang menyerang berbagai jenis buah, termasuk salak. Mereka
            bertelur di dalam buah, dan larva yang menetas memakan daging buah,
            menyebabkan kerusakan dan busuk.
          </Text>
        ) : data.jenis.toLocaleLowerCase() === "tikus" ? (
          <Text mt={2} fontSize={"1.3vh"}>
            Tikus di perkebunan salak sering kali merusak tanaman dengan
            menggali dan memakan akar serta batang muda. Mereka juga bisa
            memakan buah salak yang sudah matang, menyebabkan kerusakan besar
            pada hasil panen.
          </Text>
        ) : data.jenis.toLocaleLowerCase() === "bajing" ? (
          <Text mt={2} fontSize={"1.3vh"}>
            Bajing adalah hama yang sering menyerang perkebunan salak dengan
            memakan buah yang masih muda. Mereka menyebabkan buah menjadi tidak
            layak jual dan merusak hasil panen secara signifikan.
          </Text>
        ) : (
          <Text mt={2} fontSize={"1.3vh"}>
            Kutu putih merupakan hama yang menyerang tanaman salak dengan
            menghisap cairan dari daun dan batang. Hal ini menyebabkan daun
            menguning, menghambat pertumbuhan, dan menurunkan kualitas serta
            kuantitas buah salak.
          </Text>
        )} */}
      </Box>

      <Box mt={5} mb={-2} w={"100%"} px={8} mx={"auto"}>
        <Slider isReadOnly={true}>
          <SliderMark value={data.jumlah > 100 ? 100 : data.jumlah}>
            {
              <Flex
                pos={"relative"}
                zIndex={2}
                direction={"column"}
                align={"center"}
                transform={"translateX(-51%)"}
              >
                <Box w={"2px"} h={"3vh"} bg={"#2C3631"}></Box>
                <Text
                  color={"white"}
                  fontSize={"1.7vh"}
                  p={"30%"}
                  borderRadius={"10px"}
                  bg={"#2C3631"}
                  lineHeight={1}
                >
                  {data.jumlah}
                </Text>
              </Flex>
            }
          </SliderMark>
          <SliderMark
            value={data.jumlah}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          ></SliderMark>
          <SliderTrack h={"2vh"} borderRadius={"10px"}>
            {/* <Box h={"inherit"} bg={"linear-gradient(to right, #A9D2B5 10%, #F4F091 10% 50%, #EBB5B5 50%)"}></Box> */}
            <Flex align={"center"} w={"100%"} h={"100%"}>
              <Flex bg={"#A9D2B5"} w={"10%"} className="slider-box">
                <Text fontWeight={"bold"}>0</Text>
                <Text>10</Text>
              </Flex>
              <Flex bg={"#F4F091"} w={"40%"} className="slider-box">
                <Text>11</Text>
                <Text>50</Text>
              </Flex>
              <Flex bg={"#EBB5B5"} w={"50%"} className="slider-box">
                <Text>51</Text>
                <Text fontSize={"2vh"} fontWeight={"bold"}>
                  ∞
                </Text>
              </Flex>
            </Flex>
          </SliderTrack>
        </Slider>
      </Box>

      <Flex
        direction={"column"}
        w={"85%"}
        h={"fit-content"}
        mx={"auto"}
        my={20}
        bg={"#FFFFFF"}
        borderRadius={"22px"}
        boxShadow={"0 2px 5px 1px #e5e9e6"}
        p={2}
      >
        <Flex
          mt={1}
          align={"center"}
          justify={"space-between"}
          w={"100%"}
          ps={5}
          pt={2}
        >
          <Flex align={"center"}>
            <FaChartLine size={"2vh"} />
            <Text fontWeight={"bold"} ms={3} fontSize={"2vh"}>
              Histori
            </Text>
          </Flex>
          <Select
            fontWeight={"bold"}
            size={"xs"}
            w={"fit-content"}
            bg={"#F9F9F9"}
            borderRadius={"25px"}
            icon={<IoIosArrowDropdownCircle />}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {months.slice(0, thisMonth).map((item, idx) => (
              <option key={idx} value={idx + 1}>
                {" "}
                {item}
              </option>
            ))}
          </Select>
        </Flex>
        <Box width="90%" height="80%" m={"auto"}>
          <Chart options={chartOptions} series={chartSeries} type="line" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default InformasiHama;
