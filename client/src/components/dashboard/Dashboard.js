import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
// import Experience from './Experience';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
				</Fragment>
			) : (
				<Fragment>
					Please add some Info <br />
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
			{/* <Experience experience={profile.experience} /> */}

			<div className="my-2">
				<button className="btn btn-danger" onClick={() => deleteAccount()}>
					<i className="fas fa-user-minus" />
					Delete My Account
				</button>
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
