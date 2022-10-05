class Node {
	constructor(){
		this.children = [];
		this.note = {};
		this.endOfWord = false;
		console.log('New node created');
	}

	getChildren() {
		return this.children;
	}
}

class Trie {
	constructor(){
		this.root = new Node();
	}
	getRoot() {
		return this.root;
	}
	insert(word){
		console.log('Insert word: ', word);
		if(!word) return null;
		let current = this.root;
		console.log('Current root node children: ',current.children);

		for(let child of word){            
			// if child does not exist, put an entry
			// use pitch as key
			const pitch = child.data[0];
			console.log('child:', child);
			if(!current.children.includes(pitch)){
				let newNode = new Node();
				newNode.note = child;
				current.children[pitch] = newNode;
			} else {
				current.children[pitch].note.freq += 1;
			}
			// get next node for next iteration
			current = current.children[child.pitch];
		}
		// mark end of the word
		current.endOfWord = true;
		console.log('Insert done, last child:', current);
		return current;
	}

	search(word){
		if(!word) return false;
		console.log('Search: ', word);
		let current = this.root;
		// visit each child and check it's existence
		for (let child of word){
			if(!current.children.includes(child)) return false;
			console.log('Found a piece: ', child);
			current = current.children.get(child);
		}
		return current.endOfWord;
	}
	getAChild() {
		let current = this.root;
		console.log(current);
	}
    
	printchildren() {
		let children = '';
		for (let child in this.root.children) {
			if (child.note !== undefined) {
				children += child.note + ' ';
			}
		}
		console.log('All depth 1 children:', children);
	}
	printContent() {
		console.log('Contents:', this.root);
		this.print(this.root, '', 0);
        
	}

	print(current, string, depth) {
		if (current.endOfWord) {
			console.log(string);
		} else {
			current = this.root;
			for (let child of current.children) {
				this.print(current, string + child, ++depth);
			}
		}   
	}

}

exports.Trie = Trie;
exports.Node = Node;
