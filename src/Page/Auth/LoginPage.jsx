import {Box, Button, Flex, Image, Text, HStack, VStack} from "@chakra-ui/react";
import { BsPhoneFill } from "react-icons/bs";
import { GiFarmer } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import Colors from "../../Color/Color"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxH={"100vh"} position="relative" overflow={"hidden"}>
      <Image
        src="/assets/login_image.png"
        objectFit="cover"
        w="100%"
        h="100%"
      />
      <Box
        pos="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1"
        bgGradient="linear(to-t, #0C2315 60%, transparent)"
      />
      <Flex
        flexDir="column"
        pos="absolute"
        zIndex="10"
        h="40%"
        w="100%"
        top="0"
        justify="center"
        align="center"
      >
        <Image
          src="/assets/login_mySalak.png"
          w="50%"
          h="auto"
        />
      </Flex>
      <Flex
        flexDir="column"
        pos="absolute"
        zIndex="10"
        h="60%"
        w="100%"
        bottom="0"
        roundedTop="30px"
        bg="white"
        justify="space-between"
        align="center"
        py="10%"
      >
        <VStack w="100%" spacing="2">
          <Button
            w="80%"
            h="62px"
            display="flex"
            flexDir="row"
            rounded="full"
            bgColor={Colors.Dark_Green}
            _hover={{
              bg: Colors.Dark_Green
            }}
            onClick={() => navigate("/login-admin")}
          >
            <HStack spacing={3}>
              <BsPhoneFill color={Colors.Soft_Green} />
              <Text textColor={Colors.Soft_Green} fontStyle="normal">
                Masuk sebagai admin
              </Text>
            </HStack>
          </Button>
          <Button
            w="80%"
            h="62px"
            display="flex"
            flexDir="row"
            rounded="full"
            borderWidth="1px"
            borderColor={Colors.Soft_Grey}
            bgColor="white"
            _hover={{
              bg: "white"
            }}
            onClick={() => navigate("/login-petani")}
          >
            <HStack spacing={3}>
              <GiFarmer color={Colors.Dark_Green} />
              <Text textColor={Colors.Dark_Green} fontStyle="normal">
                Masuk sebagai Petani
              </Text>
            </HStack>
          </Button>
        </VStack>
        <VStack w="100%" spacing="2">
          <Text>
            Belum mempunyai akun?
          </Text>
          <Button
            w="80%"
            h="62px"
            display="flex"
            flexDir="row"
            rounded="full"
            bgColor={Colors.Light_Green}
            _hover={{
              bg: Colors.Light_Green
            }}
            onClick={() => navigate("/create-petani")}
          >
            <HStack spacing={3}>
              <MdOutlineAccountCircle color={Colors.Dark_Green} />
              <Text textColor={Colors.Dark_Green} fontStyle="normal">
                Buat akun anda sekarang
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LoginPage;
