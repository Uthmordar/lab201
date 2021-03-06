# APP EXPRESSIF
## Requirements
* zepto.js
* snapsvg.js

## NPM package.json use npm-install to dl grunt grun-concat && grunt-uglify
* run grunt to compile & minify js apps files

## Config

Tuned for 1920px * 1080px
 
You could configure the application by editing config.json at the root of the folder for the inputs:

	{
		"params": {
			"windowOpen": 0,
			"time": {
				"hour": 12,
				"minute": 0,
				**"timestamp": 43200**
			},
			**"luxEnv": 45000,**
			"hygrometrie": {
				**"hygro": 80,**
				"time": {
					"low": 0,
					"medium": 0,
					"high": 0
				}
			},
			"user": {
				"x": 0,
				"y":0,
				"status": 1,
				"time": {
					"grill":0,
					"away": 0
				}
			},
			"grill": {
				"power": 0,
				"time": {
					"low": 0,
					"medium": 0,
					"high": 0
				}
			},
			"luxHotte": 0,
			"luxPlan": 0,
			"luxTable": 0,
			"luxWall": 0,
			"ventilation": 0,
			**"tempExt": 3,**
			**"tempInt": 13,**
			"heating": 0,
			"windows": {
				"open": 0,
				"shutter": 0
			}
		},
		**"socket": "ws://echo.websocket.org",** // websocket for json string params exchange
		**"simulationEnabled": true** // if set to true, application will use default simulation rather than websocket output 
	}



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
        },
        say: "some text", // what karl will say, only in data returned by ExpressIf socket.
    };

    user.status : 0 (away), 1 (here)
    user.time.grill: time spend since user is near grill
    user.time.away: time spend since user is away

Parameters (min - max (unit), step stepVal): 
	
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



test:
 
	chrome

	http://uthmordar.github.io/lab201

	appuyer sur f12 pour ouvrir la console du navigateur ou ctrl + maj + i ou clic droit inspecter l’élément

	ensuite cliquer sur le symbole téléphone tablette en haut à gauche du panneau console ou alors CTRL + SHIFT + M

	dans le haut de l’écran choisir responsive dans le menu déroulant puis entrer 1920 x 1080, recharger la page avec f5

	le sous-écran sera équivalent à ce que verrait un utilisateur tablette à la résolution donnée, les interactions aussi. Le point noir correspond à un doigt et non à un clic souris, c’est pourquoi certaines interactions ont évolués pour faciliter la vie de l’utilisateur. Il devient possible de déplacer les éléments uniquement en touchant une zone accessible plutôt qu’en glissant le doigt sur tout le mouvement voulu, même si cela marche encore.
