import { Button } from "../Button/Button";

export const Item = ({
  id,
  text,
  isCompleted,
  handleCompleteTodo,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <li className="d-flex align-items-center mt-3">
      <strong className="me-3">ID:{id}</strong>
      <input
        onChange={() => handleCompleteTodo(id)}
        defaultChecked={isCompleted}
        className="form-check-input me-3"
        type="checkbox"
      />
      <strong
        className={
          isCompleted
            ? "flex-grow-1 text-decoration-line-through"
            : "flex-grow-1"
        }
      >
        {text}
      </strong>
      <Button
        onClick={() => handleEditTodo(id, text)}
        className="btn btn-warning"
      >
        EDIT
      </Button>
      <Button
        onClick={() => handleDeleteTodo(id)}
        className="btn btn-danger ms-3"
      >
        DELETE
      </Button>
    </li>
  );
};
