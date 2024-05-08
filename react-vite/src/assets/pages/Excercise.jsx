import React, { useState } from 'react';

function ExerciseToDoList() {
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [toDoList, setToDoList] = useState([]);

  const handleFormSubmit = () => {

    const newItem = {
      title,
      id,
      date,
      imageUrl,
    };

    setToDoList((prevList) => [...prevList, newItem]);
    setTitle('');
    setId('');
    setDate('');
    setImageUrl('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <form>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Add a date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Add input for image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
      
      <TodoList items={toDoList} />
    </div>
  );
}

function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.title} {item.id} ({item.date}) {item.imageUrl}
        </li>
      ))}
    </ul>
  );
}

export default ExerciseToDoList;
