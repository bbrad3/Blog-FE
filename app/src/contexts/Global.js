import axios from 'axios'
import { useState, useEffect, createContext } from 'react'

const Global = createContext()

const Provider = ({children}) => {
    // define values
    const userId = localStorage.getItem('userId')
    
    const [user, setUser] = useState({})
    const fetchUser = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/verify`, {
            headers: {
                Authorization: userId
            }
        })
            .then(res => {
                console.log('fetchUser res', res)
                if (res.data.user) {
                    // console.log('user verified', res.data.user);
                    setUser(res.data.user)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    // create store
    const store = {
        userState: [user, setUser],
        fetchUser,
    }

    // return the context with the store value
    return (
        <Global.Provider value={store}>
            {children}
        </Global.Provider>
    )
}

export { Global, Provider }