import '../styles/Home.css'
import SideBar from '../partials/SideBar'

function Home() {
    return (
        <div className="view home">
            <SideBar />
            <main>
                <h1>Welcome to a Blog!</h1>
                <h3>Create, share, comment, and connect!</h3>
                <p>Photo by <a href="https://unsplash.com/@impatrickt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Patrick Tomasso</a> on <a href="https://unsplash.com/s/photos/blog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </p>
            </main>
        </div>
    )
}

export default Home