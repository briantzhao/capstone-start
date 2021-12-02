import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import DeckPage from "./pages/DeckPage/DeckPage";
import Form from "./components/Form/Form";
import { Component } from "react";
import SignupPage from "./pages/SignupPage/SignupPage";
import CardPage from "./pages/CardPage/CardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import axios from "axios";

const API_URL = "http://localhost:8080/";

class App extends Component {
  state = {
    loggedIn: false,
    user: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .get(`${API_URL}users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        this.setState({ user: data, loggedIn: true });
      })
      .catch(() => {
        this.setState({ user: null, loggedIn: false });
      });
  }

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({ loggedIn: false, user: null });
  };

  handleLogin = (data) => {
    sessionStorage.setItem("token", data.token);
    this.setState({ loggedIn: true, user: data.user });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <HomePage {...props} user={this.state.user} />}
            />
            <Route path="/collection/:userid" component={CollectionPage} />
            <Route path="/decks" exact component={DeckPage} />
            <Route path="/decks/:id" component={DeckPage} />
            <Route path="/add/:userid" component={Form} />
            <Route path="/edit/:userid/:uid" component={Form} />
            <Route
              path="/login"
              render={(props) => (
                <LoginPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <SignupPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginPage {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route path="/card/:uid" component={CardPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
