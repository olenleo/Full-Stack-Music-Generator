const { Trie } = require('./Trie');
/* eslint-disable no-unused-vars */
// Initialise variables
let noteEvents = []; 
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
const tresholds = [109,97,85,73,61,49,37,25,13];
let totalReadNotes = 0;

const trie = new Trie;
const len = 5; // Length of trie 'word', or rather the length of saved note patterns. TODO: This should arrive from props.

// DeltaTime and 'note on' & 'note off'-related variables
// We need to track when notes start and end for rhythm and chords.
let noteStartDeltaTimes = []; // Tracks which midi notes are running; if note N is not running enter -1
for (let i = 1; i <= 127; i++) {
	noteStartDeltaTimes.push(-1);
}
let lastSeenNoteEnd = -1;
let lastSeenNoteStart = 0;
let previousNoteAmplitude = 0;
let previousNoteEndDeltatime = 0;
let absoluteTime = 0;

// noteStack recieves a set amount (from 'len' constant) of notes; When full, push onto trie and pop the first note!
let noteStack = [];

// Track the frequency of each note here.
let freqArray = [];
for (let i = 0; i < len; i++) {
	freqArray.push('');
}

function NoteReader() {
	//this.division = division
}


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

const setUpMidiData = (trackdata) => {
	noteStack = [];
	trackdata.event.map((event) => {
		if (event.type == 9 || event.type == 8){
			noteEvents.push(event);
		}
	}
	);
	trackdata.event.sort((a,b) => {
		return a.deltaTime - b.deltaTime;
	});
	console.log('Complete', noteEvents); 
};

NoteReader.prototype.readJSON = function(midiAsJSON, selectedTrack) {
	console.log('NoteStack:', noteStack);
	setUpMidiData(midiAsJSON.track[selectedTrack]);
	for (let i = 0; i < noteEvents.length; i++) {
		handleNote(noteEvents[i], previousNoteEndDeltatime);
	}
};

function handleNote(note, lastNoteEnd) {
	absoluteTime = note.deltaTime;
	const pitch = note.data[0];
	const amp = note.data[1];
	// A note is ending:
	if (noteOperationIsEnd(note)) {
        
		if (absoluteTime > 0) {
			//
		}
		// Determine if parser encounters a break, a chord or a new note
		if (lastSeenNoteEnd == absoluteTime - 1) {
			//console.log('end type 1  for ', pitch);
			// No notes were running: The last seen note end equals current, absolute time.
			//console.log('END 1:',pitch, amp, absoluteTime - noteStartTimes[pitch], 0)
			// insert(pitch, amp, duration, rest, trie)
			insertToStack(note);
		} else {
			//console.log('end type 2 for ', pitch);
			// A note was running; this is a chord!
			noteStartDeltaTimes.splice(parseInt(pitch), 0, 0);
			// insert(pitch, amp, duration, rest, trie)
			insertToStack(note);
			previousNoteEndDeltatime = absoluteTime;
		}
		// A note is starting: 
	} else if (noteOperationIsStart) {  
		noteStartDeltaTimes.splice(parseInt(pitch), 0, absoluteTime);
		previousNoteAmplitude = amp;
		lastSeenNoteStart = absoluteTime;
		//console.log('New note [', pitch, ']', noteStartDeltaTimes[parseInt(pitch)], 'start at ', absoluteTime);
	}
	return lastSeenNoteEnd;
}
/**
 * Insert operation
 * @param {*} pitch: note pitch, integer 1-127
 * @param {*} amp: note amplitude, integer 0-127
 * @param {*} duration: note duration in midi time units, integer > 1. Duration = 0 -> chords
 * @param {*} rest: this is a break, duration in midi time unitis, integer > 1 
 */
function insertToStack(note) {
	if (noteStack.length < len) {
		noteStack.push(note);
	} else {
		const [first, ...rest] = noteStack;
		console.log('First, rest: ', first, ' --- ', rest);
		noteStack = rest;
	}
}

// ! note_on with amplitude 0 is a note_off !
function noteOperationIsStart(note) {
	
	return note.type == 9 && note.data[1] > 0;
}
// Note off commands are expressed by:
// Midi type 8 : 'note_off'
// and
// Note x with amplitude 0
function noteOperationIsEnd(note) {
	return note.type == 8 || (note.data[1] == 0);
}

export default NoteReader;