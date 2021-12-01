import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import DeckPage from "./pages/DeckPage/DeckPage";
import Form from "./components/Form/Form";
import { Component } from "react";

class App extends Component {
  state = {
    loggedIn: false,
  };

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({ loggedIn: false });
  };

  handleLogin = () => {};

  render() {
    return (
      <div className="App">
        <Router>
          <Header
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/collection" component={CollectionPage} />
            <Route path="/decks" component={DeckPage} />
            <Route path="/decks/:id" component={DeckPage} />
            <Route path="/add" component={Form} />
            <Route path="/edit/:id" component={Form} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
