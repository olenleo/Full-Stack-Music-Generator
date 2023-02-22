/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const AmountSlider = (props) => {
	function valuetext(value) {
		return `${value}°C`;
	}

	return (
		<Box sx={{ width: 300 }}>
			<p><i>Length of trie sequence</i><Slider
				aria-label="Trie Length"
				defaultValue={9}
				getAriaValueText={valuetext}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={3}
				onChange={(event, value) => { props.handleLengthChange(value);}}
				max={30}
			/>
			</p>
			<p><i>Amount of trie sequences</i><Slider
				color="secondary"
				aria-label="Trie Sum"
				defaultValue={9}
				getAriaValueText={valuetext}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={1}
				onChange={(event, value) => { props.handleSumChange(value);}}
				
				max={15}
			/>
			</p>
		</Box>
	);
};
export default AmountSlider;