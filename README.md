# APP EXPRESSIF
## Requirements
* zepto.js
* snapsvg.js

## NPM package.json use npm-install to dl grunt grun-concat && grunt-uglify
* run grunt to compile & minify js apps files

## Config
à la fin de index.html:
	/**
	 * @string intro slide container
	 * @string websocket address for data exchange
	 * @bool if set to true, app will use default simulation rather than websocket data
	*/
 	home.initialize("#home .talk", "ws://echo.websocket.org", false);

 	params => default state for input and output