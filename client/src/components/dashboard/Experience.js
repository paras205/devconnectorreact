import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Experience = ({ experience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment>
			</td>
			<td>{exp.to === null ? ' Currently Working ' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}</td>
			<td>
				<button className="btn btn-danger">Delete</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm" colSpan="2">
							Years
						</th>
						<th className="hide-sm">Action</th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired
};

export default connect()(Experience);
