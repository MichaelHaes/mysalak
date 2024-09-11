import React from "react";
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
// import FormModel from "./Page/FormModel";
import ArticleDetail from "./Page/ArticleDetail";
import Navbar from "./Components/Navbar";

function App() {
  const location = useLocation();

  return (
    <ChakraProvider>
      <div id="app">
        <Box
          w={{ base: "100%", md: "420px" }}
          minH={"100vh"}
          mx={"auto"}
          bg={"#f5f5f5"}
          pos={"relative"}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/persebaran-hama" element={<PersebaranHama />} />
            <Route path="/kamera" element={<Camera />} />
            <Route path="/manajemen-hama" element={<ManajemenHamaPage />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/ramalan-cuaca" element={<RamalanCuaca />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:id" element={<ArticleDetail />} />
          </Routes>
          {location.pathname !== "/kamera" && <Navbar />}
        </Box>
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
