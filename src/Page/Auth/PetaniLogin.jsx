import {
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Drawer, useDisclosure, DrawerOverlay, DrawerContent,
} from "@chakra-ui/react";
import BackButton from "../../Components/BackButton";
import { useForm } from "react-hook-form";
import Colors from "../../Color/Color";
import React, { useState } from "react";
import { useKelompokTaniList } from "../../state";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";
import env from "react-dotenv";

const PetaniLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const kelompokTaniList = useKelompokTaniList().kelompokTani;
  const [selectedKelompok, setSelectedKelompok] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    try{
      axios.post(`${env.API_URL}/auth/petani/login`, { ...data, kelompok_tani: selectedKelompok.id })
        .then((response) => {
          showToast(response.data.message)
          localStorage.setItem("JWT_Token", JSON.stringify(response.data.token))
          navigate("/dashboard")
        })
        .catch((response) => {
          showToast(response.data.message)
        })
    } catch (err){
      console.log(err)
    }
  };

  const handleKelompokSelect = (kelompok) => {
    console.log(kelompok)
    setSelectedKelompok(kelompok);
    onClose();
  };

  const showToast = (response) =>
    toast(
      <div>
        <p>{response}</p>
      </div>
    );

  return (
    <Box h="100vh" w="100%" px="5%" pt="60px">
      <Toaster/>
      <BackButton navigateTo="/" />
      <Flex direction="column" h="90%" justify="space-between">
        <VStack alignItems="start" w="100%" flexGrow={1}>
          <Text fontWeight="bold" fontSize="large">Selamat Datang Kembali</Text>
          <Text fontWeight="light" fontSize="small">Masukkan data untuk melanjutkan</Text>
          <VStack spacing={4} w="100%" marginTop="5%">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <FormControl id="namaLengkap" isInvalid={errors.namaLengkap}>
                <FormLabel fontSize="small" fontWeight="bold">Nama Lengkap</FormLabel>
                <Input
                  placeholder="Masukkan nama lengkap"
                  {...register("nama", { required: "Nama Lengkap is required" })}
                  rounded="10px"
                  fontSize="small"
                />
                {errors.namaLengkap && <FormErrorMessage>{errors.namaLengkap.message}</FormErrorMessage>}
              </FormControl>

              <FormControl id="noTelepon" isInvalid={errors.noTelepon} marginTop="5%">
                <FormLabel fontSize="small" fontWeight="bold">No Telepon</FormLabel>
                <Input
                  type="tel"
                  placeholder="Masukkan no telepon"
                  {...register("no_telp", {
                    required: "No Telepon is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid phone number"
                    }
                  })}
                  rounded="10px"
                  fontSize="small"
                />
                {errors.noTelepon && <FormErrorMessage>{errors.noTelepon.message}</FormErrorMessage>}
              </FormControl>

              <FormControl id="kelompokTani" isInvalid={errors.kelompokTani} marginTop="5%">
                <FormLabel fontSize="small" fontWeight="bold">Nama Kelompok Tani</FormLabel>
                <Button
                  onClick={onOpen}
                  w="100%"
                  rounded="10px"
                  textAlign="left"
                  justifyContent="start"
                  fontSize="small"
                  border="1px solid"
                  borderColor="grey"
                  fontWeight="normal"
                >
                  {selectedKelompok.nama ? selectedKelompok.nama : "Pilih Kelompok Tani"}
                </Button>
                {errors.kelompokTani && <FormErrorMessage>{errors.kelompokTani.message}</FormErrorMessage>}
              </FormControl>
            </form>

            <Drawer
              isOpen={isOpen}
              placement='bottom'
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <VStack p={4}>
                  {kelompokTaniList.map((kelompok) => (
                    <Box key={kelompok.id} w="100%" onClick={() => handleKelompokSelect(kelompok)}>
                      <Text py={2} w="100%" _hover={{ bg: "gray.100" }}>
                        {kelompok.nama}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </DrawerContent>
            </Drawer>
          </VStack>
        </VStack>

        <Box w="100%">
          <Button
            colorScheme="green"
            w="100%"
            type="submit"
            rounded="full"
            bgColor={Colors.Dark_Green}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default PetaniLogin;
