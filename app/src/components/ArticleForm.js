import axios from 'axios'
import { Global } from '../contexts/Global'
import { useState, useEffect, useContext } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'

function ArticleForm(props) {
    const { userState } = useContext(Global)
    const [user, setUser] = userState
    const { articleId } = useParams()
    const [inputs, setInputs] = useState({})
    const [redirect, setRedirect] = useState('')
    const [deleted, setDeleted] = useState(false)
    const history = useHistory()

    const handleResponse = (response) => {
        const status = response.data.status
        const message = response.data.message
        const article = response.data.article
        switch (status) {
            case 200:
                if (message === 'article updated') {
                    setRedirect(article.id)
                } else {
                    setRedirect(article.dataValues.id) // update new article in controllers to only res with dataValues
                }
                alert(message)
                break;
            case 400:
                alert(message)
                break;
            case 401:
                alert(message)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        switch (props.type) {
            case "article new":
                axios.post(`${process.env.REACT_APP_BACKEND}/articles/new`, inputs, {
                    headers: {
                        Authorization: user.id
                    }
                })
                    .then(res => {
                        console.log('new article res', res);
                        handleResponse(res)
                        setRedirect(res.data.id)
                    })
                    .catch(error => {
                        console.error(error);
                    })
                break;
            case "article edit":
                axios.put(`${process.env.REACT_APP_BACKEND}/articles/${articleId}`, inputs, {
                    headers: {
                        Authorization: user.id
                    }
                })
                    .then(res => {
                        console.log('edit article res', res);
                        handleResponse(res)
                        setRedirect('')
                    })
                    .catch(error => {
                        console.error(error);
                    })
                break;
            default:
                break;
        }
    }

    const handleDelete = () => {
        const YN = window.confirm('Are you sure you want to delete this article?')
        if (YN) {
            axios.delete(`${process.env.REACT_APP_BACKEND}/articles/${articleId}`, {
                headers: {
                    Authorization: user.id
                }
            })
                .then(res => {
                    console.log('delete article res', res);
                    // handleResponse(res)
                    // setRedirect('')
                    history.push('/articles')
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    useEffect(() => {
        let mounted = true
        if (props.type === "article edit") {
            // fetch article using params
            console.log('fetching article...');
            axios.get(`${process.env.REACT_APP_BACKEND}/articles/${articleId}`)
                .then(res => {
                    console.log('fetchArticle res', res);
                    if (res.data.status === 200 && mounted) {
                        setInputs({
                            title: res.data.article.title,
                            content: res.data.article.content
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }

        return () => {
            mounted = false
        }
    }, [props.type, articleId])

    return (
        <form className="articleForm" onSubmit={handleSubmit}>

            {redirect && <Redirect to={`/articles/${redirect}`} />}

            <h2>
                {props.type}
            </h2>

            {props.type === "article edit" &&
                <span className="spanBtn"
                    onClick={handleDelete}
                >
                    Delete Article
                </span>
            }

            <>
                <label htmlFor="title">Title:</label>
                <input name="title" type="text"
                    value={inputs.title}
                    onChange={(e) => {
                        setInputs({...inputs, title: e.target.value})
                    }}
                />

                <label htmlFor="content">Content:</label>
                <textarea name="content"
                    value={inputs.content}
                    onChange={(e) => {
                        setInputs({...inputs, content: e.target.value})
                    }}
                />
            </>

            <input type="submit" />

        </form>
    )
}

export default ArticleForm