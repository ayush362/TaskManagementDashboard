import React from "react";
import { useSelector } from "react-redux";
import Icon from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { edit2 } from "react-icons-kit/feather/edit2";

const Todos = () => {
    const todos = useSelector((state) => state.operationsReducer);
    return todos.map((todo) => (
        <div
            key={todo.id}
            className="flex items-center justify-between bg-white max-w-md mx-auto  shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <p
                    className={`text-lg ${
                        todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                    }`}
                >
                    {todo.todo}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                    <Icon icon={edit2} className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 focus:outline-none">
                    <Icon icon={trash} className="w-5 h-5" />
                </button>
            </div>
        </div>
    ));
};

export default Todos;
