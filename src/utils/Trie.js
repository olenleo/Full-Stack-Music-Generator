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
        console.log('Got to the end :) with a ', current);
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
    
	printContent() {
		console.log('Contents:', this.root);
        this.print(this.root, '', 0);
        
	}

	print(current, string, depth) {
		if (current.endOfWord) {
			console.log(string);
		} else {
            current = this.root;
			for (let char of current.chars) {
				this.print(current, string + char, ++depth);
			}
		}   
	}

	/*
    def displayUtil(self,visited,node,str):
        index=0
        while index<26:
            if node.children[index]:
                str+=chr(97+index)
                #print(2,str)
                if node.children[index].isEndOfWord == False:
                    self.displayUtil(visited,node.children[index],str)
                    str=str[0 : (len(str)-1)]
                else:
                    if str not in visited:
                        visited.append(str)
                    if self.haschild(node.children[index]):
                        self.displayUtil(visited,node.children[index],str)
                        str=str[0 : (len(str)-1)]
                      
            index+=1
      
    def display(self):
        visited=[]
        str=''
        self.displayUtil(visited,self.root,str)
        print("Content of Trie:")
        for i in range(len(visited)):
            print(visited[i])
     */
}

exports.Trie = Trie;
exports.Node = Node;
