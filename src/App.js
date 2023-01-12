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

const { trie2 } = require('./utils/Trie2');
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import GenerateControls from './components/GenerateControls';
import NoteReader from './utils/NoteReader';
import {generateNoteChain, printTrie} from './utils/MarkovChainGenerator';

const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [uploadedFile, setUploadedFile] = useState([]);
	const [fileIsSelected, setFileIsSelected] = useState(false);
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

	const handleGenerateButton = async () => {
		handleClear({setResult, result});
		generate(3);};

	const handleClear = async ({ setResult }) => {
		setResult([]);
	};

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<Container maxWidth="sm">
				<FileUploadForm refreshFiles={refreshFileList}/>
				<GenerateControls handleClick={() => handleGenerateButton()}/>
				<Button variant="contained" onClick={() => handleClear({ setResult })}>Clear result</Button>
				<Stack>
					<FileList selectedFile={selectedFile} uploadedFiles={files} handleClick={event => handleFileSelection(event)}/>
					<TrackList midiDataAsJSON={midiAsJSON} handleClick={event => handleTrackSelection(event)}/>
					<h3>Resulting track:</h3>
					<SonicPiFormatter result={result}/>
				</Stack>

			</Container>
			<Footer/>
		</div>
	);
};

export default App;
