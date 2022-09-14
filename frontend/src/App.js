import Header from './components/Header';
import FileList from './components/FileList';
import React, { useState, useEffect} from 'react';
import fileService from './services/files';
import JSONmidiParser from './components/JSONmidiParser';
import Button from '@mui/material/Button';

const App = () => {

	const [files, setFiles] = useState([]);
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
    
		fileService.getMidiData('Movie_Themes_-_Star_Wars_-_by_John_Willams.mid').then(data => {
			setMidiAsJSON( data );
		});
    
	}, []);

	if (isLoading) {
		return (
			<h1>Loading information from backend...</h1>
		);
	}
	return (
		<div>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
			<Header/>
			<FileList uploadedFiles={files}></FileList>
			<Button variant="contained" onClick={()=> console.log('Naps')}>Demo of a button</Button>
			<FileList uploadedFiles={files}></FileList>
			<JSONmidiParser midiData={midiAsJSON}/>
      
		</div>
	);
};

export default App;
