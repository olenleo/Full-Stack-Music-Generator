/* eslint-disable react/prop-types */
/**
 * Component returns a Sonic Pi compatible program
 * @param {trackdata} JSON parsed midi data
 * @param {trieLength} The length of the note sequence stored in the Trie
 * @returns 
 */

import React from 'react';
import Note from '../components/Note';



let noteEvents = [];
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
const tresholds = [109,97,85,73,61,49,37,25,13];

const parseNote = (note) => {
	if (typeof note === String) {
		return 0;
	} else if (typeof note === 'number') {
		const letter = note % 12;
		const octave = parseOctave(note);
		console.log('Note', note, 'returns ' , notes[letter] + octave);
		return notes[letter] + octave;
	}
};
const parseOctave = (note) => {
	for (const t in tresholds) {
		if (note < 13) {
			return 0;
		} else if (note > tresholds[t]) {
			console.log('note: ', note, t);
			return 9 - t;
		}
	}
};

const formatAndPushNoteEvent = (event, index) => {
	if (event.type === 9 || event.type === 11) {
		const key = '' + event.deltaTime + index;
		const pitch = parseNote(event.data[0]);
		const noteJSONarray = {
			note: `:${pitch}`,
			amp: `${event.data[1]}`,
			sleep: 'sleep 1',
			key: `${key}`
		};
		noteEvents.push(noteJSONarray);
	}
};


const SonicPiFormatter =( {trackdata, track} ) => {
	if (trackdata.length === 0 || track === undefined) {
		return(<div><p>Please select song title and track.</p></div>);
	}
	noteEvents = [];
	console.log('Trackdata[', track, ']', trackdata.track[track]);
	trackdata.track[track].event.sort((a,b) => {
		return a.deltaTime - b.deltaTime;
	});

	trackdata.track[track].event.map((event, index) => (
		formatAndPushNoteEvent(event, index)
	));
	
	return (
		<div>
			<h1>Sonic Pi formatter here</h1>
			<code>
				{noteEvents.map(noteJSONarray => (
					<Note key = {noteJSONarray.key} note={noteJSONarray.note} amplitude={noteJSONarray.amp}></Note>
				))}
			</code>            
			<h1>End Sonic Pi formatter</h1>
		</div>
	);
	
};

export default SonicPiFormatter;