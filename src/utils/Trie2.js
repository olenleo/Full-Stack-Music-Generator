/* eslint-disable no-unused-vars */
// Trie.js - super simple JS implementation
// https://en.wikipedia.org/wiki/Trie

// -----------------------------------------

// Source: https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0

// we start with the TrieNode
function TrieNode(key) {
	// the "key" value will be the character in sequence
	this.key = key;
    
	// we keep a reference to parent
	this.parent = null;
    
	// we have hash of children
	this.children = {};
    
	// the Node contains note information in JSON
	this.contentAsJSON = null;

	// check to see if the node is at the end
	this.end = false;
}
  
// iterates through the parents to get the word.
// time complexity: O(k), k = word length
TrieNode.prototype.getWord = function() {
	let output = [];
	let node = this;
    
	while (node !== null) {
		output.unshift(node.key);
		node = node.parent;
	}
    
	return output.join('');
};
  
// -----------------------------------------
  
// we implement Trie with just a simple root with null value.
function trie2() {
	this.root = new TrieNode(null);
}
  
// inserts a word into the trie.
// time complexity: O(k), k = word length

// TODO: Check that this inserts properly a trie.
trie2.prototype.insert = function(word) {
	let node = this.root; // we start at the root.
	
	// for every character in the word
	for(let i = 0; i < word.length; i++) {
		const pitch = word[i].data[0];
		const amplitude = word[i].data[1];
		// check to see if character node exists in children.
		if (!node.children[pitch]) {
			// if it doesn't exist, we then create it.
			const noteInformationAsJSON = JSON.parse(
				`{
                    "pitch" : ${pitch}, 
                    "amp": ${amplitude}, 
                    "freq": ${1},
                    "children": []
                }`);
            
			node.children[pitch] = new TrieNode(word[i]);
			node.children[pitch].contentAsJSON = noteInformationAsJSON;
        
			// we also assign the parent to the child node.
			node.children[pitch].parent = node;
		} else {
			// increase freq by one!
			node.children[pitch].contentAsJSON.freq = node.children[pitch].contentAsJSON.freq + 1;
		}
      
		// proceed to the next depth in the trie.
		node = node.children[pitch];
      
		// finally, we check to see if it's the last word.
		if (i == word.length-1) {
			// if it is, we set the end flag to true.
			node.end = true;
		}
	}
};
  
// check if it contains a whole word.
// time complexity: O(k), k = word length
trie2.prototype.contains = function(word) {
	let node = this.root;
    
	// for every character in the word
	for(let i = 0; i < word.length; i++) {
		// check to see if character node exists in children.
		if (node.children[word[i]]) {
			// if it exists, proceed to the next depth of the trie.
			node = node.children[word[i]];
		} else {
			// doesn't exist, return false since it's not a valid word.
			return false;
		}
	}
    
	// we finished going through all the words, but is it a whole word?
	return node.end;
};
  
// returns every word with given prefix
// time complexity: O(p + n), p = prefix length, n = number of child paths
trie2.prototype.find = function(prefix) {
	let node = this.root;
	let output = [];
    
	// for every character in the prefix
	for(let i = 0; i < prefix.length; i++) {
		// make sure prefix actually has words
		if (node.children[prefix[i]]) {
			node = node.children[prefix[i]];
		} else {
			// there's none. just return it.
			return output;
		}
	}
    
	// recursively find all words in the node
	findAllWords(node, output);
    
	return output;
};
  
// recursive function to find all words in the given node.
function findAllWords(node, arr) {
	// base case, if node is at a word, push to output
	if (node.end) {
		arr.unshift(node.getWord());
	}
    
	// iterate through each children, call recursive findAllWords
	for (let child in node.children) {
		findAllWords(node.children[child], arr);
	}
}

exports.trie2 = trie2;