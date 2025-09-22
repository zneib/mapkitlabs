<script>
  import { PUBLIC_MAP_TOKEN } from '$env/static/public';
  import { onMount } from 'svelte';
  import marker from '$lib/icons/marker.svg'
  import accessory from '$lib/icons/accessory.svg'
  import ImageAnnotation from '$lib/ImageAnnotation/ImageAnnotation.svelte';
	import AccessoryViews from '$lib/AccessoryViews/AccessoryViews.svelte';
	import MarkerAnnotation from '$lib/MarkerAnnotation/MarkerAnnotation.svelte';
  import CircleOverlay from '$lib/CircleOverlay/CircleOverlay.svelte';
  import PolygonOverlay from '$lib/PolygonOverlay/PolygonOverlay.svelte';
  import PolylineOverlay from '$lib/PolylineOverlay/PolylineOverlay.svelte';

  // Global variables to hold the map and mapkit objects
  let map;
  let mapkitGlobal;

  let currentZoomLevel = $state(0);
  let currentMapCenter = $state({ lat: 0, lng: 0 });

  onMount(async () => {
    // await import('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js');
		mapkit.init({
			authorizationCallback: function(done) {
					done(PUBLIC_MAP_TOKEN);
			},
			language: "en"
		});

    mapkitGlobal = mapkit
    map = new mapkit.Map('mapContainer', { 
      center: new mapkit.Coordinate(37.334883, -122.008977),
      colorScheme: 'adaptive',
      showsMapTypeControl: true,
      showsUserLocationControl: true,
      showsZoomControl: true,
      isScrollEnabled: true,
      _allowWheelToZoom: true,
      showsScale: true,
    });
    currentZoomLevel = map._impl.zoomLevel.toFixed(2);
    currentMapCenter = { lat: map._impl.center.latitude, lng: map._impl.center.longitude };
    map.addEventListener('region-change-end', (event) => {
      currentZoomLevel = map._impl.zoomLevel.toFixed(2);
      currentMapCenter = { lat: map._impl.center.latitude, lng: map._impl.center.longitude };
    });
  });
</script>

<div id="mapContainer">
  <MarkerAnnotation map={map} mapkitGlobal={mapkitGlobal} />
  <ImageAnnotation map={map} mapkitGlobal={mapkitGlobal} />
  <AccessoryViews map={map} mapkitGlobal={mapkitGlobal} />
  <CircleOverlay map={map} mapkitGlobal={mapkitGlobal} />
  <PolygonOverlay map={map} mapkitGlobal={mapkitGlobal} />
  <PolylineOverlay map={map} mapkitGlobal={mapkitGlobal} />
  <div class="menu-btn">
    <p>Zoom Level: {currentZoomLevel}</p>
    <p>Map Center: {currentMapCenter.lat.toFixed(4)}, {currentMapCenter.lng.toFixed(4)}</p>
  </div>
</div>

<style>
  :global(root, body, *) {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --gray-one: #1f2933;
    --gray-two: #323F4B;
    --gray-three: #3E4C59;
    --gray-four: #52606D;
    --gray-five: #616E7C;
    --gray-six: #7b8794;
    --gray-seven: #9aa5b1;
    --gray-eight: #cbd2d9;
    --gray-nine: #E4E7EB;
    --gray-ten: #F5F7FA;
    --blue-ten: #486581;
  }
  :global(body) {
    margin: 0px;
    padding: 0px;
  }
  #mapContainer {
    width: 100%;
    height: 100vh;
    height: 100svh;
    position: relative;
  }
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .menu-btn {
    position: absolute;
    bottom: 50px;
    left: 10px;
    z-index: 1;
    background: var(--gray-nine);
    border: 2px solid var(--blue-ten);
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    color: #000;
    font-size: 0.75rem;
  }
</style>