# Ridder

A no-dependency, straightforward game making library made in TypeScript using HTML canvas.

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

## Does not include

- Base game object (entity)
  - Create your own using the building blocks (e.g. `body`, `vec`, `rect`) the library provides
- Scene management
- Behavior/AI such as steering behavior or path finding
- More advanced render techniques such as scene graphs, spritesheets and 9-slicing
- A GUI system

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
  updateCamera,
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

    player.x = settings.width / 2;
    player.y = settings.height / 2;
  },

  update: (delta) => {
    if (isInputDown("ArrowLeft")) {
      player.position.x -= 2 * delta;
    }

    if (isInputDown("ArrowRight")) {
      player.position.x -= 2 * delta;
    }

    updateCamera(player.position, delta);
  },

  render: () => {
    drawTexture("player", player.position.x, player.position.y);
  },
});
```
