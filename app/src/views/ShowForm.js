import UserForm from '../comoponents/UserForm'
// import ArticleForm from '../comoponents/ArticleForm'
// import CommentForm from '../comoponents/CommentForm'

const types = ["signup", "login"]

function ShowForm(props) {
    return (
        <div className="view showForm">
            { types.includes(props.type) &&
                <UserForm
                    type={props.type}
                />
            }
        </div>
    )
}

export default ShowForm