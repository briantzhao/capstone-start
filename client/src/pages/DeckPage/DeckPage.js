import CardTable from "../../components/CardTable/CardTable";
import axios from "axios";
import { Component } from "react";
import "./DeckPage.scss";

const API_URL = "http://localhost:8080/";
export default class DeckPage extends Component {
  state = {
    deck: [],
    commanders: [],
    price: 0,
  };

  componentDidMount() {
    axios
      .get(`${API_URL}decks/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ deck: data });
        let deckCommanders = data.list.filter((card) => {
          const cmd = card.categories.find(
            (category) => category === "Commander"
          );
          // if (cmd) {
          //   return cmd;
          // }
          if (cmd) {
            return card;
          }
        });
        if (deckCommanders) {
          deckCommanders = deckCommanders.map((card) => card.name);
          this.setState({ commanders: deckCommanders });
        }
        return axios.get(`${API_URL}decks/price/${this.props.match.params.id}`);
      })
      .then(({ data }) => {
        if (data) {
          this.setState({ price: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.deck.length === 0) {
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
        <h2 className="deck__price">Price: {this.state.price}</h2>
        <CardTable editable={false} cardsList={this.state.deck.list} />
      </main>
    );
  }
}
