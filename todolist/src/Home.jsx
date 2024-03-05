// import React, {useState} from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import Create from "./Create";
import "./App.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const getTasks = () =>
    axios
      .get("http://localhost:3001/get")
      // гет запрос на сервер получение данных в констнту g

      .then((result) => {
        setTodos(result.data); // запусываем в массив [] данные из запроса http://localhost:3001/get
      })
      .catch((err) => console.log(err));

  const deleteTask = (id) =>
    axios
      .post("http://localhost:3001/delete", {
        taskId: id,
      })
      .then(() => getTasks());

  const check = (id, isChecked) =>
    axios.post("http://localhost:3001/check", {
      task: id,
      isChecked,
    });

  useEffect(() => {
    getTasks(); // вызываем функцию g при запуске страницы 1 раз!!!
  }, []);

  return (
    <div className="home">
      <h2>ToDo List</h2>
      <Create onAdd={getTasks} />
      {/* draw "create" component and pass finctioin g() without init */}
      <ul>
        {todos.map((todo) => {
          console.log(todo.checked);
          return (
            <li className="line" key={todo._id}>
              <input
                type="checkbox"
                defaultChecked={todo.checked}
                onChange={(event) => check(todo._id, event.target.checked)}
              ></input>
              <span className="todoText">{todo.task}</span>
              <button onClick={() => deleteTask(todo._id)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
