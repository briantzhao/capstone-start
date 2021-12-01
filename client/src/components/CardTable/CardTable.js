import { Link } from "react-router-dom";

export default function CardTable({ editable, cardsList, getItem }) {
  <table className="card-table">
    <tr className="card-table__headers">
      <th className="card-table__label">Card Name</th>
      <th className="card-table__label">Set</th>
      <th className="card-table__label">Quantity</th>
      <th className="card-table__label">Price</th>
      {editable && <th className="card-table__label">Actions</th>}
    </tr>
    {cardsList.map(({ id, uid, name, set, quantity, price }) => {
      <div key={uid}>
        <tr className="card-table__single">
          <td className="card-table__item">{name}</td>
          <td className="card-table__item">{set.toUpperCase()}</td>
          <td className="card-table__item">{quantity}</td>
          <td className="card-table__item">{price}</td>
          {editable && (
            <td className="card-table__item">
              <Link to={`/edit/${userid}/${id}`}>
                <div className="card-table__item__btn--edit">Edit</div>
              </Link>
              <div
                className="card-table__item__btn--delete"
                onClick={
                  getItem
                    ? () => {
                        getItem(id);
                      }
                    : null
                }
              >
                Delete
              </div>
            </td>
          )}
        </tr>
        {editable && (
          <td className="card-table__item--mobile">
            <Link to="/edit">
              <div className="card-table__item__btn--edit card-table__item__btn--mobile">
                Edit
              </div>
            </Link>
            <div
              className="card-table__item__btn--delete card-table__item__btn--mobile"
              onClick={
                getItem
                  ? () => {
                      getItem(id);
                    }
                  : null
              }
            >
              Delete
            </div>
          </td>
        )}
      </div>;
    })}
  </table>;
}
