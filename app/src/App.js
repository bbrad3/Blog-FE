import './App.css';
import { Global } from './contexts/Global'
import { useEffect, useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import NavBar from './partials/NavBar'
import Home from './views/Home'
import Account from './views/Account'
import Articles from './views/Articles'
import ShowArticle from './views/ShowArticle'
import ShowForm from './views/ShowForm'

function App() {
  const { userState, fetchUser } = useContext(Global)
  const [user, setUser] = userState

  let local = localStorage.getItem('userId')
  useEffect(() => {
    if (local) {fetchUser()}
  }, [])

  return (
    <div className="App">
      <NavBar />

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <ShowForm type="login" />
      </Route>

      <Route exact path="/signup">
        <ShowForm type="signup" />
      </Route>

      <Route exact path="/account">
        {user.id ?
          <Account />
        :
          <Redirect to="/login" />
        }
      </Route>

      <Route exact path="/account/edit">
        <ShowForm type="user edit" />
      </Route>

      <Route path="/articles/new">
        {user.id ?
          <ShowForm type="article new" />
        :
          <Redirect to="/login" />
        }
      </Route>

      <Route exact path="/articles">
        <Articles />
      </Route>

      <Route exact path="/articles/:articleId/update">
        {user.id ?
          <ShowForm
            type="article edit"
          />
        :
          <Redirect to="/login" />
        }
      </Route>

      <Route exact path="/articles/:articleId">
        <ShowArticle />
      </Route>

    </div>
  );
}

export default App;
