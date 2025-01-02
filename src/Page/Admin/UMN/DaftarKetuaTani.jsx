/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import PetaniCard from "../../../Components/PetaniCard";
import { GrUpgrade } from "react-icons/gr";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "../../../custom-swal.css";
import { IoIosArrowBack } from "react-icons/io";

const DaftarKetuaTani = () => {
  const [filter, setFilter] = useState(""); // Used to store the selected filter
  const [kelompok, setKelompok] = useState([]); // Kelompok data
  const [petani, setPetani] = useState([]); // Petani data
  const profilePic = JSON.parse(localStorage.getItem("profile_pic"));
  const navigate = useNavigate();

  // Fetch kelompok tani data
  const getKelompok = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/kelompok-tani`
      );
      setKelompok(response.data);
    } catch (error) {
      console.error("Error fetching kelompok tani data:", error);
    }
  };

  // Fetch petani data
  const getPetani = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/petani`
      );
      setPetani(response.data);
    } catch (error) {
      console.error("Error fetching petani data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getKelompok();
    getPetani();
  }, []);

  const promote = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/petani/${id}/promote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("JWT_Token")
              .slice(1, -1)}`,
            role_id: localStorage.getItem("role_id"),
          },
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const createAdmin = async (payload) => {
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
  };

  const confirmationSwal = async (petani) => {
    const { value: formValues } = await withReactContent(Swal).fire({
      title: `Registrasi akun admin`,
      html: `
        <input id="swal-input-email" class="custom-input-swal" placeholder="Email" type="email">
        <input id="swal-input-password" class="custom-input-swal" placeholder="Password" type="password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Promote",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      preConfirm: () => {
        const email = document.getElementById("swal-input-email").value;
        const password = document.getElementById("swal-input-password").value;

        // Email Validation (Required and Pattern Check)
        if (!email) {
          Swal.showValidationMessage("Mohon masukkan email");
          return false; // Stop the further action
        } else if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
        ) {
          Swal.showValidationMessage("Format email tidak valid");
          return false;
        }

        // Password Validation (Required and Min Length Check)
        if (!password) {
          Swal.showValidationMessage("Mohon masukkan password");
          return false;
        } else if (password.length < 6) {
          Swal.showValidationMessage("Password minimal 6 karakter");
          return false;
        }

        // Return the form values if validation passes
        return { email, password };
      },
    });

    if (formValues) {
      try {
        const { id, ...petaniData } = petani;

        const payload = {
          ...petaniData,
          email: formValues.email,
          password: formValues.password,
          role_id: 3,
        };

        await promote(id);
        await createAdmin(payload);

        // Show success message
        withReactContent(Swal)
          .fire({
            title: "Ketua tani berhasil diubah!",
            timer: 1000,
            timerProgressBar: true,
            icon: "success",
            showConfirmButton: false,
          })
          .then(getPetani());
      } catch (error) {
        console.error(error.message);
        withReactContent(Swal).fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <>
      <Flex
        direction={"column"}
        w={"85%"}
        mx={"auto"}
        pos={"relative"}
        minH={"100vh"}
      >
        <Box pos={"sticky"} top={0} pt={10} zIndex={10} bg={"#f5f5f5"}>
          <Flex
            w={"100%"}
            mb={18}
            textAlign={"center"}
            alignItems={"center"}
            h={"fit-content"}
          >
            <Flex
              justify={"center"}
              align={"center"}
              w={"30px"}
              h={"30px"}
              bg={"white"}
              borderRadius={"50%"}
              mt={5}
              left={0}
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
              fontWeight={"bold"}
              w={"100%"}
              fontSize={"2.3vh"}
              color={"#2c3631"}
              mt={5}
            >
              Daftar Kelompok Tani
            </Text>
          </Flex>

          <Select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
            placeholder="Pilih Kelompok Tani"
          >
            {kelompok.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Select>
          {filter && (
            <Text ps={1} mt={1} fontSize={"1.3vh"}>
              Ketua: {kelompok[filter - 1].ketua}
            </Text>
          )}
        </Box>

        <Stack mt={5} mb={3} pb={20}>
          {petani
            .filter((item) => item.kelompok_tani === parseInt(filter)) // Filter by kelompok ID
            .map((item) => (
              <Flex
                className="admin-card"
                justifyContent={"space-between"}
                ps={3}
                gap={5}
                bg={"white"}
                w={"100%"}
                h={"7.8vh"}
                borderRadius={"xl"}
                alignItems={"center"}
                pos={"relative"}
              >
                <Flex align={"center"} gap={5}>
                  <Image
                    width={"4vh"}
                    h={"4vh"}
                    objectFit={"contain"}
                    borderRadius={"50%"}
                    src={
                      !profilePic
                        ? "/assets/defaultUser.jpg"
                        : `data:image/png;base64,${profilePic}`
                    }
                    alt={`avatar`}
                  />
                  <PetaniCard key={item.id} props={item} />
                </Flex>

                <Button
                  variant={"unstyled"}
                  me={3}
                  w={"25px"}
                  h={"25px"}
                  //   onClick={() => console.log("clicked")}
                  onClick={() => confirmationSwal(item)}
                >
                  <GrUpgrade color="#2f3e33" size={"100%"} />
                </Button>
              </Flex>
            ))}
        </Stack>
      </Flex>
    </>
  );
};

export default DaftarKetuaTani;
