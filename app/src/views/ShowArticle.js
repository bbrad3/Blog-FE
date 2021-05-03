import '../styles/ShowArticle.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Global } from '../contexts/Global'
import { Redirect, useParams } from 'react-router-dom'
import SideBar from '../partials/SideBar'
import CommentCard from '../components/CommentCard'
import ArticleCard from '../components/ArticleCard'

function ShowArticle() {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [isOwner, setIsOwner] = useState(false)
    const { articleId } = useParams()
    const [article, setArticle] = useState({})
    const [redirect, setRedirect] = useState('')

    const fetchArticle = () => {
        console.log('fetching article...');
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

    const checkOwner = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/users/authorize`, {
            articleId: articleId
        }, {
            headers: {
                Authorization: user.id
            }
        })
            .then(res => {
                console.log('checkOwner res', res)
                setIsOwner(res.data.isOwner)
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(checkOwner, [])

    return (
        <div className="view showArticle">

            {redirect && <Redirect to={`/articles/${articleId}/update`} />}

            <SideBar />
            <div className="main">
                {isOwner && 
                    <span className="spanBtn editBtn"
                        onClick={() => {
                            setRedirect(article.id)
                        }}
                    >
                        Edit Article
                    </span>
                }
                <ArticleCard 
                    article={article}
                    style="show"
                />
                <CommentCard article={article} />
            </div>
        </div>
    )
}

export default ShowArticle