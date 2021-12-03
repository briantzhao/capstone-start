import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../Input/Input";
import "./Form.scss";
import CardDisplay from "../CardDisplay/CardDisplay";

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

export default class Form extends Component {
  //keeps track of input validity for most fields
  //fields that are directly tied to other fields (mostly ID fields) do not have a validity tracker
  //setNameList and displayCard are tracked to handle rendering of dropdown menu and card image respectively
  state = {
    cardID: "",
    cardUID: "",
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
    displayCard: null,
  };

  componentDidMount() {
    //checks if a card ID was passed in URL
    //signifies that we're trying to edit a card
    //if so, grab the card data from collections route
    //and populate the appropriate fields
    if (this.props.match.params.uid) {
      axios
        .get(
          `${API_URL}collections/${this.props.match.params.userid}/${this.props.match.params.uid}`
        )
        .then(({ data }) => {
          const { id, uid, name, setID, set, quantity, foil } = data;
          this.setState(
            {
              cardID: id,
              cardUID: uid,
              cardName: name,
              setID,
              setName: set,
              quantity,
              foil,
            },
            () => {
              //grab list of all possible sets from cards route
              this.handleSubmitCard();
            }
          );
          //grab card image url from cards route
          axios.get(`${API_URL}cards/id/${uid}`).then(({ data }) => {
            if (data) {
              this.setState({ displayCard: data.card });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //onClick for card lookup
  //split so that componentDidMount can borrow logic
  //for dropdown menu population
  submitCard = (event) => {
    event.preventDefault();
    this.handleSubmitCard();
  };

  //queries cards route for all possible sets and populates dropdown menu
  handleSubmitCard = () => {
    //axios calls can't be passed forward-slashes or spaces
    //and card names are formatted in title case
    //so we need to edit user input in order to create a successful axios call
    let searchCard = this.state.cardName.replace(/\//g, "%2F").split(" ");
    searchCard = searchCard.map((word) => {
      if (nonUP.find((el) => el === word)) {
        return word;
      }
      const fixedName =
        word.slice(0, 1).toUpperCase() +
        word.slice(1, word.length).toLowerCase();
      return fixedName;
    });
    searchCard = searchCard.join("_");
    axios
      .get(`${API_URL}cards/${searchCard}`)
      .then(({ data }) => {
        const sets = data.map((version) => {
          return `${version.setID},${version.set.toUpperCase()},${version.id},${
            version.setName
          }`;
        });
        if (sets.length === 0) {
          alert("No cards with that name found. Be sure to match spelling.");
          return;
        }
        this.setState({ setNameList: sets });
      })
      .catch((err) => {
        alert("Please enter a valid card name");
        console.log(err);
      });
  };

  //updates state whenever user inputs change
  //special handling for quantity so it's saved as a number
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

  //cardUID, setID, and setName are all stored in the dropdown value
  //since these 3 values are tied together
  //as a result, dropdown value is all values joined with commas
  //and must be parsed to properly save state
  handleDropdown = (event) => {
    const setID = event.target.value.split(",")[0];
    const setName = event.target.value.split(",")[1];
    const cardUID = event.target.value.split(",")[2];
    if (cardUID) {
      axios.get(`${API_URL}cards/id/${cardUID}`).then(({ data }) => {
        if (data) {
          this.setState({ displayCard: data.card });
        }
      });
    }
    this.setState({ setID, setName, cardUID }, () => {
      this.validate("setName", setName);
    });
  };

  //checks to see if inputs being passed are valid
  //changes validity status to false if not, and true if so
  validate = (name, value) => {
    if (value === null || value.length === 0) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  //onClick handler for form submit button
  handleSubmit = (event) => {
    event.preventDefault();
    const { cardID, cardUID, cardName, setID, setName, quantity, foil } =
      this.state;
    //check if non-number fields are filled in
    //(if we pass quantity, then having a quantity of 0, which is allowed, will always cause this to fail)
    if (!(cardName && setName && foil)) {
      alert("Please fill out all fields in the form");
      this.validate("cardName", cardName);
      this.validate("setName", setName);
      this.validate("quantity", quantity);
      this.validate("foil", foil);
      return;
    }
    //separate check for quantity
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
    //check if this is supposed to be an edit form
    //if so, do a patch request
    if (this.props.match.params.uid) {
      axios
        .patch(
          `${API_URL}collections/${this.props.match.params.userid}/${cardID}`,
          { quantity, setID, set: setName, foil, uid: cardUID }
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
          uid: cardUID,
          name: cardName,
          setID,
          set: setName,
          quantity,
          foil,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
    this.props.history.push(`/collection/${this.props.match.params.userid}`);
  };
  render() {
    return (
      <form className="form">
        <div className="form__main">
          <section className="form__picture">
            {this.state.displayCard !== null ? (
              <CardDisplay card={this.state.displayCard} />
            ) : (
              <></>
            )}
          </section>
          <section className="form__fields">
            <article className="form__card-section">
              <Input
                label="Card"
                name="cardName"
                type="text"
                value={this.state.cardName}
                onChange={this.handleChange}
                valid={this.state.cardNameValid}
              />
              <button className="form__submit--card" onClick={this.submitCard}>
                Lookup
              </button>
            </article>
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
                {/* check if setID has already been set
                if so, that means this is an edit form
                and the set should already be filled in */}
                {this.state.setID === "" ? (
                  <option value="" selected disabled hidden>
                    Select a Set Name
                  </option>
                ) : (
                  <></>
                )}
                {this.state.setNameList.map((set) => {
                  //check if the possible sets matches the state setID
                  //if so, default to that set as being selected
                  if (set.split(",")[0] === this.state.setID) {
                    return (
                      <option key={set.split(",")[0]} value={set} selected>
                        {set.split(",")[3]}
                      </option>
                    );
                  }
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
            <article className="form__radio-inputs">
              <Input
                label="Foil"
                name="foil"
                type="radio"
                value="foil"
                onChange={this.handleChange}
                valid={null}
                checked={this.state.foil === "foil"}
              />
              <Input
                label="Non-Foil"
                name="foil"
                type="radio"
                value="nonfoil"
                onChange={this.handleChange}
                valid={this.state.foilValid}
                checked={this.state.foil === "nonfoil"}
              />
            </article>
          </section>
        </div>
        <article className="form__buttons">
          <Link to={`/collection/${this.props.match.params.userid}`}>
            <button className="form__btn--cancel">Cancel</button>
          </Link>
          <button className="form__btn--submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </article>
      </form>
    );
  }
}
