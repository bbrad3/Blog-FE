import '../styles/UserForm.css'
import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

function UserForm(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [inputs, setInputs] = useState({})
    const [redirect, setRedirect] = useState(false)

    const handleResponse = (response) => {
        const status = response.data.status
        const message = response.data.message
        const user = response.data.user
        switch (status) {
            case 200:
                localStorage.setItem('userId', user.id)
                setUser(user)
                setRedirect(true)
                alert(message)
                break;
            case 400:
                alert(message)
                break;
            case 401:
                alert(message)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        switch (props.type) {
            case "signup":
                axios.post(`${process.env.REACT_APP_BACKEND}/users/signup`, inputs)
                    .then(res => {
                        console.log('signup res.data', res);
                        handleResponse(res)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                break;
            case "login":
                axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, inputs)
                    .then(res => {
                        console.log('login res', res);
                        handleResponse(res)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                break;
            case "user edit":
                axios.put(`${process.env.REACT_APP_BACKEND}/users/update`, inputs, {
                    headers: {
                        Authorization: user.id
                    }
                })
                    .then(res => {
                        console.log('update user res', res);
                        handleResponse(res)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                break;
        }
    }

    useEffect(() => { // pre-fill edit form
        if (props.type === "user edit") {
            setInputs({
                name: user.name,
                alias: user.alias,
                email: user.email,
                password: user.password,
            })
        }
    }, [])

    return (
        <form className="userForm" onSubmit={handleSubmit}>

            {redirect && <Redirect to="/" />}

            <h2>
                {props.type && `${props.type}`}
            </h2>

            {props.type === "signup" || props.type === "user edit" ?
                <>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text"
                        value={inputs.name || ''}
                        onChange={(e) => {
                            setInputs({...inputs, name: e.target.value})
                        }}
                    />

                    <label htmlFor="alias">Alias:</label>
                    <input name="alias" type="text"
                        value={inputs.alias || ''}
                        onChange={(e) => {
                            setInputs({...inputs, alias: e.target.value})
                        }}
                    />
                </>
                : null
            }

            <label htmlFor="email">Email:</label>
            <input name="email" type="email"
                value={inputs.email || ''}
                onChange={(e) => {
                    setInputs({...inputs, email: e.target.value})
                }}
            />

            <label htmlFor="password">Password:</label>
            <input name="password" type="password"
                value={inputs.password || ''}
                onChange={(e) => {
                    setInputs({...inputs, password: e.target.value})
                }}
            />

            <input type="submit" />
            
        </form>
    )
}

export default UserForm