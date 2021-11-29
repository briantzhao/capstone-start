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

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/collection" component={CollectionPage} />
          <Route path="/decks" component={DeckPage} />
          <Route path="/add" component={Form} />
          <Route path="/edit/:id" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
