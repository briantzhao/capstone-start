import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../Input/Input";

const API_URL = "http://localhost:8080/";

export default class Form extends Component {
  state = {
    cardID: "",
    cardName: "",
    cardNameValid: true,
    setID: "",
    setName: "",
    setNameValid: true,
    quantity: "",
    quantityValid: true,
    foil: null,
    foilValid: true,
    setNameList: [],
  };
  componentDidMount() {
    if (this.props.match.params.uid) {
      axios
        .get(
          `${API_URL}collections/${this.props.match.params.userid}/${this.props.match.params.uid}`
        )
        .then(({ data }) => {
          console.log(data);
          const { name, setID, setName, quantity, foil } = data;
          this.setState({ cardName: name, setID, setName, quantity, foil });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  submitCard = (event) => {
    event.preventDefault();
    console.log("submit card", this.state.cardName);
    let searchCard = this.state.cardName.replace(/\//g, "%2F").split(" ");
    console.log("modified card", searchCard);
    searchCard = searchCard.map((word) => {
      const fixedName =
        word.slice(0, 1).toUpperCase() +
        word.slice(1, word.length).toLowerCase();
      return fixedName;
    });
    console.log("final modification", searchCard);
    searchCard = searchCard.join("_");
    console.log("begin axios call", searchCard);
    axios
      .get(`${API_URL}cards/${searchCard}`)
      .then(({ data }) => {
        console.log("call received");
        console.log("response", data);
        const sets = data.map((version) => {
          return `${version.setID},${version.set.toUpperCase()},${version.id},${
            version.setName
          }`;
        });
        this.setState({ setNameList: sets }, () => {
          console.log("sets: ", this.state.setNameList);
        });
      })
      .catch((err) => {
        alert("Please enter a valid card name");
        console.log(err);
      });
  };

  handleChange = (event) => {
    if (event.target.name === "quantity") {
      const quantity = Number(event.target.value);
      this.setState({ quantity });
      return;
    }
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  handleDropdown = (event) => {
    const setID = event.target.value.split(",")[0];
    const setName = event.target.value.split(",")[1];
    const cardID = event.target.value.split(",")[2];
    this.setState({ setID, setName, cardID }, () => {
      this.validate("setName", setName);
    });
  };

  validate = (name, value) => {
    if (value === null || value.length === 0) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { cardID, cardName, setID, setName, quantity, foil } = this.state;
    if (!(cardName && setName && quantity && foil)) {
      alert("Please fill out all fields in the form");
      this.validate("cardName", cardName);
      this.validate("setName", setName);
      this.validate("quantity", quantity);
      this.validate("foil", foil);
      return;
    }
    if (quantity === "") {
      alert("Please fill out all fields in the form");
      this.setState({ quantityValid: false });
      return;
    }
    if (quantity < 0) {
      alert("Please provide a non-negative value for quantity");
      this.setState({ quantityValid: false });
      return;
    }
    if (this.props.match.params.uid) {
      axios
        .patch(
          `${API_URL}collections/${this.props.match.params.userid}/${this.props.match.params.uid}`,
          { quantity }
        )
        .then(() => {
          alert("Card updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${API_URL}collections/${this.props.match.params.userid}`, {
          uid: cardID,
          name: cardName,
          setID,
          set: setName,
          quantity,
          foil,
        })
        .then(() => {
          alert("Card added!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.props.history.push(`/collection/${this.props.match.params.userid}`);
  };
  render() {
    return (
      <form className="form">
        <section className="form__card-section">
          <Input
            label="Card"
            name="cardName"
            type="text"
            value={this.state.cardName}
            onChange={this.handleChange}
            valid={this.state.cardNameValid}
          />
          <button className="form__submit--card" onClick={this.submitCard}>
            Submit
          </button>
        </section>
        <label className="form__label">
          Set Name
          <select
            className={
              this.state.setNameValid
                ? "form__field"
                : "form__field form__field--error"
            }
            placeholder="Please Select"
            name="set"
            onChange={this.handleDropdown}
          >
            <option value="" selected disabled hidden>
              Please Select
            </option>
            {this.state.setNameList.map((set) => {
              return (
                <option key={set.split(",")[0]} value={set}>
                  {set.split(",")[3]}
                </option>
              );
            })}
          </select>
        </label>
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={this.state.quantity}
          onChange={this.handleChange}
          valid={this.state.quantityValid}
        />
        <Input
          label="Foil"
          name="foil"
          type="radio"
          value="foil"
          onChange={this.handleChange}
          valid={null}
        />
        <Input
          label="Non-Foil"
          name="foil"
          type="radio"
          value="nonfoil"
          onChange={this.handleChange}
          valid={this.state.foilValid}
        />
        <section className="form__buttons">
          <Link to={`/collection/${this.props.match.params.userid}`}>
            <button className="form__btn--cancel">Cancel</button>
          </Link>
          <button className="form__btn--submit" onClick={this.handleSubmit}>
            + Add Card
          </button>
        </section>
      </form>
    );
  }
}
