import { Flex, Button, Text, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { useNote,addTag } from "../notes";

export default function NoteFilter({onClose , isMobileVersion}) {

  const [addTagMode, setAddTagMode] = useState(false)
  const [tagName, setTagName] = useState("")

  const {
    notesState: { tags, currentSelectedTag },
    notesDispatch,
  } = useNote();

  const toast = useToast()

   function showToast(toastTitle, mode) {
     toast({
       title: toastTitle,
       status: mode,
       duration: 2000,
       isClosable: true,
     });
   }

  async function handleSubmit(){
      const { success } = await addTag(tagName)
      if(success){
          notesDispatch({ type: "ADD_TAG", payload: { tagName } })
          setTagName("")
          setAddTagMode(false)
          showToast("Tag addded", "success")
      }else{
          showToast("Error adding tag", "error")
      }
  }

function handleTagClick(value){
    if(isMobileVersion){
        notesDispatch({ type: "SET_NOTE_FILTER", payload: { tag: value } });
        onClose()
    }else{
        notesDispatch({ type: "SET_NOTE_FILTER", payload: { tag: value } });
    }
}

  return (
    <Flex textTransform="uppercase" direction="column" align="center">
      <Text fontSize="xl" my="4">
        Notify
      </Text>
      <Flex mt="10" direction="column" textTransform="uppercase" align="center">
        <Text mb="4" fontSize="md">
          Filter notes
        </Text>
        <Button
          colorScheme="teal"
          variant={ currentSelectedTag === null ? "solid" : "outlined" }
          width="200px"
          textTransform="uppercase"
          my="3"
          onClick={() => handleTagClick(null)}
        >
          View All
        </Button>
        {tags.map((tag) => {
          return (
            <Button
              width="200px"
              textTransform="uppercase"
              colorScheme="teal"
              variant={currentSelectedTag === tag ? "solid" : "outlined"}
              my="3"
              key={tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          );
        })}
      </Flex>
      <Flex mt="5" direction="column">
        <Button my="3" onClick={() => setAddTagMode(true)} >Add new tag</Button>
        <Flex display={addTagMode ? "flex" : "none"} direction="column">
            <Input value={tagName} mb="3" placeholder="Tag name" onChange={(e) => setTagName(e.target.value)} />
            <Flex justify="space-between">
                <Button onClick={handleSubmit} >Save</Button>
                <Button onClick={() => setAddTagMode(false)}>Cancel</Button>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
