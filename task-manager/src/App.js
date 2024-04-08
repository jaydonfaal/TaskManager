import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const tasks = [];
const titles = [];
const success = () => toast.success("Success, the task was added successfully!");
const notify = () => toast.warning("Error! You have fields fields that need to be addressed!");

const Task = () => {
  return (
    <div>
      <ul className="list-container">
        {tasks.map((task, index) => (
          <li className="list" key={index}>
            <div className="center"> <p>{task.item[0]}</p></div>
            <div className="description grid-item"><p>{task.item[1]}</p></div>
            <div className='center'><p>{task.item[2]}</p></div>
            <div className='center'><p>{task.item[3]}</p></div>
            <div className='center'><input type="radio" name="react-tips" className="form-check-input" /></div>
            <div className='center'>
              <button onClick={notify} className='update-button'>Update</button>
              <button className='delete-task-button'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const NavBar = ({ setShowNewTask }) => {
  return (
    <div className="header navbar">
      <div></div>
      <div><p1 className="title">Frameworks</p1></div>
      <div className="right-content">
        <button className="entry-button" onClick={() => setShowNewTask(true)}>ADD</button>
      </div>
    </div>
  );
}

const TaskBar = () => {
  return (
    <div className="taskbar">
      <div className=""><p1>Title</p1></div>
      <div className=""><p1>Description</p1></div>
      <div className=""><p1>Deadline</p1></div>
      <div className=""><p1>Priority</p1></div>
      <div className=""><p1>Completed</p1></div>
      <div className=""><p1>Action</p1></div>
    </div>
  );
}

const NewTask = ({ setShowNewTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleLogValues = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      toast.error("Title cannot be empty");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError(true);
      toast.error("Description cannot be empty");
      isValid = false;
    }

    if (titles.includes(title.trim())) {
      setTitleError(true);
      toast.error("You cannot have duplicate title names");
      isValid = false;
    }

    if (!isValid) return;

    setShowNewTask(false);
    tasks.push({
      item: {
        0: title,
        1: description,
        2: deadline.trim() ? deadline : "No End Date",
        3: priority ? priority : "No Priority",
      }
    });
    titles.push(title.trim());
  };

  return (
    <div className='page'>
      <div className="newitem">
        <div className="new-item-header"><p1>Add New Task</p1></div>
        <div className='center'>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="Title"
            className={`font input-field ${titleError ? 'error' : ''}`}
          />
          {titleError && <small className="error-message">Title cannot be empty or duplicate</small>}
        </div>
        <div className='center'>
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError(false);
            }}
            placeholder="Description"
            className={`font input-field ${descriptionError ? 'error' : ''}`}
          />
          {descriptionError && <small className="error-message">Description cannot be empty</small>}
        </div>
        <div className='center'>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            className="font input-field"
          />
        </div>
        <div className='radio-container'>
          <div className='font left-content'>Priority:</div>
          <div className='center radio-grid'>
            <div value={priority} onChange={(e) => setPriority(e.target.value)}>
              <label className='font'>
                <input
                  type="radio"
                  name="react-tips"
                  value="Low"
                  className="form-check-input"
                />
                Low
              </label>
            </div>
            <div>
              <label className='font'>
                <input
                  type="radio"
                  name="react-tips"
                  value="Medium"
                  className="form-check-input"
                />
                Medium
              </label>
            </div>
            <div>
              <label className='font'>
                <input
                  type="radio"
                  name="react-tips"
                  value="High"
                  className="form-check-input"
                />
                High
              </label>
            </div>
          </div>
        </div>
        <div className='add-cancel-container'>
          <div onClick={handleLogValues} className='center'><button className='add-button'>Add</button></div>
          <div className='center'><button className='delete-button' onClick={() => setShowNewTask(false)}>Cancel</button></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <NavBar setShowNewTask={setShowNewTask}></NavBar>
      <TaskBar></TaskBar>
      {showNewTask && <NewTask setShowNewTask={setShowNewTask}></NewTask>}
      {tasks.length > 0 ? <Task /> : null}
    </div>
  );
}

export default App;
