import CardTable from "../../components/CardTable/CardTable";
import archidekt from "archidekt";
import axios from "axios";
import { Component } from "react";

const API_URL = "http://localhost:8080/";
archidekt.api;
let decks;
archidekt.searchDecks({ formats: 3 }).then(({ data }) => {
  console.log(data);
});

export default class DeckPage extends Component {
  state = {
    deck: [],
  };

  componentDidMount() {
    axios
      .get(`${API_URL}decks/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ deck: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return;
    // if (this.state.deck.length() === 0) {
    //   return <h1 classname="loading">Loading...</h1>;
    // }
    // return (
    //   <main className="deck">
    //     <h1 className="deck__title">{this.state.deck.deckName}</h1>
    //     <h2 className="deck__commander">
    //       Commander: {this.state.deck.commander}
    //     </h2>
    //     <CardTable editable={false} cardsList={this.state.deck.deckList} />
    //   </main>
    // );
  }
}
