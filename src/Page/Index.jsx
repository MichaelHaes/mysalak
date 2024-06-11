import React from "react";
import { useNavbar } from "../state";
import Dashboard from "./Dashboard";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import FormModel from "./FormModel";

const Index = () => {
  const { page } = useNavbar();

  return (
    <Box>
      {page === "Home" && <Dashboard />}
      {page === "Prediksi Cuaca" && <FormModel />}
      <Navbar />
    </Box>
  );
};

export default Index;
