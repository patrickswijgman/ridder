# Ridder

A no-dependency, straightforward game making library made in TypeScript using HTML5 canvas.

## Features

- Load assets asynchronously
  - Textures
  - Fonts
  - Sounds
- Simple and fast physics
  - Everything is a rectangle
- Simple render API
  - Render sub regions (sprites) from textures
- Simple input API
  - Supports mouse and keyboard
- Sounds
- A 2D camera
  - Parallax scrolling

## Installation

```shell
npm i ridder
```

## Getting started

```typescript
import {
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

  update: (delta) => {
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
