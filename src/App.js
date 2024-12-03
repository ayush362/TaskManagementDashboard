import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll } from "./redux/todoapp/actions";
function App() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.operationsReducer);

    return (
        <div>
            <h1 className="text-center font-bold mt-10">
                TASK MANAGER USING REACT-REDUX
            </h1>
            <Form />
            <Todos />
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
