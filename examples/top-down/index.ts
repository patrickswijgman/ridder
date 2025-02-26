import { addVectorScaled, applyCameraTransform, camera, drawText, drawTexture, getDelta, getTexture, InputCode, isInputDown, isInputPressed, loadRenderTexture, loadTexture, normalizeVector, resetTransform, resetVector, run, scaleTransform, setCameraPosition, translateTransform, updateCamera, vec, Vector } from "ridder";

const enum TextureId {
  PLAYER,
  TREE,
  GRASS_TILE,
  GRASS_FLOOR,
}

type Entity = {
  position: Vector;
  velocity: Vector;

  textureId: number;
  pivot: Vector;

  isPlayer: boolean;
  isFlipped: boolean;
};

function createEntity(): Entity {
  return {
    position: vec(),
    velocity: vec(),

    textureId: 0,
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

const cam = camera();
cam.smoothing = 0.1;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadTexture(TextureId.PLAYER, "textures/player.png");
    await loadTexture(TextureId.TREE, "textures/tree.png");
    await loadTexture(TextureId.GRASS_TILE, "textures/grass_tile.png");

    loadRenderTexture(TextureId.GRASS_FLOOR, 512, 512, (ctx, w, h) => {
      const texture = getTexture(TextureId.GRASS_TILE);
      for (let x = 0; x < w; x += 16) {
        for (let y = 0; y < h; y += 16) {
          ctx.drawImage(texture, x, y);
        }
      }
    });

    const player = createEntity();
    player.position.x = 160;
    player.position.y = 90;
    player.textureId = TextureId.PLAYER;
    player.pivot.x = 8;
    player.pivot.y = 16;
    player.isPlayer = true;

    const tree = createEntity();
    tree.position.x = 200;
    tree.position.y = 100;
    tree.textureId = TextureId.TREE;
    tree.pivot.x = 8;
    tree.pivot.y = 16;

    world.entities.push(player, tree);

    setCameraPosition(cam, player.position.x, player.position.y);
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
        if (isInputPressed(InputCode.KEY_SPACE)) {
          cam.shakeIntensity = 10;
          cam.shakeReduction = 0.2;
        }

        normalizeVector(e.velocity);
        addVectorScaled(e.position, e.velocity, getDelta());
        updateCamera(cam, e.position.x, e.position.y);
      }
    }
  },

  render: () => {
    applyCameraTransform(cam);
    drawTexture(TextureId.GRASS_FLOOR, 0, 0);

    world.entities.sort((a, b) => a.position.y - b.position.y);

    for (const e of world.entities) {
      resetTransform();
      translateTransform(e.position.x, e.position.y);
      applyCameraTransform(cam);
      if (e.isFlipped) {
        scaleTransform(-1, 1);
      }
      drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
    }

    resetTransform();
    translateTransform(2, 2);
    scaleTransform(0.5, 0.5);
    drawText("Press space to shake the camera", 0, 0, "red");
  },
});
