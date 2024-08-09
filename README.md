# Ridder

A simple data-oriented game engine for JavaScript that has everything you need to get started and to get things done.

There won't be extensive documentation as the game engine is intended to be simple, the [examples](#examples) should get you started right away!

## Installation

```shell
npm i ridder
```

## Getting started

See below for a quick example (see [starter](#starter) example) to get familiar with the beginnings of a game.
Other examples, like a simple platformer, see the [examples](#examples) section below.

```typescript
import {
  addVector,
  drawSprite,
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

// Data per game object (AKA entity).
type Entity = {
  isPlayer: boolean;
  isFlipped: boolean;

  position: Vector;
  velocity: Vector;

  spriteId: string;
  pivot: Vector;
};

// Entity factory function.
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

// Data per level (AKA scene).
type Scene = {
  entities: Entity[];
};

// Scene factory function.
function createScene(): Scene {
  return {
    entities: [],
  };
}

// For simplicity we don't have a scene system, just the one.
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
    // Simple depth sort.
    world.entities.sort((a, b) => a.position.y - b.position.y);

    for (const e of world.entities) {
      if (e.isPlayer) {
        resetVector(e.velocity);

        if (isInputDown("ArrowLeft")) {
          e.velocity.x -= 1;
          e.isFlipped = false;
        }
        if (isInputDown("ArrowRight")) {
          e.velocity.x += 1;
          e.isFlipped = true;
        }
        if (isInputDown("ArrowUp")) {
          e.velocity.y -= 1;
        }
        if (isInputDown("ArrowDown")) {
          e.velocity.y += 1;
        }
      }

      normalizeVector(e.velocity);
      addVector(e.position, e.velocity, true);

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
```

## Examples

You can clone this project and run an example from the [examples](examples/) folder like so:

```shell
# make sure to install the dependencies first, you only need to do this once:
npm ci

# run an example
npm start -w <example> # e.g. npm start -w platformer
```

Or checkout the links below for each example to see it running using GitHub pages.

#### Starter

- [play](https://patrickswijgman.github.io/ridder/starter/index.html)
- [code](examples/starter/index.ts)

#### Input

- [play](https://patrickswijgman.github.io/ridder/input/index.html)
- [code](examples/input/index.ts)

#### Font

- [play](https://patrickswijgman.github.io/ridder/font/index.html)
- [code](examples/font/index.ts)

#### Platformer

- [play](https://patrickswijgman.github.io/ridder/platformer/index.html)
- [code](examples/platformer/index.ts)

#### Polygon

- [play](https://patrickswijgman.github.io/ridder/polygon/index.html)
- [code](examples/polygon/index.ts)

#### Render Texture

- [play](https://patrickswijgman.github.io/ridder/render-texture/index.html)
- [code](examples/render-texture/index.ts)

#### Sprite

- [play](https://patrickswijgman.github.io/ridder/sprite/index.html)
- [code](examples/sprite/index.ts)

#### Tween

- [play](https://patrickswijgman.github.io/ridder/tween/index.html)
- [code](examples/tween/index.ts)
