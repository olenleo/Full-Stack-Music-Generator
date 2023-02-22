/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';

import FileList from './FileList';
import FileUploadForm from './FileUploadForm';
import TrackList from './TrackList';
import GenerateControls from './GenerateControls';
import AmountSlider from './AmountSlider';
import InfoBox from './InfoBox';
import NoteReader from '../utils/NoteReader';
import fileService from '../services/files';
import { generateNoteChain } from '../utils/MarkovChainGenerator';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import Container from '@mui/material/Container';

const ControlElement = ( { result, setResult	} ) => {
	
	const [fileIsSelected, setFileIsSelected] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [midiAsJSON, setMidiAsJSON] = useState([]);
	const [selectedFile, setSelectedFile] = useState();
	const [files, setFiles] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState();
	const [trieLength, setTrieLength] = useState(9);
	const [sum, setSum] = useState(3);
	const notereader = new NoteReader();
	
	useEffect(() => {
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
	}, []);

	const refreshFileList = async() => {
		event.preventDefault();
		fileService.getAll().then(files =>
			setFiles( files ),
		setLoading(false)
		);
	};

	const handleLength = (nr) => {
		setTrieLength(nr);
	};
	const handleSumChange = ( nr ) => {
		setSum(nr);
	};
	const handleTrackSelection =  (track) => {
		setSelectedTrack(track);
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

	const handleClear = async ({ setResult }) => {
		setResult([]);
	};
	const handleGenerateButton = async () => {
		handleClear({setResult, result});
		generate(trieLength);
	};
	
	const handleCopy = (async () => {
		let copyText = document.getElementById('resultMelody');
		await navigator.clipboard.writeText(copyText.outerText);
	});

	return (
		<Container>
			<Box id='main' sx={{ p: 2,  boxShadow: 3, bgcolor:'white', borderRadius: '16px', ':hover' : {boxShadow: 6,}}} >
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
							<Box id="trackSelectorBox" sx={{p:4, minHeight:200, bgcolor: 'primary.bg', borderRadius: '16px'}}>
								<FileList selectedFile={selectedFile} setSelectedFile={setSelectedFile} uploadedFiles={files} setUploadedFiles={setFiles} fileService={fileService} setFileIsSelected={setFileIsSelected} setMidiAsJSON={setMidiAsJSON}/>
								<TrackList midiDataAsJSON={midiAsJSON} handleClick={handleTrackSelection}/>
							</Box>
						</Container>
					</Grid>
					<Grid item xs={6}>
						<InfoBox/>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default ControlElement;