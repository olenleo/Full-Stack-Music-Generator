// Necessary variables for midi manipulation

let num = 0.05;
let tableOfOdds = [];
let sumOfOdds = 0;

function getDouble() {
	return  Math.random();
}

/**
 * Generate a new note sequence from frequency of notes in trie
 * @param {*} root Root node in Trie
 * @param {*} freqArray Array 1-127 containing frequency of note occurences
 * @param {*} depth Current depth in trie
 */
function generateNoteChain(root, freqArray, depth) {
	if (root.end) {
		return freqArray;
	}
	num = getDouble();
	sumOfOdds = 0; 
	createTableOfOdds(root);
	calculateOdds();
	console.log('Table of odds: ', tableOfOdds);
	for (let i = 0; i < 127; i++) {
		if (num <= tableOfOdds[i] && tableOfOdds[i] > 0) {
			//let noteDuration = Math.round(root.children[i].note.duration / 480 * 100.0) / 100.0;
			//let timeToNextNote = root.children[i].note.rest;

			const contentAsJSON = JSON.parse(
				`{
                    "pitch" : ${i}, 
                    "amp": ${root.children[i].contentAsJSON.amp}, 
                    "duration": 1,
                    "rest": 1,
                    "freq": ${root.children[i].contentAsJSON.freq},
                    "children": []
                }`);
			freqArray[depth] = contentAsJSON;
			num = getDouble();
			return generateNoteChain(root.children[i], freqArray, depth + 1);
		}
		if (num > tableOfOdds[i] && tableOfOdds[i] > 0) {
			const contentAsJSON = JSON.parse(
				`{
                    "pitch" : ${i}, 
                    "amp": ${root.children[i].contentAsJSON.amp}, 
                    "duration": 1,
                    "rest": 1,
                    "freq": ${root.children[i].contentAsJSON.freq},
                    "children": []
                }`);
			freqArray[depth] = contentAsJSON;
			num = getDouble();
			return generateNoteChain(root.children[i], freqArray, depth + 1);
		}
	}
}


function createTableOfOdds(root) {
	// Generate empty array
	tableOfOdds = Array.apply(null, Array(127)).map(Number.prototype.valueOf,0);
	for (let i = 0; i < 127; i++){
		if (root.children[i] !== undefined) {
			tableOfOdds[i] = root.children[i].contentAsJSON.freq;
			sumOfOdds += root.children[i].contentAsJSON.freq;
		}
	}
}

function calculateOdds() {
	let previous = tableOfOdds[0] / sumOfOdds;
	tableOfOdds[0] = previous;
	for (let i = 1; i < tableOfOdds.length; i++) {
		if (tableOfOdds[i] != 0) {
			let current = tableOfOdds[i] / sumOfOdds;
			tableOfOdds[i] = (previous + current);
			previous = tableOfOdds[i];
		}
	}
}


export default generateNoteChain;


