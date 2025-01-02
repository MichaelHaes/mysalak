import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { RxCheck, RxCross2 } from "react-icons/rx";
import axios from "axios";
import PetaniCard from "../../../Components/PetaniCard";

const VerifikasiAnggota = () => {
  const kelompok_tani = JSON.parse(localStorage.getItem('kelompok_tani'));
  const [petani, setPetani] = useState([]);

  const getPetani = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/petani`);
    setPetani(response.data);
  };

  const verify = async(id) => {
    // eslint-disable-next-line no-unused-vars
    const response = axios.put(`${process.env.REACT_APP_API_URL}/petani-verify`, {idPetani:id});
    getPetani()
  }

  useEffect(() => {
    getPetani();
  }, []);

  return (
    <>
      <Flex
        direction={"column"}
        w={"85%"}
        mx={"auto"}
        pos={"relative"}
        minH={"100vh"}
        py={"20%"}
      >
        <Text mb={5} fontWeight={"bold"}>Verifikasi Anggota</Text>
        {petani.filter(item => item.kelompok_tani === kelompok_tani)
          .map((item) => (
            <Stack
              h={"100%"}
              p={"5%"}
              bgColor={"#FFFFFF"}
              mb={"1.5vh"}
              borderRadius={"xl"}
            >
              <Flex>
                <PetaniCard props={item} />
                <Spacer />

                {!item.is_verified ?
                  <Button
                    variant={"unstyled"}
                    background={"#2c3631"}
                    borderRadius={"xl"}
                    justifyItems={"center"}
                    w={1}
                    onClick={() => verify(item.id)}
                  >
                    <RxCheck color="white" size={20} />
                  </Button>
                  :
                  <Button
                    disabled
                    variant={"unstyled"}
                    borderRadius={"xl"}
                    justifyItems={"center"}
                    w={1}
                  >
                    <RxCheck color="green.500" size={20} />
                  </Button>
                  
                  // <Text
                  //   color="green.500"
                  //   alignContent={"center"}
                  // >
                  //   Verified
                  // </Text>
                }
              </Flex>
            </Stack>
          ))}
      </Flex>
    </>
  )
}

export default VerifikasiAnggota