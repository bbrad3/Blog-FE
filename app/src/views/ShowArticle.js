import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Global } from '../contexts/Global'
import { useParams } from 'react-router-dom'
import SideBar from '../partials/SideBar'

function ShowArticle() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const { articleId } = useParams()
    const [article, setArticle] = useState({})

    const fetchArticle = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/articles/${articleId}`)
            .then(res => {
                console.log('fetchArticle res', res);
                if (res.data.status === 200) {
                    setArticle(res.data.article)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(fetchArticle, [])

    return (
        <div className="view showArticle">
            <SideBar />
            <div className="main">
                <div className="articleContainer">
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
                <div className="commentContainer">
                    {/* <CommentForm /> */}
                </div>
            </div>
        </div>
    )
}

export default ShowArticle