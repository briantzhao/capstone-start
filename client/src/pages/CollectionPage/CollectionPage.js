import axios from "axios";
import { Link } from "react-router-dom";
import CardTable from "../../components/CardTable/CardTable";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const API_URL = "http://localhost:8080/";

export default class CollectionPage extends Component {
  state = {
    collection: [],
    modalOpen: false,
    currentCard: "",
  };

  componentDidMount() {
    axios
      .get(`${API_URL}collections/`)
      .then(({ data }) => {
        this.setState({ collection: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  hideModal = () => {
    return this.setState({ modalOpen: false });
  };

  deleteItem = () => {
    axios
      .delete(`${API_URL}collections/${this.state.currentCard.id}`)
      .then(() => {
        return axios.get(`${API_URL}collections`);
      })
      .then(({ data }) => {
        this.setState({ collection: data });
      })
      .catch((err) => console.log(err));
  };

  getItem = (id) => {
    const foundCard = this.state.collection.find((card) => card.id === id);
    this.setState({ modalOpen: true, currentCard: foundCard });
  };
  render() {
    if (this.state.collection.length() === 0) {
      return <h1 className="loading">Loading...</h1>;
    }
    return (
      <main className="collection">
        <DeleteModal
          currentCard={this.state.currentCard.cardName}
          modalState={this.state.modalOpen}
          deleteItem={this.deleteItem}
          hideModal={this.hideModal}
        />
        <h1 className="collection__title">Your Collection</h1>
        <Link to="/add">
          <button className="collection__btn--add">Add a Card</button>
        </Link>
        <CardTable
          editable={true}
          collection={this.state.collection}
          getItem={this.getItem}
        />
      </main>
    );
  }
}
