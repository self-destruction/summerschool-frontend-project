import UserApiService from "../api_services/UserApiService";

const userApiService = new UserApiService("/api");

// Constants
export const actionTypes = {
    FETCH_USERS_START: "FETCH_USERS_START",
    FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
};

// Action creators
function requestUsers() {
    return {
        type: actionTypes.FETCH_USERS_START,
    };
}

function receiveUsers(users) {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users,
    };
}

export function fetchUsers() {
    return function(dispatch) {
        dispatch(requestUsers());
        return userApiService.getUsers().then(response => {
            dispatch(receiveUsers(response.data));
        });
    };
}

// Reducers
const initialState = {
    items: [],
    isFetching: false,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                isFetching: true,
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.users,
            };
        default:
            return state;
    }
}
