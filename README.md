# Isekai Generator
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white)](#)
![Version Badge](https://img.shields.io/badge/v.-1.0.0-blue)

This is a JS generator to create an Isekai scenario! The premise is vague to allow for SFW or NSFW. Feel free to send in a Pull Request. 

# Overview
The Isekai Generator is vanilla JS and hosted via Github pages. The fandoms, characters and scenarios are all Objects/Classes, and so the entire thing uses Object Oriented Programming. 

## Classes
### Fandom
| Property | Type              | Description                                                                                                                                                                                                                         |
|----------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name     | string            | Name of the Fandom                                                                                                                                                                                                                  |
| alias    | string            | The HTML id for this fandom                                                                                                                                                                                                         |
| genre    | string            | The genre of the fandom (can be vague)                                                                                                                                                                                              |
| medium   | array             | Mediums in which this fandom is shown. **Note**- This is a strict list and will throw Errors if other inputs are provided. List is: 'Television', 'Video Games', 'Movies', 'Cartoons', 'Comics', 'Anime','Manga', 'Books', 'Music'. |
| company  | string (optional) | The company, publisher, etc that made the fandom. (Example: Mario's company is listed as "Nintendo", but Gorillaz' company is listed as null.)                                                                                      |

### Characters
| Property   | Type   | Description                                                                                                                                                                                                                                                   |
|------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name       | string | The character's name. Example: "Frodo Baggins"                                                                                                                                                                                                                |
| appearance | string | A brief description of the character's appearance. Example: "Blue hedgehog with red shoes"                                                                                                                                                                    |
| backstory  | string | A brief description of the character's story. Example: "A plumber from the Mushroom Kingdom"                                                                                                                                                                  |
| species    | string | The character's species. Example: "human", "dog", "fox".                                                                                                                                                                                                      |
| fandom     | object | The Fandom object that matches the character. See isekai.js and characters.js.                                                                                                                                                                                |
| gender     | string | The character's gender. Sticking to "male", "female", "gender non-conforming", and "agender". Used to filter characters in scenario generation. Could potentially add "trans feminine" and "trans masculine" as options (if there are applicable characters). |

Characters are generated in characters.js to keep the new Character() spam contained.

### Scenarios
Still a WIP.