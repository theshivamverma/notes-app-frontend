export default function notesReducer(state, action){
    console.log(action)
    switch (action.type) {
      case "LOAD_DATA":
        return {
          ...state,
          notes: action.payload.notes,
          tags: action.payload.tags,
        };
      case "CREATE_NEW_NOTE":
        return {
          ...state,
          notes: state.notes.concat({ ...action.payload.noteData }),
        };
      case "DELETE_NOTE":
        return {
          ...state,
          notes: state.notes.filter(note => note._id !== action.payload.noteId),
        }
      case "PIN_NOTE":
        return {
          ...state,
          notes: state.notes.map(note => {
            if(note._id === action.payload.noteId){
              return {...note, pinned: true}
            } else return note
          })
        };
      case "UNPIN_NOTE":
        return {
          ...state,
          notes: state.notes.map((note) => {
            if (note._id === action.payload.noteId) {
              return { ...note, pinned: false };
            }
            else return note;
          }),
        };
      case "SELECT_NOTE":
        return {
          ...state,
          selectedNote: { ...action.payload.note },
          editMode: action.payload.editMode
        }
      case "DESELECT_NOTE":
        return {
          ...state,
          selectedNote: null,
          editMode: false
        }
      case "UPDATE_NOTE":
        return {
          ...state,
          notes: state.notes.map(note => {
            if(note._id === action.payload.noteId){
              return {...action.payload.updatedNote}
            }
            return note
          })
        }
      case "SET_NOTE_FILTER": {
        return {
          ...state,
          currentSelectedTag: action.payload.tag
        };
      }
      case "ADD_TAG": {
        return {
          ...state,
          tags: state.tags.concat(action.payload.tagName)
        }
      }
      default:
        return state;
    }
}

