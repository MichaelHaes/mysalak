import React, { useEffect } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import PersebaranHama from "./Page/PersebaranHama";
import Camera from "./Page/Camera";
import ManajemenHamaPage from "./Page/ManajemenHamaPage";
import Profil from "./Page/Profil";
import RamalanCuaca from "./Page/RamalanCuaca";
import Artikel from "./Page/Artikel";
import ArticleDetail from "./Page/ArticleDetail";
import Notification from "./firebaseNotification/Notification";
import LoginPage from "./Page/Auth/LoginPage";
import PetaniCreate from "./Page/Auth/PetaniCreate";
import axios from "axios";
import { useKelompokTaniList } from "./state";
import env from "react-dotenv";
import PetaniLogin from "./Page/Auth/PetaniLogin";
import ProtectedRoutes from "./Hooks/useProtectedRoutes";
import AdminLogin from "./Page/Auth/AdminLogin";
import UnauthorizedRoute from "./Hooks/useUnprotectedRoutes";
import RoleBasedRoutes from "./Hooks/useRoleBasedRoutes";
import ManajemenAdmin from "./Page/Admin/UMN/ManajemenAdmin";
import TambahAdmin from "./Page/Admin/UMN/TambahAdmin";
import EditAdmin from "./Page/Admin/UMN/EditAdmin";
import VerifikasiAnggota from "./Page/Admin/Ketua/VerifikasiAnggota";
import RedirectPage from "./Page/RedirectPage";

function App() {
  const setKelompokTani = useKelompokTaniList().setKelompokTani;

  const getKelompokTaniList = () => {
    axios
      .get(`${env.API_URL}/kelompok-tani`)
      .then((response) => {
        let kelompokTaniTemp = [];
        response.data.forEach((kelompok) => {
          kelompokTaniTemp.push({
            id: kelompok.id,
            nama: kelompok.nama,
            ketua: kelompok.ketua,
            lat: kelompok.latitude,
            long: kelompok.longitude,
          });
        });
        setKelompokTani(kelompokTaniTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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
            <Route element={<UnauthorizedRoute />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/create-petani" element={<PetaniCreate />} />
              <Route path="/login-petani" element={<PetaniLogin />} />
              <Route path="/login-admin" element={<AdminLogin />} />
            </Route>
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
            {/* admin umn */}
            <Route element={<RoleBasedRoutes allowed={1}/>}>
              <Route
                path="/admin/manajemen-admin"
                element={<ManajemenAdmin />}
              />
              <Route
                path="/admin/manajemen-admin/tambah"
                element={<TambahAdmin />}
              />
              <Route
                path="/admin/manajemen-admin/:id/edit"
                element={<EditAdmin />}
              />
            </Route>
            {/* admin ugm */}
            <Route element={<RoleBasedRoutes allowed={2}/>}>
              {/* <Route
                path="/admin/manajemen-anggota"
                element={<ManajemenAnggota />}
              /> */}
            </Route>
            {/* admin ketua kelompok tani */}
            <Route element={<RoleBasedRoutes allowed={3}/>}>
              <Route
                path="/admin/verifikasi-anggota"
                element={<VerifikasiAnggota />}
              />
            </Route>
            {/* admin dinas */}
            <Route element={<RoleBasedRoutes allowed={4}/>}>
              {/* <Route
                path="/admin/manajemen-anggota"
                element={<ManajemenAnggota />}
              /> */}
            </Route>

            <Route path="*" element={<RedirectPage message="Laman tidak tersedia"/>}/>
          </Routes>
        </Box>
        <Notification />
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
