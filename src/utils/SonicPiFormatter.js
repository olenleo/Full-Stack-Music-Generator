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
const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B', 'C'];
const tresholds = [109,97,85,73,61,49,37,25,13];

const parseNote = (note) => {
    
	if (typeof note === String) {
		return 0;
	} else if (typeof note === 'number') {
		const letter = note % 12;
		const octave = parseOctave(note);
		return notes[letter] + octave;
	}
};
const parseOctave = (note) => {
	for (const t in tresholds) {
		if (note < 13) {
			return 0;
		} else if (note > tresholds[t]) {
			return 9 - t;
		}
	}
};

const formatAndPushNoteEvent = (item, index) => {
	item.forEach(note => {
		const pitch = parseNote(note.pitch);
		if (note.duration == 0) {
			note.duration = 0.25;
		}
		const key = uniqid('index-', index);
		const noteAsJSON = {
			'pitch' : `${pitch}`,
			'amp' : 1, //`${note.amp}`,
			'duration' : `${note.duration}`,
			'rest' : `${note.rest}`,
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
				<p>use_synth :blade</p>
				<p>with_fx :reverb do</p>
				{noteEvents.map(noteJSONarray => (
					<Note key = {noteJSONarray.key} note={noteJSONarray.pitch} amplitude={noteJSONarray.amp} duration={noteJSONarray.duration} rest = {noteJSONarray.rest} amp = {noteJSONarray.amp}></Note>
				))}
				<p>end</p>
			</code>            
		</div>
	);
};

export default SonicPiFormatter;