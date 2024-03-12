import { SET_ROLE } from "../actions/roleAction";

const initialState = {
    admin: null,
    user: null,
    seller: null
}

const roleReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ROLE: {
            const {roleType, roleData} = action.payload;
            const newState = {...state, [roleType]: roleData};
            return newState;
        }

        default: {
            return state;
        }
    }
}

export {roleReducer};