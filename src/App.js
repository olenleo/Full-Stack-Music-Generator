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

	const handleClear = ({ setResult, result }) => {
        console.log('Before', result);
		setResult([]);
		console.log('After', result);
	};

 
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<GenerateControls amount={5} result={result} setResult={setResult} midiAsJSON={midiAsJSON} selectedTrack={selectedTrack}/>
			<Button variant="contained" onClick={() => handleClear({ setResult})}>Clear result</Button>
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
