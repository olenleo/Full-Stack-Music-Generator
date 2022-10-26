/* eslint-disable no-unused-vars */
const { trie2 } = require('./Trie2');

// Initialise variables
let noteEvents = []; 
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
const tresholds = [109,97,85,73,61,49,37,25,13];
let totalReadNotes = 0;

const trie = new trie2;
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


function NoteReader() {
	//this.division = division
}

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
};

NoteReader.prototype.readJSON = function(midiAsJSON, selectedTrack) {
	setUpMidiData(midiAsJSON.track[selectedTrack]);
	for (let i = 0; i < noteEvents.length; i++) {
		handleNote(noteEvents[i], previousNoteEndDeltatime);
	}
	return trie;
};

function handleNote(note, lastNoteEnd) {
	absoluteTime = note.deltaTime;
	const pitch = note.data[0];
	const amp = note.data[1];
	// A note is ending:
	if (noteOperationIsEnd(note)) {
		// Determine if parser encounters a break, a chord or a new note
		if (lastSeenNoteEnd <= absoluteTime) {
			// No notes were running: The last seen note end equals current, absolute time.
			// insert(pitch, amp, duration, rest, trie)
			insertToStack(note);
			lastSeenNoteEnd = absoluteTime;
		} else {
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
	}
	return lastSeenNoteEnd;
}
/**
 * Insert a Note object
 */
function insertToStack(note) {
	if (noteStack.length <= len) {
		noteStack.push(note);
	} else {
		const [first, ...rest] = noteStack;
		noteStack = rest;
		trie.insert(noteStack);
	}
}

// Note_on with amplitude 0 equals a note_off
function noteOperationIsStart(note) {
	return note.type == 9 && note.data[1] > 0;
}
// Note off commands are expressed by either
// Midi type 8 : 'note_off'
// or
// Note_on x with amplitude 0
function noteOperationIsEnd(note) {
	return note.type == 8 || note.data[1] == 0;
}

export default NoteReader;