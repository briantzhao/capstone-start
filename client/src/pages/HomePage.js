import { Component } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";

export default class HomePage extends Component {
  state = {};

  render() {
    return (
      <main className="page-main">
        <nav>
          <Switch></Switch>
          <ul>
            <li>
              <Link to="" className="collection-link">
                Decks
              </Link>
            </li>
            <li>
              <Link to="" className="collection-link">
                Cards
              </Link>
            </li>
            <li>
              <Link to="" className="collection-link">
                Wishlist
              </Link>
            </li>
          </ul>
        </nav>
        <section className="entry">
          <h2 className="entry__title">Enter Your Cards</h2>
          <form id="card-entry" className="entry__form">
            <div className="entry__form__section">
              <div className="entry__form__pair">
                <label for="name" className="entry__form__name">
                  CARD NAME
                </label>
                <input
                  type="text"
                  className="entry__form__name-field"
                  id="name"
                  name="name"
                  placeholder="Enter a card name"
                />
              </div>
              <div className="entry__form__pair">
                <label for="set" className="entry__form__set">
                  SET
                </label>
                <select className="entry__form__set-field" id="set" name="set">
                  <option value="null">Select a card set</option>
                  <option value="SOI">Shadows Over Innistrad</option>
                  <option value="KLD">Kaladesh</option>
                  <option value="BFZ">Battle For Zendikar</option>
                </select>
              </div>
              <div className="entry__form__pair">
                <label for="quantity" className="entry__form__quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  className="entry__form__quantity-field"
                  placeholder="0"
                  name="quantity"
                />
              </div>
              <button className="entry__form__add">Add</button>
            </div>
            <div className="entry__form__section">
              <table className="entry__form__list">
                <thead className="entry__form__list__head">
                  <tr className="entry__form__list__headers">
                    <th className="entry__form__list__name">Card Name</th>
                    <th className="entry__form__list__set">Card Set</th>
                    <th className="entry__form__list__quantity">Quantity</th>
                  </tr>
                </thead>
                <tbody className="entry__form__list__body"></tbody>
              </table>
            </div>
            <div className="entry__form__section">
              <button className="entry__form__submit">Submit</button>
            </div>
          </form>
          <div className="autocomplete__entries"></div>
        </section>
      </main>
    );
  }
}
