// Load Reference Data First
function grabCSV(title, filename) {
    return $.ajax({
        type: "GET",
        url: filename,
        dataType: "text",
        success: function(data) {
            console.log("Successfully loaded: " + title)
        }
    });
};

function csvToObject(input) {
    var output = Papa.parse(
        input,
        {
            header: true,
            trimHeader: true,
            dynamicTyping: true,
            skipEmptyLines: true
        }
    );
    return output;
}

/**
 * Grabs the team data from the JSON file, and then runs the populate function
 *
 * @return {boolean}
 */
var teamString, teamArray;
function grabTeam(){
    var teamFile = "team.json";
    $.getJSON(teamFile, {
    }).done(function(data) {
        if (teamString !== JSON.stringify(data)) {
            teamString = JSON.stringify(data);
            teamArray = data;
            console.log("Current Team Data:");
            console.log(data);
            populateTeam(data);
        }
    });

    return true;
};

/**
 * Populates the team with the desired data
 *
 * @param  {array/object}   teamData    Imported JSON team data
 *
 * @return {boolean}
 */
function populateTeam(teamData){
    var counter = 1;
    $.each(teamData, function(slotID, slot) {
        var dexNumber = slot.dexnumber;
        if (dexNumber >= 1) {
            // Sets the background by grabbing the "colour" of the Pokemon, then setting that
            var colour_id = pkmnSpecies[dexNumber].color_id;
            var colour = colours[colour_id].identifier;
            $("#" + slotID).css("background-image", "url(assets/bg_colors/" + colour + ".png)");

            // Pads on a 0 or two if needed, so the file look ups are correct
            var paddedDexNumber = pad(dexNumber, 3);
            if (slot.shiny == false) {
                $("#" + slotID + " .sprite").attr("src", "assets/sprites/" + paddedDexNumber + ".gif");
            } else {
                $("#" + slotID + " .sprite").attr("src", "assets/sprites_s/" + paddedDexNumber + ".gif");
            }

            // Captured Pokeball
            $("#" + slotID + " .ball").attr("src", "assets/balls/" + slot.ball + ".png");

            // Nickname
            if (slot.nickname != "") {
                $("#" + slotID + " .nickname").text(slot.nickname);
            } else {
                $("#" + slotID + " .nickname").text(basePkmn[dexNumber].identifier);
            }

            // Level
            $("#" + slotID + " .level").text("Lv. " + slot.level);

        } else if (dexNumber == -1) {
            // If it's an egg
            $("#" + slotID).css("background-image", "url(assets/bg_colors/white.png)");
            $("#" + slotID + " .sprite").attr("src", "assets/sprites/egg.gif");
            $("#" + slotID + " .ball").attr("src", "assets/balls/poke.png");
            $("#" + slotID + " .nickname").text("");
            $("#" + slotID + " .level").text("");

        } else if (dexNumber == 0) {
            // If it's empty
            $("#" + slotID).css("background-image", "url(assets/bg_colors/none.png)");

            // Set's the sprite and ball to a 1px x 1px pixel transparent GIF
            var blankGIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
            $("#" + slotID + " .sprite").attr("src", blankGIF);
            $("#" + slotID + " .ball").attr("src", blankGIF);

            // And empty the text areas
            $("#" + slotID + " .nickname").text("");
            $("#" + slotID + " .level").text("");

        }
    });

    return true;
}

/**
 * Adds X amount of zeros to a number as lead padding
 *
 * @param  {string} num     Input number
 * @param  {int}    size    Desired length of the number string
 *
 * @return {string}         Fixed string, with the leading zeroes
 */
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

// Loads up all of the LUT (look up table) files, then loads the team, and finally sets the check interval
var colours, basePkmn, pkmnTypes, types;
$(document).ready(function() {
    $.when(
        grabCSV("Colours", "luts/colors.csv"),
        grabCSV("Pokemon", "luts/pokemon.csv"),
        grabCSV("Pokemon Species", "luts/pokemon_species.csv"),
        grabCSV("Pokemon Types", "luts/pokemon_types.csv"),
        grabCSV("Types", "luts/types.csv")
    ).done(function(
        coloursCSV,
        pokemonCSV,
        pokemonSpeciesCSV,
        pokemonTypesCSV,
        typesCSV
    ){
        // Adding a blank first row to keep numbering correct
        colours = csvToObject(coloursCSV[0]).data;
        colours.unshift({});

        basePkmn = csvToObject(pokemonCSV[0]).data;
        basePkmn.unshift({});

        // Adding a blank first row to keep numbering correct
        pkmnSpecies = csvToObject(pokemonSpeciesCSV[0]).data;
        pkmnSpecies.unshift({});

        pkmnTypes = csvToObject(pokemonTypesCSV[0]).data;
        pkmnTypes.unshift({});

        types = csvToObject(typesCSV[0]).data;
        types.unshift({});
        // And finally, grab the team data, and set up a loop
        grabTeam();
        setInterval(grabTeam, 500);
    });
});
