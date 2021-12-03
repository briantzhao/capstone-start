import logo from "../../assets/logos/G.svg";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

export default function Header({ loggedIn, handleLogout, user }) {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            className="header__logo-img"
            src={logo}
            alt="Green Mana Symbol"
          />
          <h3 className="header__logo-title">Sylvan Library</h3>
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list--home">
            <NavLink to="/">Home</NavLink>
          </li>
          {loggedIn ? (
            <li className="header__nav__list--collection">
              <NavLink to={`/collection/${user.id}`}>Collection</NavLink>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      {loggedIn ? (
        <button className="header__logout" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <Link to="/login">
          <button className="header__login">Log In</button>
        </Link>
      )}
    </header>
  );
}
