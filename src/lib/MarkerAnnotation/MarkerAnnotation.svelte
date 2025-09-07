<script>
  let { map, mapkitGlobal } = $props();
  import marker from '$lib/icons/marker.svg'

  let annotationAdded = $state(false);
  let markerAnnotationTitle = $state('');
  let markerAnnotationSubtitle = $state('');
  let markerAnnotationColor = $state('30b567');
  let markerAnnotationSelected = $state(true);

  function addAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
        title: markerAnnotationTitle,
        subtitle: markerAnnotationSubtitle,
        color: markerAnnotationColor,
        selected: markerAnnotationSelected
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
        selected: markerAnnotationSelected
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
  <p>See the sample code <a href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank">here</a></p>
  <div class="annotation-input">
    <label for="markerAnnotationTitle">Title</label>
    <input bind:value={markerAnnotationTitle} class="annotation-input" type="text" name="markerAnnotationTitle" id="markerAnnotationTitle" placeholder="Enter a title for the marker annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="markerAnnotationSub">Subtitle</label>
    <input bind:value={markerAnnotationSubtitle} class="annotation-input" type="text" name="markerAnnotationSubtitle" id="markerAnnotationSub" placeholder="Enter a sub title for the marker annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="markerAnnotationColor">Color</label>
    <input bind:value={markerAnnotationColor} class="annotation-input" type="color" name="markerAnnotationColor" id="markerAnnotationColor" placeholder="Enter a color for the marker annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="markerAnnotationSelected">Selected</label>
    <input bind:checked={markerAnnotationSelected} class="annotation-input" type="checkbox" name="markerAnnotationSelected" id="markerAnnotationSelected" onchange={resetAnnotationWithNewData} />
  </div>
  <div class="button-row">
    <button class="toggle" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="toggle" onclick={annotationAdded ? removeCustomMarkerAnnotation : addAnnotation}>Toggle Custom Annotation</button>
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
  .toggle {
    background-color: transparent;
    color: var(--gray-one);
    border: 1px solid var(--gray-one);
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    width: fit-content;
    margin-top: 10px;
    text-transform: uppercase;
  }

  .popover:popover-open {
    position: absolute;
    top: 100px;
    left: 10px;
    margin: 0;
    border-radius: 8px;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,1);
  }
  div.annotation-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  label {
    font-size: 1rem;
    padding-right: 10px;
  }
  input.annotation-input {
    width: 400px;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid var(--gray-six);
    border-radius: 4px;
    font-size: 1rem;
  }
</style>