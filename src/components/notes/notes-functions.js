import axios from "axios"

export async function createNewNote(noteData){
    try {
        const { status, data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/note/create`, {
            noteData
        })
        if(status === 200){
            return { success: true, noteId: data.noteId }
        }else{
            return { success: false, noteId: null }
        }
    } catch (error) {
        console.log(error)
        return { success: false, noteId: null }
    }
}

export async function deleteNote(noteId){
    try {
        const { status } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/note/delete`, {
            noteId
        })
        if(status === 200){
            return { success: true }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function pinNote(noteId){
    try {
        const { status } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/note/${noteId}/pin`)
        if(status === 200){
            return { success: true }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function unpinNote(noteId){
    try {
        const { status } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/note/${noteId}/unpin`)
        if(status === 200){
            return { success: true }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function addTag(tagName){
    try {
        const { status } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/add-tag`, {
            tagName
        })
        if(status === 200){
            return { success: true }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function removeTag(tagName){
    try {
        const { status } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/remove-tag`, {
            tagName
        })
        if(status === 200){
            return { success: true }
        }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function updateNote(noteUpdate, noteId){
    try {
        const { status, data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/note/${noteId}/update`, {
            noteUpdate
        })
        if(status === 200){
            return { success: true, updatedNote: data.note }
        }
    } catch (error) {
        console.log(error)
    }
}
