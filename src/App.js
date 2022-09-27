/* eslint-disable no-unused-vars */
import Header from './components/Header';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import Button from '@mui/material/Button';
import TrackList from './components/TrackList';
import SonicPiFormatter from './utils/SonicPiFormatter';
import FileUploadForm from './components/FileUploadForm';

const App = () => {

	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);
	const [uploadedFile, setUploadedFile] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState();
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

	const handleFileSelection = async (title) => {
		event.preventDefault();
		console.log('HandleFileSelection (', title, ')');
		setSelectedFile(title);
		setSelectedTrack();
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

	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileUploadForm refreshFiles={refreshFileList}/>
			<FileList uploadedFiles={files} handleClick={handleFileSelection}/>
			<TrackList midiDataAsJSON={midiAsJSON} handleClick={HandleTrackSelection}/>
			<SonicPiFormatter track={selectedTrack} trackdata={midiAsJSON}></SonicPiFormatter>
			<Button variant="contained" onClick={()=> console.log('Generate')}>Trie again!</Button>

		</div>
	);
};

export default App;
