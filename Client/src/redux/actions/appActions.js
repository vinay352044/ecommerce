export const SET_LOADER = "SET_LOADER"

export const setLoader = (loader) => {
	return {
		type: SET_LOADER,
		payload: loader,
	}
}
