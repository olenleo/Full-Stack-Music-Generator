# full-stack-music-generator

This web application will generate new melodies from MIDI files utilising Markov Chains and a Trie data structure. The goal is to allow exporting the generated music as downloadable .midi files or in a Sonic Pi compatible .rb -file for simple and quick use.

The application is available at [fly.io](https://trie-musicgen.fly.dev/).

This repository is also used for the University of Helsinki [Full-Stack web development project](https://github.com/fullstack-hy2020/misc/blob/master/project.md).

I have made a similar Java-based music generation project, available [here](https://github.com/olenleo/TiraLabra--Markov)

## Backend
This repository contains the frontend. Backend can be found [here](https://github.com/olenleo/full-stack-music-generator-backend)

## Features
I will include some parameters for music generation as follows:
- A user can select which MIDI track to read (when applicable)
- A user can select how long note chains the algorithm will use for generation
- A user can opt to soften the algorithm. The trie- and markov chain-based algorithm will generally favour the most prevalent note patterns. The user can increase the odds of the more rare occurences being included in the generation process with this toggle.


## Instructions
``` npm run start ``` runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To be updated! 

## Technical details

The full-stack-music-generator uses a node.js backend and a react frontend. 


## External libraries:
[midi-parser-js](https://www.npmjs.com/package/midi-parser-js)
