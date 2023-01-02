/* eslint-disable no-unused-vars */
import React, { useCallback} from 'react';

import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import Box from '@mui/material/Box';

/* TODO: figure out how to parse div id=generatedMelody content to clipboard */
const CopyButton = ( text ) => {
	const handleClick = useCallback(async () => {
		await navigator.clipboard.writeText(text);
		console.log(text);
	}
	);

	return (
		<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
			<IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart" sx={{ position: 'absolute', bottom: 6, right: 6 }}>
				<FileCopyIcon/>
			</IconButton>
		</Box>

	);
};

export default CopyButton;