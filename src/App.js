/* eslint-disable no-unused-vars */
import Header from './components/Header';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import Button from '@mui/material/Button';
import TrackList from './components/TrackList';
import SonicPiFormatter from './utils/SonicPiFormatter';
import FileUploadForm from './components/FileUploadForm';

const { trie2 } = require('./utils/Trie2');
import Grid from '@mui/material/Grid';
import GenerateControls from './components/GenerateControls';
import NoteReader from './utils/NoteReader';
import {generateNoteChain, printTrie} from './utils/MarkovChainGenerator';


const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [uploadedFile, setUploadedFile] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [result, setResult] = useState([]);
	const notereader = new NoteReader();    
    const amount = 5;
	useEffect(() => {
		setResult([]);
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
		
	}, []);

	if (isLoading) {
		return (
			<h1>Loading information from backend...</h1>
		);
	}

	const handleFileSelection = async (title) => {
		
		setSelectedFile(title);
	
		fileService.getMidiData(title.name).then(data => setMidiAsJSON(data));
	};

	const HandleTrackSelection =  (track) => {
		setSelectedTrack(track);
	};

	const refreshFileList = async() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
	};

	const generate = async ( amount ) => {
		const arr  = [];
		let theTrie = notereader.readJSON(midiAsJSON, selectedTrack);
		let chain;
		for (let i = 0; i < amount; i++) {
			if (midiAsJSON !== undefined && selectedTrack !== undefined) {
				chain = generateNoteChain(theTrie.root, Array.apply(null, Array(amount)), 0);
				arr.push(chain);
			}
		}
		setResult(arr);
	};

	const handleGenerateButton =  async () => {
		handleClear({setResult, result});
		generate(3);
	};

	const handleClear = async ({ setResult, result }) => {
		setResult([]);
	};

 
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<GenerateControls handleClick={() => handleGenerateButton()}/>
			<Button variant="contained" onClick={() => handleClear({ setResult })}>Clear result</Button>
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
