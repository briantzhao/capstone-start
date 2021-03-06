import axios from "axios";
import { Component } from "react";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import "./CardPage.scss";

const API_URL = "http://localhost:8080/";
//array that holds articles and prepositions that should not be capitalized when searching for a card name
const nonUP = [
  "a",
  "an",
  "the",
  "for",
  "and",
  "nor",
  "or",
  "but",
  "so",
  "at",
  "by",
  "of",
  "on",
  "to",
];

export default class CardPage extends Component {
  state = {
    card: null,
    decks: null,
  };

  //queries cards route to get card image
  //queries decks route to get decks that include this card in their list
  //renders decks as a list of links
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(`${API_URL}cards/id/${this.props.match.params.uid}`)
      .then(({ data }) => {
        const cardData = data.card;
        this.setState({ card: cardData });
        let cardName = cardData.name.replace(/\//g, "%2F").split(" ");
        cardName = cardName.map((word) => {
          if (nonUP.find((el) => el === word)) {
            return word;
          }
          return (
            word.slice(0, 1).toUpperCase() +
            word.slice(1, word.length).toLowerCase()
          );
        });
        cardName = cardName.join("_");
        return axios.get(`${API_URL}decks/card/${cardName}`);
      })
      .then(({ data }) => {
        if (data.length === 0) {
          this.setState({ decks: "None" });
          return;
        }
        this.setState({ decks: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.decks);
    if (!(this.state.card && this.state.decks)) {
      return <h1 className="loading">Loading...</h1>;
    }
    return (
      <main className="card-page">
        <h1 className="card-page__title">{this.state.card.name}</h1>
        <section className="card-page__details">
          <article className="card-page__picture">
            <CardDisplay card={this.state.card} />
          </article>
          <article className="card-page__text">
            <div className="card-page__prices">
              <h2 className="card-page__subtitle">Prices</h2>
              <p className="card-page__price">
                Non-Foil:
                {this.state.card.prices.usd
                  ? ` $${this.state.card.prices.usd}`
                  : " Unavailable"}
              </p>
              <p className="card-page__price">
                Foil:
                {this.state.card.prices.usdFoil
                  ? ` $${this.state.card.prices.usdFoil}`
                  : " Unavailable"}
              </p>
              {this.state.card.tcgplayerID && (
                <a
                  href={`https://www.tcgplayer.com/product/${this.state.card.tcgplayerID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="card-page__btn--tcgplayer">
                    Check on TCGplayer
                  </button>
                </a>
              )}
            </div>
            <div className="card-page__decks">
              <h2 className="card-page__subtitle">
                Decks Using {this.state.card.name}
              </h2>
              {this.state.card.edhrec && (
                <a
                  href={`${this.state.card.edhrec}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="card-page__btn--edhrec">
                    Check on EDHRec
                  </button>
                </a>
              )}
              <ul className="card-page__decklists">
                {this.state.decks === "None" ? (
                  <h3 className="card-page__no-decks">None</h3>
                ) : (
                  this.state.decks.map((deck) => {
                    return (
                      <li className="card-page__deck">
                        {" "}
                        <Link to={`/collection/decks/${deck.id}`}>
                          <div className="card-page__deck__link">
                            {deck.name}
                          </div>
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </article>
        </section>
      </main>
    );
  }
}
