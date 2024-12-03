export const ADD_TODO = "ADD_TODO";
export const DELETE_ALL = "DELETE_ALL";
export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload,
    };
};

export const deleteAll = () => {
    return {
        type: DELETE_ALL,
    };
};
