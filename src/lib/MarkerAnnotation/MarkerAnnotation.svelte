<script>
  import marker from '$lib/icons/marker.svg'
  let { map, mapkitGlobal, onannotationadded, annotationsCount = $bindable(0) } = $props();
	import MenuButton from '$lib/MenuButton.svelte';

  let annotationAdded = $state(false);
  let markerAnnotationLat = $state(37.334883);
  let markerAnnotationLng = $state(-122.008977);
  let markerAnnotationTitle = $state('');
  let markerAnnotationSubtitle = $state('');
  let markerAnnotationColor = ('#30b567');
  let markerAnnotationGlyphColor = ('white');
  let markerAnnotationSelected = $state(false);
  let markerAnnotationDraggable = $state(true);

  let addedIndexes = $state([]); // To track which random annotations have been added

  let randomAnnotations = $state([ 
    { title: 'Arches National Park', subtitle: 'Utah, USA', lat: 38.7331, lng: -109.5925, selected: false, draggable: false, color: '#044E54', glyphColor: 'white' },
    { title: 'Disneyworld', subtitle: 'Florida, USA', lat: 28.3852, lng: -81.5639, selected: false, draggable: false, color: '#0A6C74', glyphColor: 'white' },
    { title: 'Eiffel Tower', subtitle: 'Paris, France', lat: 48.8584, lng: 2.2945, selected: false, draggable: false, color: '#0E7C86', glyphColor: 'white' },
    { title: 'Great Wall of China', subtitle: 'China', lat: 40.4319, lng: 116.5704, selected: false, draggable: false, color: '#14919B', glyphColor: 'white' },
    { title: 'Machu Picchu', subtitle: 'Peru', lat: -13.1631, lng: -72.5450, selected: false, draggable: false, color: '#2CB1BC', glyphColor: 'white' },
    { title: 'Pyramids of Giza', subtitle: 'Giza, Egypt', lat: 29.9792, lng: 31.1342, selected: false, draggable: false, color: '#610404', glyphColor: 'white' },
    { title: 'Sydney Opera House', subtitle: 'Sydney, Australia', lat: -33.8568, lng: 151.2153, selected: false, draggable: false, color: '#780A0A', glyphColor: 'white' },
    { title: 'Taj Mahal', subtitle: 'Agra, India', lat: 27.1751, lng: 78.0421, selected: false, draggable: false, color: '#911111', glyphColor: 'white' },
    { title: 'Christ the Redeemer', subtitle: 'Rio de Janeiro, Brazil', lat: -22.9519, lng: -43.2105, selected: false, draggable: false, color: '#A61B1B', glyphColor: 'white' },
    { title: 'Colosseum', subtitle: 'Rome, Italy', lat: 41.8902, lng: 12.4922, selected: false, draggable: false, color: '#BA2525', glyphColor: 'white' },
    { title: 'Golden Gate Bridge', subtitle: 'San Francisco, USA', lat: 37.8199, lng: -122.4783, selected: false, draggable: false, color: '#8D2B0B', glyphColor: 'white' },
    { title: 'Mount Fuji', subtitle: 'Japan', lat: 35.3606, lng: 138.7274, selected: false, draggable: false, color: '#B44D12', glyphColor: 'white' },
    { title: 'Niagara Falls', subtitle: 'Ontario, Canada / New York, USA', lat: 43.0962, lng: -79.0377, selected: false, draggable: false, color: '#CB6E17', glyphColor: 'white' },
    { title: 'Stonehenge', subtitle: 'Wiltshire, England', lat: 51.1789, lng: -1.8262, selected: false, draggable: false, color: '#DE911D', glyphColor: 'white' },
    { title: 'Everest', subtitle: 'Nepal / China', lat: 27.9881, lng: 86.9250, selected: false, draggable: false, color: '#F0B429', glyphColor: 'white' },
    { title: 'Statue of Liberty', subtitle: 'New York, USA', lat: 40.6892, lng: -74.0445, selected: false, draggable: false, color: '#1B4D3E', glyphColor: 'white' },
    { title: 'Petra', subtitle: 'Jordan', lat: 30.3285, lng: 35.4444, selected: false, draggable: false, color: '#C1714F', glyphColor: 'white' },
    { title: 'Leaning Tower of Pisa', subtitle: 'Pisa, Italy', lat: 43.7230, lng: 10.3966, selected: false, draggable: false, color: '#536E70', glyphColor: 'white' },
    { title: 'Big Ben', subtitle: 'London, England', lat: 51.5007, lng: -0.1246, selected: false, draggable: false, color: '#147D64', glyphColor: 'white' },
    { title: 'Santorini', subtitle: 'Greece', lat: 36.3932, lng: 25.4615, selected: false, draggable: false, color: '#5F3DC4', glyphColor: 'white' },
    { title: 'Grand Canyon', subtitle: 'Arizona, USA', lat: 36.1069, lng: -112.1129, selected: false, draggable: false, color: '#087F5B', glyphColor: 'white' }
  ]);

  function addAnnotation() {
    if (map && mapkitGlobal) {
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(markerAnnotationLat, markerAnnotationLng), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
        glyphColor: markerAnnotationGlyphColor,
        selected: markerAnnotationSelected,
        draggable: markerAnnotationDraggable
      });
      map.addAnnotation(annotation);

      // Remove previous listener before adding a new one
      // annotation.removeEventListener("select", onAnnotationSelect);
      annotation.addEventListener("select", onAnnotationSelect);
      annotationAdded = true;
      annotationsCount += 1;
      onannotationadded?.();
    }
  }
  function onAnnotationSelect(event) {
    const annotation = event.target;
    map.setCenterAnimated(annotation.coordinate, true);
    // console.log(annotation.title, annotation.coordinate);
  }
  function removeCustomMarkerAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      annotationAdded = false;
    }
  }
  function resetAnnotationWithNewData() {
    if (map && mapkitGlobal) {
      map.removeAnnotations(map._impl._annotationsController._items); // Remove all annotations
      // map.removeAnnotation(map.selectedAnnotation); // Only remove the selected annotation, which won't work if the annotation isn't selected
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(markerAnnotationLat, markerAnnotationLng), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
        selected: markerAnnotationSelected,
        draggable: markerAnnotationDraggable
      });
      map.addAnnotation(annotation);
    }
  }
  function removeAllAnnotations() {
    if (map && mapkitGlobal) {
      map.removeAnnotations(map.annotations);
      annotationAdded = false;
      annotationsCount = 0;
      addedIndexes = [];
    }
  }
  function setAnnotationColor(color) {
    markerAnnotationColor = color;
    resetAnnotationWithNewData();
  }
  function closePopover() {
    const popoverId = $state(document.getElementById('custom-popover'));
    popoverId.hidePopover();
  }
  function addRandomAnnotation() {
    if (map && mapkitGlobal) {
      const randomIndex = Math.floor(Math.random() * randomAnnotations.length);
      if (addedIndexes.includes(randomIndex)) return; // If the index has already been added, skip
      addedIndexes.push(randomIndex);
      const randomAnnotationData = randomAnnotations[randomIndex];
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(randomAnnotationData.lat, randomAnnotationData.lng), {
        title: randomAnnotationData.title,
        subtitle: randomAnnotationData.subtitle,
        selected: randomAnnotationData.selected,
        draggable: randomAnnotationData.draggable,
        color: randomAnnotationData.color,
        glyphColor: randomAnnotationData.glyphColor
      });
      annotation.addEventListener("select", onAnnotationSelect);
      map.addAnnotation(annotation);
      map.setCenterAnimated(annotation.coordinate, true);
      annotationsCount += 1;
      onannotationadded?.();
    }
  }
