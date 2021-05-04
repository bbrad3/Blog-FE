import '../styles/ArticleCard.css'
import { Global } from '../contexts/Global'
import { useContext } from 'react'

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
            className={props.type === "card" ?
            "articleCard" : "articleShowCard"}
            onClick={handleRedirect}
        >
            {props.article && <div 
                className={props.type === "card" ?
                "articleContainer" : "articleShowContainer"}>
                <h2>{props.article.title}</h2>
                { props.article.user &&
                    <span className="ownerSpan">Author: {props.article.user.alias}</span>
                }
                <p>{props.article.content}</p>
            </div>}
        </div> 
    )
}

export default ArticleCard