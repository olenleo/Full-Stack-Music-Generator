
/* eslint-disable no-unused-vars */
const { trie2 } = require('./Trie2');

let noteEvents = []; 

let previousNoteAmplitude = 0;
let absoluteTime = 0;
let division = 120;
let offset = null;
let noteStartDeltaTimes;
let noteStack = [];
let len = 9; // set in readJSON method

function NoteReader() {
	const trie = new trie2();
	noteStartDeltaTimes = [];

	const setUpMidiData = (trackdata) => {
		for (let e in trackdata) {
			if (e.type === 9) {
				offset = e.deltaTime;
				break;
			}
		}
		trackdata.event.map((event) => {
			if (event.type == 8 || event.type == 9){
				if (event.deltaTime !== 0)
					noteEvents.push(event);
			}
		});
	};

	NoteReader.prototype.readJSON = function(midiAsJSON, selectedTrack, trieLength) {
		len = trieLength;
		division = midiAsJSON.timeDivision;
		setUpMidiData(midiAsJSON.track[selectedTrack]);
		for (let i = 0; i < 127; i++) {
			noteStartDeltaTimes[i] = -1;	
		}
		for (let i = 0; i < noteEvents.length; i++) {
			handleNote(noteEvents[i], 0);
		}
		return trie;
	};

	function handleNote(note, lastSeenNoteEnd) {
		absoluteTime = note.deltaTime;
		const pitch = note.data[0];
		const amp = note.data[1];
		if (noteOperationIsEnd(note)) {
			if (lastSeenNoteEnd == absoluteTime) {
				note.duration = ((absoluteTime - noteStartDeltaTimes[pitch]) / division * 100.0) / 10.0;
				note.rest = 0;
				note.amp = previousNoteAmplitude;
				insertToStack(note);
			} else {
				note.duration = ((absoluteTime - noteStartDeltaTimes[pitch]) / division * 100.0) / 10.0;
				note.rest = (absoluteTime - lastSeenNoteEnd / division * 100.0) / 10.0;
				note.amp = previousNoteAmplitude;
				insertToStack(note);
				noteStartDeltaTimes.splice(parseInt(pitch), 1, -1); 
				lastSeenNoteEnd = absoluteTime;
			}
		} else if (noteOperationIsStart) {  
			if (noteStartDeltaTimes[pitch] !== -1) {
				previousNoteAmplitude = amp;
			} else {
				noteStartDeltaTimes.splice(parseInt(pitch), 1, absoluteTime);
				previousNoteAmplitude = amp;
			}
		} else {
			console.log('Exception:', note);
		}
		return lastSeenNoteEnd;
	}

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
	// Note off commands are expressed by (Midi type 8 : 'note_off' || Note_on x with amplitude 0)
	function noteOperationIsEnd(note) {
		return note.type == 8 || note.data[1] == 0;
	}
}

export default NoteReader;
