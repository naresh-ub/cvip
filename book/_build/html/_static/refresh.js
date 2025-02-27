// Raise a warning if the page is reloaded while the interactive plots are enabled
const THEBE_LAUNCH_BUTTON = "thebe-launch-button";

window.onbeforeunload = function () {
  let elements = document.getElementsByClassName(THEBE_LAUNCH_BUTTON);

  if (elements.length === 0) {
    return;
  } else {
    return 1;
  }
};
