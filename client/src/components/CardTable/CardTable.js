import { Link } from "react-router-dom";
import "./CardTable.scss";
import edit from "../../assets/images/edit-24px.svg";
import chevron from "../../assets/images/chevron_right-24px.svg";

export default function CardTable({ editable, cardsList, userid }) {
  if (cardsList !== null) {
    return (
      <table className="card-table">
        <thead className="card-table__head">
          <tr className="card-table__headers">
            <th className="card-table__label">Card Name</th>
            <th className="card-table__label">Set</th>
            <th className="card-table__label">Quantity</th>
            <th className="card-table__label">Price</th>
            {editable && <th className="card-table__label">Actions</th>}
          </tr>
        </thead>
        <tbody className="card-table__body">
          {cardsList.length !== 0 ? (
            cardsList.map(({ uid, name, set, quantity, price }) => {
              return (
                <>
                  <tr className="card-table__single">
                    <td className="card-table__item card-table__item--name">
                      <Link to={`/card/${uid}`}>
                        {name}{" "}
                        <img
                          className="card-table__item__chevron"
                          src={chevron}
                          alt="chevron"
                        />
                      </Link>
                    </td>
                    <td className="card-table__item">{set.toUpperCase()}</td>
                    <td className="card-table__item">{quantity}</td>
                    <td className="card-table__item">
                      {price !== null ? `$${price}` : "N/A"}
                    </td>
                    {editable && (
                      <td className="card-table__item">
                        <Link to={`/edit/${userid}/${uid}`}>
                          <div className="card-table__item__btn">
                            <img
                              className="card-table__item__btn--img"
                              src={edit}
                              alt="edit"
                            />
                            Edit
                          </div>
                        </Link>
                      </td>
                    )}
                  </tr>
                </>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    );
  }
  return <h1 className="loading">Loading...</h1>;
}
