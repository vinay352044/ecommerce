export const SET_ROLE = "SET_ROLE";

export const setRole = (roleType, roleData) => {
    return {
        type: SET_ROLE,
        payload: {
            roleType, roleData
        }
    }
}