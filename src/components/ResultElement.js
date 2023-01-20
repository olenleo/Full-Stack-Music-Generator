import React from 'react';

import SonicPiFormatter from '../utils/SonicPiFormatter';

import Box from '@mui/material/Box';

const ResultElement = ( result ) => {
	return (
		<Box sx={{ p: 2,  boxShadow: 3, bgcolor:'white', borderRadius: '16px',':hover' : {boxShadow: 6,}}} >
			<Box sx ={{p:4}}>
				<h3 id ='resultingTrack'>Resulting track:</h3>
				<SonicPiFormatter result={result}/>
			</Box>
		</Box>
	);
};

export default ResultElement;