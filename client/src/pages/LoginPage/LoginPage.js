import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";

const API_URL = "http://localhost:8080/";

export default class LoginPage extends Component {
  state = {
    email: "",
    emailValid: true,
    password: "",
    passwordValid: true,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  validate = (name, value) => {
    if (!value) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!(email && password)) {
      alert("Please fill out all fields in the form");
      this.validate("email", email);
      this.validate("password", password);
      return;
    }
    axios
      .post(`${API_URL}users/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        this.props.handleLogin(data);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Login Successful!");
    this.props.history.push("/");
  };
  render() {
    return (
      <main className="login">
        <form className="login__form" onSubmit={this.handleSubmit}>
          <h1 className="login__form__title">Log Into Your Account</h1>
          <section className="login__form__creds">
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
          <section className="login__form__buttons">
            <Link to="/">
              <button className="login__form__btn--cancel">Cancel</button>
            </Link>
            <button
              className="login__form__btn--submit"
              onClick={this.handleSubmit}
            >
              Log In
            </button>
          </section>
        </form>
        <section className="login__signup">
          <h2 className="login__signup__title">
            Don't Have An Account? Sign Up For One!
          </h2>
          <Link to="/signup">
            <button className="login__signup__button">Sign Up</button>
          </Link>
        </section>
      </main>
    );
  }
}
