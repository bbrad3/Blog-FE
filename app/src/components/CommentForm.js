import '../styles/CommentForm.css'
import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useContext } from 'react'

function CommentForm(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [commentInput, setCommentInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handling comment form submit...');
        axios.post(`${process.env.REACT_APP_BACKEND}/comments/new`, {
            content: commentInput,
            articleId: props.article.id
        }, {
            headers: {
                Authorization: user.id
            }
        })
            .then(res => {
                console.log('new comment res', res);
                setCommentInput('')
                props.setComments([res.data.comment, ...props.comments])
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <form className="commentForm" onSubmit={handleSubmit}>
            <input name="content"
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
            />

            <input type="submit" />

        </form>
    )
}

export default CommentForm