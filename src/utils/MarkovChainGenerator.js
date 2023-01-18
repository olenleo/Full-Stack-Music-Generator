// Necessary variables for midi manipulation

let tableOfOdds = [];
let sumOfOdds = 0;
let num = getDouble();
function getDouble() {
	return  Math.random();
}


function printTrie(root, freqArray, depth) {
    
	if (root.end) {
		console.log(freqArray);
	}
    
	for (let i = 0; i < 127; i++) {
        
		if (root.children[i] != undefined) {
			freqArray[depth] = i;
			printTrie(root.children[i], freqArray, depth + 1);
		}
	}
}


/**
 * Generate a new note sequence from frequency of notes in trie
 * @param {*} root Root node in Trie
 * @param {*} freqArray Array 1-127 containing frequency of note occurences
 * @param {*} depth Current depth in trie
 */
function generateNoteChain(root, freqArray, depth, division) {
	if (root.end) {
		return freqArray;
	}
	

	sumOfOdds = 0; 
	createTableOfOdds(root);
	calculateOdds();
	num = getDouble();
	
	for (let i = 0; i < tableOfOdds.length; i++) {
		if (num <= tableOfOdds[i] && tableOfOdds[i] > 0) {
			let noteDuration = root.children[i].contentAsJSON.duration;
			let timeToNextNote = root.children[i].contentAsJSON.rest;
			const contentAsJSON = JSON.parse(
				`{
                    "pitch" : ${i}, 
                    "amp": ${root.children[i].contentAsJSON.amp}, 
                    "duration": ${Math.abs(noteDuration)},
                    "rest": ${Math.abs(timeToNextNote)},
                    "freq": ${root.children[i].contentAsJSON.freq},
                    "children": []
                }`);
			freqArray[depth] = contentAsJSON;
			return generateNoteChain(root.children[i], freqArray, depth + 1, division);
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


export {generateNoteChain, printTrie};


