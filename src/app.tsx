import { useEffect, useCallback } from 'react';
import './styles/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPanel from './Components/login-panel';
import Home from './Components/home';
import Cart from './Components/cart'
import Nav from'./Components/nav';
import About from './Components/about';
import Footer from './Components/footer';
import fire from './utils/fire';
import { getLoggedUser } from './store/userActions';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  const authListener = useCallback(() => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(getLoggedUser(user))
            localStorage.setItem('user', JSON.stringify(user));    
        } else {
          dispatch(getLoggedUser(null))
        }
    })
}, [dispatch])

useEffect(() => {
    authListener();
}, [authListener])

  return (
    <Router basename="/">
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginPanel} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App; 