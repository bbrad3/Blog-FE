import '../styles/ArticleCard.css'
import { Global } from '../contexts/Global'
import { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

function ArticleCard(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState

    const handleRedirect = () => {
        if (props.setRedirect) {
            props.setRedirect(props.article.id)
        }
    }

    return (
        <div
            className={props.style === "card" ?
            "articleCard" : "articleShowCard"}
            onClick={handleRedirect}
        >
            <div 
                className={props.style === "card" ?
                "articleContainer" : "articleShowContainer"}>
                <h2>{props.article.title}</h2>
                <p>{props.article.content}</p>
            </div>
        </div> 
    )
}

export default ArticleCard