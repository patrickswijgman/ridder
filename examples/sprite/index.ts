import {
  delta,
  drawSprite,
  getSettings,
  loadSprite,
  loadTexture,
  rotateTransform,
  run,
  translateTransform,
} from "ridder";

let angle = 0;

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    // This texture contains all the different sprites we need for our game.
    // Using a single texture with a lot of sprites has some benefits:
    //   1. the browser only needs to download a single image, speeding up the loading time of your game
    //   2. it is more efficient for the GPU to draw a single texture than to switch between textures
    //
    // The 'loadTexture' function is async so be sure to wait until it has loaded.
    await loadTexture("tilemap", "textures/tilemap.png");

    // The player sprite in the tilemap texture is positioned at (x=95, y=133), is (x=18, y=18) in size.
    loadSprite("player", "tilemap", 95, 133, 18, 18);
  },

  update: () => {
    const settings = getSettings();
    // Rotate the player, multiply this by delta to have this fps-independent. This means that the player
    // will rotate at the same speed when the game runs on any fps such as 30, 60, 120, 144 etc.
    angle += 2 * delta;

    translateTransform(settings.width / 2, settings.height / 2); // Put the player in the center of the screen.
    rotateTransform(angle);
    drawSprite("player", -9, -18); // When translating the transform matrix you can pass the x and y here as the center of rotation.
  },
});
