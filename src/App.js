import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll } from "./redux/todoapp/actions";
import { useState } from "react";
function App() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.operationsReducer);

    const [editFormVisibility, setEditFormVisibility] = useState(false);
    const [editTodo, setEditTodo] = useState("");
    const handleEditClick = (todo) => {
        setEditFormVisibility(true);
        setEditTodo(todo);
    };

    const cancelUpdate = () => {
        setEditFormVisibility(false);
    };

    return (
        <div>
            <h1 className="text-center font-bold mt-10">
                TASK MANAGER USING REACT-REDUX
            </h1>
            <Form
                editFormVisibility={editFormVisibility}
                editTodo={editTodo}
                cancelUpdate={cancelUpdate}
            />
            <Todos
                handleEditClick={handleEditClick}
                editFormVisibility={editFormVisibility}
            />
            {todos.length > 0 && (
                <p
                    className="max-w-md mx-auto bg-red-500 text-white border-2 py-2 px-3 text-center"
                    onClick={() => dispatch(deleteAll())}
                >
                    Delete All
                </p>
            )}
        </div>
    );
}

export default App;
