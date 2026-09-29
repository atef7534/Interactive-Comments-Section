export default function DeleteModal({ itemType, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>Delete {itemType}</h2>

        <p>
          Are you sure you want to delete this {itemType}? This will delete
          the {itemType} and can't be undone.
        </p>

        <div className="modal-actions">
          <button onClick={onCancel}>No, cancel</button>
          <button onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}
