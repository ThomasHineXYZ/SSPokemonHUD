#!/usr/bin/env python
from intelhex import IntelHex
import json
import os
import time

# Translation dictionary from hex to standard characters
# https://github.com/pret/pokecrystal/blob/725148443f0ed0f70af747259ef49643359e92a2/charmap.asm
charmap = {
    "80": 'A', "81": 'B', "82": 'C',
    "83": 'D', "84": 'E', "85": 'F',
    "86": 'G', "87": 'H', "88": 'I',
    "89": 'J', "8a": 'K', "8b": 'L',
    "8c": 'M', "8d": 'N', "8e": 'O',
    "8f": 'P', "90": 'Q', "91": 'R',
    "92": 'S', "93": 'T', "94": 'U',
    "95": 'V', "96": 'W', "97": 'X',
    "98": 'Y', "99": 'Z',

    "a0": 'a', "a1": 'b', "a2": 'c',
    "a3": 'd', "a4": 'e', "a5": 'f',
    "a6": 'g', "a7": 'h', "a8": 'i',
    "a9": 'j', "aa": 'k', "ab": 'l',
    "ac": 'm', "ad": 'n', "ae": 'o',
    "af": 'p', "b0": 'q', "b1": 'r',
    "b2": 's', "b3": 't', "b4": 'u',
    "b5": 'v', "b6": 'w', "b7": 'x',
    "b8": 'y', "b9": 'z',

    "f6": '0', "f7": '1', "f8": '2',
    "f9": '3', "fa": '4', "fb": '5',
    "fc": '6', "fd": '7', "fe": '8',
    "ff": '9',

    "4f": '=', "57": '#', "51": '*',
    "52": 0x0, "53": 0x0, "54": '~',
    "55": '+', "58": '$', "7f": ' ',
    "9c": ':', "9e": '[', "9f": ']',

    "ba": 0x2, "bc": ' ', "bd": ' ',
    "be": ' ', "bf": ' ', "e0": "\'",
    "e1": '~', "e2": '@', "e3": '-',
    "e4": ' ', "e5": ' ', "e6": '?',
    "e7": '!', "e8": '.', "f4": ',',

    "50": 0x000 # string terminator

}

# Converts a variable to Hex again, but removes the 0x at the beginning,
# and adds a leading zero if needed
def bHex(input):
    output = hex(input)
    output = output[2:]
    output = str(output).zfill(2)
    return output

# Converts to a proper looking nickname
def grabName(inputs):
    nickname = ""
    for input in inputs:
        hexInput = bHex(input)
        if hexInput == "50":
            break
        elif hexInput == "00":
            break

        else:
            nickname = nickname + charmap[hexInput]

    return nickname

# Checks if the Dex number is valid for this generation
def checkDex(input):
    if input >= 252:
        output = -1
    else:
        output = input
    return output

# Checks if the Pokemon is shiny, in Gen2 it's based off of their IV/DV values
def checkShiny(input):
    # Put both values together
    individualValues = input[0] + input[1]

    # Then convert them to a proper hex value, then to an int
    attackHex = "0x" + individualValues[0]
    attack = int(attackHex, 0)

    defenseHex = "0x" + individualValues[1]
    defense = int(defenseHex, 0)

    speedHex = "0x" + individualValues[2]
    speed = int(speedHex, 0)

    specialHex = "0x" + individualValues[3]
    special = int(specialHex, 0)

    if defense == 10 and speed == 10 and special == 10:
        if attack == 2 or attack == 3 or attack == 6 or attack == 7 or attack == 10 or attack == 11 or attack == 14 or attack == 15:
            return True
    return False

