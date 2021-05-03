import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

function Account() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [redirect, setRedirect] = useState(false)

    const handleDelete = () => {
        const check = window.confirm('Are you sure you want to delete this account?')
        if (check) {
            axios.delete(`${process.env.REACT_APP_BACKEND}/users/delete`, {
                headers: {
                    Authorization: user.id
                }
            })
                .then(res => {
                    console.log('delete user res', res);
                    if (res.data.status === 200) {
                        localStorage.removeItem('userId')
                        setUser({})
                        setRedirect(true)
                        alert('Account deleted')
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            alert('Your account is safe')
        }
    } 

    return (
        <div className="view account">

            {redirect && <Redirect to="/" />}

            <div className="userContainer">
                <p>{user.name}</p>
                <p>{user.alias}</p>
                <p>{user.email}</p>
                {/* be able to hide password */}
                <p>{user.password}</p>
                <Link to="/account/edit">Edit User</Link>
                <span className="spanBtn deleteBtn" onClick={handleDelete}>
                    Delete User
                </span>
            </div>
        </div>
    )
}

export default Account