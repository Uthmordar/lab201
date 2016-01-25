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


## params

Format JSON:

    {
    	params: {
	        windowOpen: 0,
	        time: {hour: 12, minute: 0, timestamp: 43200},
	        luxEnv: 0,
	        hygrometrie: {hygro:0, time: {low: 0, medium: 0, high: 0}},
	        user: {x: 0, y:0, status: 0, time: {grill: 0, away:0}},
	        grill: {power: 0, time: {low: 0, medium: 0, high: 0}},
	        luxHotte: 0,
	        luxPlan: 0,
	        luxTable: 0,
	        luxWall: 0,
	        ventilation: 0,
	        tempExt: 0,
	        tempInt: 0,
	        heating: 0,
	        windows: {open: 0, shutter: 0}
    	},
    	position: {
	        luxHotte: {x:0, y:0},
	        luxPlan: {x: 0, y:0},
	        luxTable: {x: 0, y: 0},
	        luxWall: {x: 0, y: 0},
	        grill: {x: 0, y: 0}
        }
    };

    user.status : 0 (away), 1 (here)
    user.time.grill: time spend since user is near grill
    user.time.away: time spend since user is away

Réglages: 
	
	time: 0 - 86400 (seconds), step 1
	Lux environment: 0 - 100 000 (lux), step 1
	hygro: 70 - 100 (%), step 1
	grill: 0 - 3000 (W), step 100
	lux hotte: 0 - 300 (lux), step 1
	lux plan: 0 - 300 (lux), step 1
	lux table: 0 - 300 (lux), step 1
	lux wall: 0 - 300 (lux), step 1
	ventilation: 0 - 1000 , step 20
	T° outside: -15 - 45 (°C), step 1
	T° inside: 12 - 40 (°C), step 1
	heating: 0 - 2000 (W), step 20
	shutter: 0 - 100 (%), step 1

	Position => elements position, use them with user.x and user.y to know distance between them