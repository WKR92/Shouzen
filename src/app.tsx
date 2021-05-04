import React from 'react'
import './styles/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPanel from './Components/login-panel';
import Home from './Components/home';
import Cart from './Components/cart'
import Nav from'./Components/nav';
import About from './Components/about';
import Footer from './Components/footer';

function App() {
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