import { addVectorScaled, applyCameraTransform, drawTexture, getDelta, getTexture, InputCode, isInputDown, loadRenderTexture, loadTexture, normalizeVector, resetTransform, resetVector, run, scaleTransform, translateTransform, updateCamera, vec, Vector } from "ridder";

type Entity = {
  position: Vector;
  velocity: Vector;

  textureId: string;
  pivot: Vector;

  isPlayer: boolean;
  isFlipped: boolean;
};

function createEntity(): Entity {
  return {
    position: vec(),
    velocity: vec(),

    textureId: "",
    pivot: vec(),

    isPlayer: false,
    isFlipped: false,
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
  width: 320,
  height: 180,

  setup: async () => {
    await loadTexture("player", "textures/player.png");
    await loadTexture("tree", "textures/tree.png");
    await loadTexture("grass_tile", "textures/grass_tile.png");

    loadRenderTexture("grass", 512, 512, (ctx, w, h) => {
      const texture = getTexture("grass_tile");
      for (let x = 0; x < w; x += 16) {
        for (let y = 0; y < h; y += 16) {
          ctx.drawImage(texture, x, y);
        }
      }
    });

    const player = createEntity();
    player.position.x = 160;
    player.position.y = 90;
    player.textureId = "player";
    player.pivot.x = 8;
    player.pivot.y = 16;
    player.isPlayer = true;

    const tree = createEntity();
    tree.position.x = 200;
    tree.position.y = 100;
    tree.textureId = "tree";
    tree.pivot.x = 8;
    tree.pivot.y = 16;

    world.entities.push(player, tree);
  },

  update: () => {
    for (const e of world.entities) {
      if (e.isPlayer) {
        resetVector(e.velocity);

        if (isInputDown(InputCode.KEY_LEFT)) {
          e.velocity.x -= 1;
          e.isFlipped = true;
        }
        if (isInputDown(InputCode.KEY_RIGHT)) {
          e.velocity.x += 1;
          e.isFlipped = false;
        }
        if (isInputDown(InputCode.KEY_UP)) {
          e.velocity.y -= 1;
        }
        if (isInputDown(InputCode.KEY_DOWN)) {
          e.velocity.y += 1;
        }

        normalizeVector(e.velocity);
        addVectorScaled(e.position, e.velocity, getDelta());
        updateCamera(e.position.x, e.position.y);
      }
    }
  },

  render: () => {
    applyCameraTransform();
    drawTexture("grass", 0, 0);

    world.entities.sort((a, b) => a.position.y - b.position.y);

    for (const e of world.entities) {
      resetTransform();
      translateTransform(e.position.x, e.position.y);
      applyCameraTransform();
      if (e.isFlipped) {
        scaleTransform(-1, 1);
      }
      drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
    }
  },
});
