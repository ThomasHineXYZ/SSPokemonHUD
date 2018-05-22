var teamArray = [];
var teamJSON = "";
function grabTeam(){
    var teamFile = "team.json";
    $.getJSON(teamFile, {
    }).done(function(data) {
        if (teamJSON !== JSON.stringify(data)) {
            teamJSON = JSON.stringify(data);
            teamArray = data;
            populateTeam(data);
        }
    });

    return true;
};

function populateTeam(teamData){
    var counter = 1;
    $.each(teamData, function(index, val) {
        console.log(index+": "+val.dexnumber);
        $(".team #" + index + " .bg").attr("src", "assets/bg_colors/"+val.bg+".jpg"); //Sets the Pokeball Background behind the info

        var dexNumber = pad(val.dexnumber, 3);
        if (val.shiny == 0) {
            $(".team #" + index + " .sprite").attr("src", "assets/sprites/"+dexNumber+".gif"); //If not shiny, set as so
        } else {
            $(".team #" + index + " .sprite").attr("src", "assets/sprites_s/"+dexNumber+".gif"); //If shiny, set as so
        }

        $(".team #" + index + " .ball").attr("src", "assets/balls/"+val.ball+".png"); //Sets which Pokeball you caught the Pokemon in
        $(".team #" + index + " .nickname").html(val.nickname); //Sets the nickname of the Pokemon
        if (val.level == 0) {
            $(".team #" + index + " .level").html(""); //If set to 0, don't show Level: XXX
        } else {
            $(".team #" + index + " .level").html("Lv. " + val.level); //If set to other then 0, show Level: XXX
        }
    });

    return true;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

$(document).ready(function() {
    grabTeam();
    setInterval(grabTeam, 500);
});
