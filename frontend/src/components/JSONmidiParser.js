/* eslint-disable react/prop-types */
import React from 'react';

const JSONmidiParser = ({midiData, title, track}) => {
	console.log('Hi, parsing track', track);
	if (midiData.length === 0) {
		return (
			<div>
				<h3>The midi data should be here.</h3>
				<p>The backend has not probably loaded the information yet.</p>
			</div>
		);
	}
	const data = midiData.track[track];
	console.log('JSON midi parser data is : ', data);
	const tracks = midiData.track.length;
	if (track === null || track === undefined) {
		return(
			<div>
				<p>Waiting on track selection</p>
			</div>
		);
	}
	return (
		<div>
			<h3>Midi data:</h3>
			<p>Track title: {title}</p>
			<p>Number of tracks: {tracks}</p>
			<p>Render track:</p>
			
		</div>
	);
};
export default JSONmidiParser;