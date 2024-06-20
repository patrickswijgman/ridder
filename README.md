# Ridder

A no-dependency straightforward game library using HTML canvas.

## Features

- Load assets
  - Textures `loadTexture`
  - Sprites (sub regions of a texture) `loadSprite`
  - Fonts `loadFont`
  - Sounds `loadSound`
- Simple and fast physics
  - Everything is a rectangle
- Simple render API
  - `drawTexture`, `drawSprite`, `drawText`
- Simple input API
  - `isInputPressed`, `isInputDown`, `isInputReleased`, `getMousePosition`
  - Supports mouse and keyboard
- Sounds
  - `playSound`
- A 2D camera
  - Let it follow your player object! `updateCamera`
  - Parallax scrolling

## Does not include

- Base game object (entity)
  - Create your own using the building blocks (e.g. `body`, `vec`, `rect`) the engine provides
- Behavior/AI such as steering behavior or path finding
- More advanced sprite techniques such as spritesheets and 9-slicing

## Installation

```shell
npm i ridder
```

## Quick example

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
