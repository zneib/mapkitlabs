<script>
  import { PUBLIC_MAP_TOKEN } from '$env/static/public';
  import { onMount } from 'svelte';
  import marker from '$lib/icons/marker.svg'
  import accessory from '$lib/icons/accessory.svg'

  // Global variables to hold the map and mapkit objects
  let map;
  let mapkitGlobal;

  onMount(async () => {
    await import('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js');
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
  });

  function addAnnotation() {
    if (map && mapkitGlobal) {
      const activeAnnotation = map.selectedAnnotation;
      if (activeAnnotation) {
        map.removeAnnotation(activeAnnotation);
      } else {
        const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
          title: "Apple Park",
          subtitle: "Cupertino, CA",
          color: "#ff0000",
          selected: true
        });
        map.addAnnotation(annotation);
      }
    }
  }

  // Callout delegate
  const annotationCallout = {
    calloutLeftAccessoryForAnnotation: () => {
        const accessoryViewLeft = document.createElement("div");
        accessoryViewLeft.className = "left-accessory-view";

        const accessoryViewLeftIcon = document.createElement("span");
        accessoryViewLeftIcon.textContent = "\u{26C5}"; // Sun & Clouds
        accessoryViewLeft.appendChild(accessoryViewLeftIcon);

        const accessoryViewLeftText = document.createElement("div");
        accessoryViewLeftText.textContent = "73 \u{00b0}F";
        accessoryViewLeft.appendChild(accessoryViewLeftText);

        return accessoryViewLeft;
    },
  };

  function addAccessoryView() {
    if (map && mapkitGlobal) {
      const activeAnnotation = map.selectedAnnotation;
      if (activeAnnotation) {
        map.removeAnnotation(activeAnnotation);
      } else {
        const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
          title: "Apple Park",
          subtitle: "Cupertino, CA",
          color: "#360b5b",
          selected: true,
          callout: annotationCallout
        });
        map.addAnnotation(annotation);
      }
    }
  }
</script>

<div id="mapContainer">
  <button class="menu-btn" popovertarget="custom-popover" popovertargetaction="toggle" style:top="60px">
    <img src={marker} alt="marker" />
    <span>Annotations</span>
  </button>
  <button class="menu-btn" onclick={addAccessoryView} style:top="110px">
    <img src={accessory} alt="accessory" />
    <span>Accessory Views</span>
  </button>
  <div popover id="custom-popover" class="popover">
    <p>A lot of code isn't needed to add a custom annotation. See the sample code <a href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank">here</a></p>
    <button class="toggle" onclick={addAnnotation}>Toggle Custom Annotation</button>
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
  .menu-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    border: 2px solid var(--blue-ten);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      padding-left: 5px;
    }
  }
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .toggle {
    background-color: var(--blue-ten);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    width: fit-content;
  }

  .popover:popover-open {
    position: absolute;
    top: 50px;
    left: 200px;
    margin: 0;
    border-radius: 8px;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,0.75);
  }
</style>