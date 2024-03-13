import { REMOVE_ROLE, SET_ROLE } from "../actions/roleAction";

const initialState = JSON.parse(localStorage.getItem('role')) || {
    isAuth : false,
    admin: null,
    user: null,
    seller: null
}

const roleReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ROLE: {
            const {roleType, roleData} = action.payload;
            const newState = {...state, isAuth : true , [roleType]: roleData};
            return newState;
        }
        case REMOVE_ROLE: {
            return {
                isAuth : false,
                admin: null,
                user: null,
                seller: null
            };
        }
        default: {
            return state;
        }
    }
}

export {roleReducer};