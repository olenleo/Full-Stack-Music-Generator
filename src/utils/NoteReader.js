
/* eslint-disable no-unused-vars */
const { trie2 } = require('./Trie2');

// Initialise variables
let noteEvents = []; 

const len = 3; // Length of trie 'word', or rather the length of saved note patterns. TODO: This should arrive from props.

// DeltaTime and 'note on' & 'note off'-related variables
// We need to track when notes start and end for rhythm and chords.
let previousNoteAmplitude = 0;
let absoluteTime = 0;
let division = 120;
let offset = null;
let arr = [];
let noteStartDeltaTimes;
// noteStack recieves a set amount (from 'len' constant) of notes; When full, push onto trie and pop the first note!
let noteStack = [];


function NoteReader() {
	//this.division = division
	const trie = new trie2();
	noteStartDeltaTimes = [];

	const setUpMidiData = (trackdata) => {
		
		trackdata.event.sort((a,b) => {
			return a.deltaTime - b.deltaTime;
		});
		for (let e in trackdata) {
            if (e.type === 9) {
                offset = e.deltaTime;
				console.log('Offset: ', offset);
				break;
			}
		}
		trackdata.event.map((event) => {
            if (event.type == 8 || event.type == 9){
                if (event.deltaTime !== 0)
                noteEvents.push(event);
			}
		});
        console.log('TRACKDATA : 1 ', trackdata);
		console.log('Sorted noteEvents:', noteEvents);
	};

	NoteReader.prototype.readJSON = function(midiAsJSON, selectedTrack) {
		console.log('MidiAsJSON', midiAsJSON);
		division = midiAsJSON.timeDivision;
		setUpMidiData(midiAsJSON.track[selectedTrack]);
		// Tracks which midi notes are running; if note N is not running enter -1
		for (let i = 0; i < 127; i++) {
			noteStartDeltaTimes[i] = -1;
		}
		console.log('Total amount of events: ', noteEvents.length);
		for (let i = 0; i < noteEvents.length; i++) {
			handleNote(noteEvents[i], 0);
		}
		return trie;
	};
	/* Bug in time handling. */
	function handleNote(note, lastSeenNoteEnd) {
		absoluteTime = note.deltaTime;
		const pitch = note.data[0];
		const amp = note.data[1];
		console.log('Note ', pitch, ':', amp);
		// A note is ending:
		if (noteOperationIsEnd(note)) {
			// Determine if parser encounters a break, a chord or a new note
			if (lastSeenNoteEnd == absoluteTime) {
				//console.log('Duration 1: ', absoluteTime, ' - ', noteStartDeltaTimes[pitch]);
				note.duration = ((absoluteTime - noteStartDeltaTimes[pitch]) / division * 100.0) / 100.0;
				note.rest = 0;
				note.amp = previousNoteAmplitude;
				insertToStack(note);
			} else {
				// console.log('Rest: ', absoluteTime, ' - ', lastSeenNoteEnd);
				note.duration = ((absoluteTime - noteStartDeltaTimes[pitch]) / division * 100.0) / 100.0;
				noteStartDeltaTimes.splice(parseInt(pitch), 1, -1); // Set noteStartTimes to -1.
				note.rest = (absoluteTime - lastSeenNoteEnd / division * 100.0) / 100.0;
				note.amp = previousNoteAmplitude;
				insertToStack(note);
				lastSeenNoteEnd = absoluteTime;
			}
		// A note is starting: 
		} else if (noteOperationIsStart) {  
			if (noteStartDeltaTimes[pitch] !== -1) {
				previousNoteAmplitude = amp;
			} else {
				noteStartDeltaTimes.splice(parseInt(pitch), 1, absoluteTime);
				previousNoteAmplitude = amp;
			}
		} else {
			console.log('POIKKEUS:', note);
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
			console.log('Insert: ', noteStack);
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
}
export default NoteReader;
