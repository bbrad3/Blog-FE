import burger from '../styles/burger.png'
import '../styles/NavBar.css'
import { Global } from '../contexts/Global'
import { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'


function NavBar() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [redirect, setRedirect] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({})
        setRedirect(true)
        alert(`You are logged out ${user.name}.`)
    }

    return (
        <nav className="navBar">

            {redirect && <Redirect to="/" />}

            <Link to="/">Brand</Link>

            <span className="navDropDown">
                <span className="navBurger"><img alt="Burger button" src={burger}></img>
                </span>
                <span className="dropDownContent">
                    <Link to="/articles">Articles</Link>
                    {user.id ?
                    <>
                        <Link to="/account">Account</Link>
                        <span onClick={handleLogout}>Logout</span>
                    </>
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                    }
                </span>
            </span>
        </nav>
    )
}

export default NavBar