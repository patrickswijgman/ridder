import {
  getSettings,
  isInputPressed,
  loadSprite,
  loadTexture,
  run,
  sprite,
  tween,
} from "ridder";

class Entity {
  sprite = sprite();
  angle = tween(0);
  scale = tween(1);
}

const a = new Entity();
const b = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tilemap", "/textures/tilemap.png");

    loadSprite("snowman", "tilemap", 95, 133, 18, 18);

    const settings = getSettings();

    a.sprite.id = "snowman";
    a.sprite.pivot.set(9, 18);
    a.sprite.x = settings.width / 3;
    a.sprite.y = settings.height / 2;

    b.sprite.id = "snowman";
    b.sprite.pivot.set(9, 9);
    b.sprite.x = (settings.width / 3) * 2;
    b.sprite.y = settings.height / 2;
  },

  update: () => {
    // Ease a full rotation (0~360 degrees) in 5 seconds and do this once.
    // There are many different easing functions, see them here: https://easings.net/
    if (a.angle.tween(0, 360, 5000, "easeOutElastic")) {
      console.log("done!");
    }

    // You can reset tweens and have them play again.
    // This will revert the tween back to its default value (see line 15 and 16).
    if (isInputPressed("Enter")) {
      a.angle.reset();
      b.scale.reset();
    }

    // You can loop tweens by giving the Infinity value for the iterations argument.
    b.scale.tween(1, 2, 2000, "easeInOutSine", Infinity);

    // Set the sprite's angle to the tween's current value.
    a.sprite.angle = a.angle.value;
    a.sprite.draw();

    // Set the sprite's scaling to the tween's current value.
    b.sprite.scale.x = b.scale.value;
    b.sprite.scale.y = b.scale.value;
    b.sprite.draw();
  },
});
