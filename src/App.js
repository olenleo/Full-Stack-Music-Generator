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
import Grid from '@mui/material/Grid';
const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [uploadedFile, setUploadedFile] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [trie, setTrie] = useState();
	const [result, setResult] = useState([]);
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

	const generateResult = ( amount, trie ) => {
		let arr = [];
		const freqArray = Array.apply(null, Array(5));
		for (let i = 0; i < amount; i++) {
			arr.push(generateNoteChain(trie.root, freqArray, 0));
		}
        console.log('Arr', arr);
		setResult(arr);
        
	};

	const handleGenerateButton = () => {
		event.preventDefault();
		if (midiAsJSON !== undefined && selectedTrack !== undefined) {
			const theTrie = notereader.readJSON(midiAsJSON, selectedTrack);
			generateResult(4,theTrie);
		}
        console.log('Result state', result);
	};
 
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<Button variant="contained" onClick={() => handleGenerateButton()}>Trie again!</Button>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<FileList uploadedFiles={files} handleClick={handleFileSelection}/>
				</Grid>
				<Grid item xs={4}>
					<TrackList midiDataAsJSON={midiAsJSON} handleClick={HandleTrackSelection}/>
				</Grid>
				<Grid item xs={4}>
					<h3>Resulting track:</h3>
					<SonicPiFormatter result={result}/>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
