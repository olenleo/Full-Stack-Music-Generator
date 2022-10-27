/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NoteReader from '../utils/NoteReader';

const GenerateControls = ( {handleClick} ) => {
	return (
		<Button variant="contained" onClick={handleClick}>Trie again!</Button>
	);
};

export default GenerateControls;