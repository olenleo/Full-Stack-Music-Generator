# full-stack-music-generator

## Overview

This web application will generate new melodies from MIDI files utilising Markov Chains and a Trie data structure. The goal is to allow exporting the generated music as downloadable .midi files or in a Sonic Pi compatible .rb -file for simple and quick use.

I will include some parameters for music generation as follows:
- A user can select which MIDI track to read (when applicable)
- A user can select how long note chains the algorithm will use for generation
- A user can opt to soften the algorithm. The trie- and markov chain-based algorithm will generally favour the most prevalent note patterns. The user can increase the odds of the more rare occurences being included in the generation process with this toggle.

This repository is also used for the University of Helsinki [Full-Stack web development project](https://github.com/fullstack-hy2020/misc/blob/master/project.md).

I have made a similar Java-based music generation project, available [here](https://github.com/olenleo/TiraLabra--Markov)

## Instructions

To be updated! 

## Technical details

The full-stack-music-generator uses a node.js backend and a react frontend. 
Hosting service to be decided at a later point - the initial minimum viable product will be locally hosted.


## External libraries:
[midi-parser-js](https://www.npmjs.com/package/midi-parser-js)

