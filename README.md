# Ridder

A no-dependency, straightforward game making library in TypeScript using HTML5 canvas.

This library is a hobby project of mine to create small games with. I often found myself re-writing the same code so I thought: why not make a simple-to-use library for myself and perhaps others would like it as well?

This is not a framework but a library, it includes some basic things that I have often needed in the past. There is no base game object (entity), but you can create it yourself using the components (e.g. `sprite` and `timer`) this library provides. This keeps the library flexible for any type of game you would like to make :D

See the [examples](#examples) for running examples such as a simple platformer!

## Issues

None that I know of, so if you encounter any issues please let me know by creating an issue or a pull request! I would really appreciate it <3

## Features

#### Assets

Load assets asynchronously with `loadTexture`, `loadSprite`, `loadFont` and `loadSound`.

You can even create your own textures with code using `loadRenderTexture`! See an example [here](https://stackblitz.com/edit/ridder-example-render-texture?file=src%2Fmain.ts)

#### Components for your entities

- Texture `texture`
- Sprite `sprite`
  - Sub region of a texture for more efficient rendering and drawing options such as a pivot point (center of rotation)
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
  - Create any shape using an array of 2D points
- Timer `timer`
- Tween `tween`
  - Tween a value using [easing](https://easings.net/) functions

#### Input

Supports mouse and keyboard (no support for controllers, yet).

The mouse supports both screen space and world space:

- Screen space is used for UI, e.g. menu buttons
- World space is used for the game world, e.g. shooting a bullet from the player to the mouse position

#### Sounds

Simply play or stop a sound with `playSound` and `stopSound`

#### Camera

Follow an object with smoothing and allows for parallax scrolling.

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
- [Render texture](https://stackblitz.com/edit/ridder-example-render-texture?file=src%2Fmain.ts)
