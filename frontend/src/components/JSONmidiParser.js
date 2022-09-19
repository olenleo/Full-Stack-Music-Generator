/* eslint-disable react/prop-types */
import React from 'react';
import SonicPiFormatter from '../utils/SonicPiFormatter';

const JSONmidiParser = ({midiData, title, track}) => {
	console.log('JSONmidiParser recieves ', title, midiData, track);

	if (midiData.length === 0) {
		return (
			<div>
				<h3>The midi data should be here.</h3>
				<p>The backend has not probably loaded the information yet.</p>
			</div>
		);
	}
	const data = midiData[0].track;
	console.log('JSON midi parser data is : ', data);
	const tracks = midiData.track.length;
	return (
		<div>
			<h3>Midi data:</h3>
			<p>Track title: {title}</p>
			<p>Number of tracks: {tracks}</p>
			<p>Render track[1]:</p>
			<SonicPiFormatter trackdata={data} trieLength={6}/>
		</div>
	);
};

export default JSONmidiParser;