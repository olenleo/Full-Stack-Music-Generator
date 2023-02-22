import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';

const Header = () => {
	return(
		<div className = 'header'>
			<Container>
				<Box sx={{ color: 'primary.main', p: 4 }}>
					<Grid>
						<Grid item>
							<Typography variant='h3' component="h1">
							Generate Music
							</Typography>
						</Grid>
						<Grid item>
							<Fade in timeout={3000} >
								<Typography variant='h3' component="h1" color={'secondary.main'}>
									Trie again
								</Typography>
							</Fade>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</div>
	);
};
export default Header;