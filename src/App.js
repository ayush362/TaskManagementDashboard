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

    const handleDeleteAll = () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete all todos?"
        );
        if (isConfirmed) {
            dispatch(deleteAll());
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10">
            <h1 className="text-center font-bold text-3xl mb-4">
                TASK MANAGER USING REACT-REDUX
            </h1>
            <h2 className="text-center text-gray-600 text-lg mb-8">
                Add, Edit, and Delete your tasks
            </h2>

            {/* Flexbox container */}
            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Left Side: Form */}
                <div className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md h-[400px]">
                    <Form
                        editFormVisibility={editFormVisibility}
                        editTodo={editTodo}
                        cancelUpdate={cancelUpdate}
                    />
                </div>

                {/* Right Side: Todos */}
                <div className="lg:w-1/2">
                    <Todos
                        handleEditClick={handleEditClick}
                        editFormVisibility={editFormVisibility}
                    />
                    {todos.length > 0 && (
                        <p
                            className="mt-6 text-center bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-600 transition"
                            onClick={() => handleDeleteAll()}
                        >
                            Delete All
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
