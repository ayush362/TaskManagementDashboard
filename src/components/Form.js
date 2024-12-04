import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, handleEditSubmit } from "../redux/todoapp/actions";

const Form = ({ editFormVisibility, editTodo, cancelUpdate }) => {
    const dispatch = useDispatch();
    const [todoValue, setTodoValue] = useState("");
    const [editValue, setEditValue] = useState("");
    const [dueDateValue, setDueDateValue] = useState("");
    const [updateConfirmation, setUpdateConfirmation] = useState(false); // Confirmation message state

    useEffect(() => {
        setEditValue(editTodo.todo);
    }, [editTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj = {
            id: time,
            todo: todoValue,
            completed: false,
            dueDate: dueDateValue, // Include due date
        };
        setTodoValue("");
        dispatch(addTodo(todoObj));
    };

    const editSubmit = (e) => {
        e.preventDefault();
        let editedObj = {
            id: editTodo.id,
            todo: editValue,
            completed: false,
        };
        dispatch(handleEditSubmit(editedObj));
        setUpdateConfirmation(true); // Show confirmation message
        setTimeout(() => {
            setUpdateConfirmation(false); // Hide message after 3 seconds
        }, 3000);
    };

    return (
        <div className="max-w-lg mx-auto my-10">
            {editFormVisibility === false ? (
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 shadow-lg rounded-lg p-6 space-y-4"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Todo
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            value={todoValue || ""}
                            onChange={(e) => setTodoValue(e.target.value)}
                            className="w-full mb-3 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d9a1ae] bg-gray-50"
                            placeholder="Write your task here..."
                        />
                        <label htmlFor="">Due Date</label>
                        <input
                            type="date"
                            value={dueDateValue}
                            onChange={(e) => setDueDateValue(e.target.value)}
                            placeholder="Due Date"
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d9a1ae] bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 mt-2 text-white bg-[#d9a1ae] rounded-full hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-[#d9a1ae]"
                    >
                        Add Task
                    </button>
                </form>
            ) : (
                <form
                    onSubmit={editSubmit}
                    className="bg-gray-100 shadow-lg rounded-lg p-6 space-y-4"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Todo
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={editValue || ""}
                            onChange={(e) => setEditValue(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d9a1ae] bg-gray-50"
                            placeholder="Update your task here..."
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 text-white bg-[#d9a1ae] rounded-full hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-[#d9a1ae]"
                        >
                            Update Task
                        </button>
                        <button
                            onClick={cancelUpdate}
                            type="button"
                            className="flex-1 px-6 py-3 text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                    {updateConfirmation && (
                        <p className="mt-4 text-green-600">
                            Task updated successfully!
                        </p>
                    )}
                </form>
            )}
        </div>
    );
};

export default Form;
