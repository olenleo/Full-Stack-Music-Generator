/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback} from 'react';

import fileService from './services/files';

import NoteReader from './utils/NoteReader';
import SonicPiFormatter from './utils/SonicPiFormatter';
import { generateNoteChain } from './utils/MarkovChainGenerator';

import Header from './components/Header';
import FileList from './components/FileList';
import FileUploadForm from './components/FileUploadForm';
import TrackList from './components/TrackList';
import GenerateControls from './components/GenerateControls';
import AmountSlider from './components/AmountSlider';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';



const App = () => {

	const [files, setFiles] = useState([]);
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [result, setResult] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState();
	const [trieLength, setTrieLength] = useState(9);
	const [sum, setSum] = useState(3);
	const [uploadedFile, setUploadedFile] = useState([]);
	
	const notereader = new NoteReader();

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
		setFileIsSelected(true);
		fileService.getMidiData(title.name).then(data => setMidiAsJSON(data));
	};

	const handleTrackSelection =  (track) => {
		setSelectedTrack(track);
	};

	const refreshFileList = async() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
	};

	const generate = async ( trieLength ) => {
		const arr  = [];
		let theTrie = notereader.readJSON(midiAsJSON, selectedTrack, trieLength);
		let chain;
		for (let i = 0; i < sum; i++) {
			if (midiAsJSON !== undefined && selectedTrack !== undefined) {
				chain = generateNoteChain(theTrie.root, Array.apply(null, Array(trieLength)), 0);
				arr.push(chain);
			}
		}
		setResult(arr);
	};

	const handleGenerateButton = async () => {
		handleClear({setResult, result});
		generate(trieLength);
	};

	const handleClear = async ({ setResult, result }) => {
		setResult([]);
	};

	const handleLength = (nr) => {
		setTrieLength(nr);
	};

	const handleSumChange = ( nr ) => {
		setSum(nr);
	};

	const handleCopy = (async () => {
		let copyText = document.getElementById('resultMelody');
		console.log(copyText);
		await navigator.clipboard.writeText(copyText.outerText);
	});
	
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<Grid>
				<GenerateControls handleClick={() => handleGenerateButton()}/>
				<IconButton onClick={handleCopy} color="primary" aria-label="Copy to clipboard">
					<FileCopyIcon/>
				</IconButton>
				<Button variant="contained" onClick={() => handleClear({ setResult })}>Clear result</Button>
			</Grid>
			
			<AmountSlider handleLengthChange={handleLength} handleSumChange={handleSumChange}/>
			
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<FileList selectedFile={selectedFile} uploadedFiles={files} handleClick={handleFileSelection}/>
					<TrackList midiDataAsJSON={midiAsJSON} handleClick={handleTrackSelection}/>
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
