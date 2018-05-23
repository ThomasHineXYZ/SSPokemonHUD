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
        // Sets the background by grabbing the "colour" of the Pokemon, then setting that
        var colour = colours[pkmnSpecies[val.dexnumber].color_id].identifier;
        $("#" + index).css("background-image", "url(assets/bg_colors/" + colour + ".jpg)");
        console.log(colour);

        // Pads on a 0 or two if needed, so the file look ups are correct
        var dexNumber = pad(val.dexnumber, 3);
        if (val.shiny == 0) {
            $(".team #" + index + " .sprite").attr("src", "assets/sprites/" + dexNumber + ".gif");
        } else {
            $(".team #" + index + " .sprite").attr("src", "assets/sprites_s/" + dexNumber + ".gif");
        }

        // Captured Pokeball
        $(".team #" + index + " .ball").attr("src", "assets/balls/" + val.ball + ".png");

        // Nickname
        if (val.nickname != "") {
            $(".team #" + index + " .nickname").text(val.nickname);
        } else {
            $(".team #" + index + " .nickname").text(basePkmn[val.dexnumber].identifier);
        }

        // Level
        if (val.level == 0) {
            $(".team #" + index + " .level").text("");
        } else {
            $(".team #" + index + " .level").text("Lv. " + val.level);
        }

        console.log(val.dexnumber + ": " + basePkmn[val.dexnumber].identifier);
        console.log(basePkmn);
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
