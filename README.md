# full-stack-music-generator

This web application generates new melodies from MIDI files utilising Markov Chains and a Trie data structure. The final goal is to allow exporting the generated music as downloadable .midi files for easy DAW (Digital Audio Workstation) integration. At the moment the application generates results in a Sonic Pi compatible .rb -file for simple and quick use.

The application is available [here](https://trie-musicgen.fly.dev/). 

To play back the generated melodies please install [Sonic Pi](https://sonic-pi.net) / [Sonic Pi on Linux](https://github.com/sonic-pi-net/sonic-pi/blob/stable/BUILD-LINUX.md)

I have made a similar Java-based music generation project, available [here](https://github.com/olenleo/TiraLabra--Markov)

## Backend
This repository contains the frontend. Backend can be found [here](https://github.com/olenleo/full-stack-music-generator-backend)

## Features
I will include some parameters for music generation as follows:
- A user can select which MIDI track to read
- A user can select how long note chains the algorithm will use for generation

## Goals
- A user can opt to soften the algorithm. The trie- and markov chain-based algorithm will generally favour the most prevalent note patterns. The user can increase the odds of the more rare occurences being included in the generation process with this toggle.
- MIDI integration: An online midi player and application logic for generating new midi files would make the app more useful.

## Instructions
``` $ npm run start ``` runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Note that the backend needs to run on port 3001 - the backend can be started with ``` $ npm run dev ```.

## Technical details
Tech stack:

Node.js backend

React frontend

MongoDB for database

Material UI css library

Fly.io hosting

## Issues
- The music generation algorithm is bugged. But, it gives sufficiently musical results.

## External libraries:
[midi-parser-js](https://www.npmjs.com/package/midi-parser-js)

## Fullstack-harjoitustyöstä
Suunnitelmat olivat suuret, mutta toisaalta projektin algoritmiikka olikin tuttua aikaisemmasta työstä. Koodin refaktorointi käyttämään JavaScriptia olikin haastavampaa kuin mitä luulin; olin estimoinut tuon osuuden vaativuuden paljon pienemmäksi. Osasyynä tässä tietty eri MIDI-formaatit. Käyttämäni [midi-parser-js](https://www.npmjs.com/package/midi-parser-js) tuntuu käsittelevän aikamääreitä eri tavalla kuin [aikaisemmin käyttämäni työkalu](https://www.fourmilab.ch/webtools/midicsv/).

Näin ollen priorisoin sovelluksen päätehtävää - musiikin genrerointia - muiden osa-alueitten ylle. Kirjautuminen ja sen myötä tiedostojen hallinta (ja poisto) jäävät jatkokehitykseksi.

Muutamia huomioita:
- En kyllä ole noudattanut hyviä sovelluskehityksen käytäntöjä tämän projektin aikana. Ensiajatuksena oli toteuttaa nopea MVP-tyylinen demo ja saada siitä palautetta tutuilta muusikoilta, sitten palata tekemään ns. kunnolla. Huomio itselleni: jos ajattelen tekeväni yksikkötestin myöhemmin, valehtelen: en luultavasti tule tekemään niitä koskaan.
- Toteutukseen tuli lisähaasteita ohjelmistotuotantoprojektin samanaikaisuuden myötä. Tämä toteutettiin Python / Flask / TailwindCSS -teknologialla, joten synergiaa ei oikein löytynyt. Vaikea pyöritellä kahden sovelluksen rakenteita ja teknologioita samaan aikaan. 
- Sovellusarkkitektuuri tai sovelluksen rakenteen suunnittelu on asia johon haluan syventyä. Tässä toteutuksessa seurasin lähinnä full stack-kurssin materiaalia, ja saavutin toki tuloksia, mutta en voi väittää että tämä olisi määrätietoista ja suunnitelmallista työskentelyä. Erinomaista harjoittelua joka tapauksessa.

Sinänsä on kiva että harjoitustyö on näin vapaamuotoinen, mutta jäin kaipaamaan vertaisarviointia ja palautetta prosessin aikana. Olisiko jonkinlainen vapaaehtoinen välipalautus ja palautekierros mahollinen? Opiskelija voisi helposti merkitä tähän käytetyn ajan tuntikirjanpitoonsa. 

Tuntikirjanpito on [saatavilla](https://github.com/olenleo/full-stack-music-generator/blob/main/tuntikirjanpito.md).
