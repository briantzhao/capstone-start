import { Link } from "react-router-dom";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import "./HomePage.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import tcgplayer from "../../assets/logos/tcgplayer.png";
import edhrec from "../../assets/logos/edhrec.png";
import reddit from "../../assets/logos/reddit.png";
export default function HomePage({ user }) {
  return (
    <main className="home__main">
      <h1 className="home__title">Sylvan Library</h1>
      {/* renders welcome message if user is logged in
      otherwise, renders login button */}
      {user !== null ? (
        <h2 className="home__welcome">
          Welcome, {user.firstName} {user.lastName}
        </h2>
      ) : (
        <></>
      )}
      <section className="home__carousel-section">
        <HomeCarousel />
      </section>
      <article className="home__links">
        <h2 className="home__links__title">Useful Links</h2>
        <ul className="home__links__list">
          <li className="home__links__list-item">
            <a
              href="https://www.tcgplayer.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="home__links__logo"
                src={tcgplayer}
                alt="Tcgplayer"
              />
            </a>
          </li>
          <li className="home__links__list-item home__links__logo--edhrec">
            <a href="https://www.edhrec.com" target="_blank" rel="noreferrer">
              <img className="home__links__logo" src={edhrec} alt="EdhRec" />
            </a>
          </li>
          <li className="home__links__list-item">
            <a
              href="https://www.reddit.com/r/magicTCG"
              target="_blank"
              rel="noreferrer"
            >
              <img className="home__links__logo" src={reddit} alt="Reddit" />
            </a>
          </li>
        </ul>
      </article>
    </main>
  );
}
