/* eslint-disable */

import { Flex } from "@chakra-ui/react";

import { useEffect } from "react";
import { useAuth } from "../auth";
import { NoteDisplay, NoteCreate, useNote, NoteFilter } from "../notes";

export default function Notes() {
  const { login, user } = useAuth();

  const { loadData } = useNote();

  useEffect(() => {
    if (login && user !== null) {
      loadData();
    }
  }, [user, login]);

  return (
    <Flex w="100vw" m={0}
        p={0} overflow="hidden">
      <Flex
        display={{ base: "none", xl: "flex" }}
        w="20%"
        justify="center"
        m={0}
        p={4}
      >
        <NoteFilter onClose={null} isMobileVersion={false} />
      </Flex>
      <Flex
        w={{ base: "100%", xl: "80%" }}
        direction="column"
        m={0}
        p={4}
      >
        <NoteCreate />
        <NoteDisplay />
      </Flex>
    </Flex>
  );
}
