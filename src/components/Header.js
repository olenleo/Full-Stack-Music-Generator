import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Header = () => {
	return(
		<div className = 'header'>
			<Container>
				<Box sx={{ color: 'primary.main', p: 4 }}>
					<Typography variant='h3' component="h1">
						Generate Music, then Trie again
					</Typography>
				</Box>
			</Container>
		</div>
		
	);
};
export default Header;