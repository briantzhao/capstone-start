import Modal from "react-modal";

export default function DeleteModal({
  hideModal,
  currentCard,
  modalState,
  deleteItem,
}) {
  return (
    <Modal
      isOpen={modalState}
      ariaHideApp={false}
      className="delete-modal"
      overlayClassName="delete-modal__overlay"
      onRequestClose={() => {
        hideModal();
      }}
    >
      <div className="delete-modal__top">
        <button className="delete-modal__exit" onClick={hideModal}>
          &times;
        </button>
        <h1 className="delete-modal__heading">Delete {currentCard}?</h1>
      </div>
      <p className="delete-modal__text">
        Please confirm that you'd like to delete {currentCard}. You won't be
        able to undo this action.
      </p>
      <div className="delete-modal__buttons-container">
        <button
          onClick={hideModal}
          className="delete-modal__button delete-modal__button--cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            alert(`${currentCard} is deleted.`);
            deleteItem();
            hideModal();
          }}
          className="delete-modal__button delete-modal__button--delete"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
