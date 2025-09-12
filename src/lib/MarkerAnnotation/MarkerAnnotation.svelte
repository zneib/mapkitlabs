<script>
  let { map, mapkitGlobal } = $props();
  import marker from '$lib/icons/marker.svg'

  let annotationAdded = $state(false);
  let markerAnnotationTitle = $state('');
  let markerAnnotationSubtitle = $state('');
  let markerAnnotationColor = $state('30b567');
  let markerAnnotationSelected = $state(true);
  let markerAnnotationDraggable = $state(true);

  function addAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
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
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
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
</script>

<button class="menu-btn" popovertarget="custom-popover" popovertargetaction="toggle" style:top="60px">
  <img src={marker} alt="marker" />
  <span>Marker Annotation Options</span>
</button>
<div popover id="custom-popover" class="popover">
  <div class="top-row">
    <h2>Annotation Options</h2>
    <a class="code-link" href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank" aria-label="Code Sample">
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
    <button class="close-btn">&times;</button>
  </div>
  <div class="section-wrapper">
    <aside class="option-section">
      <div>
        <label for="markerAnnotationTitle">Title</label>
        <input bind:value={markerAnnotationTitle} class="annotation-input" type="text" name="markerAnnotationTitle" id="markerAnnotationTitle" placeholder="Enter a Title" onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="markerAnnotationSub">Subtitle</label>
        <input bind:value={markerAnnotationSubtitle} class="annotation-input" type="text" name="markerAnnotationSubtitle" id="markerAnnotationSub" placeholder="Enter a Subtitle" onblur={resetAnnotationWithNewData} />
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
      <div>
        <label for="markerAnnotationColor">Color</label>
        <input bind:value={markerAnnotationColor} style="border: none; padding: 0; width: 30px; height: 20px" class="annotation-input-small" type="color" name="markerAnnotationColor" id="markerAnnotationColor" placeholder="Enter a color for the marker annotation" onblur={resetAnnotationWithNewData} />
      </div>
    </aside>
  </div>
  <div class="button-row">
    <button class="custom-btn" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="custom-btn" onclick={annotationAdded ? removeCustomMarkerAnnotation : addAnnotation}>Toggle Custom Annotation</button>
  </div>
</div>

<style>
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
  .button-row {
    display: flex;
    justify-content: space-between;
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
    font-size: 0.9rem;
    padding-right: 10px;
  }
  .annotation-input {
    width: 200px;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid var(--gray-six);
    border-radius: 4px;
    font-size: 1rem;
  }
  .annotation-input-small {
    width: 100px;
    padding: 5px;
    margin-top: 5px;
    font-size: 1rem;
  }
  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
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
</style>