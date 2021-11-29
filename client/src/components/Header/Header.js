import logo from "../../assets/logos/Details-About-Car-Truck-Window-Mtg-Magic-The-Gathering-Mana-Forest-V2-Decal__45726.1506656063.jpg";
import { NavLink } from "react-router-dom";

export default function Header() {
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
          {/* <li>
            <a href="./collection.html" className="current-link">
              Your Collection</NavLink
            >
          </li> */}
          <li>
            <NavLink to="/sets">{"Cards & Sets"}</NavLink>
          </li>
          <li>
            <NavLink to="/news">Recent News</NavLink>
          </li>
          <li>
            <NavLink to="/market">Market Trends</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
