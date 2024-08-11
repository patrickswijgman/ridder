# Ridder

A simple data-oriented game engine for JavaScript that has everything you need to get started and to get things done.

There won't be extensive documentation as the game engine is intended to be simple, the [examples](#examples) should get you started right away!

## Installation

```shell
npm i ridder
```

## Getting started

See the starter example below to get familiar with the simplicity of the game engine.
For more examples, like a simple platformer, see the [examples](#examples) section below.

```typescript
import {
  delta,
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

      e.position.x += e.velocity.x * delta;
      e.position.y += e.velocity.y * delta;

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

You can clone this project and run an example from the examples folder like so:

```shell
# make sure to install the dependencies first, you only need to do this once:
npm ci

# run an example
npm start -w <example> # e.g. npm start -w platformer
```

See the table below for the code of each example or play it instantly (using Github Pages).

|                | Play                                                                       | Code                                     |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| starter        | [link](https://patrickswijgman.github.io/ridder/starter/index.html)        | [link](examples/starter/index.ts)        |
| input          | [link](https://patrickswijgman.github.io/ridder/input/index.html)          | [link](examples/input/index.ts)          |
| font           | [link](https://patrickswijgman.github.io/ridder/font/index.html)           | [link](examples/font/index.ts)           |
| platformer     | [link](https://patrickswijgman.github.io/ridder/platformer/index.html)     | [link](examples/platformer/index.ts)     |
| polygon        | [link](https://patrickswijgman.github.io/ridder/polygon/index.html)        | [link](examples/polygon/index.ts)        |
| render-texture | [link](https://patrickswijgman.github.io/ridder/render-texture/index.html) | [link](examples/render-texture/index.ts) |
| sprite         | [link](https://patrickswijgman.github.io/ridder/sprite/index.html)         | [link](examples/sprite/index.ts)         |
| tween          | [link](https://patrickswijgman.github.io/ridder/tween/index.html)          | [link](examples/tween/index.ts)          |
