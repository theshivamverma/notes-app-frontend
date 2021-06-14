import {
  Flex,
  Input,
  Textarea,
  Select,
  Box,
  useColorModeValue,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useNote, createNewNote, updateNote } from "../notes";

import pinnedImage from "../../images/pinned.png";
import unpinnedImage from "../../images/unpinned.png";

export default function NoteCreate() {
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

  const {
    notesState: { tags, selectedNote, editMode },
    notesDispatch,
  } = useNote();

  const inputEl = useRef(null);

  if(editMode){
      inputEl.current.focus()
  }

  const [noteId, setNoteId] = useState("")
  const [createNoteMode, setCreateNoteMode] = useState(false);
  const [selectedNoteColor, setSelectedNoteColor] = useState(null);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [tag, setTag] = useState("");
  const [pinnedStatus, setPinnedStatus] = useState(false);

  useEffect(() => {
    let {
      _id: noteId,
      title: initialTitle,
      noteText: initialNoteText,
      tag: initialTag,
      bgColor: initialBgColor,
      pinned: initialPinned,
      createNoteMode: initialCreateNoteMode,
      selectedNoteColor: initialSelectedNoteColor,
    } = editMode
      ? {
          ...selectedNote,
          createNoteMode: true,
          selectedNoteColor: selectedNote.bgColor,
        }
      : {
          _id: null,
          title: "",
          noteText: "",
          bgColor: "",
          tag: "",
          pinned: false,
          createNoteMode: false,
          selectedNoteColor: null,
        };

    setNoteId(noteId)
    setCreateNoteMode(initialCreateNoteMode)
    setSelectedNoteColor(initialSelectedNoteColor)
    setTitle(initialTitle)
    setNoteText(initialNoteText)
    setBgColor(initialBgColor)
    setTag(initialTag)
    setPinnedStatus(initialPinned)

  },[editMode, selectedNote])

  const toast = useToast();

  function handleSelectChange(e) {
    setTag(e.target.value);
  }

  function showToast(toastTitle, mode){
    toast({
      title: toastTitle,
      status: mode,
      duration: 2000,
      isClosable: true,
    });
  }

  async function handleSubmit() {
    const noteData = {
      title,
      noteText,
      bgColor,
      tag,
      pinned: pinnedStatus,
    };
    if(editMode){
        const { success, updatedNote } = await updateNote(noteData, noteId)
        if(success){
            restoreDefaults();
            notesDispatch({ type: "UPDATE_NOTE", payload: { updatedNote, noteId } })
            notesDispatch({ type: "DESELECT_NOTE" });
            showToast("Note updated", "success")
        }else{
            showToast("Error updating note!", "error")
        }
    }else{
         const { success, noteId } = await createNewNote(noteData);
         if (success) {
           restoreDefaults();
           notesDispatch({
             type: "CREATE_NEW_NOTE",
             payload: { noteData: { _id: noteId, ...noteData } },
           });
           if (pinnedStatus) {
             notesDispatch({ type: "PIN_DATA", payload: { noteId } });
           }
           showToast("Note created", "success");
         } else {
           showToast("Error creating note!", "error");
         }
    }
  }

  function restoreDefaults() {
    setCreateNoteMode(false);
    setTitle("");
    setSelectedNoteColor(null);
    setNoteText("");
    setTag("");
    setPinnedStatus(false);
    setBgColor("");
  }

  function handleClose(){
      if(editMode){
          notesDispatch({ type: "DESELECT_NOTE" })
      }
      restoreDefaults();
  }

  return (
    <Flex w="100%" justify="center">
      <Flex
        w={{ base: "100%", xl: "80%" }}
        direction="column"
        p="3"
        borderWidth="2px"
        borderRadius="md"
        borderColor="gray.400"
        bg={colors[selectedNoteColor]}
      >
        <Flex w="100%" justify="space-between">
          <Input
            ref={inputEl}
            w={createNoteMode ? "80%" : "100%"}
            bg={"initial"}
            placeholder={createNoteMode ? `Title` : `Take a note...`}
            onFocus={() => setCreateNoteMode(true)}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Button
            display={createNoteMode ? `initial` : `none`}
            onClick={() => setPinnedStatus(!pinnedStatus)}
          >
            <Image
              boxSize="30px"
              src={pinnedStatus ? pinnedImage : unpinnedImage}
              objectFit="cover"
            />
          </Button>
        </Flex>
        <Textarea
          display={createNoteMode ? `initial` : `none`}
          resize="none"
          my="3"
          placeholder="Text"
          size="sm"
          onChange={(e) => setNoteText(e.target.value)}
          value={noteText}
        />
        <Flex
          display={createNoteMode ? `flex` : `none`}
          justify="space-between"
          align={{ base: "initial", xl: "center" }}
          direction={{ base: "column", xl: "row" }}
        >
          <Select
            placeholder="Select tag"
            w={{ base: "100%", xl: "150px" }}
            onChange={handleSelectChange}
            mb={3}
          >
            {tags.map((tagName) => {
              return (
                <option
                  selected={tag === tagName ? true : false}
                  key={tagName}
                  value={tagName}
                >
                  {tagName}
                </option>
              );
            })}
          </Select>
          <Flex
            bg="lightgrey"
            w={{ base: "100%", xl: "220px" }}
            p="2"
            align="center"
            justify="space-between"
            borderWidth="2px"
            borderColor="gray.400"
            borderRadius="md"
            mb={3}
          >
            {colors.map((color, index) => {
              return (
                <Box
                  key={index}
                  w="25px"
                  h="25px"
                  bg={color}
                  borderWidth="sm"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedNoteColor(index);
                    setBgColor(index);
                  }}
                ></Box>
              );
            })}
          </Flex>
          <Button mb={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button mb={3} onClick={handleClose}>
            Close
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
