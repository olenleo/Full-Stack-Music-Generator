class Node {
	constructor(){
		this.chars = [];
		this.note = {};
		this.endOfWord = false;
	}

	getChildren() {
		return this.chars;
	}
}

class Trie {
	constructor(){
		this.root = new Node();
	}

	insert(word){
		console.log('Insert word: ', word);
		if(!word) return null;
		let current = this.root;

		for(let char of word){            
			// if char does not exist, put an entry
			// use pitch as key
			if(!current.chars.includes(char.pitch)){
				let newNode = new Node();
				newNode.note = char;
				current.chars[char.pitch] = newNode;
			} else {
				current.chars[char.pitch].note.freq += 1;
			}
			// get next node for next iteration
			current = current.chars[char.pitch];
		}
		// mark end of the word
		current.endOfWord = true;
		return current;
	}

	search(word){
		if(!word) return false;
		console.log('Search: ', word);
		let current = this.root;
		// visit each character and check it's existence
		for(let char of word){
			if(!current.chars.includes(char)) return false;
			console.log('Found a piece: ', char);
			current = current.chars.get(char);
		}
		return current.endOfWord;
	}
	getAChild() {
		let current = this.root;
		console.log(current);
	}
}

exports.Trie = Trie;
exports.Node = Node;
