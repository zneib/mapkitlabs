<script>
  let { map, mapkitGlobal } = $props();
  import marker from '$lib/icons/marker.svg'

  let markerAnnotationTitle = $state('');
  let markerAnnotationSubtitle = $state('');
  let markerAnnotationColor = $state('');

  function addAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.MarkerAnnotation(new mapkitGlobal.Coordinate(37.334883, -122.008977), {
        title: markerAnnotationTitle || "Apple Park",
        subtitle: markerAnnotationSubtitle || "Cupertino, CA",
        color: markerAnnotationColor || "#ff0000",
        selected: true
      });
      map.addAnnotation(annotation);
    }
  }
</script>

<button class="menu-btn" popovertarget="custom-popover" popovertargetaction="toggle" style:top="60px">
  <img src={marker} alt="marker" />
  <span>Marker Annotation</span>
</button>
<div popover id="custom-popover" class="popover">
  <p>A lot of code isn't needed to add a custom annotation. See the sample code <a href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank">here</a></p>
  <button class="toggle" onclick={addAnnotation}>Toggle Custom Annotation</button>
  <div class="annotation-input">
    <label for="markerAnnotationTitle">Marker Annotation Title</label>
    <input bind:value={markerAnnotationTitle} class="annotation-input" type="text" name="markerAnnotationTitle" id="markerAnnotationTitle" placeholder="Enter a title for the marker annotation" onblur={addAnnotation} />
  </div>
  <div class="annotation-input">
    <label for="markerAnnotationSub">Marker Annotation Subtitle</label>
    <input bind:value={markerAnnotationSubtitle} class="annotation-input" type="text" name="markerAnnotationSubtitle" id="markerAnnotationSub" placeholder="Enter a sub title for the marker annotation" onblur={addAnnotation} />
  </div>
  <div class="annotation-input">
    <label for="markerAnnotationColor">Marker Annotation Color</label>
    <input bind:value={markerAnnotationColor} class="annotation-input" type="color" name="markerAnnotationColor" id="markerAnnotationColor" placeholder="Enter a color for the marker annotation" onblur={addAnnotation} />
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