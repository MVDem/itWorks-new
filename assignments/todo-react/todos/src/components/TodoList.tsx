import { Todo } from '../models/models';
import TodoItem from './TodoItem';

function TodoList({
  todos,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const label =
    activeTodos.length !== 0
      ? `You have  ${activeTodos.length} ${
          activeTodos.length === 1 ? 'todo' : 'todos'
        }:`
      : completedTodos.length !== 0
      ? "You've completed everything"
      : 'You are lazy! Nothing to do!';
  return (
    <div className="todoList">
      <h1>{label}</h1>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
