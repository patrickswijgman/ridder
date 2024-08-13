import {
  addVectorScaled,
  delta,
  drawSprite,
  InputCode,
  isInputDown,
  loadSprite,
  loadTexture,
  normalizeVector,
  resetTransform,
  resetVector,
  run,
  scaleTransform,
  translateTransform,
  vec,
  Vector,
} from "ridder";

type Entity = {
  isPlayer: boolean;
  isFlipped: boolean;

  position: Vector;
  velocity: Vector;

  spriteId: string;
  pivot: Vector;
};

function createEntity(): Entity {
  return {
    isPlayer: false,
    isFlipped: false,

    position: vec(),
    velocity: vec(),

    spriteId: "",
    pivot: vec(),
  };
}

type Scene = {
  entities: Array<Entity>;
};

function createScene(): Scene {
  return {
    entities: [],
  };
}

const world = createScene();

run({
  settings: {
    width: 320,
    height: 180,
  },

  setup: async () => {
    await loadTexture("tilemap", "textures/tilemap.png");

    loadSprite("player", "tilemap", 95, 133, 18, 18);
    loadSprite("tree", "tilemap", 113, 113, 18, 18);

    const player = createEntity();
    player.position.x = 160;
    player.position.y = 90;
    player.spriteId = "player";
    player.pivot.x = 9;
    player.pivot.y = 18;
    player.isPlayer = true;

    const tree = createEntity();
    tree.position.x = 200;
    tree.position.y = 100;
    tree.spriteId = "tree";
    tree.pivot.x = 9;
    tree.pivot.y = 18;

    world.entities.push(player, tree);
  },

  update: () => {
    world.entities.sort((a, b) => a.position.y - b.position.y);

    for (const e of world.entities) {
      if (e.isPlayer) {
        resetVector(e.velocity);

        if (isInputDown(InputCode.KEY_LEFT)) {
          e.velocity.x -= 1;
          e.isFlipped = false;
        }
        if (isInputDown(InputCode.KEY_RIGHT)) {
          e.velocity.x += 1;
          e.isFlipped = true;
        }
        if (isInputDown(InputCode.KEY_UP)) {
          e.velocity.y -= 1;
        }
        if (isInputDown(InputCode.KEY_DOWN)) {
          e.velocity.y += 1;
        }
      }

      normalizeVector(e.velocity);
      addVectorScaled(e.position, e.velocity, delta);

      if (e.spriteId) {
        resetTransform();
        translateTransform(e.position.x, e.position.y);
        if (e.isFlipped) {
          scaleTransform(-1, 1);
        }
        drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
      }
    }
  },
});
