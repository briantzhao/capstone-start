import axios from "axios";
import { Link } from "react-router-dom";
import CardTable from "../../components/CardTable/CardTable";
import { Component } from "react";
import "./CollectionPage.scss";

const API_URL = "http://localhost:8080/";

export default class CollectionPage extends Component {
  state = {
    collection: null,
    userid: null,
  };

  componentDidMount() {
    const currUser = this.props.match.params.userid;
    this.setState({ userid: currUser }, () => {
      this.updateColl(currUser);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevColl = prevState.collection;
    const currColl = this.state.collection;
    if (prevColl !== currColl) {
      this.updateColl(this.state.userid);
    }
  }

  updateColl = (userid) => {
    axios
      .get(`${API_URL}collections/${userid}`)
      .then(({ data }) => {
        this.setState({ collection: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.state.collection === null) {
      return <h1 className="loading">Loading...</h1>;
    }
    return (
      <main className="collection">
        <h1 className="collection__title">Your Collection</h1>
        <Link to={`/add/${this.state.userid}`}>
          <button className="collection__btn--add">Add a Card</button>
        </Link>
        <CardTable
          editable={true}
          cardsList={this.state.collection}
          getItem={this.getItem}
          userid={this.state.userid}
        />
      </main>
    );
  }
}
