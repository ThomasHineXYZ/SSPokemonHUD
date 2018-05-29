SSPokemonHUD
------------

SSPokemonHUD is an idea that [ShockSlayer](https://www.youtube.com/c/shockslayer "SS's YouTube Channel") came up with and was starting to work on for his [Twitch streams](https://twitch.tv/shockslayer "SS's Twitch").

## Premise
To make this as simple as possible, we have chosen to use a Python based web server. To the average person running Windows this just means you have to install one program and woola, you have it working. In Linux Python is _usually_ pre-installed on the distribution of your choice, so that makes running this super simple.

## Install Instructions
### Windows
* Install a version of [Python 3](https://www.python.org/downloads/) from their official website.
* Press the green download button, then download as a ZIP file. Extract that to where you want it.
  * If you have GIT Bash or a Windows GIT client, you can just clone this project to a folder on your computer.
* Download and put the required resources in their folders (info is below).
* _If you'd like_, install the extensions by downloading the extension project's zip file and extracting it to the `extensions/` folder.
* Run `start.py` whenever you can to start it up, point OBS to `localhost:251`, and you should be good.

### Linux
Assuming you have both GIT and Python 3 (usually pre-installed) installed, this install is super easy:
```
git clone https://github.com/guitaristtom/SSPokemonHUD.git sspokemonhud
cd sspokemonhud
git clone https://github.com/guitaristtom/sspokemonhud-extensions extensions
```

### Mac OS X
`¯\_(ツ)_/¯`

## Resources
You will need to download and put these in the correct folders (and unzip them if needed):

* [Assets Pack](http://www.mediafire.com/file/1m8bm8mj8z1ozrd/SSPokemonHUD-assets.zip) ([backup link](https://mega.nz/#!cUlURKyA!lbQVYxW3pyC6v8rOHfxLR-IS7jMpL5FyfGWRAbc-1Dg)) - put contents in the `assets/` folder
* [Pokemon GB Fonts](http://www.fontspace.com/jackster-productions/pokemon-gb) - put contents in the `fonts/` folder

## Folder Info
A rather simple description of what each folder is responsible for.

* `assets/` - The various acompanying assets for this little HUD tool
* `css/` - The compiled stylesheets for the `index.html` file
* `extensions/` - If you have any of the extensions for this project, you put the files in to there.
* `fonts/` - The required font files (if you don't have them or want them installed)
* `js/` - The Javascript files for the `index.html` file
* `luts/` - The various CSV and `look up table` files. Most are from [Veekun](https://github.com/veekun/pokedex/tree/master/pokedex/data/csv)
* `scss/` - The uncompiled SASS stylesheets

## JS Libraries Used
* jQuery `3.3.1`
* Papa Parse `v4.4.0`

## Python Libraries Used
* IntelHex
