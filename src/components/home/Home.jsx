import { Flex, Link, Image, Button, Text } from "@chakra-ui/react"

import { Link as RouterLink } from "react-router-dom"

function Home() {
    return (
      <Flex w="100%" direction="column" align="center">
        <Image
          w={{ base: "90%", xl: "40%" }}
          src="https://images.unsplash.com/photo-1527219525722-f9767a7f2884?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1952&q=80"
          borderRadius="xl"
          my="5"
        />
        <Text textAlign="center" fontSize="3xl">Notify - A digital solution for hassle free note management.</Text>
        <Button my="5" fontSize="xl" p="2" w="250px">
            <Link as={RouterLink} to="/notes">
                Start taking notes
            </Link>
        </Button>
      </Flex>
    );
}

export default Home
