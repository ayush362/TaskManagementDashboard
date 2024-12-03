import {
    ADD_TODO,
    DELETE_ALL,
    REMOVE_TODO,
    UPDATE_CHECKBOX,
    UPDATE_TODO,
} from "../actions";

const initialState = [
    { id: 1, todo: "Learn React", completed: false },
    { id: 2, todo: "Learn Redux", completed: false },
    { id: 3, todo: "Learn Node", completed: true },
];

export const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];

        case DELETE_ALL:
            return [];

        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.payload);

        case UPDATE_TODO:
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload } // Spread the updated properties
                    : item
            );

        case UPDATE_CHECKBOX:
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, completed: !item.completed } // Toggle the `completed` property
                    : item
            );

        default:
            return state;
    }
};
