import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { setupAuthHeaderForServiceCalls } from "./auth-functions"

const AuthContext = createContext()

export function AuthProvider({ children }){

    const { isLoggedIn, token: storedToken } = JSON.parse(localStorage?.getItem("notify_login")) || { isLoggedIn: false, token: null }

    const [login, setLogin] = useState(isLoggedIn)
    const [token, setToken] = useState(storedToken)
    const [user, setUser] = useState(null)

    token && setupAuthHeaderForServiceCalls(token)

    useEffect(() => {
        if(login && token){
            setUserData()
        }
    }, [login, token])

    async function setUserData(){
        try {
            const { status, data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`)
            if(status === 200){
                setUser({...data.user})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <AuthContext.Provider value={{ login, token, setLogin, setToken, setUserData, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)