import { useEffect, useState } from "react";

import { SimpleGrid, Flex, Heading } from "@chakra-ui/react";

import { useNote, Note } from "../notes";

export default function NoteDisplay() {
  const {
    notesState: { notes, currentSelectedTag },
  } = useNote();

  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [unpinnedNotes, setUnpinnedNotes] = useState([]);

  useEffect(() => {
    const filteredNotes = notes.filter(({ tag }) => currentSelectedTag ? currentSelectedTag === tag : tag)
    setPinnedNotes(filteredNotes.filter((note) => note.pinned));
    setUnpinnedNotes(filteredNotes.filter((note) => !note.pinned));
  }, [notes, currentSelectedTag]);

  return (
    <Flex w="100%" direction="column">
      <Heading my="4" textAlign="center">
        Pinned
      </Heading>
      <SimpleGrid mt="10" columns={{ base: 1, xl: 3 }} spacing={10}>
        {pinnedNotes.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </SimpleGrid>
      <Heading my="4" textAlign="center">
        Others
      </Heading>
      <SimpleGrid mt="10" columns={{ base: 1, xl: 3 }} spacing={10}>
        {unpinnedNotes.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </SimpleGrid>
    </Flex>
  );
}
