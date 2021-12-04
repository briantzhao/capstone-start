import CardTable from "../../components/CardTable/CardTable";
import axios from "axios";
import { Component } from "react";
import "./DeckPage.scss";
import CardDisplay from "../../components/CardDisplay/CardDisplay";

const API_URL = "http://localhost:8080/";
export default class DeckPage extends Component {
  state = {
    deck: [],
    commanders: [],
    commanderNames: [],
    price: 0,
  };

  //grabs decklist information from deck routes
  //then grabs commander images from cards routes
  //then grabs price information from decks routes
  componentDidMount() {
    axios
      .get(`${API_URL}decks/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ deck: data });
        let deckCommanders = data.list.filter((card) => {
          const cmd = card.categories.find(
            (category) => category === "Commander"
          );
          if (cmd) {
            return card;
          }
        });
        if (deckCommanders) {
          const cmdNames = deckCommanders.map((card) => card.name);
          this.setState({ commanderNames: cmdNames });
        }
        return axios
          .all(
            deckCommanders.map((commander) =>
              axios.get(`${API_URL}cards/id/${commander.uid}`)
            )
          )
          .then(
            axios.spread((...responses) => {
              const commanders = responses.map(
                (response) => response.data.card
              );
              this.setState({ commanders }, () => {
                console.log(this.state.commanders);
              });
              return axios.get(
                `${API_URL}decks/price/${this.props.match.params.id}`
              );
            })
          );
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

  //onClick for Back to Top button
  handleTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    if (this.state.deck.length === 0) {
      return <h1 classname="loading">Loading...</h1>;
    }
    return (
      <main className="deck">
        <h1 className="deck__title">{this.state.deck.name}</h1>
        <section className="deck__main">
          <article className="deck__header">
            <h2 className="deck__commander">
              Commanders:{" "}
              {this.state.deck.commanderNames === []
                ? "None"
                : this.state.commanderNames.join(" / ")}
            </h2>
            <div className="deck__commander__images">
              {this.state.commanders.map((commander) => {
                return <CardDisplay card={commander} />;
              })}
            </div>
            <h2 className="deck__price">Deck Price: {this.state.price}</h2>
          </article>
          <article className="deck__list">
            <CardTable editable={false} cardsList={this.state.deck.list} />
          </article>
        </section>
        <button className="deck__btn--top" onClick={this.handleTop}>
          Back to Top
        </button>
      </main>
    );
  }
}
