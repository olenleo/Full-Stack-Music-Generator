/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const AmountSlider = (props) => {
	console.log('AmountSlider!', props);
	console.log('AmountSlider!', props.handleLengthChange);
	function valuetext(value) {
		return `${value}°C`;
	}
	


	return (
		<Box sx={{ width: 300 }}>
			<Slider
				aria-label="Trie Length"
				defaultValue={9}
				getAriaValueText={valuetext}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={3}
				onChange={(event, value) => { props.handleLengthChange(value);}}
				
				max={15}
			/>
		</Box>
	);
};
export default AmountSlider;