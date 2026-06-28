export const utahCoordinates = [
    // Top edge - north border (west to east)
    [41.9930, -114.0518], // NW corner (Idaho/Nevada border)
    [41.9930, -113.0000],
    [41.9930, -112.0000],
    [41.9930, -111.0469],

    // Northeast notch - Wyoming border drops down
    [41.9930, -111.0469], // Top of notch
    [41.0000, -111.0469],
    [40.9962, -111.0469], // Corner of notch (where Wyoming/Colorado meet Utah)

    // East border - Colorado border (north to south)
    [40.9962, -109.0452],
    [40.0000, -109.0452],
    [39.0000, -109.0452],
    [38.0000, -109.0452],
    [37.0000, -109.0452],
    [36.9990, -109.0452], // SE corner (Four Corners area)

    // South border - Arizona border (east to west)
    [36.9990, -109.0452],
    [36.9990, -110.0000],
    [36.9990, -111.0000],
    [36.9990, -112.0000],
    [36.9990, -113.0000],
    [36.9990, -114.0518], // SW corner

    // West border - Nevada border (south to north)
    [37.0000, -114.0518],
    [38.0000, -114.0518],
    [39.0000, -114.0518],
    [40.0000, -114.0518],
    [41.0000, -114.0518],
    [41.9930, -114.0518]  // Back to NW corner
];

export const newMexicoCoordinates = [
    // Top edge - north border (west to east)
    [37.0000, -109.0452], // NW corner (Four Corners - Utah/Colorado border)
    [37.0000, -108.0000],
    [37.0000, -107.0000],
    [37.0000, -106.0000],
    [37.0000, -105.0000],
    [37.0000, -104.0000],
    [37.0000, -103.0425], // NE corner (Colorado/Oklahoma/Texas border)

    // East border - Texas/Oklahoma border (north to south)
    [36.5007, -103.0425],
    [36.0000, -103.0425],
    [35.0000, -103.0425],
    [34.0000, -103.0425],
    [33.0000, -103.0425],
    [32.0004, -103.0425],

    // Southeastern corner - New Mexico/Texas border jogs west
    [32.0004, -103.0425],
    [32.0004, -106.6194], // SE corner (El Paso area)
    [31.9961, -106.6194],

    // Southern border - following Rio Grande near El Paso then west
    [31.7835, -106.5360],
    [31.6117, -106.4314],
    [31.4647, -106.2803],
    [31.3656, -106.0200],
    [31.3314, -105.7700],
    [31.3314, -104.0000], // Southern border heads east
    [31.3314, -103.0425],

    // Southwest corner - Arizona/Mexico border
    [31.3314, -108.2086], // Bootheel bottom
    [31.3314, -109.0500], // SW corner meeting Arizona

    // West border - Arizona border (south to north)
    [31.3314, -109.0500],
    [32.0000, -109.0500],
    [33.0000, -109.0500],
    [34.0000, -109.0500],
    [35.0000, -109.0500],
    [36.0000, -109.0500],
    [36.9990, -109.0452], // Back to NW corner (Four Corners)
    [37.0000, -109.0452]  // Close polygon
];
