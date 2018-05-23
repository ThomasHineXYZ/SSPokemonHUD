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
        // Sets the background WIP
        $(".team #" + index + " .bg").attr("src", "assets/bg_colors/" + val.bg + ".jpg");

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
            $(".team #" + index + " .nickname").text(val.nickname);
        }

        // Level
        if (val.level == 0) {
            $(".team #" + index + " .level").text("");
        } else {
            $(".team #" + index + " .level").text("Lv. " + val.level);
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
        colours = csvToObject(coloursCSV[0]);
        basePkmn = csvToObject(pokemonCSV[0]);
        pkmnSpecies = csvToObject(pokemonSpeciesCSV[0]);
        pkmnTypes = csvToObject(pokemonTypesCSV[0]);
        types = csvToObject(typesCSV[0]);

        grabTeam();
        setInterval(grabTeam, 500);
    });
});
