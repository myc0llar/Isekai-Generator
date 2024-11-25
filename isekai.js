class Fandom {
  constructor(name, alias, genre, medium, company = null) {
    this.name = name;
    this.alias= alias;
    this.genre = genre; // This can be vague.
    // Define the accepted mediums
    const acceptedMediums = ['Television', 'Video Games', 'Movies', 'Cartoons', 'Comics', 'Anime', 'Manga', 'Books', 'Music']; // <-- We can add more of these later.

    for (const item of medium) {
      if (!acceptedMediums.includes(item)) {
        throw new Error(`Invalid medium: ${item}. Accepted mediums are: ${acceptedMediums.join(', ')}`);
      }
    }
    
    this.medium = medium; // Set the medium if valid
    this.company = company; // Null by default. Not all characters will have a company behind them.
    this.characters = []; // Array to store characters belonging to this fandom

    console.log(`${"-".repeat(10)}> ${this.name} loaded.`)
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  getCharacters() {
    return this.characters;
  }
}

class Character {
  constructor(name, appearance, backstory, species, fandom, gender) {
    this.name = name;
    this.appearance = appearance;
    this.backstory = backstory;
    this.species = species;
    this.fandom = fandom;
    this.gender = gender;
    this.fandom.addCharacter(this); // Add the character to the fandom's character array

    console.log(`${this.name} successfully added to ${this.fandom.name}!`);
  }

  // Methods to generate character-specific content
  describeAppearance() {
    // Logic to generate a description of the character's appearance
    return `${this.appearance}`;
  }

  describeBackstory() {
    // Logic to generate a description of the character's backstory
    return `${this.backstory}`;
  }

  describeOrigin() {
    // Generate a description of the character's origin based on the Fandom
    return `${this.name} is a ${this.species} from the ${this.fandom.name} fandom, a ${this.fandom.genre} ${this.fandom.medium}${this.fandom.company ? "created by " + this.fandom.company : ""}.`;
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

  // TODO: Filter the fandomKeys and include only fandoms that are in the data array above.
  const filteredFandomKeys = fandomKeys.filter(key => data.includes(fandoms[key].alias));

  // If no fandoms are selected, return early or handle the case as needed
  if (filteredFandomKeys.length === 0) {
    alert("Please select at least one fandom.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredFandomKeys.length);
  const randomFandom = fandoms[filteredFandomKeys[randomIndex]];

  document.querySelector("#fandomsection").style.display = "block";
  setElement("chosenFandom", randomFandom.name);

  const fandomChars = randomFandom.getCharacters();
  const charNames = fandomChars.map((x) => x.name);

  setElement("charRoster", listify(charNames));
  setElement("charcount", fandomChars.length);

  console.log(randomise(fandomChars));
}
