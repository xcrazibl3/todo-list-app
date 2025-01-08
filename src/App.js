import { useState } from "react";
import { startTasks } from "./tasks";

function App() {
  const [tasks, setTasks] = useState(startTasks);
  const [isFormActive, setIsFormActive] = useState(false);

  function handleAddTask() {
    setIsFormActive(true);
  }

  return (
    <div className="container">
      <Header />
      <TasksContainer tasks={tasks} />
      {isFormActive && <AddTaskForm />}
      <ButtonMainBox onAddTask={handleAddTask} />
    </div>
  );
}

export default App;

function Header() {
  return (
    <div className="header">
      <h1 className="header__title">My Todos</h1>
    </div>
  );
}

function TasksContainer({ tasks }) {
  return (
    <div className="tasks">
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks__container">
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </div>
  );
}

function Task({ task }) {
  return (
    <div className="task">
      <h3 className="task__title">{task.title}</h3>
      <div className="task__button-box">
        <ButtonSecondary>✅</ButtonSecondary>
        <ButtonSecondary>📝</ButtonSecondary>
        <ButtonSecondary>❌</ButtonSecondary>
      </div>
    </div>
  );
}

function ButtonSecondary({ children }) {
  return <button className="button-secondary">{children}</button>;
}

function ButtonMainBox({ onAddTask }) {
  return (
    <div className="button-main-container">
      <ButtonMain onClick={onAddTask}>Add task</ButtonMain>
      <ButtonMain>Clear all</ButtonMain>
    </div>
  );
}

function ButtonMain({ children, onClick }) {
  return (
    <button onClick={onClick} className="button-main">
      {children}
    </button>
  );
}

function AddTaskForm() {
  return (
    <form className="add-task-form">
      <label className="add-task-form__label">Task title</label>
      <input className="add-task-form__input-field" type="text" />
      <div className="add-task-form__button-box">
        <ButtonSecondary>✅</ButtonSecondary>
        <ButtonSecondary>❌</ButtonSecondary>
      </div>
    </form>
  );
}
