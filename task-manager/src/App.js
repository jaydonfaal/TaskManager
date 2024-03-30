import React, { useState } from 'react';
import './App.css';

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
  return (
    <div className='page'>
      <div className="newitem">
        <div className="new-item-header"><p1>Add New Task</p1></div>
        <div className="center"><input Placeholder="Title" className="font input-field"></input></div>
        <div className="center"><input Placeholder="Description" className="font input-field"></input></div>
        <div className="center"><input type="date" className="font input-field"></input></div>
        <div className='radio-container'>
          <div className='font left-content'>Priority:</div>
          <div className='center radio-grid'>
            <div>
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
          <div className='center'><button className='add-button'>Add</button></div>
          <div className='center'><button className='delete-button' onClick={() => setShowNewTask(false)}>Cancel</button></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="App">
      <NavBar setShowNewTask={setShowNewTask}></NavBar>
      <TaskBar></TaskBar>
      {showNewTask && <NewTask setShowNewTask={setShowNewTask}></NewTask>}
    </div>
  );
}

export default App;

