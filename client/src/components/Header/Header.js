import logo from "../../assets/logos/Details-About-Car-Truck-Window-Mtg-Magic-The-Gathering-Mana-Forest-V2-Decal__45726.1506656063.jpg";
import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header({ loggedIn, handleLogout, user }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo-img" src={logo} alt="Green Mana Symbol" />
        <h3 className="header__logo-title">Sylvan Library</h3>
      </div>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {loggedIn && (
            <li>
              <NavLink to={`/collection/${user.id}`}>Collection</NavLink>
            </li>
          )}
          {/* <li>
            <NavLink to="/decks">Decks</NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/market">Market Trends</NavLink>
          </li> */}
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
