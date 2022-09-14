/* eslint-disable react/prop-types */
import React from 'react';
const Note = ({ note, amplitude}) => {

	return (
		<div>
			<p>play {note}, amp: {amplitude/100}</p>
			<p>sleep 1</p>
		</div>
	);
};

export default Note;