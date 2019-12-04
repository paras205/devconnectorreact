import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './routes/PrivateRoutes';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	// useEffect instead of componentDidMount for stateless component
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Alert />
						<Switch>
							<Route path="/login" component={LoginPage} />
							<Route path="/register" component={RegisterPage} />
							<PrivateRoute path="/dashboard" component={Dashboard} />
							<PrivateRoute path="/create-profile" component={CreateProfile} />
							<PrivateRoute path="/edit-profile" component={EditProfile} />
							<PrivateRoute path="/add-experience" component={AddExperience} />
							<PrivateRoute path="/add-education" component={AddEducation} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
