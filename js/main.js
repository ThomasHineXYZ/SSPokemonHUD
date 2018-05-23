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
            skipEmptyLines: true,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined
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
    $.each(teamData, function(index, val) {
        if (val.dexnumber >= 1) {
            // Sets the background by grabbing the "colour" of the Pokemon, then setting that
            var colour = colours[pkmnSpecies[val.dexnumber].color_id].identifier;
            $("#" + index).css("background-image", "url(assets/bg_colors/" + colour + ".png)");
            console.log(colour);

            // Pads on a 0 or two if needed, so the file look ups are correct
            var dexNumber = pad(val.dexnumber, 3);
            if (val.shiny == 0) {
                $("#" + index + " .sprite").attr("src", "assets/sprites/" + dexNumber + ".gif");
            } else {
                $("#" + index + " .sprite").attr("src", "assets/sprites_s/" + dexNumber + ".gif");
            }

            // Captured Pokeball
            $("#" + index + " .ball").attr("src", "assets/balls/" + val.ball + ".png");

            // Nickname
            if (val.nickname != "") {
                $("#" + index + " .nickname").text(val.nickname);
            } else {
                $("#" + index + " .nickname").text(basePkmn[val.dexnumber].identifier);
            }

            // Level
            $("#" + index + " .level").text("Lv. " + val.level);

        } else if (val.dexnumber == -1) {
            // If it's an egg
            $("#" + index).css("background-image", "url(assets/bg_colors/white.png)");
            $("#" + index + " .sprite").attr("src", "assets/sprites/egg.gif");
            $("#" + index + " .ball").attr("src", "assets/balls/poke.png");
            $("#" + index + " .nickname").text("");
            $("#" + index + " .level").text("");

        } else if (val.dexnumber == 0) {
            // If it's empty
            $("#" + index).css("background-image", "url(assets/bg_colors/none.png)");

            // Set's the sprite and ball to a 1px x 1px pixel transparent GIF
            $("#" + index + " .sprite").attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
            $("#" + index + " .ball").attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");

            // And empty the text areas
            $("#" + index + " .nickname").text("");
            $("#" + index + " .level").text("");

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

// Loads up all of the LUT files, then loads the team
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
