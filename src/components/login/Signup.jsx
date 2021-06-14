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
import { signup, useAuth } from "../auth";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { validateEmail, validateName, validatePassword, validateUsername } from "../utils"

export default function Signup() {
  const loginBg = useColorModeValue("gray.300", "gray.700");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [togglePasswordShow, setTogglePasswordShow] = useState(false);
  const handleToggleClick = () => setTogglePasswordShow(!togglePasswordShow);

 const [errorUsername, setErrorUsername] = useState("");
 const [errorEmail, setErrorEmail] = useState("");
 const [errorName, setErrorName] = useState("");
 const [errorPassword, setErrorPassword] = useState("");

  const toast = useToast();
  const { login, setLogin, setUserData, setToken } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  login && navigate(state?.from ? state.from : "/");

  const defaultTags = ["to-do", "work", "study", "shopping"]

  async function checkForUsername() {
    setErrorUsername(await validateUsername(username));
  }

  async function checkForEmail() {
    setErrorEmail(await validateEmail(email));
  }

  function checkForName() {
    setErrorName(validateName(name));
  }

  function checkForPassword() {
    setErrorPassword(validatePassword(password));
  }

  async function signupClickHandler() {
    checkForPassword();
    checkForName();
    checkForEmail();
    checkForUsername();
    if (
      errorUsername === "" &&
      errorEmail === "" &&
      errorName === "" &&
      errorPassword === "" &&
      username &&
      email &&
      password &&
      name
    ) {
      const { signupStatus, token } = await signup(
        username,
        password,
        email,
        name,
        defaultTags
      );
      if (signupStatus) {
        setLogin(true);
        setToken(token);
        setUserData();
        toast({
          title: "Signup Successfull",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error Signing up",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Enter proper details",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex w="100%" h="90vh" justify="center" align="center">
      <Flex
        w={{ base: "90%", xl: "30%" }}
        bg={loginBg}
        direction="column"
        p="4"
        borderRadius="lg"
      >
        <Text fontSize="lg" textAlign="center">
          Signup
        </Text>
        <Input
          isInvalid={errorName === "" ? false : true}
          errorBorderColor="crimson"
          placeholder="Name"
          my="3"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => checkForName()}
        />
        <Text textAlign="left" color="crimson">
          {errorName}
        </Text>
        <Input
          isInvalid={errorEmail === "" ? false : true}
          errorBorderColor="crimson"
          placeholder="Email"
          my="3"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => checkForEmail()}
        />
        <Text textAlign="left" color="crimson">
          {errorEmail}
        </Text>
        <Input
          isInvalid={errorUsername === "" ? false : true}
          errorBorderColor="crimson"
          placeholder="Username"
          my="3"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkForUsername()}
        />
        <Text textAlign="left" color="crimson">
          {errorUsername}
        </Text>
        <InputGroup size="md" mt="3">
          <Input
            isInvalid={errorPassword === "" ? false : true}
            errorBorderColor="crimson"
            pr="4"
            type={togglePasswordShow ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkForPassword()}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleToggleClick}>
              {togglePasswordShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text textAlign="left" color="crimson">
          {errorPassword}
        </Text>
        <Flex w="100%" direction="column" align="center">
          <Button
            mt="4"
            w={{ base: "50%", xl: "30%" }}
            onClick={() => signupClickHandler(username, password)}
          >
            Signup
          </Button>
          <Link mt="4" as={RouterLink} to="/login">
            Login
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
