import { Component } from "react";
import ReactCardFlip from "react-card-flip";
import "./CardDisplay.scss";

export default class CardDisplay extends Component {
  state = {
    isFlipped: false,
  };

  //flips card when user clicks on img
  handleClick = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  render() {
    console.log(this.props.card);
    return (
      <article className="card-display">
        {/* checks to see if card is double-face, renders ReactCardFlip if so */}
        {this.props.card.cardFaces.length === 1 ? (
          <img
            className="card-display__img"
            src={this.props.card.cardFaces[0].imageURIs.normal}
            alt={this.props.card.name}
          />
        ) : (
          <div className="card-display__flip">
            <ReactCardFlip
              isFlipped={this.state.isFlipped}
              flipDirection="horizontal"
            >
              <img
                className="card-display__img card-display__img--flip"
                src={this.props.card.cardFaces[0].imageURIs.normal}
                alt={this.props.card.name}
                onClick={this.handleClick}
              />
              <img
                className="card-display__img card-display__img--flip"
                src={this.props.card.cardFaces[1].imageURIs.normal}
                alt={this.props.card.name}
                onClick={this.handleClick}
              />
            </ReactCardFlip>
            <h3 className="card-display__flip-prompt">
              Click Card to See Back Side
            </h3>
          </div>
        )}
      </article>
    );
  }
}
