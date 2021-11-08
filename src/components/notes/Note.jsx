import {
  Flex,
  Button,
  Badge,
  Heading,
  Text,
  useToast,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

import { deleteNote, useNote, pinNote, unpinNote } from "../notes";

import pinnedImage from "../../images/pinned.png";
import unpinnedImage from "../../images/unpinned.png";

export default function Note({ note }) {
  const tealChoice = useColorModeValue("teal.100", "teal.700");
  const blueChoice = useColorModeValue("blue.200", "blue.700");
  const grayChoice = useColorModeValue("gray.200", "gray.600");
  const darkBlueChoice = useColorModeValue("twitter.200", "twitter.900");
  const greenChoice = useColorModeValue("whatsapp.200", "whatsapp.800");

  const colors = [
    tealChoice,
    grayChoice,
    blueChoice,
    darkBlueChoice,
    greenChoice,
  ];

  const toast = useToast();
  const { notesDispatch } = useNote();

  function showToast(toastMessage, mode) {
    toast({
      title: toastMessage,
      status: mode,
      duration: 2000,
      isClosable: true,
    });
  }

  async function handleDelete(noteId) {
    const { success } = await deleteNote(noteId);
    if (success) {
      notesDispatch({ type: "DELETE_NOTE", payload: { noteId } });
      showToast("Note deleted", success);
    } else {
      showToast("Error deleting note", "error");
    }
  }

  async function handlePinChange(currentPinStatus, noteId){
    if(currentPinStatus){
        const { success } = await unpinNote(noteId)
        if(success){
            notesDispatch({ type: "UNPIN_NOTE", payload: { noteId } })
            showToast("Note unpinned", "success")
        }else {
            showToast("Error unpinning note", "error")
        }
    }else{
        const { success } = await pinNote(noteId);
        if (success) {
          notesDispatch({ type: "PIN_NOTE", payload: { noteId } });
          showToast("Note pinned", "success");
        } else {
          showToast("Error pinning note", "error");
        }
    }
  }
  return (
    <Flex
      direction="column"
      p="4"
      border="2px"
      borderColor="gray.400"
      borderRadius="md"
      bg={colors[note.bgColor]}
      minH="200px"
    >
      <Flex justify="space-between" align="center">
        <Badge px="2" py="1">
          {note.tag}
        </Badge>
        <Button onClick={() => handlePinChange(note.pinned, note._id)}>
          <Image
            boxSize="20px"
            src={note.pinned ? pinnedImage : unpinnedImage}
          />
        </Button>
      </Flex>
      <Heading
        as="h3"
        textTransform="uppercase"
        fontSize="xl"
        textAlign="center"
      >
        {note.title}
      </Heading>
      <Text mt="2" textAlign="center" minH="80px">
        {note.noteText}
      </Text>
      <Flex mt="3" justify="space-between">
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            notesDispatch({
              type: "SELECT_NOTE",
              payload: { note: { ...note }, editMode: true },
            });
          }}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleDelete(note._id)}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
}
