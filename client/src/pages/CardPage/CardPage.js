import { Component } from "react";

const API_URL = "http://localhost:8080/";

export default class CardPage extends Component {
  state = {
    card: null,
  };

  componentDidMount() {
    axios
      .get(`${API_URL}cards/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ card: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.card) {
      return <h1 className="loading">Loading...</h1>;
    }
    return (
      <main classname="card-page">
        <Price card={this.state.card} />
        <Decks card={this.state.card} />
      </main>
    );
  }
}
