/* eslint-disable no-unused-vars */
import Header from './components/Header';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import Button from '@mui/material/Button';
import TrackList from './components/TrackList';
import SonicPiFormatter from './utils/SonicPiFormatter';
import FileUploadForm from './components/FileUploadForm';
import NoteReader from './utils/NoteReader';
import generateNoteChain from './utils/MarkovChainGenerator';
const { trie2 } = require('./utils/Trie2');

const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [uploadedFile, setUploadedFile] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [trie, setTrie] = useState();
	const [freqArray, setFreqArray] = useState();
	const [result, setResult] = useState();
	const notereader = new NoteReader();

	useEffect(() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false),
		setTrie(new trie2())
		);
		
	}, []);

	if (isLoading) {
		return (
			<h1>Loading information from backend...</h1>
		);
	}

	const handleFileSelection = async (title) => {
		event.preventDefault();
		console.log('HandleFileSelection (', title, ')');
		setSelectedFile(title);
	
		fileService.getMidiData(title.name).then(data => setMidiAsJSON(data));
	};

	const HandleTrackSelection =  (track) => {
		console.log('Handle track selection', track);
		setSelectedTrack(track);
	};

	const refreshFileList = async() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
	};

	const handleGenerateButton = () => {
		event.preventDefault();
		let arr = Array.apply(null, Array(127));
		setFreqArray(arr);
		if (midiAsJSON !== undefined && selectedTrack !== undefined) {
			const theTrie = notereader.readJSON(midiAsJSON, selectedTrack);
			console.log('Result:' ,generateNoteChain(theTrie.root, freqArray,0));
			
		}
	};
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<Button variant="contained" onClick={() => handleGenerateButton()}>Trie again!</Button>
			<p>{result}</p>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<FileList uploadedFiles={files} handleClick={handleFileSelection}/>
			<TrackList midiDataAsJSON={midiAsJSON} handleClick={HandleTrackSelection}/>
			
		</div>
	);
};

//
export default App;
