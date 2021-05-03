import '../styles/CommentCard.css'
import CommentForm from './CommentForm'
import { useState, useEffect } from 'react'

function CommentCard(props) {
    const [comments, setComments] = useState([])

    const displayComments = () => {
        console.log(props.article.comments);
        setComments(props.article.comments)
    }
    useEffect(displayComments, [])

    return (
        <div className="commentCard">
            <CommentForm
                article={props.article}
                comments={comments}
                setComments={setComments}
            />

            <div className="commentsContainer">
                {/* fill in with comments for current article */}
                {comments && comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p className="commentContent">{comment.content}</p>
                            <span className="commentUser">{comment.userId}</span>
                            {/* <span>{comment.tags}</span> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentCard