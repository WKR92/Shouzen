import React from 'react'
import './styles/App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPanel from './Components/login-panel';
import Home from './Components/home';
import CreateProduct from './Components/create-product';
import Order from './Components/make-order';
import Cart from './Components/cart'
import Nav from'./Components/nav';
import About from './Components/about';

function App() {
  return (
    <Router basename="/">
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginPanel} />
        <Route path="/create-product" component={CreateProduct} />
        <Route path="/make-order" component={Order} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App; 