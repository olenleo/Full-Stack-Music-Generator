/* eslint-disable no-unused-vars */
// Trie.js - super simple JS implementation
// https://en.wikipedia.org/wiki/Trie

// -----------------------------------------

// Source: https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0

// we start with the TrieNode
function TrieNode(key) {
	this.key = key;
	this.parent = null;
	this.children = {};
	this.contentAsJSON = null;
	this.end = false;
}
  
function trie2() {
	this.root = new TrieNode(null);
}

trie2.prototype.insert = function(word) {
	let node = this.root;
	for(let i = 0; i < word.length; i++) {
		const pitch = word[i].data[0];
		const amplitude = word[i].data[1];
		if (!node.children[pitch]) {
			const noteInformationAsJSON = JSON.parse(
				`{
                    "pitch" : ${pitch}, 
                    "amp": ${amplitude}, 
                    "duration": ${word[i].duration},
                    "rest": ${word[i].rest},
                    "freq": ${1},
                    "children": []
                }`);
            
			node.children[pitch] = new TrieNode(word[i]);
			node.children[pitch].contentAsJSON = noteInformationAsJSON;
			node.children[pitch].parent = node;
		} else {
			node.children[pitch].contentAsJSON.freq = node.children[pitch].contentAsJSON.freq + 1;
		}
      
		node = node.children[pitch];
		if (i == word.length-1) {
			node.end = true;
		}
	}
};
  
exports.trie2 = trie2;