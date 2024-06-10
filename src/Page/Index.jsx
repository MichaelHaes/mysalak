import React from "react";
import { useNavbar } from "../state";
import Dashboard from "./Dashboard";
import { Box } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";

const Index = () => {
  const { page } = useNavbar();

  return (
    <Box>
      {page === "Home" && <Dashboard />}
      <Navbar />
    </Box>
  );
};

export default Index;
