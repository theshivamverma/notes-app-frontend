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
    <Flex w="100%">
      <Flex display={{ base: "none", xl: "flex" }} p="4" w="20%" justify="center">
        <NoteFilter onClose={null} isMobileVersion={false} />
      </Flex>
      <Flex p="4" w={{ base: "100%", xl: "80%" }} direction="column">
        <NoteCreate />
        <NoteDisplay />
      </Flex>
    </Flex>
  );
}
