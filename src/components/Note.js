/* eslint-disable react/prop-types */
import React from 'react';
const Note = ({ note, amplitude, duration, rest}) => {
	return (
		<div>
			<p>play :{note}, amp: {amplitude}, release: {duration}</p>
			<p>sleep {rest}</p>
		</div>
	);
};

export default Note;