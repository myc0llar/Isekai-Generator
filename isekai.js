/**
 * Represents a fandom.
 */
class Fandom {
  /**
   * Fandom object.
   * @param {String} name Name of the media.
   * @param {String} alias HTML ID for the media.
   * @param {String} genre What kind of media the fandom is (horror, action, etc)
   * @param {String} medium How the media is portrayed.
   * @param {String} [company = null] What company (if any) owns the media.
   */
  constructor(name, alias, genre, medium, company = null) {
    this.name = name;
    this.alias= alias;
    this.genre = genre; // This can be vague.
    // Accepted mediums
    const acceptedMediums = ['Television', 'Video Games', 'Movies', 'Cartoons', 'Comics', 'Anime', 'Manga', 'Books', 'Music']; // <-- We can add more of these later.

    for (const item of medium) {
      if (!acceptedMediums.includes(item)) {
        throw new Error(`Invalid medium: ${item}. Accepted mediums are: ${acceptedMediums.join(', ')}`);
      }
    }
    
    this.medium = medium; // Set the medium if valid
    this.company = company; // Null by default. Not all characters will have a company behind them.
    this.characters = []; // Array to store characters belonging to this fandom

    // console.log(`${"-".repeat(10)}> ${this.name} loaded.`)
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  getCharacters() {
    return this.characters;
  }
}

/**
 * A Fandom character
 */
class Character {
  /**
   * 
   * @param {String} name The character's name.
   * @param {String} appearance A brief description of the character's appearance.
   * @param {String} backstory A brief description of what the character does, what the character is known as, or what the character is known for.
   * @param {String} species The species of the character
   * @param {Object} fandom The fandom object the character belongs to.
   * @param {String} gender The character's gender.
   */
  constructor(name, appearance, backstory, species, fandom, gender) {
    this.name = name;
    this.appearance = appearance;
    this.backstory = backstory;
    this.species = species;
    this.fandom = fandom;
    this.gender = gender;
    this.fandom.addCharacter(this); // Add the character to the fandom's character array
  }

  describeOrigin() {
    // Generate a description of the character's origin based on the Fandom
    return `${this.name} is a ${this.species} from the ${this.fandom.name} fandom, a ${this.fandom.genre} ${this.fandom.medium}${this.fandom.company ? " created by " + this.fandom.company : ""}.`;
  }
}

const fandoms = {
  sonic: new Fandom("Sonic the Hedgehog", "sonic", "Action-Platform", ["Video Games", "Comics", "Cartoons"], "SEGA"),
  zelda: new Fandom("The Legend of Zelda", "zelda", "Action-Adventure", ["Video Games"], "Nintendo"),
  gorillaz: new Fandom("Gorillaz", "gorillaz", "Hip-Hop/Alternative Rock", ["Music"], null),
  mario: new Fandom("Mario", "mario", "Platformer", ["Video Games"], "Nintendo"),
  pokemon: new Fandom("Pokémon", "pokemon", "RPG", ["Video Games"], "The Pokémon Company"),
  starwars: new Fandom("Star Wars", "starwars", "Science Fiction", ["Movies"], null),
  marvel: new Fandom("Marvel", "marvel", "Superhero", ["Movies"], null),
  dccomics: new Fandom("DC Comics", "dccomics", "Superhero", ["Comics"], null),
  lotr: new Fandom("The Lord of the Rings", "lotr", "Fantasy", ["Books","Movies"], null)
};

// Convert the object to an array of Fandom instances
var fandomArray = Object.values(fandoms);
var fandomOptions = fandomArray.map((a) => [a.name, a.alias]);

fandomOptions.forEach((series) => {
  document.querySelector("#fandoms").innerHTML += `
    <div class="column is-one-quarter">
      <div class="box">
        <input id="${series[1]}" type="checkbox" class="inp" value="${series[0]}" checked>
        <label for="${series[1]}">${series[0]}</label>
      </div>
    </div>`;
});


function makeScenario(){
  // Grab a fandom.
  const fandomKeys = Object.keys(fandoms);
  const data = [...document.querySelectorAll('.inp:checked')].map(e => e.id); // The fandoms they selected

  const filteredFandomKeys = fandomKeys.filter(key => data.includes(fandoms[key].alias));

  if (filteredFandomKeys.length === 0) {
    alert("Please select at least one fandom.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredFandomKeys.length);
  const randomFandom = fandoms[filteredFandomKeys[randomIndex]];

  document.querySelector("#fandomsection").style.display = "block";

  const genders = Array.from(document.querySelectorAll('[data-category="gender"]:checked')).map(gender => gender.id);

  const fandomChars = randomFandom.getCharacters()
  .filter((char) => {
    return genders.includes(char.gender);
  })

  const chosenChar = randomise(fandomChars);
  let scenarioList = [];
  if (chosenChar.fandom.company !== null){
    scenarioList = [...scenarios]
  } else {
    // Fandom company is null. Filter all shouldHaveCompany scenarios.
    scenarioList = scenarios.filter((scen) => {
      return scen.shouldHaveCompany == false;
    });
  }
  const chosenScenario = randomise(scenarioList);

  setElement('scen-title', chosenScenario.title);
  setElement('scen-fandom', `Fandom: ${chosenChar.fandom.name}`);
  setElement('scen-stage', chosenScenario.renderScenario(chosenChar), true);
}
