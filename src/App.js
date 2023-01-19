/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react';

import fileService from './services/files';
import scrollIntoView from 'scroll-into-view-if-needed';
import NoteReader from './utils/NoteReader';
import SonicPiFormatter from './utils/SonicPiFormatter';
import { generateNoteChain } from './utils/MarkovChainGenerator';

import Header from './components/Header';
import FileList from './components/FileList';
import FileUploadForm from './components/FileUploadForm';
import TrackList from './components/TrackList';
import GenerateControls from './components/GenerateControls';
import AmountSlider from './components/AmountSlider';
import InfoBox from './components/InfoBox';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import Container from '@mui/material/Container';
import { CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#5ebec4',
			bg: '#fdf5df'
		},
		secondary: {
			main: '#ce93d8',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 4,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.3,
	},
});

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
		await navigator.clipboard.writeText(copyText.outerText);
	});

	const thing = ( event ) => {
		console.log('event', event);
		console.log('Bomp');
	};
	return (
		<div>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				
				<Box sx={{bgcolor: 'primary.bg'}}>
					<Header/>
					
					<Container>
						<Box sx={{ p: 2,  boxShadow: 3, bgcolor:'white', borderRadius: '16px', ':hover' : {boxShadow: 6,}}} >
							<Grid container item spacing={8} justify="center">
								<Grid item xs={6}>
									<Container>
										<Box id="controlBox" sx={{p: 4, bgcolor: 'white',minHeight: 200 }}>
											<FileUploadForm refreshFiles={refreshFileList}/>
											<AmountSlider handleLengthChange={handleLength} handleSumChange={handleSumChange}/>
											<GenerateControls handleClick={() => handleGenerateButton()}/>
											<IconButton onClick={handleCopy} color="primary" aria-label="Copy to clipboard">
												<FileCopyIcon/>
											</IconButton>
											<Button variant="contained" onClick={() => handleClear({ setResult })}>Clear result</Button>
										</Box>
										<Box id="trackSelectorBox" sx={{p:4, minHeight:200}}>
											<FileList selectedFile={selectedFile} uploadedFiles={files} handleClick={handleFileSelection}/>
											<TrackList midiDataAsJSON={midiAsJSON} handleClick={handleTrackSelection}/>
										</Box>
									</Container>
								</Grid>
								<Grid item xs={6}>
									<InfoBox resultElement={() => console.log('bop')}/>
								</Grid>
							</Grid>
						</Box>

					</Container>
					
					<br/>
					<Container>
						<Box sx={{ p: 2,  boxShadow: 3, bgcolor:'white', borderRadius: '16px',':hover' : {boxShadow: 6,}}} >
							<Box sx ={{p:4}}>
								<h3 id ='resultingTrack'>Resulting track:</h3>
								<SonicPiFormatter result={result}/>
							</Box>
						</Box>
					</Container>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
