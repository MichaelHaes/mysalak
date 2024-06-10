import React from "react";
// import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./Page/Index";
import ModelTest from "./Page/ModelTest";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div id="app">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/model-test" element={<ModelTest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
