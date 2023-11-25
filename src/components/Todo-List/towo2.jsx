import { useEffect, useState } from "react";
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
    setTodos([...todos, input]);
    setInput("");
    setDataInLocalstorage([...todos, input]);
  };

  const getTodo = (id) => {
    const findTodo = todos.find((todo, index) => index === id);
    setInputs(findTodo);
    setIsedit(true);
    setUpdate(id);
    setId(id);
    setDataInLocalstorage(findTodo);
  };

  const updateTodo = () => {
    todos[update] = inputs;
    setInputs("");
    setIsedit(false);
    setId(null);
    setDataInLocalstorage(todos);
  };

  const deleteTodo = (id) => {
    const filterTodo = todos.filter((todo, index) => id !== index);
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
              Add task
            </button>
            <i className="fa fa-pencil-square"></i>
          </div>
          <ul className="all_tasks">
            {todos.map((todo, index) => (
              <li id="1" key={index}>
                <hr className="todo-border" />
                <div className="todo-section">
                  <div className="todo__edit">
                    <span className="">
                      <i id="checked1" className=" fa fa-check"></i>
                    </span>
                    <p className="todo__edit--input">
                      {isedit && id === index ? (
                        <input
                          className="edit__task"
                          onChange={handleInputs}
                          value={inputs}
                        />
                      ) : (
                        todo
                      )}
                    </p>
                  </div>
                  <div className="todo__left--icons">
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
