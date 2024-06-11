import React from "react";
// import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./Page/Index";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div id="app">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