</script>

<MenuButton target="custom-popover" topValue="10px" text="Marker Annotation" />
<div popover id="custom-popover" class="popover">
  <div class="top-row">
    <h2>Annotation Properties</h2>
    <a class="code-link" href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank" aria-label="Code Sample">
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
    <button class="close-btn" onclick={closePopover}>&times;</button>
  </div>
  <div class="section-wrapper">
    <aside class="option-section">
      <div>
        <label for="markerAnnotationLat">
          <a href="https://developer.apple.com/documentation/mapkitjs/mapkit.coordinate/mapkit.coordinate" target="_blank">Latitude</a>
        </label>
        <input bind:value={markerAnnotationLat} class="annotation-input" type="number" name="markerAnnotationLat" id="markerAnnotationLat" placeholder="Enter Latitude" oninput={resetAnnotationWithNewData} onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationLng">
          <a href="https://developer.apple.com/documentation/mapkitjs/mapkit.coordinate/mapkit.coordinate" target="_blank">Longitude</a>
        </label>
        <input bind:value={markerAnnotationLng} class="annotation-input" type="number" name="markerAnnotationLng" id="markerAnnotationLng" placeholder="Enter Longitude" oninput={resetAnnotationWithNewData} onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationTitle">
          <a href="https://developer.apple.com/documentation/mapkitjs/mapkit.annotation/title" target="_blank">Title</a>
        </label>
        <input bind:value={markerAnnotationTitle} class="annotation-input" type="text" name="markerAnnotationTitle" id="markerAnnotationTitle" placeholder="Enter a Title" onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationSub">
          <a href="https://developer.apple.com/documentation/mapkitjs/mapkit.annotation/subtitle" target="_blank">Subtitle</a>
        </label>
        <input bind:value={markerAnnotationSubtitle} class="annotation-input" type="text" name="markerAnnotationSubtitle" id="markerAnnotationSub" placeholder="Enter a Subtitle" onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationColor">
          <a href="https://developer.apple.com/documentation/mapkitjs/markerannotationconstructoroptions/color" target="_blank">Color</a>
        </label>
        <button onclick={setAnnotationColor('#044E54')} aria-label="CyanOne" class="annotation-input color-btn" style:background-color="#044E54"></button>
        <button onclick={setAnnotationColor('#0A6C74')} aria-label="CyanTwo" class="annotation-input color-btn" style:background-color="#0A6C74"></button>
        <button onclick={setAnnotationColor('#0E7C86')} aria-label="CyanThree" class="annotation-input color-btn" style:background-color="#0E7C86"></button>
        <button onclick={setAnnotationColor('#14919B')} aria-label="CyanFour" class="annotation-input color-btn" style:background-color="#14919B"></button>
        <button onclick={setAnnotationColor('#2CB1BC')} aria-label="CyanFive" class="annotation-input color-btn" style:background-color="#2CB1BC"></button>
        <button onclick={setAnnotationColor('#38BEC9')} aria-label="CyanSix" class="annotation-input color-btn" style:background-color="#38BEC9"></button>
      </div>
    </aside>
    <aside class="option-section">
      <div>
        <label for="markerAnnotationSelected">Selected</label>
        <input bind:checked={markerAnnotationSelected} class="annotation-input-small" type="checkbox" name="markerAnnotationSelected" id="markerAnnotationSelected" onchange={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationDraggable">Draggable</label>
        <input bind:checked={markerAnnotationDraggable} class="annotation-input-small" type="checkbox" name="markerAnnotationDraggable" id="markerAnnotationDraggable" onchange={resetAnnotationWithNewData} />
      </div>
    </aside>
  </div>
  <div class="button-row">
    <button class="custom-btn" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="custom-btn" onclick={addAnnotation}>Add Marker Annotation</button>
  </div>
  <button class="custom-btn" onclick={addRandomAnnotation} disabled={addedIndexes.length === randomAnnotations.length}>Random Annotation</button>
</div>

<style>
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .button-row {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    margin-top: 10px;
  }
  .custom-btn {
    background-color: transparent;
    color: var(--gray-one);
    border: 1px solid var(--gray-one);
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .custom-btn:disabled {
    cursor: not-allowed;
    color: var(--gray-two);
    opacity: 0.5;
  }
  .section-wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .option-section {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  .popover:popover-open {
    position: absolute;
    top: 50px;
    left: 10px;
    margin: 0;
    border-radius: 4px;
    border: none;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,1);
  }
  label {
    font-size: 0.8rem;
    padding-right: 2px;
  }
  .annotation-input {
    width: 200px;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid var(--gray-six);
    border-radius: 4px;
    font-size: 0.8rem;
  }
  .annotation-input-small {
    padding: 5px;
    margin-top: 5px;
    font-size: 0.8rem;
  }
  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .code-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6rem;
    text-transform: uppercase;
    color: var(--gray-one);
    margin-left: auto;
  }
  .top-row {
    display: flex;
    align-items: baseline;
    width: 100%;
    gap: 10px;
    h2 {
      margin-top: 0;
    }
  }
  .color-btn {
    width: 29px;
    height: 20px;
    border: none;
    border-radius: 2px;
  }
</style>