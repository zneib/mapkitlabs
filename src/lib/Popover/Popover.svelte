<script>
  let { annotationTitle, annotationSubtitle, annotationColor, annotationSelected } = $props();

  function removeAllAnnotations() {
    if (map && mapkitGlobal) {
      map.removeAnnotations(map._impl._annotationsController._items);
      annotationAdded = false;
    }
  }
</script>

<div popover id="image-annotation-popover" class="popover">
  <p>See the sample code <a href="https://gist.github.com/zneib/523d841992ba0686472646375dc5a714" target="_blank">here</a></p>
  <div class="annotation-input">
    <label for="annotationTitle">Title</label>
    <input bind:value={annotationTitle} class="annotation-input" type="text" name="annotationTitle" id="annotationTitle" placeholder="Enter a title for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="annotationSubtitle">Subtitle</label>
    <input bind:value={annotationSubtitle} class="annotation-input" type="text" name="annotationSubtitle" id="annotationSubtitle" placeholder="Enter a sub title for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="annotationColor">Color</label>
    <input bind:value={annotationColor} class="annotation-input" type="color" name="annotationColor" id="annotationColor" placeholder="Enter a color for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="annotationSelected">Selected</label>
    <input bind:checked={annotationSelected} class="annotation-input" type="checkbox" name="annotationSelected" id="annotationSelected" onchange={resetAnnotationWithNewData} />
  </div>
  <div class="button-row">
    <button class="toggle" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="toggle" onclick={annotationAdded ? removeCustomImageAnnotation : addImageAnnotation}>Toggle Custom Annotation</button>
  </div>
</div>