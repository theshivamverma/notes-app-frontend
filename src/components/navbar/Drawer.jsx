import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody
} from "@chakra-ui/react";

import { NoteFilter } from "../notes"

function DrawerMenu({ isOpen, onClose, btnRef }) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        isFullHeight={true}
        preserveScrollBarGap={true}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <NoteFilter onClose={onClose} isMobileVersion={true}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
}

export default DrawerMenu
