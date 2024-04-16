import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const tasks = [];
const titles = [];
const success = () => toast.success("Success, the task was added successfully!");
const successRemove = () => toast.success("Success, the task was removed successfully!");
const succesfulUpdate = () => toast.success("Success, the task was updated succedfully");

const NavBar = ({ setShowNewTask }) => {
  return (
    <div className="header navbar">
      <div></div>
      <div><p1 className="title">Frameworks</p1></div>
      <div className="right-content">
        <button className="entry-button" onClick={() => setShowNewTask(true)}>
          <FontAwesomeIcon icon={faPlus} /> ADD
        </button>
      </div>
    </div>
  );
};

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
};

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
        3: priority ? priority : "No Priority"
      }
    });
    titles.push(title.trim());
    success();
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
          <div onClick={handleLogValues} className='center'>
            <button className='add-button'><FontAwesomeIcon icon={faPlus} /> Add</button>
          </div>
          <div className='center'>
            <button className='delete-button' onClick={() => setShowNewTask(false)}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateTaskForm = ({ taskIndex, onUpdate, onCancel, currentDescription, currentDate, currentPriority }) => {
  const [updatedDescription, setUpdatedDescription] = useState(currentDescription);
  const [updatedDate, setUpdatedDate] = useState(currentDate);
  const [updatedPriority, setUpdatedPriority] = useState(currentPriority);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleUpdateConfirm = () => {
    if (!updatedDescription.trim()) {
      toast.error("Description cannot be empty");
      setDescriptionError(true);
      return;
    }

    onUpdate(taskIndex, updatedDescription, updatedDate, updatedPriority);
  };

  return (
    <div>
      <div className='box'>
        <div>
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => {
              setUpdatedDescription(e.target.value);
              setDescriptionError(false);
            }}
            placeholder="New Description"
            className={`font s-input-field ${descriptionError ? 'error' : ''}`}
          />
        </div>
        <div>
          {descriptionError && <small className="error-message">Description cannot be empty</small>}
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            placeholder="New Deadline"
            className='s-input-field'
          />
        </div>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="Low"
            checked={updatedPriority === 'Low'}
            onChange={() => setUpdatedPriority('Low')}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            checked={updatedPriority === 'Medium'}
            onChange={() => setUpdatedPriority('Medium')}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="High"
            checked={updatedPriority === 'High'}
            onChange={() => setUpdatedPriority('High')}
          />
          High
        </label>
      </div>
      <button onClick={handleUpdateConfirm}>Confirm</button>
      <button onClick={onCancel}>
        <FontAwesomeIcon icon={faTimes} /> Cancel
      </button>
    </div>
  );
};

const Task = () => {
  const [items, setItems] = useState(tasks);
  const [checkedItems, setCheckedItems] = useState(new Array(tasks.length).fill(false));
  const [updateModeIndex, setUpdateModeIndex] = useState(-1);

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleUpdateButtonClick = (index) => {
    setUpdateModeIndex(index);
    succesfulUpdate()
  };

  const handleCancelUpdate = () => {
    setUpdateModeIndex(-1);
  };

  const handleUpdateTask = (index, updatedDescription, updatedDate, updatedPriority) => {
    // Update the task with the new description, date, and priority
    const updatedTask = { ...tasks[index] };
    updatedTask.item[1] = updatedDescription;
    updatedTask.item[2] = updatedDate;
    updatedTask.item[3] = updatedPriority;
    tasks[index] = updatedTask;
    setItems([...tasks]); // Update state to re-render
    setUpdateModeIndex(-1); // Disable update mode
  };

  const handleDeleteButtonClick = (index) => {
    if (index >= 0 && index < tasks.length) {
      const deletedTask = tasks.splice(index, 1);
      setItems([...tasks]);

      if (deletedTask.length > 0) {
        const titleToRemove = deletedTask[0].item[0];
        const titleIndex = titles.indexOf(titleToRemove);
        titles.splice(titleIndex, 1);
      }
      successRemove();
    }
  };

  return (
    <div>
      <ul className="list-container">
        {tasks.map((task, index) => (
          <li className="list" key={index}>
            <div className="center"> <p>{task.item[0]}</p></div>
            <div className="description grid-item"><p>{task.item[1]}</p></div>
            <div className='center'><p>{task.item[2]}</p></div>
            <div className='center'><p>{task.item[3]}</p></div>
            <div className='center'><input checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} type="checkbox" name={`checkbox-${index}`} className="form-check-input" /></div>
            <div className='center'>
              {!checkedItems[index] && (
                <>
                  {updateModeIndex !== index ? (
                    <button className='update-button' onClick={() => handleUpdateButtonClick(index)}>
                      <FontAwesomeIcon icon={faPen} /> Update{/* FontAwesome icon for update */}
                    </button>
                  ) : (
                    <UpdateTaskForm
                      taskIndex={index}
                      onUpdate={handleUpdateTask}
                      onCancel={handleCancelUpdate}
                      currentDescription={task.item[1]}
                      currentDate={task.item[2]}
                      currentPriority={task.item[3]}
                    />
                  )}
                </>
              )}
              <button className='delete-task-button' onClick={() => handleDeleteButtonClick(index)}>
                <FontAwesomeIcon icon={faTimes} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
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
      {tasks.length > 0 ? <Task /> : null}
      {showNewTask && <NewTask setShowNewTask={setShowNewTask}></NewTask>}
    </div>
  );
}

export default App;
