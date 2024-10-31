import { polyfill } from "mobile-drag-drop";

import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

// Prevents scrolling when dragging in ios safari
window.addEventListener("touchmove", function () {}, { passive: false });
