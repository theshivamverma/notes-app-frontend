import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { notesReducer } from "../notes";

const NoteContext = createContext();

const initialState = {
  notes: [],
  tags: [],
  currentSelectedTag: null,
  selectedNote: {},
  editMode: false
};

export function NoteProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    loadData()
  },[])

  async function loadData() {
   try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        const userNotes = [...data.user.notes];
        const UserTags = [...data.user.tags];
        dispatch({
          type: "LOAD_DATA",
          payload: { notes: userNotes, tags: UserTags },
        });
      }
   } catch (error) {
     console.log(error)
   }
  }

  return (
    <NoteContext.Provider value={{ notesState: state, loadData, notesDispatch: dispatch }}>
        {children}
    </NoteContext.Provider>
  )
}

export const useNote = () => useContext(NoteContext);
