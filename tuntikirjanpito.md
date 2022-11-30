# Documentation for working hours

| Date | Hours  | Task                                                                                                     |
| :----:|:----- | :-----                                                                                                   |
| 7.9.	| 3     | Initial repository, planning the application                                                             |
| 8,9.  | 3     | Work on the backend                                                                                      |
| 9.9   | 4.5   | More work on the backend, midi parsing, install material_UI                                              |
| 12.9  | 2     | Frontend: MIDI json data parsing                                                                         |
| 14.9  | 2     | Frontend: MIDI json data >> A Sonic Pi compatible document                                               |
| 19.9  | 2.5   | Frontend: Start track listing component                                                                  |
| 20.9  | 3.5   | Frontend: SonicPiFormatter lists some note information                                                   |
| -     | -     | Search for libraries for midi writing and note visualization                                             |
| -     | -     | Initialise github actions workflow, but first separate the front- and backend to separate repositories   |
| 21.9  | 4.5   | Backend: File uploading, configure fly.io to workflow                                                    |
| 22.9  | 1     | File upload: Fix multer errors. NOTE: routing is quite messy.                                            |
| -	    | 2	    | Deploy to fly.io, hunt bugs                                                                              |
| 23.9	| 1.5	| Study material.ui, deployment related bugfix, study backend file storage                                 |
| 27.9  |  1    | Track down a bug in frontend, deploy to fly.io                                                           |
| -     |  1    | Frontend utility for mapping MIDI pitch to note, eg. 60 => C5                                            |
| -     |  1    | Begin frontend utility: parse JSON formatted midi notes. Adapted from previous work on a similar project.|
| 29.9  |  1.5  | Frontend: Work on parsing notes into a trie                                                              |
| 30.9  |  1.5  | Make test material for midi parsing, work on midi parsing                                                |
| 3.10  |  4.5  | Implement trie data structure, fix array splicing bug                                                    |
| 5.10  | 3.5   | Start implementing markov chain generation.Adapted from previous work on a similar project.              | 
| 6.10  | 2     | Re-implementing trie; I had several JSON-related bugs.                                                   | 
| 7.10  | 1.5   | Further work on markov chain generation, update MaterialUI frontend                                      |
| 10.10 | 1.5   | Intermediary; Generated notechain display component                                                      |
| 11.10 | 1     | Work on CalculateOdds method                                                                             |
| 26.10 | 4.5   | Work on markov chain generation                                                                          |
| 27.10 | 4.5   | Fix generation bug; Start work on note durations                                                         |
| 31.10 | 1     | Work on note durations                                                                                   |  
| 1.11  | 3.5   | Work on note durations                                                                                   |
| 11.11 | 4     | Discover that the note duration bug is apparently related to bad erroneus reading by midi-parser-js. [MidiCSV](https://www.fourmilab.ch/webtools/midicsv/) gives very different results form test data with regard to note start deltatimes. Possible  fix: Disregard any notes with deltatime 0; this should allow me to get some proper note chains into the Trie; I want to focus on the web application development over MIDI file parsing.| 
| 30.11 |       | Returning after a long hiatus.
Midi parsing is not currently working; I will leave it as-is in favour of implementing more web application functionality. |
| :----:|:----- |:-----                                                                                                    |
| SUM   | 65   |                                                                                                           |

