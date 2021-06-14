import { Flex,  } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { Login, Signup } from "./components/login"
import { Home } from "./components/home"
import { Navbar } from "./components/navbar"
import { Notes } from "./components/notes"
import { ProtectedRoute } from "./components/auth"

function App() {
  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <ProtectedRoute path="/notes" element={<Notes />} />
      </Routes>
    </Flex>
  )
}

export default App

