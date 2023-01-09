# On the development state

The project has some issues as follows:
	- Testing is nonexistent.
	- MIDI parsing. I should check the dependent module. This means that converting to .midi is also problematic. I'm leaning on skipping this in favour of the items below:
	
Critical:
	- Fly.io deployment is still down. I need to track down this issue.

UI needs a overhaul. This takes priority as I've never really dug into frontend development.
	- Finalize my UI idea on paper
	- Stack up the main view fields in an [accordion](https://mui.com/material-ui/react-accordion/) except for the 'resulting track' option

A **login** feature would be useful considering file storage. Good exercise with regard to the course contents too. 
	- Store files in file system.
	- Links to each file are stored in a mongoDB database schema.
	- If the file system turns out to be too complicated (in other words, if the frontend development seems to suffer) implement a set of prepared, open source midi files for the end user to try out as an MVP.

Documentation with instructions to playing the tracks with [Sonic Pi](https://sonic-pi.net/) and current issues.
