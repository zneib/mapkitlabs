export const utahCoordinates = [
	// Top edge - north border (west to east)
	[41.993, -114.0518], // NW corner (Idaho/Nevada border)
	[41.993, -113.0],
	[41.993, -112.0],
	[41.993, -111.0469],

	// Northeast notch - Wyoming border drops down
	[41.993, -111.0469], // Top of notch
	[41.0, -111.0469],
	[40.9962, -111.0469], // Corner of notch (where Wyoming/Colorado meet Utah)

	// East border - Colorado border (north to south)
	[40.9962, -109.0452],
	[40.0, -109.0452],
	[39.0, -109.0452],
	[38.0, -109.0452],
	[37.0, -109.0452],
	[36.999, -109.0452], // SE corner (Four Corners area)

	// South border - Arizona border (east to west)
	[36.999, -109.0452],
	[36.999, -110.0],
	[36.999, -111.0],
	[36.999, -112.0],
	[36.999, -113.0],
	[36.999, -114.0518], // SW corner

	// West border - Nevada border (south to north)
	[37.0, -114.0518],
	[38.0, -114.0518],
	[39.0, -114.0518],
	[40.0, -114.0518],
	[41.0, -114.0518],
	[41.993, -114.0518] // Back to NW corner
];

export const newMexicoCoordinates = [
	// Top edge - north border (west to east)
	[37.0, -109.0452], // NW corner (Four Corners - Utah/Colorado border)
	[37.0, -108.0],
	[37.0, -107.0],
	[37.0, -106.0],
	[37.0, -105.0],
	[37.0, -104.0],
	[37.0, -103.0425], // NE corner (Colorado/Oklahoma/Texas border)

	// East border - Texas/Oklahoma border (north to south)
	[36.5007, -103.0425],
	[36.0, -103.0425],
	[35.0, -103.0425],
	[34.0, -103.0425],
	[33.0, -103.0425],
	[32.0004, -103.0425],

	// Southeastern corner - New Mexico/Texas border jogs west
	[32.0004, -103.0425],
	[32.0004, -106.6194], // SE corner (El Paso area)
	[31.9961, -106.6194],

	// Southern border - following Rio Grande near El Paso then west
	[31.7835, -106.536],
	[31.6117, -106.4314],
	[31.4647, -106.2803],
	[31.3656, -106.02],
	[31.3314, -105.77],
	[31.3314, -104.0], // Southern border heads east
	[31.3314, -103.0425],

	// Southwest corner - Arizona/Mexico border
	[31.3314, -108.2086], // Bootheel bottom
	[31.3314, -109.05], // SW corner meeting Arizona

	// West border - Arizona border (south to north)
	[31.3314, -109.05],
	[32.0, -109.05],
	[33.0, -109.05],
	[34.0, -109.05],
	[35.0, -109.05],
	[36.0, -109.05],
	[36.999, -109.0452], // Back to NW corner (Four Corners)
	[37.0, -109.0452] // Close polygon
];
