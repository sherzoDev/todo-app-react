import "./assets/styles/main.css";
import { List } from "./components/List";
import { Item } from "./components/Item";
import { useRef, useState } from "react";
import { Button } from "./components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const inputValue = useRef();

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleDeleteTodo = (todoId) => {
    console.log(todoId);
    const filteredTodos = todos.filter((item) => item.id !== todoId);
    setTodos([...filteredTodos]);
    toast.error("Todo o'chirildi");
  };

  const handleEditTodo = (todoId, todoText) => {
    const newText = prompt("Yangi todo kiriting", todoText);
    console.log(newText);
    const findedTodo = todos.find((item) => item.id === todoId);
    findedTodo.text = newText;
    setTodos([...todos]);
    toast.warning("Todo o'zgartirildi");
  };

  const handleCompleteTodo = (todoId) => {
    const findedTodo = todos.find((item) => item.id === todoId);
    findedTodo.isCompleted = !findedTodo.isCompleted;
    setTodos([...todos]);
    toast.info("Todo bajarildi");
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const newObj = {
      id: todos.length ? todos.at(-1).id + 1 : 1,
      text: inputValue.current.value,
      isCompleted: false,
    };
    setTodos([...todos, newObj]);
    inputValue.current.value = "";
    toast.success("Todo qo'shildi");
  };

  localStorage.setItem("todos", JSON.stringify(todos));

  return (
    <div className="app">
      <h1 className="text-center display-1">TODO APP</h1>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 p-5 shadow">
            <form onSubmit={handleFormSubmit}>
              <div className="input-group">
                <input
                  ref={inputValue}
                  className="form-control"
                  type="text"
                  placeholder="Todo..."
                />
                <Button type="submit" className="btn btn-primary">
                  SEND
                </Button>
              </div>
            </form>
            {todos.length ? (
              <List>
                {todos.map((item) => (
                  <Item
                    handleDeleteTodo={handleDeleteTodo}
                    handleEditTodo={handleEditTodo}
                    handleCompleteTodo={handleCompleteTodo}
                    key={item.id}
                    {...item}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center mt-3">HALI TODOLAR YO'Q</h2>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
