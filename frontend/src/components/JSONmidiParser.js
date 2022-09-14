/* eslint-disable react/prop-types */
import React from 'react';
import SonicPiFormatter from '../utils/SonicPiFormatter';
const JSONmidiParser = ({midiData}) => {
	console.log('JSONmidiParser recieves ', midiData);
	if (midiData.length === 0) {
		return (
			<div>
				<h3>The midi data should be here.</h3>
				<p>The backend has not probably loaded the information yet.</p>
			</div>
		);
	}
	const data = midiData.track[1];
	const tracks = midiData.track.length;
	return (
		<div>
			<h3>Midi data:</h3>
			<p>Number of tracks: {tracks}</p>
			<p>Render track[1]:</p>
			<SonicPiFormatter trackdata={data} trieLength={6}/>
		</div>
	);
};

export default JSONmidiParser;