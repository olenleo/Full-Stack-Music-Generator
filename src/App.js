/* eslint-disable no-unused-vars */
import Header from './components/Header';
import Footer from './components/Footer';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import Button from '@mui/material/Button';
import TrackList from './components/TrackList';
import SonicPiFormatter from './utils/SonicPiFormatter';
import FileUploadForm from './components/FileUploadForm';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import GenerateControls from './components/GenerateControls';
import NoteReader from './utils/NoteReader';
const { trie2 } = require('./utils/Trie2');
import {generateNoteChain} from './utils/MarkovChainGenerator';
import AmountSlider from './components/AmountSlider';


const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState();
	const [trieLength, setTrieLength] = useState(9);
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [result, setResult] = useState([]);
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
		for (let i = 0; i < trieLength; i++) {
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
	
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<GenerateControls handleClick={() => handleGenerateButton()}/>
			<Button variant="contained" onClick={() => handleClear({ setResult })}>Clear result</Button>
			<AmountSlider handleLengthChange={handleLength}/>
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
