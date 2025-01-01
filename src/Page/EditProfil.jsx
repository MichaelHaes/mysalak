import React, { useState } from "react";
import axios from "axios";  // Import axios for making HTTP requests
import {
  Box,
  Button, Drawer, DrawerContent, DrawerOverlay,
  Flex, FormControl, FormErrorMessage, FormLabel,
  Image,
  Input,
  Text, useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useKelompokTaniList } from "../state";
import env from "react-dotenv";

const EditProfil = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const kelompokTaniList = useKelompokTaniList().kelompokTani; // List of groups
  const kelompokTani = JSON.parse(localStorage.getItem("kelompok_tani")) - 1;
  const [selectedKelompok, setSelectedKelompok] = useState(kelompokTaniList[kelompokTani]);
  const [profilePic, setProfilePic] = useState(null);
  const [profileBackground, setProfileBackground] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(JSON.parse(localStorage.getItem("profile_pic")));  // Store selected profile pic
  const [profileBackgroundPreview, setProfileBackgroundPreview] = useState(JSON.parse(localStorage.getItem("profile_background")));  // Store selected background image

  const petaniFormDefaultValue = {
    nama: JSON.parse(localStorage.getItem("nama")),
    noTelp: JSON.parse(localStorage.getItem("no_telp")),
    kelompokTani: JSON.parse(localStorage.getItem("kelompok_tani")),
  }

  const adminFormDefaultValue = {
    nama: JSON.parse(localStorage.getItem("nama")),
    noTelp: JSON.parse(localStorage.getItem("no_telp")),
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("role_id")) === 5 ? petaniFormDefaultValue : adminFormDefaultValue,
  });

  const handleProfileBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileBackground(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64Data = result.replace(/^data:image\/[a-z]+;base64,/, "");
        setProfileBackgroundPreview(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64Data = result.replace(/^data:image\/[a-z]+;base64,/, "");
        setProfilePicPreview(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //
  //   // Add form data fields
  //   formData.append("nama", data.nama);
  //   formData.append("no_telp", data.noTelp);
  //   formData.append("kelompok_tani", selectedKelompok.id);
  //
  //   if (profilePic) {
  //     formData.append("profile_pic", profilePic);
  //   }
  //   if (profileBackground) {
  //     formData.append("profile_background", profileBackground);
  //   }
  //
  //   try {
  //     const response = await axios.put(`${env.API_URL}/edit-petani/${JSON.parse(localStorage.getItem("user_id"))}`, formData);
  //
  //     // If successful, update the localStorage and navigate
  //     localStorage.setItem("nama", JSON.stringify(data.nama));
  //     localStorage.setItem("no_telp", JSON.stringify(data.noTelp));
  //     localStorage.setItem("kelompok_tani", JSON.stringify(selectedKelompok.id));
  //     const kelompok_tani = selectedKelompok.id;
  //     const noTelpLast3 = data.noTelp.slice(-3) || "";
  //     const namaFirst3 = data.nama.substring(0, 3) || "";
  //     const user_id = `${kelompok_tani}-${noTelpLast3}-${namaFirst3}`;
  //     localStorage.setItem("user_id", JSON.stringify(user_id));
  //
  //     // If profile picture or background updated, store new data in localStorage as well
  //     if (profilePic) {
  //       localStorage.setItem("profile_pic", JSON.stringify(response.data.profile_pic));
  //     }
  //     if (profileBackground) {
  //       localStorage.setItem("profile_background", JSON.stringify(response.data.profile_background));
  //     }
  //
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error updating profile:", error.response?.data || error.message);
  //   }
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("nama", data.nama);
    formData.append("no_telp", data.noTelp);

    if (JSON.parse(localStorage.getItem("role_id")) === 5) {
      formData.append("kelompok_tani", selectedKelompok.id);
    }

    if (profilePic) {
      console.log("input profile_pic: ");
      formData.append("profile_pic", profilePic);
    }
    if (profileBackground) {
      console.log("input profile_background: ");
      formData.append("profile_background", profileBackground);
    }

    const roleId = JSON.parse(localStorage.getItem("role_id"));
    const userId = JSON.parse(localStorage.getItem("user_id"));
    const apiEndpoint =
      roleId === 5
        ? `${env.API_URL}/edit-petani/${userId}`
        : `${env.API_URL}/edit-admin/${userId}`;

    console.log("apiEndpoint: ", apiEndpoint);

    for (let [key, value] of formData.entries()) {
      console.log(`${key} 1:`, value);
    }

    try {
      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("nama", JSON.stringify(data.nama));
      localStorage.setItem("no_telp", JSON.stringify(data.noTelp));

      if (roleId === "5") {
        localStorage.setItem("kelompok_tani", JSON.stringify(selectedKelompok.id));
      }

      if (profilePic) {
        localStorage.setItem("profile_pic", JSON.stringify(response.data.profile_pic));
      }
      if (profileBackground) {
        localStorage.setItem(
          "profile_background",
          JSON.stringify(response.data.profile_background)
        );
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  const handleKelompokSelect = (kelompok) => {
    setSelectedKelompok(kelompok);
    onClose();
  };

  return (
    <Flex
      direction="column"
      w="85%"
      mx="auto"
      pt="10%"
      pb="25%"
      align="center"
      pos="relative"
    >
      {/* Back Button and Title */}
      <Flex w="100%" align="center" justify="center" mb={4}>
        <Flex
          align="center"
          justify="center"
          w="30px"
          h="30px"
          bg="#2c3631"
          borderRadius="50%"
          pos="absolute"
          left={0}
          onClick={() => navigate("/profil")}
        >
          <IoIosArrowBack size="20px" color="white"/>
        </Flex>
        <Text fontWeight="bold" fontSize="2.5vh">
          Edit Profil
        </Text>
      </Flex>

      {/* Profile Header */}
      <Box id="profile-header" w="100%" mb={4}>
        {/* Profile background change */}
        <Box onClick={() => document.getElementById("background-upload").click()}>
          {
            profileBackgroundPreview ? (
              <Image
                src={`data:image/png;base64,${profileBackgroundPreview}`}
                w="100%"
                h="120px"
                objectFit="cover"
                borderRadius="12px"
              />
            ) : (
              <Image
                src={'/assets/curah hujan_indikator.png'}
                w="100%"
                h="120px"
                objectFit="cover"
                borderRadius="12px"
              />
            )
          }
        </Box>

        {/* Profile pic change */}
        <Box onClick={() => document.getElementById("profile-upload").click()}>
          {
            profilePicPreview ? (
              <Image
                pos="relative"
                src={`data:image/png;base64,${profilePicPreview}`}
                h="10vh"
                w="10vh"
                mx="auto"
                objectFit="cover"
                borderRadius="full"
                border="3.5px solid #F4F4F4"
                zIndex={2}
                mt="-13%"
                objectPosition="63%"
              />
            ) : (
              <Image
                pos="relative"
                src={'/assets/defaultUser.jpg'}
                h="10vh"
                w="10vh"
                mx="auto"
                objectFit="cover"
                borderRadius="full"
                border="3.5px solid #F4F4F4"
                zIndex={2}
                mt="-13%"
                objectPosition="63%"
              />
            )
          }
        </Box>
      </Box>

      {/* Hidden inputs for file selection */}
      <Input
        id="background-upload"
        type="file"
        accept="image/*"
        onChange={handleProfileBackgroundChange}
        style={{ display: "none" }}
      />
      <Input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleProfilePicChange}
        style={{ display: "none" }}
      />

      {/* Form */}
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        w="100%"
      >
        {/* Rest of the form fields */}
        <Box w="100%">
          <Text fontSize="sm" mb={1}>
            Nama Lengkap
          </Text>
          <Input
            {...register("nama", { required: "Nama Lengkap wajib diisi" })}
            placeholder="Nama Lengkap"
            borderColor="gray.300"
            borderRadius="12px"
          />
          {errors.nama && (
            <Text color="red.500" fontSize="xs">
              {errors.nama.message}
            </Text>
          )}
        </Box>

        <Box w="100%">
          <Text fontSize="sm" mb={1}>
            No Telepon
          </Text>
          <Input
            {...register("noTelp", {
              required: "No Telepon wajib diisi",
              pattern: {
                value: /^[0-9]+$/,
                message: "No Telepon harus berupa angka",
              },
            })}
            placeholder="No Telepon"
            borderColor="gray.300"
            borderRadius="12px"
          />
          {errors.noTelp && (
            <Text color="red.500" fontSize="xs">
              {errors.noTelp.message}
            </Text>
          )}
        </Box>

        {
          (JSON.parse(localStorage.getItem("role_id")) === 5 ||
            JSON.parse(localStorage.getItem("role_id")) === 3) && (
              <>
                <FormControl id="kelompokTani" isInvalid={errors.kelompokTani}>
                  <FormLabel>Kelompok Tani</FormLabel>
                  <Button
                    onClick={onOpen}
                    w="100%"
                    textAlign="left"
                    justifyContent="start"
                    border="1px solid gray"
                  >
                    {selectedKelompok?.nama || "Pilih Kelompok Tani"}
                  </Button>
                  <FormErrorMessage>
                    {errors.kelompokTani && errors.kelompokTani.message}
                  </FormErrorMessage>
                </FormControl>

                <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <VStack p={4}>
                      {kelompokTaniList.map((kelompok) => (
                        <Box
                          key={kelompok.id}
                          w="100%"
                          onClick={() => handleKelompokSelect(kelompok)}
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          py={2}
                          textAlign="center"
                        >
                          {kelompok.nama}
                        </Box>
                      ))}
                    </VStack>
                  </DrawerContent>
                </Drawer>
              </>
          )
        }

        {/* Buttons */}
        <Flex mt={6} w="100%" justify="space-between">
          <Button
            w="48%"
            borderRadius="12px"
            bg="gray.200"
            onClick={() => navigate("/")}
          >
            Batal
          </Button>
          <Button
            type="submit"
            w="48%"
            borderRadius="12px"
            bg="#2c3631"
            color="white"
          >
            Simpan
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default EditProfil;