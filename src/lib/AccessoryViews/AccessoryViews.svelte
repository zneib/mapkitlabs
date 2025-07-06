<script>
  let { map, mapkitGlobal } = $props();
  import accessory from '$lib/icons/accessory.svg'

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

<button class="menu-btn" onclick={addAccessoryView} style:top="110px">
  <img src={accessory} alt="accessory" />
  <span>Accessory Views</span>
</button>

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
</style>