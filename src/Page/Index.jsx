import React from "react";
import { usePage } from "../state";
import Dashboard from "./Dashboard";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import FormModel from "./FormModel";
import Indikator from "./Indikator";
import ModelTest from "./ModelTest";
import Camera from "./Camera";
import HitungHama from "./HitungHama";
import ManajemenHamaDetail from "./ManajemenHamaDetail";
import ManajemenHamaPage from "./ManajemenHamaPage";
import PersebaranHama from "./PersebaranHama";
import Profil from "./Profil";
import Artikel from "./Artikel";
import History from "./History";

const componentMap = {
  Home: Dashboard,
  History: History,
  Indikator: Indikator,
  Artikel: Artikel,
  Camera: Camera,
  HitungHama: HitungHama,
  ManajemenHamaDetail: ManajemenHamaDetail,
  ManajemenHamaPage: ManajemenHamaPage,
  PersebaranHama: PersebaranHama,
  Profil: Profil,
};

const Index = () => {
  const { page } = usePage();
  const Component = componentMap[page] || Dashboard;

  return (
    <Box>
      {page === "Home" && <Dashboard />}
      {page === "Prediksi Cuaca" && <FormModel />}
      <Component />
      <Navbar />
    </Box>
  );
};

export default Index;
