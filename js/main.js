var teamArray = [];
function grabTeam(){
    var teamFile = "team.json";
    $.getJSON(teamFile, {
    }).done(function(data) {
        teamArray = data;
        console.log(teamArray);
        populateTeam(data);
    });

    return true;
};

function populateTeam(teamData){
    var counter = 1;
    $(".team #slot1 .bg").attr("src", "assets/bg_colors/"+teamData.slot1.bg+".jpg"); //Sets the Pokeball Background behind the info

    var dexNumber = pad(teamData.slot1.dexnumber, 3);
    if (teamData.slot1.shiny == 0) {
        $(".team #slot1 .sprite").attr("src", "assets/sprites/"+dexNumber+".gif"); //If not shiny, set as so
    } else {
        $(".team #slot1 .sprite").attr("src", "assets/sprites_s/"+dexNumber+".gif"); //If shiny, set as so
    }

    $(".team #slot1 .ball").attr("src", "assets/balls/"+teamData.slot1.ball+".png"); //Sets which Pokeball you caught the Pokemon in
    $(".team #slot1 .nickname").html(teamData.slot1.nickname); //Sets the nickname of the Pokemon
    if (teamData.slot1.level == 0) {
        $(".team #slot1 .level").html(""); //If set to 0, don't show Level: XXX
    } else {
        $(".team #slot1 .level").html("Lv. " + teamData.slot1.level); //If set to other then 0, show Level: XXX
    }

    return true;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

$(document).ready(function() {
    grabTeam();
});
