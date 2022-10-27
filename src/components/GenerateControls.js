/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NoteReader from '../utils/NoteReader';
import generateNoteChain from '../utils/MarkovChainGenerator';

const notereader = new NoteReader();

const GenerateControls = ( {amount, midiAsJSON, selectedTrack, result, setResult} ) => {

	const clearResult = async ({result, setResult}) => {
		console.log('Clear', result);
		const clear = [];
		setResult(clear);
		console.log('Result is now empty:', result);
	};

	const generate = async ( { amount, midiAsJSON, selectedTrack, result, setResult } ) => {
		if (midiAsJSON !== undefined && selectedTrack !== undefined) {
			const theTrie = notereader.readJSON(midiAsJSON, selectedTrack);
			let clone = [...result];
			for (let i = 0; i < amount; i++) {
				clone.push(generateNoteChain(theTrie.root, Array.apply(null, Array(5)), 0));
			}
			setResult(clone);
			console.log('RESULT:', result);
		}
	};

	const handleGenerateButton = ( { amount, midiAsJSON, selectedTrack, result, setResult } ) => {
		clearResult({result, setResult}).then(generate({ amount, midiAsJSON, selectedTrack, result, setResult } ));
	
	};

	return (
		<Button variant="contained" onClick={() => handleGenerateButton({ amount, midiAsJSON, selectedTrack, result, setResult})}>Trie again!</Button>
	);
};

export default GenerateControls;