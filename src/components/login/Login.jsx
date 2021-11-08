import {
  Flex,
  useColorModeValue,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser, useAuth } from "../auth";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const loginBg = useColorModeValue("gray.100", "gray.700");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const [togglePasswordShow, setTogglePasswordShow] = useState(false);
  const handleToggleClick = () => setTogglePasswordShow(!togglePasswordShow);

  const toast = useToast();
  const { login, setLogin, setUserData, setToken } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  login && navigate(state !== null && state?.from ? state.from : "/");

  async function loginClickHandler() {
    checkforUsername()
    checkforPassword()
    if(errorPassword === "" && errorUsername === "" && username && password){
      const { loginStatus, token } = await loginUser(username, password);
      if (loginStatus) {
        setLogin(true);
        setToken(token);
        setUserData();
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid credentials",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    }else{
      toast({
        title: "Enter proper info",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  function checkforUsername(){
    if(username === ""){
      setErrorUsername("username is required")
    }else{
      setErrorUsername("");
    }
  }

  function checkforPassword() {
    if (password === "") {
      setErrorPassword("password is required");
    }else{
      setErrorPassword("");
    }
  }

  return (
    <Flex w="100%" h="90vh" justify="center" align="center">
      <Flex
        w={{ base: "90%", xl: "30%" }}
        bg={loginBg}
        direction="column"
        p="4"
        align=""
        borderRadius="lg"
      >
        <Text fontSize="lg">Login</Text>
        <Input
          isInvalid={errorUsername === "" ? false : true}
          errorBorderColor="crimson"
          placeholder="Username"
          my="3"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkforUsername()}
        />
        <Text textAlign="left" color="crimson" mb="2">
          {errorUsername}
        </Text>
        <InputGroup size="md">
          <Input
            isInvalid={errorPassword === "" ? false : true}
            errorBorderColor="crimson"
            pr="4"
            type={togglePasswordShow ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkforPassword()}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleToggleClick}>
              {togglePasswordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text textAlign="left" color="crimson" my="2">
          {errorPassword}
        </Text>
        <Flex w="100%" direction="column" align="center">
          <Button
            mt="4"
            w={{ base: "50%", xl: "30%" }}
            onClick={() => loginClickHandler(username, password)}
          >
            Login
          </Button>
          <Link as={RouterLink} to="/signup" mt="4">
            Signup
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
