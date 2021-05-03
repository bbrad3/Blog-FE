import '../styles/SideBar.css'
import { Link } from 'react-router-dom'

function SideBar() {
    return (
        <div className="sideBar">
            <Link to="/articles/new">Create Article</Link>
            SideBar
        </div>
    )
}

export default SideBar