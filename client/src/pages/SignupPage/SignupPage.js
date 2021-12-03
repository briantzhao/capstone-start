import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";
import "./SignupPage.scss";

const API_URL = "http://localhost:8080/";

export default class SignupPage extends Component {
  //keeps track of input validity for all fields
  state = {
    email: "",
    emailValid: true,
    password: "",
    passwordValid: true,
    firstName: "",
    firstNameValid: true,
    lastName: "",
    lastNameValid: true,
  };

  //updates state whenever user inputs change
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  //checks to see if inputs being passed are valid
  //changes validity status to false if not, and true if so
  validate = (name, value) => {
    if (!value) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  //onClick handler for form submit button
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    //check if fields are filled in
    if (!(email && password && firstName && lastName)) {
      alert("Please fill out all fields in the form");
      this.validate("email", email);
      this.validate("password", password);
      this.validate("firstName", firstName);
      this.validate("lastName", lastName);
      return;
    }
    axios
      .post(`${API_URL}users/signup`, {
        email,
        password,
        firstName,
        lastName,
      })
      .then(({ data }) => {
        this.props.handleLogin(data);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Signup Successful!");
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <h1 className="signup-form__title">Sign Up For An Account</h1>
        <section className="signup-form__name">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            valid={this.state.firstNameValid}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            valid={this.state.lastNameValid}
          />
        </section>
        <section className="signup-form__creds">
          <Input
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            valid={this.state.emailValid}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            valid={this.state.passwordValid}
          />
        </section>
        <section className="signup-form__buttons">
          <Link to="/login">
            <button className="signup-form__btn--cancel">Cancel</button>
          </Link>
          <button
            className="signup-form__btn--submit"
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>
        </section>
      </form>
    );
  }
}
