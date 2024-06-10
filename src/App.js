import React from "react";
// import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Page/Dashboard";
import ModelTest from "./Page/ModelTest";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div id="app">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/model-test" element={<ModelTest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
