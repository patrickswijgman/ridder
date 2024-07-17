import {
  getSettings,
  isInputDown,
  isInputPressed,
  isInputReleased,
  mostRecentInput,
  run,
  text,
} from "ridder";

const label = text();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    const settings = getSettings();

    label.x = settings.width / 2;
    label.y = settings.height / 2;
    label.align = "center";
    label.baseline = "middle";
    label.scale.set(0.5, 0.5);
  },

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

    label.text = mostRecentInput
      ? `You have pressed ${mostRecentInput}`
      : "Press any key or mouse button";

    label.draw();
  },
});
