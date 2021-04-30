function ArticleCard(props) {

    const handleRedirect = () => {
        props.setRedirect(props.article.id)
    }

    return (
        <div
            className="articleCard"
            onClick={handleRedirect}
        >
            <h3>{props.article.title}</h3>
            <p>{props.article.content}</p>
        </div> 
    )
}

export default ArticleCard