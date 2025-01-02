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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import BackButton from "../../Components/BackButton";
import { useForm } from "react-hook-form";
import Colors from "../../Color/Color";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/admin/login`, data)
        .then((response) => {
          console.log(response);
          showToast(response.data.message);
          localStorage.setItem(
            "JWT_Token",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem(
            "role_id",
            JSON.stringify(response.data.role_id)
          );
          localStorage.setItem("user_id", JSON.stringify(data.email));
          localStorage.setItem("nama", JSON.stringify(response.data.admin_nama));
          localStorage.setItem("kelompok_tani", JSON.stringify(response.data.kelompok_tani));
          navigate("/dashboard");
        })
        .catch((response) => {
          showToast(response.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = (response) =>
    toast(
      <div>
        <p>{response}</p>
      </div>
    );

  return (
    <Box h="100vh" w="100%" px="5%" pt="60px">
      <Toaster />
      <BackButton navigateTo="/" />
      <Flex direction="column" h="90%" justify="space-between">
        <VStack alignItems="start" w="100%" flexGrow={1}>
          <VStack alignItems="start" spacing={0}>
            <Text fontWeight="bold" fontSize="large">
              Selamat datang di
            </Text>
            <Image src="/assets/login_mySalak_dark.png" w="60%" h="auto" />
          </VStack>
          <Text fontWeight="light" fontSize="small">
            Masukkan email dan kata sandi anda
          </Text>
          <VStack spacing={4} w="100%" marginTop="5%">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <FormControl id="email" isInvalid={errors.namaLengkap}>
                <FormLabel fontSize="small" fontWeight="bold">
                  Email
                </FormLabel>
                <Input
                  placeholder="Masukkan email"
                  {...register("email", {
                    required: "Nama Lengkap is required",
                  })}
                  rounded="10px"
                  fontSize="small"
                />
                {errors.namaLengkap && (
                  <FormErrorMessage>
                    {errors.namaLengkap.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="password"
                isInvalid={errors.noTelepon}
                marginTop="5%"
              >
                <FormLabel fontSize="small" fontWeight="bold">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Masukkan password"
                    {...register("password", {
                      required: "No Telepon is required",
                    })}
                    rounded="10px"
                    fontSize="small"
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.noTelepon && (
                  <FormErrorMessage>
                    {errors.noTelepon.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
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
            Masuk
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminLogin;
