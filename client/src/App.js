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
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

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
    alert("Thank you for using Sylvan Library. See you next time!");
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
          <main className="App__main">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomePage {...props} user={this.state.user} />
                )}
              />

              <PrivateRoute
                path="/collection/:userid"
                component={CollectionPage}
              />
              <PrivateRoute path="/decks/:id" component={DeckPage} />
              <PrivateRoute path="/add/:userid" component={Form} />
              <PrivateRoute path="/edit/:userid/:uid" component={Form} />
              <PrivateRoute path="/card/:uid" component={CardPage} />
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
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
