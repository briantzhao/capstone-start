import { Link } from "react-router-dom";
import "./HomePage.scss";
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

  // render() {
  //   return (
  //     <main className="page-main">
  //       <section className="entry">
  //         <h2 className="entry__title">Enter Your Cards</h2>
  //         <form id="card-entry" className="entry__form">
  //           <div className="entry__form__section">
  //             <div className="entry__form__pair">
  //               <label for="name" className="entry__form__name">
  //                 CARD NAME
  //               </label>
  //               <input
  //                 type="text"
  //                 className="entry__form__name-field"
  //                 id="name"
  //                 name="name"
  //                 placeholder="Enter a card name"
  //               />
  //             </div>
  //             <div className="entry__form__pair">
  //               <label for="set" className="entry__form__set">
  //                 SET
  //               </label>
  //               <select className="entry__form__set-field" id="set" name="set">
  //                 <option value="null">Select a card set</option>
  //                 <option value="SOI">Shadows Over Innistrad</option>
  //                 <option value="KLD">Kaladesh</option>
  //                 <option value="BFZ">Battle For Zendikar</option>
  //               </select>
  //             </div>
  //             <div className="entry__form__pair">
  //               <label for="quantity" className="entry__form__quantity">
  //                 Quantity
  //               </label>
  //               <input
  //                 type="number"
  //                 className="entry__form__quantity-field"
  //                 placeholder="0"
  //                 name="quantity"
  //               />
  //             </div>
  //             <button className="entry__form__add">Add</button>
  //           </div>
  //           <div className="entry__form__section">
  //             <table className="entry__form__list">
  //               <thead className="entry__form__list__head">
  //                 <tr className="entry__form__list__headers">
  //                   <th className="entry__form__list__name">Card Name</th>
  //                   <th className="entry__form__list__set">Card Set</th>
  //                   <th className="entry__form__list__quantity">Quantity</th>
  //                 </tr>
  //               </thead>
  //               <tbody className="entry__form__list__body"></tbody>
  //             </table>
  //           </div>
  //           <div className="entry__form__section">
  //             <button className="entry__form__submit">Submit</button>
  //           </div>
  //         </form>
  //         <div className="autocomplete__entries"></div>
  //       </section>
  //     </main>
  //   );
  // }
}
