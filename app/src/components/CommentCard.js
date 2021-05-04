import '../styles/CommentCard.css'
import CommentForm from './CommentForm'
import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useEffect, useContext } from 'react'

function CommentCard(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const [comments, setComments] = useState([])
    const [isOwner, setIsOwner] = useState([])

    const handleDelete = (e) => {
        const index = e.target.getAttribute('data_index')
        const target = comments[index]
        let arr = [...comments]
        const YN = window.confirm('Are you sure you want to delete this comment?')
        if (YN) {
            axios.delete(`${process.env.REACT_APP_BACKEND}/comments/${target.id}`)
                .then(res => {
                    // console.log('delete comment res', res);
                    const removed = arr.splice(index, 1)
                    console.log(removed, arr);
                    setComments(arr)
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    useEffect(() => {
        // console.log(props.article.comments);
        setComments(props.article.comments)
    }, [])

    // const checkOwner = (id) => { // creating an infinite loop
    //     axios.post(`${process.env.REACT_APP_BACKEND}/users/authorize`, {
    //         commentId: id
    //     }, {
    //         headers: {
    //             Authorization: user.id
    //         }
    //     })
    //         .then(res => {
    //             console.log('checkOwner res', res)
    //             // setIsOwner([res.data.isOwner, ...isOwner])
    //             console.log(res.data.isOwner);
    //             // return res.data.isOwner
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }
    // useEffect(checkOwner, [])

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
                {comments && comments.map((comment, i) => {
                    return (
                        <div key={comment.id}>
                            {/* {checkOwner(comment.id)} */}
                            <p className="commentContent">{comment.content}</p>
                            {/* <span>{comment.tags}</span> */}
                            <span className="commentUser">{comment.user.alias}</span>
                            {/* { isOwner[0] && */}
                            <span className="deleteComment"
                                data_index={i}
                                onClick={handleDelete}
                            >
                                X
                            </span>
                            {/* } */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentCard