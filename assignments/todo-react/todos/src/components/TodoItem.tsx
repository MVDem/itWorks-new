import { Todo } from '../models/models';
import { IoClose, IoCheckboxOutline } from 'react-icons/io5';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';

function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const itemOpacity = todo.completed ? 0.5 : 1;

  const getDate = (deadline: number) => {
    const date = new Date(deadline);
    return date.toLocaleDateString();
  };

  const styleDedline = (deadline: number) => {
    const date = new Date(deadline);
    const currentDate = new Date();
    return date < currentDate ? 'red' : 'inherit';
  };

  return (
    <li className="todoItem" style={{ opacity: itemOpacity }}>
      <div
        className="img-container"
        style={{ backgroundImage: `url(${todo.url})` }}
      ></div>
      <div className="todoContent">
        <p>{todo.title}</p>
        {todo.deadline && (
          <p style={{ color: styleDedline(todo.deadline) }}>
            {getDate(todo.deadline)}
          </p>
        )}
      </div>
      <div className="constrols">
        <button
          type="button"
          className="closeBtn"
          onClick={() => onRemove(todo.id)}
        >
          <IoClose className="closeBtn" />
        </button>
        <button
          type="button"
          className="completeBtn"
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <IoCheckboxOutline />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
