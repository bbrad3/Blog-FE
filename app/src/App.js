import './App.css';
import { Route } from 'react-router-dom'

import NavBar from './partials/NavBar'
import Home from './views/Home'
import Articles from './views/Articles'
import ShowArticle from './views/ShowArticle'
import ShowForm from './views/ShowForm'

function App() {
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

      <Route exact path="/articles">
        <Articles />
      </Route>

      <Route exact path="/articles/:articleId">
        <ShowArticle />
      </Route>
    </div>
  );
}

export default App;
