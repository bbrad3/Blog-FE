import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

function UserForm(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [inputs, setInputs] = useState({})
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (e) => { // come back to this
        e.preventDefault()
        if (props.type === "signup") {
            axios.post(`${process.env.REACT_APP_BACKEND}/users/signup`, inputs)
                .then(res => {
                    console.log('signup res.data', res);
                    if (res.data.status === 200) {
                        let user = res.data.user
                        localStorage.setItem('userId', user.id)
                        setUser(user)
                        setRedirect(true)
                        alert(`Welcome ${user.name}!`)
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (props.type === "login") {
            axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, inputs)
                .then(res => {
                    console.log('login res.data', res.data);
                    let user = res.data.user
                    switch (res.data.status) {
                        case 200:
                            localStorage.setItem('userId', user.id)
                            setUser(user)
                            setRedirect(true)
                            alert(`Welcome back ${user.name}!`)
                            break;
                        case 400:
                            alert('Request error')
                            break;
                        case 401:
                            alert('Incorrect email or password')
                        default:
                            console.log('Undefined login error');
                            break;
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    return (
        <form className="userForm" onSubmit={handleSubmit}>

            {redirect && <Redirect to="/" />}

            <h2>
                {props.type && `${props.type}`}
            </h2>

            {props.type === "signup" || props.type === "edit" ?
                <>
                <label htmlFor="name">Name:</label>
                <input name="name" type="text"
                    value={inputs.name}
                    onChange={(e) => {
                        setInputs({...inputs, name: e.target.value})
                    }}
                />

                <label htmlFor="alias">Alias:</label>
                <input name="alias" type="text"
                    value={inputs.alias}
                    onChange={(e) => {
                        setInputs({...inputs, alias: e.target.value})
                    }}
                />
                </>
                : null
            }

            <label htmlFor="email">Email:</label>
            <input name="email" type="email"
                value={inputs.email}
                onChange={(e) => {
                    setInputs({...inputs, email: e.target.value})
                }}
            />

            <label htmlFor="password">Password:</label>
            <input name="password" type="password"
                value={inputs.password}
                onChange={(e) => {
                    setInputs({...inputs, password: e.target.value})
                }}
            />

            <input type="submit" />
        </form>
    )
}

export default UserForm