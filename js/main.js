function PopulateTeamNew(){
    ImportArray = [];
    $.getJSON('team.json', function(data) {
        ImportArray = data;
        document.write(ImportArray.length);
    });
    console.log(ImportArray);
};

function PopulateTeam(){
//Slot 1
    document.getElementById("Slot1BG").src = "assets/bg_colors/"+TeamMember1[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember1[0] != 0) {
        if (TeamMember1[3] == 0) {
            document.getElementById("Slot1Sprite").src = "assets/sprites/"+TeamMember1[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember1[3] == 1){
            document.getElementById("Slot1Sprite").src = "assets/sprites_s/"+TeamMember1[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById("Slot1Ball").src = "balls/"+TeamMember1[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot1Nickname").innerHTML = TeamMember1[1]; //Sets the nickname of the Pokemon
    if (TeamMember1[5] == 0) {
        document.getElementById("Slot1Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot1Level").innerHTML = "Level: " + TeamMember1[5]; //If set to other then 0, show Level: XXX
    }

//Slot 2
    document.getElementById("Slot2BG").src = "assets/bg_colors/"+TeamMember2[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember2[0] != 0) {
        if (TeamMember2[3] == 0) {
            document.getElementById("Slot2Sprite").src = "assets/sprites/"+TeamMember2[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember2[3] == 1){
            document.getElementById("Slot2Sprite").src = "assets/sprites_s/"+TeamMember2[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById('Slot2Sprite').style.right = window.innerWidth - 753 + "px";
    document.getElementById("Slot2Ball").src = "balls/"+TeamMember2[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot2Nickname").innerHTML = TeamMember2[1]; //Sets the nickname of the Pokemon
    if (TeamMember2[5] == 0) {
        document.getElementById("Slot2Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot2Level").innerHTML = "Level: " + TeamMember2[5]; //If set to other then 0, show Level: XXX
    }
//Slot 3
    document.getElementById("Slot3BG").src = "assets/bg_colors/"+TeamMember3[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember3[0] != 0) {
        if (TeamMember3[3] == 0) {
            document.getElementById("Slot3Sprite").src = "assets/sprites/"+TeamMember3[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember3[3] == 1){
            document.getElementById("Slot3Sprite").src = "assets/sprites_s/"+TeamMember3[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById("Slot3Ball").src = "balls/"+TeamMember3[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot3Nickname").innerHTML = TeamMember3[1]; //Sets the nickname of the Pokemon
    if (TeamMember3[5] == 0) {
        document.getElementById("Slot3Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot3Level").innerHTML = "Level: " + TeamMember3[5]; //If set to other then 0, show Level: XXX
    }
//Slot 4
    document.getElementById("Slot4BG").src = "assets/bg_colors/"+TeamMember4[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember4[0] != 0) {
        if (TeamMember4[3] == 0) {
            document.getElementById("Slot4Sprite").src = "assets/sprites/"+TeamMember4[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember4[3] == 1){
            document.getElementById("Slot4Sprite").src = "assets/sprites_s/"+TeamMember4[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById('Slot4Sprite').style.right = window.innerWidth - 753 + "px";
    document.getElementById("Slot4Ball").src = "balls/"+TeamMember4[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot4Nickname").innerHTML = TeamMember4[1]; //Sets the nickname of the Pokemon
    if (TeamMember4[5] == 0) {
        document.getElementById("Slot4Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot4Level").innerHTML = "Level: " + TeamMember4[5]; //If set to other then 0, show Level: XXX
    }
//Slot 5
    document.getElementById("Slot5BG").src = "assets/bg_colors/"+TeamMember5[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember5[0] != 0) {
        if (TeamMember5[3] == 0) {
            document.getElementById("Slot5Sprite").src = "assets/sprites/"+TeamMember5[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember5[3] == 1){
            document.getElementById("Slot5Sprite").src = "assets/sprites_s/"+TeamMember5[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById("Slot5Ball").src = "balls/"+TeamMember5[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot5Nickname").innerHTML = TeamMember5[1]; //Sets the nickname of the Pokemon
    if (TeamMember5[5] == 0) {
        document.getElementById("Slot5Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot5Level").innerHTML = "Level: " + TeamMember5[5]; //If set to other then 0, show Level: XXX
    }
//Slot 6
    document.getElementById("Slot6BG").src = "assets/bg_colors/"+TeamMember6[4]+".jpg"; //Sets the Pokeball Background behind the info
    if (TeamMember6[0] != 0) {
        if (TeamMember6[3] == 0) {
            document.getElementById("Slot6Sprite").src = "assets/sprites/"+TeamMember6[0]+".gif"; //If not shiny, set as so
        }else if (TeamMember6[3] == 1){
            document.getElementById("Slot6Sprite").src = "assets/sprites_s/"+TeamMember6[0]+".gif"; //If shiny, set as so
            document.getElementById("Slot6Sprite").src = "assets/sprites_s/"+TeamMember6[0]+".gif"; //If shiny, set as so
        }
    }
    document.getElementById('Slot6Sprite').style.right = window.innerWidth - 753 + "px";
    document.getElementById("Slot6Ball").src = "balls/"+TeamMember6[2]+".png"; //Sets which Pokeball you caught the Pokemon in
    document.getElementById("Slot6Nickname").innerHTML = TeamMember6[1]; //Sets the nickname of the Pokemon
    if (TeamMember6[5] == 0) {
        document.getElementById("Slot6Level").innerHTML = ""; //If set to 0, don't show Level: XXX
    }else{
        document.getElementById("Slot6Level").innerHTML = "Level: " + TeamMember6[5]; //If set to other then 0, show Level: XXX
    }
}
