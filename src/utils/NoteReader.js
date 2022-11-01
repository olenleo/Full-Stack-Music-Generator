
/* eslint-disable no-unused-vars */
const { trie2 } = require('./Trie2');

// Initialise variables
let noteEvents = []; 

const len = 5; // Length of trie 'word', or rather the length of saved note patterns. TODO: This should arrive from props.

// DeltaTime and 'note on' & 'note off'-related variables
// We need to track when notes start and end for rhythm and chords.



let lastSeenNoteEnd = -1;
let lastSeenNoteStart = 0;
let previousNoteAmplitude = 0;
let absoluteTime = 0;
let division = 120;
let offset = null;
let arr = [];


// noteStack recieves a set amount (from 'len' constant) of notes; When full, push onto trie and pop the first note!
let noteStack = [];


function NoteReader() {
	//this.division = division
	const trie = new trie2();
	let noteStartDeltaTimes = []; // Tracks which midi notes are running; if note N is not running enter -1
	for (let i = 0; i < 127; i++) {
		noteStartDeltaTimes[i] = -1;
    }
	const setUpMidiData = (trackdata) => {
       
		noteStack = [];
		trackdata.event.sort((a,b) => {
			return a.deltaTime - b.deltaTime;
		});
		trackdata.event.map((event) => {
            
			if (event.type == 8 || event.type == 9){
				noteEvents.push(event);
			}
		}
		);
        
		
       
	};

	NoteReader.prototype.readJSON = function(midiAsJSON, selectedTrack) {
		console.log('MidiasjJSON', midiAsJSON);
		division = midiAsJSON.timeDivision;
		console.log('Division set as', division);
		setUpMidiData(midiAsJSON.track[selectedTrack]);
		for (let i = 0; i < noteEvents.length; i++) {
			lastSeenNoteEnd = handleNote(noteEvents[i], lastSeenNoteEnd);
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
			if (lastSeenNoteEnd == absoluteTime) {
                //console.log('Duration 1: ', absoluteTime, ' - ', noteStartDeltaTimes[pitch]);
				note.duration = (absoluteTime - noteStartDeltaTimes[pitch]);
				note.rest = 0;
				insertToStack(note);
			} else {
                //console.log('Duration 2: absolutTime', absoluteTime, ' - startTime', noteStartDeltaTimes[pitch]);
               // console.log('Rest: ', absoluteTime, ' - ', lastSeenNoteEnd);
				note.duration  = (absoluteTime - noteStartDeltaTimes[pitch]);
				noteStartDeltaTimes.splice(parseInt(pitch), 1, -1);
				note.rest = (absoluteTime - lastSeenNoteEnd);
				insertToStack(note);
				lastSeenNoteEnd = absoluteTime;
			}
            console.log('Note ', pitch, ' end at ', absoluteTime, ': ', noteStartDeltaTimes[pitch] === absoluteTime);
            console.log(note);
		// A note is starting: 
		} else if (noteOperationIsStart) {  
			noteStartDeltaTimes.splice(parseInt(pitch), 1, absoluteTime);
			console.log('Note ', pitch, ' Started at ', absoluteTime, ': ', noteStartDeltaTimes[pitch] === absoluteTime);
            
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
}
export default NoteReader;
