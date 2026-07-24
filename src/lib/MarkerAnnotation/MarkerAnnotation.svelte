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
  let customAnnotationId = $state(null); // id of the most recently added custom annotation

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
      customAnnotationId = crypto.randomUUID();
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(markerAnnotationLat, markerAnnotationLng), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
        glyphColor: markerAnnotationGlyphColor,
        selected: markerAnnotationSelected,
        draggable: markerAnnotationDraggable,
        data: { id: customAnnotationId, source: 'custom' }
      });
      map.addAnnotation(annotation);

      annotation.addEventListener("select", onAnnotationSelect);
      annotationAdded = true;
      annotationsCount += 1;
      onannotationadded?.();
    }
  }
  function removeAnnotation(id) {
    if (map && mapkitGlobal) {
      const annotation = map.annotations.find(annotation => annotation.data?.id === id);
      if (annotation) {
        map.removeAnnotation(annotation);
        annotationsCount -= 1;
      }
    }
  }
  function onAnnotationSelect(event) {
    const annotation = event.target;
    map.setCenterAnimated(annotation.coordinate, true);
  }
  function removeCustomMarkerAnnotation() {
    if (customAnnotationId) {
      removeAnnotation(customAnnotationId);
      customAnnotationId = null;
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
        glyphColor: randomAnnotationData.glyphColor,
        data: { id: crypto.randomUUID(), source: 'random', index: randomIndex }
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
    <h2>Marker Annotation Properties</h2>
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
    <button class="custom-btn" onclick={addAnnotation}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Custom Annotation
    </button>
    <button class="custom-btn" onclick={removeCustomMarkerAnnotation} disabled={!customAnnotationId}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
      </svg>
      Remove Custom Annotation
    </button>
  </div>
  <hr class="separator" />
  <div class="button-row">
    <button class="custom-btn" onclick={addRandomAnnotation} disabled={addedIndexes.length === randomAnnotations.length}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
      Add Random Annotation
    </button>
    <button class="custom-btn" style={'display: flex'} onclick={removeAllAnnotations}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      Remove All Annotations
    </button>
  </div>
</div>

<style>
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .separator {
    width: 100%;
    border-top: 1px solid var(--gray-ten);
    margin-top: 20px;
    margin-bottom: 0;
  }
  .button-row {
    display: flex;
    justify-content: start;
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
    display: flex;
    align-items: center;
    & > svg {
      width: 15px;
      height: 15px;
      margin-right: 2px;
    }
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