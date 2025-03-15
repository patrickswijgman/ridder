import { addVectorScaled, applyCameraTransform, drawTextOutlined, drawTexture, getDelta, getTexture, InputCode, isInputDown, isInputPressed, loadFont, loadRenderTexture, loadTexture, normalizeVector, resetTransform, resetVector, run, scaleTransform, setCameraPosition, setCameraShake, setCameraSmoothing, setFont, translateTransform, updateCamera, vec, Vector } from "ridder";

const enum TextureId {
  PLAYER,
  TREE,
  GRASS_TILE,
  GRASS_FLOOR,
}

const enum FontId {
  DEFAULT,
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

setCameraSmoothing(0.1);

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadTexture(TextureId.PLAYER, "textures/player.png");
    await loadTexture(TextureId.TREE, "textures/tree.png");
    await loadTexture(TextureId.GRASS_TILE, "textures/grass_tile.png");

    await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

    // Create the floor by repeating the grass sprite to the background.
    loadRenderTexture(TextureId.GRASS_FLOOR, 512, 512, (ctx, w, h) => {
      const texture = getTexture(TextureId.GRASS_TILE);
      for (let x = 0; x < w; x += 16) {
        for (let y = 0; y < h; y += 16) {
          ctx.drawImage(texture, x, y);
        }
      }
    });

    setFont(FontId.DEFAULT);

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

    setCameraPosition(player.position.x, player.position.y);
  },

  update: () => {
    // Sort the entities on their 'depth' meaning entities below others are drawn on-top.
    world.entities.sort((a, b) => a.position.y - b.position.y);

    // Draw the floor.
    applyCameraTransform();
    drawTexture(TextureId.GRASS_FLOOR, 0, 0);

    // Update and draw each entity.
    for (const e of world.entities) {
      // Update entity (we only have a player for now).
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
          setCameraShake(10, 0.2);
        }

        normalizeVector(e.velocity);
        addVectorScaled(e.position, e.velocity, getDelta());
        updateCamera(e.position.x, e.position.y);
      }

      // Render entity
      resetTransform();
      applyCameraTransform();
      translateTransform(e.position.x, e.position.y);
      if (e.isFlipped) {
        scaleTransform(-1, 1);
      }
      drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
    }

    // Draw the UI.
    resetTransform();
    translateTransform(2, 2);
    scaleTransform(0.75, 0.75);
    drawTextOutlined("Press space to shake the camera", 0, 0, "white", "black", "square");
  },
});
