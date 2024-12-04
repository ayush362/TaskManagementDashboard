import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { edit2 } from "react-icons-kit/feather/edit2";
import { removeTodo, handleCheckbox } from "../redux/todoapp/actions";

const Todos = ({ handleEditClick, editFormVisibility }) => {
    const todos = useSelector((state) => state.operationsReducer);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState("all"); // Track current filter
    const [searchQuery, setSearchQuery] = useState(""); // Track search input

    // Get current date for overdue tasks
    const currentDate = new Date().toISOString().split("T")[0];

    // Filter logic
    const filteredTodos = todos.filter((todo) => {
        const matchesFilter = (() => {
            switch (filter) {
                case "completed":
                    return todo.completed;
                case "pending":
                    return !todo.completed;
                case "overdue":
                    return (
                        todo.dueDate &&
                        todo.dueDate < currentDate &&
                        !todo.completed
                    );
                default:
                    return true; // 'all' tasks
            }
        })();
        const matchesSearch = todo.todo
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-lg mx-auto my-10">
            {/* Search and Filter */}
            <div className="flex flex-col space-y-4 mb-6">
                {/* Search Bar */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d9a1ae] bg-gray-50"
                />

                {/* Filter Buttons */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    {["all", "completed", "pending", "overdue"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 font-medium rounded-full transition ${
                                filter === type
                                    ? "bg-[#d9a1ae] text-white shadow-md"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)} Tasks
                        </button>
                    ))}
                </div>
            </div>

            {/* Render Filtered Todos */}
            <div className="space-y-4">
                {filteredTodos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-center justify-between bg-gray-100 shadow-lg rounded-lg p-5 hover:shadow-xl transition"
                    >
                        <div className="flex items-center space-x-4">
                            {editFormVisibility === false && (
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    className="w-5 h-5 text-[#d9a1ae] border-gray-300 rounded focus:ring-[#d9a1ae]"
                                    onChange={() =>
                                        dispatch(handleCheckbox(todo.id))
                                    }
                                />
                            )}
                            <p
                                className={`text-lg ${
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                }`}
                            >
                                {todo.todo}{" "}
                                {todo.dueDate && (
                                    <span className="text-sm text-gray-500">
                                        (Due: {todo.dueDate})
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {editFormVisibility === false && (
                                <>
                                    <button className="text-[#d9a1ae] hover:text-pink-700 focus:outline-none">
                                        <Icon
                                            onClick={() =>
                                                handleEditClick(todo)
                                            }
                                            icon={edit2}
                                            className="w-5 h-5"
                                        />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 focus:outline-none">
                                        <Icon
                                            onClick={() =>
                                                dispatch(removeTodo(todo.id))
                                            }
                                            icon={trash}
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todos;
