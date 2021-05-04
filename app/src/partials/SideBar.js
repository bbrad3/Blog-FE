import '../styles/SideBar.css'
import axios from 'axios'
import { Global } from '../contexts/Global'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [topUsers, setTopUsers] = useState([])

    const fetchUsers = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/top`)
            .then(res => {
                console.log('top users res', res)
                setTopUsers(res.data.users)
            })
            .catch(error => {
                console.error(error)
            })
    }
    useEffect(fetchUsers ,[])

    return (
        <div className="sideBar">
            {user.id && <Link to="/articles/new">Create Article</Link>}

            <div className="topUsers">
                {/* find all users and show top 3 by #posts+comments */}
                <h3>Top Users</h3>
                {topUsers && topUsers.map((user, i) => {
                    return (
                        <div key={i} className="topUser">
                            {user.alias}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SideBar