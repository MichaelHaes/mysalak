import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Tabs,
  Tab,
  TabList,
  Button,
  Stack,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import env from "react-dotenv";
import AdminCard from "../../../Components/AdminCard";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ManajemenAdmin = () => {
  const [filter, setFilter] = useState("");
  const [roles, setRoles] = useState([]);
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  const getRoles = async () => {
    const response = await axios.get(`${env.API_URL}/roles`);
    setRoles(response.data);
  };

  const getAdmin = async () => {
    const response = await axios.get(`${env.API_URL}/admin`);
    setAdmin(response.data);
  };

  useEffect(() => {
    getRoles();
    getAdmin();
  }, []);

  return (
    <>
      <Flex
        direction={"column"}
        w={"85%"}
        mx={"auto"}
        pos={"relative"}
        minH={"100vh"}
      >
        <Button
          pos={"sticky"}
          top={"85vh"}
          left={"90vw"}
          w={"10%"}
          variant={"unstyled"}
          background={"#2c3631"}
          borderRadius={"lg"}
          onClick={() => navigate("/admin/manajemen-admin/tambah")}
          zIndex={11}
        >
          <Flex w={"100%"} h={"100%"} p={2} justify={"center"}>
            <TiUserAdd color="#ffffff" size={"100%"} />
          </Flex>
        </Button>
        <Box pos={"sticky"} top={0} zIndex={10} bg={"#f5f5f5"}>
          <Flex w={"100%"} mb={18} textAlign={"start"}>
            <Text
              fontWeight={"bold"}
              w={"100%"}
              fontSize={"2.3vh"}
              color={"#2c3631"}
              mt={5}
            >
              Manajemen Akun Admin
            </Text>
          </Flex>

          <Tabs
            variant="unstyled"
            borderRadius={"full"}
            pos={"sticky"}
            p={0}
            mb={3}
            onChange={(index) => {
              if (index === 0) {
                setFilter("");
              } else {
                const filteredRole = roles.filter((item) => item.is_admin)[
                  index - 1
                ];
                if (filteredRole) {
                  setFilter(parseInt(filteredRole.id));
                }
              }
            }}
          >
            <TabList
              borderRadius={"full"}
              h={"2rem"}
              gap={2}
              p={0}
              overflowX={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
                fontSize={"0.75rem"}
              >
                Semua
              </Tab>
              {roles
                .filter((item) => item.is_admin)
                .map((item) => (
                  <Tab
                    borderRadius={"full"}
                    border={"1px solid #2C3631"}
                    _selected={{
                      color: "white",
                      bg: "#2C3631",
                    }}
                    fontSize={"0.75rem"}
                    whiteSpace={"nowrap"}
                    w={"fit-content"}
                  >
                    {item.nama}
                  </Tab>
                ))}
            </TabList>
          </Tabs>
        </Box>

        <Stack mt={5} mb={3} pb={20}>
          {admin
            .filter((item) => (filter !== "" ? item.role_id === filter : true))
            .map((item) => (
              <AdminCard admin={item} />
            ))}
        </Stack>
      </Flex>
    </>
  );
};

export default ManajemenAdmin;
