import React from "react";
import { usePage } from "../state";
import Dashboard from "./Dashboard";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import FormModel from "./FormModel";
import ManajemenHamaDetail from "./ManajemenHamaDetail";
import ManajemenHamaPage from "./ManajemenHamaPage";
import RamalanCuaca from "./RamalanCuaca";
// import ModelTest from "./ModelTest";
// import Camera from "./Camera";
// import HitungHama from "./HitungHama";
// import PersebaranHama from "./PersebaranHama";
// import Profil from "./Profil";
// import Artikel from "./Artikel";
// import History from "./History";

const componentMap = {
  Home: Dashboard,
  // History: History,
  "Ramalan Cuaca": RamalanCuaca,
  // Artikel: Artikel,
  // Camera: Camera,
  // HitungHama: HitungHama,
  ManajemenHamaDetail: ManajemenHamaDetail,
  // ManajemenHamaPage: ManajemenHamaPage,
  // "Manajemen Hama": ManajemenHamaPage,
  "Prediksi Hama": ManajemenHamaPage,
  // PersebaranHama: PersebaranHama,
  // Profil: Profil,
  "Prediksi Cuaca": FormModel,
};

const Index = () => {
  const { page } = usePage();
  const Component = componentMap[page] || <Dashboard />;

  return (
    <Box>
      {/* {page === "Home" && <Dashboard />}
      {page === "Prediksi Cuaca" && <FormModel />} */}
      <Component />

      <Box h={"7vh"}></Box>

      <Navbar />
    </Box>
  );
};

export default Index;
