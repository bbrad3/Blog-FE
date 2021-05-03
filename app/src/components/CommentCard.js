import '../styles/CommentCard.css'
import CommentForm from './CommentForm'
import { Global } from '../contexts/Global'
import { useState, useEffect, useContext } from 'react'

function CommentCard(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [comments, setComments] = useState([])

    useEffect(() => {
        // console.log(props.article.comments);
        setComments(props.article.comments)
    }, [props])

    return (
        <div className="commentCard">
            {user.id &&
                <CommentForm
                    article={props.article}
                    comments={comments}
                    setComments={setComments}
                />
            }

            <div className="commentsContainer">
                {/* fill in with comments for current article */}
                {comments && comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p className="commentContent">{comment.content}</p>
                            {/* <span>{comment.tags}</span> */}
                            <span className="commentUser">{comment.user.alias}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentCard