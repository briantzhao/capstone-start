import CardTable from "../../components/CardTable/CardTable";
import axios from "axios";
import { Component } from "react";
import "./DeckPage.scss";

const API_URL = "http://localhost:8080/";
export default class DeckPage extends Component {
  state = {
    deck: [],
    commanders: [],
  };

  componentDidMount() {
    axios
      .get(`${API_URL}decks/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ deck: data });
        const deckCommanders = data.filter((card) => {
          const cmd = card.categories.find(
            (category) => category === "Commander"
          );
          if (cmd) {
            return cmd;
          }
        });
        if (deckCommanders) {
          this.setState({ commanders: deckCommanders });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.deck.length() === 0) {
      return <h1 classname="loading">Loading...</h1>;
    }
    return (
      <main className="deck">
        <h1 className="deck__title">{this.state.deck.name}</h1>
        <h2 className="deck__commander">
          Commanders:{" "}
          {this.state.deck.commanders === []
            ? "None"
            : this.state.commanders.join("/")}
        </h2>
        <CardTable editable={false} cardsList={this.state.deck.list} />
      </main>
    );
  }
}
