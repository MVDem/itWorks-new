import { useState } from 'react';
import { Todo } from '../models/models';
import { IoClose } from 'react-icons/io5';
import TodoItem from './TodoItem';

const defaultImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgBUc3X5YtITxqAzowEt9Kbr2gPaLka66KuGAZdGt1XSDKTnKLw1GKiBOpWQ&s';

function CreateTodoForm({
  setTodos,
  todos,
}: {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}) {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [deadLine, setDeadLine] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now();
    const newTodo: Todo = {
      id: id,
      title: title,
      url: url.length ? url : defaultImage,
      deadline: new Date(deadLine).getTime(),
      completed: false,
    };
    setTodos(
      [...todos, newTodo]
        .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1))
        .sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
    );
    setTitle('');
    setUrl('');
  };

  return (
    <>
      {!isFormActive ? (
        <button
          className="newTodoBtn"
          onClick={() => setIsFormActive(!isFormActive)}
        >
          Create new todo
        </button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div>
            <label htmlFor="title">Create todo</label>
            <button
              type="button"
              onClick={() => setIsFormActive(!isFormActive)}
              className="closeFormBtn"
            >
              <IoClose />
            </button>
          </div>
          <input
            value={title}
            type="text"
            placeholder="My todo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={url}
            type="url"
            placeholder="URL image"
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            value={deadLine}
            type="date"
            placeholder="Deadline"
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <button type="submit">Add</button>
          <TodoItem
            todo={{
              id: 0,
              title,
              url,
              deadline: new Date(deadLine).getTime(),
              completed: false,
            }}
            onToggle={() => {
              console.log('toggle');
            }}
            onRemove={() => {
              console.log('remove');
            }}
          />
        </form>
      )}
    </>
  );
}
export default CreateTodoForm;
