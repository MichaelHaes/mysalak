import React from "react";
import IndikatorHeader from "../Components/IndikatorHeader";
import { Box } from "@chakra-ui/react";
import IndikatorCard from "../Components/IndikatorCard";


const Indikator = () => {
  return (
    <Box>
      <IndikatorHeader />
      <IndikatorCard />
    </Box>
  );
};

export default Indikator;
