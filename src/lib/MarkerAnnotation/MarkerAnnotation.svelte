<script>
  let { map, mapkitGlobal } = $props();
  import marker from '$lib/icons/marker.svg'
	import MenuButton from '$lib/MenuButton.svelte';
  
  $effect(() => {
    if (map && mapkitGlobal) {
      console.log(map)
      // map.addEventListener('drag-start', (event) => {
      //   console.log(event);
      // });
    }
  });

  let annotationAdded = $state(false);
  let markerAnnotationLat = $state(37.334883);
  let markerAnnotationLng = $state(-122.008977);
  let markerAnnotationTitle = $state('');
  let markerAnnotationSubtitle = $state('');
  let markerAnnotationColor = ('30b567');
  let markerAnnotationGlyphColor = ('white');
  let markerAnnotationSelected = $state(true);
  let markerAnnotationDraggable = $state(true);

  function addAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(markerAnnotationLat, markerAnnotationLng), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
        glyphColor: markerAnnotationGlyphColor,
        selected: markerAnnotationSelected,
        draggable: markerAnnotationDraggable
      });
      map.addAnnotation(annotation);
      annotationAdded = true;
    }
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
      map.removeAnnotations(map._impl._annotationsController._items);
      annotationAdded = false;
    }
  }
  function setAnnotationColor(color) {
    markerAnnotationColor = color;
    resetAnnotationWithNewData();
  }
  function setAnnotationGlyphColor(color) {
    markerAnnotationGlyphColor = color;
    resetAnnotationWithNewData();
  }
  function closePopover() {
    const popoverId = $state(document.getElementById('custom-popover'));
    popoverId.hidePopover();
  }
</script>

<MenuButton target="custom-popover" topValue="60px" text="Marker Annotation" />
<div popover id="custom-popover" class="popover">
  <div class="top-row">
    <h2>Annotation Properties</h2>
    <!-- <a class="code-link" href="https://developer.apple.com/documentation/mapkitjs/markerannotation" target="_blank" aria-label="Documentation" >
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    </a> -->
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
      <!-- <div>
        <label for="markerAnnotationGlyphColor">Glyph Color</label>
        <button onclick={setAnnotationGlyphColor('#044E54')} aria-label="CyanOne" class="annotation-input color-btn" style:background-color="#044E54"></button>
        <button onclick={setAnnotationGlyphColor('#0A6C74')} aria-label="CyanTwo" class="annotation-input color-btn" style:background-color="#0A6C74"></button>
        <button onclick={setAnnotationGlyphColor('#0E7C86')} aria-label="CyanThree" class="annotation-input color-btn" style:background-color="#0E7C86"></button>
        <button onclick={setAnnotationGlyphColor('#14919B')} aria-label="CyanFour" class="annotation-input color-btn" style:background-color="#14919B"></button>
        <button onclick={setAnnotationGlyphColor('#2CB1BC')} aria-label="CyanFive" class="annotation-input color-btn" style:background-color="#2CB1BC"></button>
        <button onclick={setAnnotationGlyphColor('#38BEC9')} aria-label="CyanSix" class="annotation-input color-btn" style:background-color="#38BEC9"></button>
      </div> -->
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
    <button class="custom-btn" onclick={annotationAdded ? removeCustomMarkerAnnotation : addAnnotation}>Toggle Custom Annotation</button>
  </div>
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
    top: 100px;
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