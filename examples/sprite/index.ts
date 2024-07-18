import {
  delta,
  getSettings,
  loadSprite,
  loadTexture,
  run,
  sprite,
} from "ridder";

class Entity {
  sprite = sprite();
}

const player = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    const settings = getSettings();

    // This texture contains all the different sprites we need for our game.
    // Using a single texture with a lot of sprites has some benefits:
    //   1. the browser only needs to download a single image, speeding up the loading time of your game
    //   2. it is more efficient for the GPU to draw a single texture than to switch between textures
    //
    // The 'loadTexture' function is async so be sure to wait until it has loaded.
    await loadTexture("tilemap", "textures/tilemap.png");

    // The player sprite in the tilemap texture is positioned at (x=95, y=133), is (x=18, y=18) in size.
    loadSprite("player", "tilemap", 95, 133, 18, 18);

    // The sprite object on the player holds a reference to the sprite configuration you have loaded with 'loadSprite'.
    player.sprite.id = "player";

    // Set the point of rotation to the bottom-center.
    player.sprite.pivot.set(9, 18);

    // Put the player in the center of the screen.
    // 'x' and 'y' on the sprite object are shortcuts to its 'position' vector.
    player.sprite.x = settings.width / 2;
    player.sprite.y = settings.height / 2;
  },

  update: () => {
    // Rotate the player, multiply this by delta to have this fps-independent. This means that the player
    // will rotate at the same speed when the game runs on any fps such as 30, 60, 120, 144 etc.
    player.sprite.angle += 2 * delta;

    player.sprite.draw();
  },
});
