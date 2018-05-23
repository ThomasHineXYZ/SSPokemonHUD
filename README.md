SSPokemonHUD
------------

SSPokemonHUD is an idea that [ShockSlayer](https://www.youtube.com/c/shockslayer "SS's YouTube Channel") came up with and was starting to work on for his [Twitch streams](https://twitch.tv/shockslayer "SS's Twitch").

## Instructions
You will need to host this on web server of some sort:

* On Windows I'd recommend [WAMP](http://www.wampserver.com/en/) (mainly because I couldn't ever get XAMPP to work...).
* On Linux I'd suggest Apache.
* On Mac... you'll have to figure it out, I don't have a Mac available to test with at the moment.

Make a copy of `team.example.json` and name it `team.json` to get started.

## Resources
You will need to download and put these in the correct folders (and unzip them if needed):

* [Assets Pack](http://www.mediafire.com/file/1m8bm8mj8z1ozrd/SSPokemonHUD-assets.zip) ([backup link](https://mega.nz/#!cUlURKyA!lbQVYxW3pyC6v8rOHfxLR-IS7jMpL5FyfGWRAbc-1Dg)) - put contents in the `assets/` folder
* [Pokemon GB Fonts](http://www.fontspace.com/jackster-productions/pokemon-gb) - put contents in the `fonts/` folder

## Folder Info
A rather simple description of what each folder is responsible for.

* `assets/` - The various acompanying assets for this little HUD tool
* `css/` - The compiled stylesheets for the `index.html` file
* `fonts/` - The required font files (if you don't have them or want them installed)
* `js/` - The Javascript files for the `index.html` file
* `luts/` - The various CSV and `look up table` files. Most are from [Veekun](https://github.com/veekun/pokedex/tree/master/pokedex/data/csv)
* `scss/` - The uncompiled SASS stylesheets

## JS Libraries Used

* jQuery `3.3.1`
* Papa Parse `v4.4.0`
