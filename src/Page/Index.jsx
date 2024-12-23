import React, { } from "react";
import { usePage } from "../state";
import Dashboard from "./Dashboard";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import FormModel from "./FormModel";
// import ManajemenHamaDetail from "./ManajemenHamaDetail";
import ManajemenHamaPage from "./ManajemenHamaPage";
import RamalanCuaca from "./RamalanCuaca";
// import ModelTest from "./ModelTest";
import Camera from "./Camera";
// import HitungHama from "./HitungHama";
import PersebaranHama from "./PersebaranHama";
import Profil from "./Profil";
import { Route, Routes } from "react-router-dom";
// import Artikel from "./Artikel";
// import History from "./History";

// const componentMap = {
//   Home: Dashboard,
//   // History: History,
//   "Ramalan Cuaca": RamalanCuaca,
//   // Artikel: Artikel,
//   Camera: Camera,
//   // HitungHama: HitungHama,
//   ManajemenHamaDetail: ManajemenHamaDetail,
//   // ManajemenHamaPage: ManajemenHamaPage,
//   // "Manajemen Hama": ManajemenHamaPage,
//   "Prediksi Hama": ManajemenHamaPage,
//   "Sebaran Hama": PersebaranHama,
//   Profil: Profil,
//   "Prediksi Cuaca": FormModel,
// };

const Index = () => {

  // const Component = componentMap[page] || <Dashboard />;

  return (
    <Box
      w={{ base: "100%", md: "480px" }}
      minH={"100vh"}
      mx={"auto"}
      bg={"#f5f5f5"}
      pos={"relative"}
    >
      {/* {page === "Home" && <Dashboard />}
      {page === "Prediksi Cuaca" && <FormModel />} */}
      {/* <Component /> */}

      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/persebaran-hama" element={<PersebaranHama/>}/>
        <Route path="/kamera" element={<Camera/>}/>
        <Route path="/manajemen-hama" element={<ManajemenHamaPage/>}/>
        <Route path="/profil" element={<Profil/>}/>
        <Route path="/ramalan-cuaca" element={<RamalanCuaca/>}/>
        <Route path="/prediksi" element={<FormModel/>}/>
        <Route path="/informasi-hama" element={<FormModel/>}/>
      </Routes>

      {/* {page !== "Sebaran Hama" || page !== "Camera" ? (
        <Box h={"7vh"}></Box>
      ) : (
        <></>
      )} */}
    </Box>
  );
};

export default Index;
