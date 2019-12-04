import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profiles';

export default combineReducers({
	alerts,
	auth,
	profile
});
