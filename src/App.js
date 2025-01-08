import { useState } from "react";
import { startTasks } from "./tasks";

function App() {
  const [tasks, setTasks] = useState(startTasks);
  const [isFormActive, setIsFormActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  function handleOpenForm() {
    setIsFormActive(true);
  }

  function handleCloseForm() {
    setIsFormActive(false);
  }

  function handleAddNewTask(newTask) {
    if (!newTask) return;

    setTasks((tasks) => [...tasks, { title: newTask, completed: false }]);
    setNewTask("");
    setIsFormActive(false);
  }

  function handleCompleteTask(taskTitle) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.title === taskTitle ? { ...task, completed: true } : task
      )
    );
  }

  return (
    <div className="container">
      <Header />
      <TasksContainer onCompleteTask={handleCompleteTask} tasks={tasks} />
      {isFormActive && (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onAddNewTask={handleAddNewTask}
          onCloseForm={handleCloseForm}
        />
      )}
      <ButtonMainBox onAddTask={handleOpenForm} />
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

function TasksContainer({ tasks, onCompleteTask }) {
  return (
    <div className="tasks">
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks__container">
        {tasks.map((task) => (
          <Task onCompleteTask={onCompleteTask} task={task} key={task.title} />
        ))}
      </div>
    </div>
  );
}

function Task({ task, onCompleteTask }) {
  return (
    <div className="task">
      <h3
        className={`task__title ${
          task.completed ? "task__title--completed" : ""
        }`}
      >
        {task.title}
      </h3>
      <div className="task__button-box">
        <ButtonSecondary onClick={() => onCompleteTask(task.title)}>
          ✅
        </ButtonSecondary>
        <ButtonSecondary>📝</ButtonSecondary>
        <ButtonSecondary>❌</ButtonSecondary>
      </div>
    </div>
  );
}

function ButtonSecondary({ children, onClick }) {
  return (
    <button onClick={onClick} className="button-secondary">
      {children}
    </button>
  );
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

function AddTaskForm({ onAddNewTask, onCloseForm, newTask, setNewTask }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="add-task-form">
      <label className="add-task-form__label">Task title</label>
      <input
        className="add-task-form__input-field"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
      />
      <div className="add-task-form__button-box">
        <ButtonSecondary onClick={() => onAddNewTask(newTask)}>
          ✅
        </ButtonSecondary>
        <ButtonSecondary onClick={onCloseForm}>❌</ButtonSecondary>
      </div>
    </form>
  );
}
