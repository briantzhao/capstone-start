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
    quantity: 0,
    quantityValid: true,
    foil: null,
    foilValid: true,
    setNameList: [],
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`${API_URL}collection/${this.props.match.params.id}`)
        .then(({ data }) => {
          const { cardName, setID, setName, quantity, foil } = data;
          this.setState({ cardName, setID, setName, quantity, foil });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  submitCard = () => {};

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
    this.setState({ setID, setName }, () => {
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
    if (!(cardName, setName, quantity, foil)) {
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
    if (this.props.match.params.id) {
      axios
        .patch(`${API_URL}collections/${this.props.match.params.id}`)
        .then(() => {
          alert("Card updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${API_URL}collections/`, {
          id: cardID,
          name: cardName,
          setID,
          setName,
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
    this.props.history.push("/collection");
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
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
                  {set.split(",")[1]}
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
          <Link to="/collection">
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
