# Ridder

A no-dependency, straightforward game making library made in TypeScript using HTML5 canvas.

## Features

- Assets
  - Textures, fonts and sounds
  - Load asynchronously
- Physics
  - Simple and fast, everything is a rectangle
- Render
  - Draw sub regions (sprites) from textures
  - Draw text (with custom font)
- Input
  - Supports mouse and keyboard
- Sounds
- Shapes
  - Rectangle, Circle and Polygon (this one is a bit more advanced)
- Camera
  - Follow an object with smoothing
  - Parallax scrolling

## Installation

```shell
npm i ridder
```

## Getting started

See below for a quick example to get familiar with the beginnings of a game.
More complete examples, like a simple platformer, see [Examples](#examples) below.

```typescript
import {
  delta,
  drawTexture,
  getSettings,
  isInputDown,
  loadTexture,
  run,
  vec,
} from "ridder";

class Player {
  position = vec();
}

const player = new Player();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("player", "/textures/player.png");

    const settings = getSettings();

    player.position.x = settings.width / 2;
    player.position.y = settings.height / 2;
  },

  update: () => {
    if (isInputDown("ArrowLeft")) {
      player.position.x -= 2 * delta;
    }

    if (isInputDown("ArrowRight")) {
      player.position.x += 2 * delta;
    }
  },

  render: () => {
    drawTexture("player", player.position.x, player.position.y);
  },
});
```

## Examples

Open the links below to see a running example in StackBlitz.

- [Sprites](https://stackblitz.com/edit/ridder-example-sprites?file=src%2Fmain.ts)
- [Platformer](https://stackblitz.com/edit/ridder-example-platformer?file=src%2Fmain.ts)
