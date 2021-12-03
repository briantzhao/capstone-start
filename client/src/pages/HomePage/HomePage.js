import { Link } from "react-router-dom";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import "./HomePage.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function HomePage({ user }) {
  return (
    <main className="home__main">
      <h1 className="home__title">Sylvan Library</h1>
      {user !== null ? (
        <h2 className="home__welcome">
          Welcome, {user.firstName} {user.lastName}
        </h2>
      ) : (
        <Link to="/login">
          <button className="home__sign-up">Log In</button>
        </Link>
      )}
      {/* Carousel */}
      <HomeCarousel />
      <article className="home__links">
        <h2 className="home__links__title">Useful Links</h2>
        <ul className="home__links__list">
          <li className="home__links__list-item">
            <a
              href="https://www.tcgplayer.com"
              target="_blank"
              rel="noreferrer"
            >
              Tcgplayer
            </a>
          </li>
          <li className="home__links__list-item">
            <a href="https://www.edhrec.com" target="_blank" rel="noreferrer">
              Edhrec
            </a>
          </li>
          <li className="home__links__list-item">
            <a
              href="https://www.reddit.com/magicTCG"
              target="_blank"
              rel="noreferrer"
            >
              Reddit
            </a>
          </li>
        </ul>
      </article>
    </main>
  );
}
