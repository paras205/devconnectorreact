import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT } from './types';

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const createProfile = (FormData, history, edit = false) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const res = await axios.post('api/profile', FormData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const addExperience = (FormData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const res = await axios.put('api/profile/experience', FormData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Experience Added', 'success'));
		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
export const addEducation = (FormData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const res = await axios.put('api/profile/education', FormData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Education Added', 'success'));
		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Experience Deleted', 'danger'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Education Deleted', 'danger'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are You Sure')) {
		try {
			const res = await axios.delete('api/profile');
			dispatch({
				type: CLEAR_PROFILE
			});
			dispatch({
				type: DELETE_ACCOUNT
			});
			dispatch(setAlert('Account Deleted', 'danger'));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
		}
	}
};
