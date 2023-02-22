/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Header from './components/Header';
import ControlElement from './components/ControlElement';
import ResultElement from './components/ResultElement';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const App = () => {
	const [result, setResult] = useState([]);
	return (
		<div>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<Box sx={{bgcolor: 'primary.bg'}}>
					<Header/>
					<Container>
						<ControlElement result={result} setResult={setResult}/>
					</Container>
					<br/>
					<Container>
						<ResultElement result={result}/>
					</Container>
				</Box>
			</ThemeProvider>
		</div>
	);
};

const theme = createTheme({
	palette: {
		primary: {
			main: '#5ebec4',
			bg: '#fdf5df'
		},
		secondary: {
			main: '#ce93d8',
			contrastText: '#ffcc00',
		},
		contrastThreshold: 4,
		tonalOffset: 0.3,
	},
});
export default App;
