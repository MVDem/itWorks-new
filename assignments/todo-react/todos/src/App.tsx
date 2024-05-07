import { useState } from 'react';
import TodoList from './components/TodoList';
import { Todo } from './models/models';
import CreateTodoForm from './components/CreateTodoForm';
import { defaultTodos } from './data';

function App() {
  const initialTodos = defaultTodos
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1))
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onToggle = (id: number) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      newTodos.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );
      return newTodos;
    });
  };

  const onRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <CreateTodoForm setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
}

export default App;
