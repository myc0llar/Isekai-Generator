const adverbs = [
    "quickly",
    "slowly",
    "blissfully",
    "painfully",
    "uncomfortably",
    "loudly"
]

/**
 * Represents an isekai scenario.
 */
class Scenario {
    /**
     * 
     * @param {String} title Title of Isekai Scenario
     * @param {String} desc The actual transformation story.
     * @param {Boolean} shouldHaveCompany If the story requires the character to belong to a company.
     * @param {Boolean} [permanent=false] If it's permanent.
     */
    constructor(title, desc, shouldHaveCompany = false, permanent = false){
        this.title = title;
        this.desc = desc;
        this.shouldHaveCompany = shouldHaveCompany;
        this.permanent = permanent;
    }
    /**
     * Creates the scenario
     */
    renderScenario(char){
        return allReplace(this.desc, {
            'COMP': char.fandom.company, 
            'CHAR': char.name, 
            'FANDOMHERE': char.fandom.name, 
            'ADVERB': randomise(adverbs) });
    }
}

const scenarios= [
    // Company-centric; Requires a company of the fandom to be named.
    new Scenario("New Job", "You are being hired to work at COMP, and on your final interview, you are asked to sign some papers. The moment you do, you ADVERB turn into CHAR.", true, true),

    // Not company-centric, can be generic.
    new Scenario("Truck-kun", "You were just minding your own business, when you got hit by a truck! Now you're in the world of FANDOMHERE... as CHAR?!", false, true),
    new Scenario("Halloween", "<p>Spirit Halloween has just popped up, and your friends have decided to dress up together. You all decide on FANDOMHERE-styled costumes.</p><p>When you go to the fitting room, the world seems to warp a bit. When you put on your CHAR costume and step out, you find that the zippers are now gone. You're also no longer in Spirit Halloween; you're in the world of FANDOMHERE!</p>", false, true),
    new Scenario("Rise and Shine", "You awaken from a deep slumber, only to find that you've awoken as CHAR. Were you always CHAR?", false, true),
]
