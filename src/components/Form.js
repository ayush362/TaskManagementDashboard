import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoapp/actions";

const Form = () => {
    const dispatch = useDispatch();
    const [todoValue, setTodoValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj = {
            id: time,
            todo: todoValue,
            completed: false,
        };
        setTodoValue("");
        dispatch(addTodo(todoObj));
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4 my-10"
        >
            <label
                htmlFor="todo"
                className="block text-lg font-medium text-gray-700"
            >
                Add your Todo Items
            </label>
            <div className="flex items-center space-x-4">
                <input
                    id="todo"
                    type="text"
                    required
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your task here..."
                />
                <button
                    type="submit"
                    className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default Form;
