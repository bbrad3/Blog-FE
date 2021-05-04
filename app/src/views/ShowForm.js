import '../styles/ShowForm.css'
import { useHistory } from 'react-router-dom'
import UserForm from '../components/UserForm'
import ArticleForm from '../components/ArticleForm'

const userTypes = ["signup", "login", "user edit"]
const articleTypes = ["article new", "article edit"]

function ShowForm(props) {
    const history = useHistory()

    return (
        <div className="view showForm">
            <span className="spanBtn backBtn" onClick={() => history.goBack()}>
                Back
            </span>

            { userTypes.includes(props.type) &&
                <UserForm
                    type={props.type}
                />
            }
            { articleTypes.includes(props.type) &&
                <ArticleForm
                    type={props.type}
                />
            }

        </div>
    )
}

export default ShowForm