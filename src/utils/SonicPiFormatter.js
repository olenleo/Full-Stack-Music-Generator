/* eslint-disable react/prop-types */
/**
 * Component returns a Sonic Pi compatible program
 * @param {trackdata} JSON parsed midi data
 * @param {trieLength} The length of the note sequence stored in the Trie
 * @returns 
 */

import React from 'react';
import Note from '../components/Note';
import uniqid from 'uniqid';

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

const formatAndPushNoteEvent = (item, index) => {
	console.log('item:', item, index);
	item.forEach(note => {
		const pitch = parseNote(note.pitch);
		const key = uniqid('index-', index);
		const noteAsJSON = {
			'pitch' : `${pitch}`,
			'amp' : `${note.amp}`,
			'key' : `${key}`
		};
        
		noteEvents.push(noteAsJSON);
	});
    
};


const SonicPiFormatter =( {result} ) => {
	console.log('Sonic Pi formatter recieves an array:', result);
    
	if (result === undefined) {
		return(<div><p>Please select song title and track.</p></div>);
	}
	noteEvents = [];
	result.map((item, index) => (
		formatAndPushNoteEvent(item, index)
	));
	
	return (
		<div>
			
			<code>
				{noteEvents.map(noteJSONarray => (
					<Note key = {noteJSONarray.key} note={noteJSONarray.pitch} amplitude={noteJSONarray.amp}></Note>
				))}
			</code>            
			
		</div>
	);
	
};

export default SonicPiFormatter;