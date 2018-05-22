var teamString = "";
var teamArray = [];
/**
 * Grabs the team data from the JSON file, and then runs the populate function
 *
 * @return {boolean}
 */
function grabTeam(){
    var teamFile = "team.json";
    $.getJSON(teamFile, {
    }).done(function(data) {
        if (teamString !== JSON.stringify(data)) {
            teamString = JSON.stringify(data);
            teamArray = data;
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
        $(".team #" + index + " .nickname").text(val.nickname);

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
 * @return {[type]}      [description]
 */
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

$(document).ready(function() {
    grabTeam();
    setInterval(grabTeam, 500);
});