# Loop to check for differences in the save state file
fileName = 'testdata/Crystal_Clear.sn1'
lastModifiedTime = os.path.getmtime(fileName)
while(True):
    if(os.path.getmtime(fileName) > lastModifiedTime):
        # Resets the last modified time code
        lastModifiedTime = os.path.getmtime(fileName)

        # Outputs a message for the user
        print("Save State was made on %s" % lastModifiedTime)

        # Set up and load up the save state data
        ih = IntelHex()
        ih.fromfile(fileName, format='bin')

        # Grabs and stores all of the Pokemon's data
        # -BB48 offset change from the Crystal RAM map
        # https://datacrystal.romhacking.net/wiki/Pokémon_Crystal:RAM_map
        pokemon = {
            "slot1": {
                "dexnumber": checkDex(ih[0x00002190]),
                "nickname": grabName([\
                    ih[0x000022F9], \
                    ih[0x000022FA], \
                    ih[0x000022FB], \
                    ih[0x000022FC], \
                    ih[0x000022FD], \
                    ih[0x000022FE], \
                    ih[0x000022FF], \
                    ih[0x00002300], \
                    ih[0x00002301], \
                    ih[0x00002302]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x000021AC]),
                    bHex(ih[0x000021AD])
                ]),
                "level": ih[0x000021B6]
            },
            "slot2": {
                "dexnumber": checkDex(ih[0x00002191]),
                "nickname": grabName([\
                    ih[0x00002304], \
                    ih[0x00002305], \
                    ih[0x00002306], \
                    ih[0x00002307], \
                    ih[0x00002308], \
                    ih[0x00002309], \
                    ih[0x0000230A], \
                    ih[0x0000230B], \
                    ih[0x0000230C], \
                    ih[0x0000230D]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x000021DC]),
                    bHex(ih[0x000021DD])
                ]),
                "level": ih[0x000021E6]
            },
            "slot3": {
                "dexnumber": checkDex(ih[0x00002192]),
                "nickname": grabName([\
                    ih[0x0000230F], \
                    ih[0x00002310], \
                    ih[0x00002311], \
                    ih[0x00002312], \
                    ih[0x00002313], \
                    ih[0x00002314], \
                    ih[0x00002315], \
                    ih[0x00002316], \
                    ih[0x00002317], \
                    ih[0x00002318]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x0000220C]),
                    bHex(ih[0x0000220D])
                ]),
                "level": ih[0x00002216]
            },
            "slot4": {
                "dexnumber": checkDex(ih[0x00002193]),
                "nickname": grabName([\
                    ih[0x0000231A], \
                    ih[0x0000231B], \
                    ih[0x0000231C], \
                    ih[0x0000231D], \
                    ih[0x0000231E], \
                    ih[0x0000231F], \
                    ih[0x00002320], \
                    ih[0x00002321], \
                    ih[0x00002322], \
                    ih[0x00002323]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x0000223C]),
                    bHex(ih[0x0000223D])
                ]),
                "level": ih[0x00002246]
            },
            "slot5": {
                "dexnumber": checkDex(ih[0x00002194]),
                "nickname": grabName([\
                    ih[0x00002325], \
                    ih[0x00002326], \
                    ih[0x00002327], \
                    ih[0x00002328], \
                    ih[0x00002329], \
                    ih[0x0000232A], \
                    ih[0x0000232B], \
                    ih[0x0000232C], \
                    ih[0x0000232D], \
                    ih[0x0000232E]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x0000226C]),
                    bHex(ih[0x0000226D])
                ]),
                "level": ih[0x00002276]
            },
            "slot6": {
                "dexnumber": checkDex(ih[0x00002195]),
                "nickname": grabName([\
                    ih[0x00002330], \
                    ih[0x00002331], \
                    ih[0x00002332], \
                    ih[0x00002333], \
                    ih[0x00002334], \
                    ih[0x00002335], \
                    ih[0x00002336], \
                    ih[0x00002337], \
                    ih[0x00002338], \
                    ih[0x00002339]\
                ]),
                "ball": "",
                "shiny": checkShiny([
                    bHex(ih[0x0000229C]),
                    bHex(ih[0x0000229D])
                ]),
                "level": ih[0x000022A6]
            }
        }

        # Finally, writes it to the team.json file
        file = open("../team.json","w")
        file.write(json.dumps(pokemon))
        file.close()
    time.sleep(0.1)
