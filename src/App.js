import React, {useEffect} from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import PersebaranHama from "./Page/PersebaranHama";
import Camera from "./Page/Camera";
import ManajemenHamaPage from "./Page/ManajemenHamaPage";
import Profil from "./Page/Profil";
import RamalanCuaca from "./Page/RamalanCuaca";
import Artikel from "./Page/Artikel";
import ArticleDetail from "./Page/ArticleDetail";
import Navbar from "./Components/Navbar";
import {requestForToken} from "./firebaseNotification/firebase";
import Notification from "./firebaseNotification/Notification";
import LoginPage from "./Page/Auth/LoginPage";
import PetaniCreate from "./Page/Auth/PetaniCreate";
import axios from "axios";
import {useKelompokTaniList} from "./state";
import env from "react-dotenv";
import PetaniLogin from "./Page/Auth/PetaniLogin";
import ProtectedRoutes from "./Hooks/useProtectedRoutes";
import AdminLogin from "./Page/Auth/AdminLogin";

function App() {
  const location = useLocation();
  const setKelompokTani = useKelompokTaniList().setKelompokTani;

  const getKelompokTaniList = () => {
    axios.get(`${env.API_URL}/kelompok-tani`)
      .then((response) => {
        let kelompokTaniTemp = []
        console.log("res: ", response.data)
        response.data.forEach((kelompok) => {
          kelompokTaniTemp.push({
            id: kelompok.id,
            nama: kelompok.nama,
            ketua: kelompok.ketua,
            lat: kelompok.latitude,
            long: kelompok.longitude
          });
        });
        setKelompokTani(kelompokTaniTemp);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    requestForToken();
    getKelompokTaniList();
  }, []);

  return (
    <ChakraProvider>
      <div id="app">
        <Box
          w={{ base: "100%", md: "380px" }}
          minH={"100vh"}
          mx={"auto"}
          bg={"#f5f5f5"}
          pos={"relative"}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/create-petani" element={<PetaniCreate />} />
            <Route path="/login-petani" element={<PetaniLogin />} />
            <Route path="/login-admin" element={<AdminLogin />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/persebaran-hama" element={<PersebaranHama />} />
              <Route path="/kamera" element={<Camera />} />
              <Route path="/manajemen-hama" element={<ManajemenHamaPage />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/ramalan-cuaca" element={<RamalanCuaca />} />
              <Route path="/artikel" element={<Artikel />} />
              <Route path="/artikel/:id" element={<ArticleDetail />} />
            </Route>
          </Routes>
        </Box>
        <Notification/>
      </div>
    </ChakraProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
