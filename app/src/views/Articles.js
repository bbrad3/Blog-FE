import '../styles/Articles.css'
import '../styles/ArticleCard.css'
import axios from 'axios'
import { Global } from '../contexts/Global'
import { useContext, useState, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import SideBar from '../partials/SideBar'

function Articles() {
    const { userState } = useContext(Global)
    const location = useLocation()
    const [user, setUser] = userState
    const [articles, setArticles] = useState([])
    const [redirect, setRedirect] = useState('')
    
    const fetchArticles = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/articles/all`)
            .then(res => {
                console.log('fetchArticles res', res);
                if (res.data.status === 200) {
                    setArticles(res.data.articles)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(fetchArticles, [location])
 
    return (
        <div className="view articles">

            {redirect && <Redirect to={`/articles/${redirect}`} />}

            <SideBar />
            <div className="articlesContainer">
                {articles.map(article => {
                    return (
                        <ArticleCard
                            key={article.id}
                            type="card"
                            article={article}
                            setRedirect={setRedirect}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Articles