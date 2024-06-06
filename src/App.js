import React from 'react';
import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './Page/Dashboard';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
