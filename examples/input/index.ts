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
    // For available key codes you can use something like https://keycode.info and use the `event.code` value here.
    // For mouse codes you can use one of these: `MouseLeft`, `MouseMiddle` or `MouseRight`.

    // This returns true if the input was pressed in the current frame.
    if (isInputPressed("Enter")) {
      console.log("You have pressed the enter key");
    }

    // This returns true if the input is being held down.
    if (isInputDown("Enter")) {
      console.log("You are continuously pressing down the enter key");
    }

    // This returns true if the input was released in the current frame.
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
