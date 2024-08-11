import {
  drawText,
  getSettings,
  isInputDown,
  isInputPressed,
  isInputReleased,
  mostRecentInput,
  run,
  scaleTransform,
  translateTransform,
} from "ridder";

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {},

  update: () => {
    // See https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
    if (isInputPressed("Enter")) {
      console.log("You have pressed the enter key");
    }

    if (isInputDown("Enter")) {
      console.log("You are continuously pressing down the enter key");
    }

    if (isInputReleased("Enter")) {
      console.log("You have released the enter key");
    }

    const settings = getSettings();

    translateTransform(settings.width / 2, settings.height / 2);
    scaleTransform(0.25, 0.25);
    drawText(
      mostRecentInput
        ? `You have pressed ${mostRecentInput}`
        : "Press any key or mouse button",
      0,
      0,
      "white",
      "center",
      "middle",
    );
  },
});
