import '../styles/SideBar.css'
import { Global } from '../contexts/Global'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState

    return (
        <div className="sideBar">
            {user.id && <Link to="/articles/new">Create Article</Link>}
        </div>
    )
}

export default SideBar