import React, { useState } from 'react';
import './App.css';


const tasks = [

];
window.tasks = tasks;

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
            <div className='center'><input type="radio" name="react-tips" value="Low" className="form-check-input" /></div>
            <div className='center'>
              <button className='update-button'>Update</button>
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
  const [title, setInputValue1] = useState('');
  const [description, setInputValue2] = useState('');
  const [deadline, setInputValue3] = useState('');
  const [priority, setInputValue4] = useState('');

  const titleF = (event) => {
    setInputValue1(event.target.value);
  };

  const descriptionF = (event) => {
    setInputValue2(event.target.value);
  };

  const  deadlineF = (event) => {
    setInputValue3(event.target.value);
  };

  const priorityF = (event) => {
    setInputValue4(event.target.value);
  };
  const handleLogValues = () => {
    setShowNewTask(false)
    tasks.push({item: {
      0: title,
      1: description,
      2: deadline,
      3: priority,
    }})
  };


  return (
    <div className='page'>
      <div className="newitem">
        <div className="new-item-header"><p1>Add New Task</p1></div>
        <div className="center"><input value={title} onChange={titleF} Placeholder="Title" className="font input-field"></input></div>
        <div className="center"><input value={description} onChange={descriptionF} Placeholder="Description" className="font input-field"></input></div>
        <div className="center"><input value={deadline} onChange={deadlineF} type="date" className="font input-field"></input></div>
        <div className='radio-container'>
          <div className='font left-content'>Priority:</div>
          <div className='center radio-grid'>
            <div value={priority} onChange={priorityF}>
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
}

function App() {
  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <div className="App">
      <NavBar setShowNewTask={setShowNewTask}></NavBar>
      <TaskBar></TaskBar>
      {showNewTask && <NewTask setShowNewTask={setShowNewTask}></NewTask>}
      {tasks.length > 0 ? <Task/> : null}
    </div>
  );
}

export default App;

