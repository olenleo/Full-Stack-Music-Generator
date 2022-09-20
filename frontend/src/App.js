/* eslint-disable no-unused-vars */
import Header from './components/Header';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import JSONmidiParser from './components/JSONmidiParser';
import Button from '@mui/material/Button';
import TrackList from './components/TrackList';
import SonicPiFormatter from './utils/SonicPiFormatter';

const App = () => {

	const [files, setFiles] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [selectedFile, setSelectedFile] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [selectedTrack, setSelectedTrack] = useState();
	// eslint-disable-next-line no-unused-vars
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
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

	const handleFileSelection = (title) => {
		event.preventDefault();
		console.log('HandleFileSelection (', title, ')');
		setSelectedFile(title);
		setSelectedTrack();
		fileService.getMidiData(title.name).then(data => setMidiAsJSON(data));
	};

	const HandleTrackSelection = (track) => {
		event.preventDefault();
		console.log('Handle track selection', track);
		setSelectedTrack(track);
	};

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<p>Selected file {selectedFile.name}</p>
			<p>Selected track: {selectedTrack}</p>
			<h2>Select file:</h2>
			<FileList uploadedFiles={files} handleClick={handleFileSelection}/>
			<TrackList midiDataAsJSON={midiAsJSON} selectedFileID={selectedFile.id} handleClick={HandleTrackSelection}/>
			<SonicPiFormatter track={selectedTrack} trackdata={midiAsJSON}></SonicPiFormatter>
			<Button variant="contained" onClick={()=> console.log('Generate')}>Trie again!</Button>
      
		</div>
	);
};

export default App;
