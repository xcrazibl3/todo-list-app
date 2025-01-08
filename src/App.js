import { useState } from "react";
import { startTasks } from "./tasks";

function App() {
  const [tasks, setTasks] = useState(startTasks);
  const [isFormActive, setIsFormActive] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [renameTitle, setRenameTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  function handleOpenForm() {
    setIsFormActive(true);
  }

  function handleCloseForm() {
    setNewTask("");
    setIsFormActive(false);
  }

  function handleClearAllTasks() {
    setTasks([]);
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

  function handleRenameTask(taskTitle) {
    setRenameTitle(taskTitle);
    setNewTitle(taskTitle);
    console.log(`You're currently renaming ${renameTitle}`);
  }

  function handleDeleteTask(taskTitle) {
    setTasks((tasks) => tasks.filter((task) => task.title !== taskTitle));
  }

  function handleCancelRename() {
    setRenameTitle("");
  }

  function handleCompleteRename(taskTitle) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.title === taskTitle ? { ...task, title: newTitle } : task
      )
    );
    setRenameTitle("");
    setNewTitle("");
  }

  return (
    <div className="container">
      <Header />
      <TasksContainer
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
        onRenameTask={handleRenameTask}
        renameTitle={renameTitle}
        tasks={tasks}
        onCancelRename={handleCancelRename}
        onCompleteRename={handleCompleteRename}
      />
      {isFormActive && (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onAddNewTask={handleAddNewTask}
          onCloseForm={handleCloseForm}
        />
      )}
      <ButtonMainBox
        onAddTask={handleOpenForm}
        onClearAllTasks={handleClearAllTasks}
      />
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

function TasksContainer({
  tasks,
  renameTitle,
  onCompleteTask,
  onDeleteTask,
  onRenameTask,
  newTitle,
  setNewTitle,
  onCancelRename,
  onCompleteRename,
}) {
  //if no tasks
  if (!tasks.length)
    return (
      <div className="task-empty">
        <h2 className="task-empty__message">
          You can add tasks to your Todo list!
        </h2>
      </div>
    );

  //else
  return (
    <ul className="tasks">
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks__container">
        {tasks.map((task) => (
          <Task
            setNewTitle={setNewTitle}
            newTitle={newTitle}
            renameTitle={renameTitle}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onRenameTask={onRenameTask}
            onCancelRename={onCancelRename}
            onCompleteRename={onCompleteRename}
            task={task}
            key={task.title}
          />
        ))}
      </div>
    </ul>
  );
}

function Task({
  renameTitle,
  task,
  onCompleteTask,
  onDeleteTask,
  onRenameTask,
  newTitle,
  setNewTitle,
  onCancelRename,
  onCompleteRename,
}) {
  //if rename clicked
  if (renameTitle === task.title)
    return (
      <div className="task">
        <input
          className="task__input-field"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="task__button-box">
          <ButtonSecondary onClick={() => onCompleteRename(task.title)}>
            ✅
          </ButtonSecondary>
          <ButtonSecondary onClick={() => onCancelRename()}>❌</ButtonSecondary>
        </div>
      </div>
    );

  //else
  if (renameTitle !== task.title)
    return (
      <li className="task">
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
          <ButtonSecondary onClick={() => onRenameTask(task.title)}>
            📝
          </ButtonSecondary>
          <ButtonSecondary onClick={() => onDeleteTask(task.title)}>
            ❌
          </ButtonSecondary>
        </div>
      </li>
    );
}

function ButtonSecondary({ children, onClick }) {
  return (
    <button onClick={onClick} className="button-secondary">
      {children}
    </button>
  );
}

function ButtonMainBox({ onAddTask, onClearAllTasks }) {
  return (
    <div className="button-main-container">
      <ButtonMain onClick={onAddTask}>Add task</ButtonMain>
      <ButtonMain onClick={onClearAllTasks}>Clear all</ButtonMain>
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
