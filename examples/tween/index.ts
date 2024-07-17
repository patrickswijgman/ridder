import {
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

const entityA = new Entity();
const entityB = new Entity();

const entities = new Set<Entity>();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tilemap", "textures/tilemap.png");

    loadSprite("snowman", "tilemap", 95, 133, 18, 18);

    entityA.sprite.id = "snowman";
    entityA.sprite.pivot.set(9, 18);
    entityA.sprite.position.set(50, 50);
    entities.add(entityA);

    entityB.sprite.id = "snowman";
    entityB.sprite.pivot.set(9, 9);
    entityB.sprite.position.set(110, 50);
    entities.add(entityB);
  },

  update: () => {
    // Ease a full rotation (0~360 degrees) in 5 seconds.
    // There are many different easing functions, see them here: https://easings.net/
    if (entityA.angle.tween(0, 360, 5000, "easeOutElastic")) {
      console.log("done!");
    }

    // You can loop tweens by giving the Infinity value for the iterations argument.
    entityB.scale.tween(1, 2, 2000, "easeInOutSine", Infinity);

    // You can reset tweens and have them play again.
    // This will revert the tween back to its default value (see line 12 and 13).
    if (isInputPressed("Enter")) {
      for (const e of entities) {
        e.scale.reset();
        e.angle.reset();
      }
    }

    for (const e of entities) {
      // Set the sprite's properties to the respective tween's current value.
      e.sprite.scale.x = e.scale.value;
      e.sprite.scale.y = e.scale.value;
      e.sprite.angle = e.angle.value;
      e.sprite.draw();
    }
  },
});
