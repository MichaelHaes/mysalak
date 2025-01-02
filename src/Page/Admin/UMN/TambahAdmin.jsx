import {
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  Select,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "../../../custom-swal.css";

const TambahAdmin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState(0);
  const [kelompok, setKelompok] = useState([]);
  const [kel, setKel] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const getKelompok = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/kelompok-tani`);
      setKelompok(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getKelompok();
  }, []);

  const addAdmin = async (data) => {
    if (data.role_id === "0") {
      setError("role_id", {
        type: "manual",
        message: "Mohon pilih organisasi",
      });
      return;
    }

    if (data.role_id === "0" && data.kelompok_tani === "0") {
      setError("kelompok_tani", {
        type: "manual",
        message: "Mohon pilih kelompok tani",
      });
      return;
    }

    console.log(data);

    withReactContent(Swal)
      .fire({
        text: "Apakah data yang dimasukkan sudah benar?",
        showCancelButton: true,
        icon: "question",
        confirmButtonText: "Benar",
        cancelButtonText: "Cek Kembali",
        reverseButtons: true,
        customClass: {
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          withReactContent(Swal).fire({
            title: "Registrasi berhasil!",
            timer: 2000,
            timerProgressBar: true,
            icon: "success",
            showConfirmButton: false,
            didOpen: async () => {
              try {
                const payload = {
                  ...data,
                  role_id: role,
                  kelompok_tani: kel,
                };

                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/auth/admin/register`,
                  payload,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage
                        .getItem("JWT_Token")
                        .slice(1, -1)}`,
                      role_id: localStorage.getItem("role_id"),
                    },
                  }
                );

                console.log(response);
              } catch (e) {
                console.log(e);
              }
            },
            willClose: () => {
              navigate("/admin/manajemen-admin");
            },
          });
        }
      });
  };

  return (
    <Flex direction={"column"} h={"100vh"} pb={20} overflowY={"scroll"}>
      {/* Header */}
      <Flex
        pos={"absolute"}
        w={"100%"}
        h={"13vh"}
        align={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        bg={"#f5f5f5"}
        zIndex={10}
      >
        <Flex
          justify={"center"}
          align={"center"}
          w={"30px"}
          h={"30px"}
          bg={"white"}
          borderRadius={"50%"}
          top={"7.2vh"}
          left={7}
          p={2}
          pos={"absolute"}
          zIndex={11}
          onClick={() => {
            navigate("/admin/manajemen-admin");
          }}
          background={"#2c3631"}
        >
          <IoIosArrowBack size={"auto"} fill="#f5f5f5" />
        </Flex>
        <Text
          pos={"absolute"}
          top={"7vh"}
          w={"100%"}
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"2.5vh"}
          color={"#2c3631"}
          zIndex={10}
        >
          Tambah Akun Admin
        </Text>
      </Flex>

      {/* Form Content */}
      <VStack spacing={4} marginTop="14vh" width={"85%"} mx={"auto"}>
        <form onSubmit={handleSubmit(addAdmin)} style={{ width: "100%" }}>
          <FormControl id="nama" isInvalid={errors.nama}>
            <FormLabel fontSize="small" fontWeight="bold">
              Nama
            </FormLabel>
            <Input
              placeholder="Masukkan Nama"
              {...register("nama", {
                required: "Mohon masukkan nama",
              })}
              rounded="10px"
              fontSize="small"
            />
            {errors.nama && (
              <FormErrorMessage>{errors.nama.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="email" isInvalid={errors.email} marginTop="5%">
            <FormLabel fontSize="small" fontWeight="bold">
              Email
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Masukkan Email"
                {...register("email", {
                  required: "Mohon masukkan email",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Format email tidak valid",
                  },
                })}
                rounded="10px"
                fontSize="small"
              />
            </InputGroup>
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="no_telp" isInvalid={errors.no_telp} marginTop="5%">
            <FormLabel fontSize="small" fontWeight="bold">
              No Telepon
            </FormLabel>
            <InputGroup>
              <Input
                type="tel"
                placeholder="Masukkan no telepon"
                {...register("no_telp", {
                  required: "No Telepon is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number",
                  },
                })}
                rounded="10px"
                fontSize="small"
              />
            </InputGroup>
            {errors.no_telp && (
              <FormErrorMessage>{errors.no_telp.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="password" isInvalid={errors.password} marginTop="5%">
            <FormLabel fontSize="small" fontWeight="bold">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Masukkan password"
                {...register("password", {
                  required: "Mohon masukkan password",
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                })}
                rounded="10px"
                fontSize="small"
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="role_id" isInvalid={errors.role_id} mt={4}>
            <FormLabel fontSize="small" fontWeight="bold">
              Organisasi
            </FormLabel>
            <Select
              {...register("role_id", {
                required: "Mohon pilih organisasi",
                validate: (value) => value !== "0" || "Mohon pilih organisasi",
              })}
              placeholder="Pilih Organisasi"
              onChange={(e) => {
                clearErrors("role_id");
                setRole(Number(e.target.value));
              }}
              value={role}
            >
              <option value="1">UMN</option>
              <option value="2">UGM</option>
              <option value="3">Ketua Kelompok Tani</option>
              <option value="4">Dinas Pertanian</option>
            </Select>
            {errors.role_id && (
              <FormErrorMessage>{errors.role_id.message}</FormErrorMessage>
            )}
          </FormControl>

          {role === 3 && (
            <FormControl
              id="kelompok_tani"
              isInvalid={errors.kelompok_tani}
              mt={4}
            >
              <FormLabel fontSize="small" fontWeight="bold">
                Kelompok Tani
              </FormLabel>
              <Select
                {...register("kelompok_tani", {
                  required: "Mohon pilih kelompok tani",
                  validate: (value) =>
                    (role === 3 && value !== "0") ||
                    "Mohon pilih kelompok tani",
                })}
                placeholder="Pilih Kelompok Tani"
                onChange={(e) => {
                  clearErrors("kelompok_tani");
                  setKel(Number(e.target.value));
                }}
                value={kel}
              >
                {kelompok.map((item) => (
                  <option value={`${item.id}`} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </Select>
              {errors.kelompok_tani && (
                <FormErrorMessage>
                  {errors.kelompok_tani.message}
                </FormErrorMessage>
              )}
            </FormControl>
          )}

          <Flex
            justifyContent={"center"}
            w={"100%"}
            gap={5}
            mx={"auto"}
            my={5}
            // bottom={"10%"}
            // pos={"absolute"}
          >
            <Button
              bg={"transparent"}
              borderRadius={"20px"}
              border={"1px solid #2c3631"}
              onClick={() => navigate("/admin/manajemen-admin")}
              w={"50%"}
            >
              Batal
            </Button>
            <Button
              type="submit"
              w={"50%"}
              borderRadius={"20px"}
              bg={"#2c3631"}
              color={"white"}
            >
              Simpan
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
};

export default TambahAdmin;
