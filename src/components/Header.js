import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Header = () => {
	return(
		<div className = 'header'>
			<Container>
				<Box sx={{ color: 'primary.main', p: 1 }}>
					<h1>Generate Music, then Trie again</h1>
				</Box>
			</Container>
		</div>
		
	);
};
export default Header;