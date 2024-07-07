# Ridder

A no-dependency, straightforward game making library in TypeScript using HTML5 canvas.

This library is a hobby project of mine to create small games with. I often found myself re-writing the same code so I thought: why not make a library for myself and maybe others would like it as well?

This is not a framework but a library, it includes some basic things that I have often needed in the past. There is no base game object (entity), but you can create these yourself using the components (e.g. `sprite` and `timer`) this library provides.

See the bottom of this readme for examples such as a simple platformer!

## Features

#### Assets

Load assets asynchronously with `loadTexture`, `loadSprite`, `loadFont` and `loadSound`.

#### Components for your entities

- Texture `texture`
- Sprite `sprite`
  - Sub region of a texture for more efficient rendering
- Text `text`
  - Render text using a font file
- Physics `body`
  - Simple and fast, everything is a rectangle
- 2D point `point`
- 2D Vector `vec`
  - A point with mathematical functions such as `add`, `subtract` and `normalize`
- Rectangle `rect`
- Circle `circle`
- Polygon `polygon`
  - Create any shape using an array of 2D points (this one is a bit more advanced, but works very well for hitboxes for example!)
- Timer `timer`
- Tween `tween`
  - Tween a value using [easing](https://easings.net/) functions
- Input
  - Supports mouse and keyboard

#### Sounds

- Simply play or stop a sound with `playSound` and `stopSound`

#### Camera

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
  getSettings,
  isInputDown,
  loadTexture,
  run,
  texture,
  vec,
} from "ridder";

class Player {
  texture = texture("player");
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

    player.texture.x = settings.width / 2;
    player.texture.y = settings.height / 2;
  },

  update: () => {
    if (isInputDown("ArrowLeft")) {
      player.texture.x -= 2 * delta;
    }

    if (isInputDown("ArrowRight")) {
      player.texture.x += 2 * delta;
    }
  },

  render: () => {
    player.texture.draw();
  },
});
```

## Examples

Open the links below to see a running example in StackBlitz.

- [Sprites](https://stackblitz.com/edit/ridder-example-sprites?file=src%2Fmain.ts)
- [Platformer](https://stackblitz.com/edit/ridder-example-platformer?file=src%2Fmain.ts)
