import { Component } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/";

export default class Form extends Component {
  state = {
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
    const { cardName, setID, setName, quantity, foil } = this.state;
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
          cardName,
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
    return <form className="form"></form>;
  }
}
