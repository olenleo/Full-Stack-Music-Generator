// Initialise variables
let totalReadNotes = 0;
let firstNoteOffset = 0;
const trie = new Trie();
const len = 5; // Length of trie 'word', or rather the length of saved note patterns. TODO: This should arrive from props.

// DeltaTime and 'note on' & 'note off'-related variables
// We need to track when notes start and end for rhythm and chords.
let noteStartDeltaTimes = [];
for (let i = 1; i <= 127; i++) {
	noteStartDeltaTimes.push(1);
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

NoteReader.prototype.readJSON = function(formattedMidi) {
	console.log('READ JSON');
	this.firstNoteOffset = getOffset(formattedMidi) + 1;
	for (let i = 0; i < formattedMidi.length; i++) {
		handleNote(formattedMidi[i], previousNoteEndDeltatime);
	}
	console.log('Read done. Offset was', firstNoteOffset);
	return trie;
};

function handleNote(note, lastNoteEnd) {
	absoluteTime = note.deltaTime - firstNoteOffset + 1;
	const pitch = note.data[0];
	const amp = note.data[1];
	// Note end:
	if (noteOperationIsEnd(note)) {
		if (absoluteTime > 0) {
			console.log('handleNote @ deltatime:', absoluteTime);
		}
		// No notes were running: The last seen note end equals current, absolute time.
		if (lastSeenNoteEnd == absoluteTime) {
			//console.log('END 1:',pitch, amp, absoluteTime - noteStartTimes[pitch], 0, noteStack.length)
			// insert(pitch, amp, duration, rest, trie, noteStack)
			insertToStack(pitch, previousNoteAmplitude, absoluteTime - noteStartDeltaTimes[pitch], 0);
		} else {
			// A note was running; this is a chord!
			noteStartDeltaTimes.splice(parseInt(pitch), 0, 0);
			// pitch, amp, duration, rest, trie, noteStack)
			insertToStack(pitch, previousNoteAmplitude, absoluteTime - noteStartDeltaTimes[pitch], absoluteTime - lastNoteEnd);
			previousNoteEndDeltatime = absoluteTime;
		}
	} else if (noteOperationIsStart) {
		noteStartDeltaTimes.splice(parseInt(pitch), 0, absoluteTime);
		previousNoteAmplitude = amp;
		this.lastSeenNoteStart = absoluteTime;
	}
	return this.lastSeenNoteEnd;
}
/**
 * Insert operation
 * @param {*} pitch: note pitch, integer 1-127
 * @param {*} amp: note amplitude, integer 0-127
 * @param {*} duration: note duration in midi time units, integer > 1. Duration = 0 -> chords
 * @param {*} rest: this is a break, duration in midi time unitis, integer > 1 
 */
function insertToStack(pitch, amp, duration, rest) {
	if (noteStack.length < len) {
		if (rest === null) { rest = 0; }
		const contentAsJSON = JSON.parse(
			`{
                "pitch" : ${pitch}, 
                "amp": ${amp}, 
                "duration": ${duration},
                "rest": ${rest},
                "freq": 1,
                "children": []
            }`);
		noteStack.push(contentAsJSON);
	} else {
		trie.insert(noteStack);
		noteStack.shift();
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

// First note_on might start after deltatime
function getOffset(formattedMidi) {
	for (let i of formattedMidi) {
		return i.deltaTime;
	}
}