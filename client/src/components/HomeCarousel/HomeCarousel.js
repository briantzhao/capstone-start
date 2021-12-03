import { Carousel } from "react-responsive-carousel";
import alchemy from "../../assets/images/alchemy.jpg";
import secretLair from "../../assets/images/secret-lair.jpg";
import unfinity from "../../assets/images/unfinity.png";
import "./HomeCarousel.scss";

export default function HomeCarousel() {
  return (
    <Carousel showArrows={true} infiniteLoop autoPlay width="60%">
      <a
        className="carousel__single"
        href="https://magic.wizards.com/en/articles/archive/magic-digital/introducing-alchemy-new-way-play-mtg-arena-2021-12-02"
        target="_blank"
        rel="noreferrer"
      >
        <img className="carousel__image" src={alchemy} alt="Alchemy Banner" />
        <p className="carousel__legend">
          Introducing a New Official Digital Format: Alchemy!
        </p>
      </a>
      <a
        className="carousel__single"
        href="https://secretlair.wizards.com/us"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="carousel__image"
          src={secretLair}
          alt="Secret Lair Banner"
        />
        <p className="carousel__legend">Secret Lair x Arcane Now Available!</p>
      </a>
      <a
        className="carousel__single"
        href="https://magic.wizards.com/en/articles/archive/making-magic/unfinity-and-beyond-2021-11-29"
        target="_blank"
        rel="noreferrer"
      >
        <img className="carousel__image" src={unfinity} alt="Unfinity Banner" />
        <p className="carousel__legend">
          To Unfinity and Beyond! New Un-Set to Release
        </p>
      </a>
    </Carousel>
  );
}
