import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"

import App from './App';

import { AuthProvider } from "./components/auth"
import { NoteProvider } from "./components/notes"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <NoteProvider>
          <Router>
            <App />
          </Router>
        </NoteProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

