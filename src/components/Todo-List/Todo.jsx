import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

import { getDataFromLocalstorage } from "./utils/Utils";
import "./todo.css";

const Todo = () => {
  const [todos, setTodos] = useState(getDataFromLocalstorage());
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState("");
  const [isedit, setIsedit] = useState(false);
  const [update, setUpdate] = useState(0);
  const [id, setId] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleInputs = (e) => {
    setInputs(e.target.value);
  };

  const setDataInLocalstorage = (updatetolist) => {
    localStorage.setItem("todos", JSON.stringify(updatetolist));
  };

  const addTodo = () => {
    setTodos([...todos, { task: input, completed: false }]);
    setInput("");
    setDataInLocalstorage([...todos, { task: input, completed: false }]);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    setDataInLocalstorage(updatedTodos);
  };

  const getTodo = (index) => {
    const findTodo = todos.find((todo, idx) => idx === index);
    setInputs(findTodo.task);
    setIsedit(true);
    setUpdate(index);
    setId(index);
  };

  const updateTodo = () => {
    const updatedList = [...todos];
    updatedList[update].task = inputs;
    setTodos(updatedList);
    setInputs("");
    setIsedit(false);
    setId(null);
    setDataInLocalstorage(updatedList);
  };

  const deleteTodo = (index) => {
    const filterTodo = todos.filter((todo, idx) => index !== idx);
    setTodos(filterTodo);
    setDataInLocalstorage(filterTodo);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <div className="todos">
        <div className="todo-container">
          <div className="todo__add--task">
            <input
              className="add__task--input"
              type="text"
              placeholder="Write a new task"
              value={input}
              onChange={handleInput}
            />
            <button onClick={addTodo} className="add__task-btn">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <ul className="all_tasks">
            {todos.map((todo, index) => (
              <li id="1" key={index}>
                <hr className="todo-border" />
                <div className="todo-section">
                  <div className="todo__edit">
                    <span className="">
                      {/* <i
                        id="checked1"
                        className={`fa fa-check complete-icon ${
                          todo.completed ? "completed" : ""
                        }`}
                        onClick={() => toggleComplete(index)}
                      ></i> */}
                      <FaCheck
                        id="checked1"
                        className={`fa fa-check complete-icon ${
                          todo.completed ? "completed" : ""
                        }`}
                        onClick={() => toggleComplete(index)}
                      />
                    </span>
                    <p
                      className={`todo__edit--input ${
                        todo.completed ? "completed-text" : ""
                      }`}
                    >
                      {isedit && id === index ? (
                        <input
                          className="edit__task"
                          onChange={handleInputs}
                          value={inputs}
                        />
                      ) : (
                        todo.task
                      )}
                    </p>
                  </div>
                  <div className="todo__left--icons">
                    {!todo.completed && (
                      <span
                        onClick={isedit ? updateTodo : () => getTodo(index)}
                        className="todo__edit--icon"
                      >
                        {isedit && id === index ? (
                          <i className="fa-regular fa-floppy-disk"></i>
                        ) : (
                          <i className="fa fa-edit"></i>
                        )}
                      </span>
                    )}
                    <span onClick={() => deleteTodo(index)} className="">
                      <i className="fa fa-trash"></i>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
