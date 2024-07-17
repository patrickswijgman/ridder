# Ridder

A no-dependency, straightforward game making library in TypeScript using HTML5 canvas.

This library will give you everything you need to get started with making your game! It includes the main loop for logic updates and rendering. And it includes multiple components such as `sprite` and `vec` to create your own entities with.

See the [examples](#examples) section for running examples such as a simple platformer!

## Issues

None that I know of, so if you encounter any issues please let me know by creating an issue or a pull request! I would really appreciate it <3

## Features

#### Canvas

The game is rendered using the HTML5 Canvas API. The canvas is automatically scaled to fit the window size while maintaining the aspect ratio.

#### Assets

Load assets asynchronously with `loadTexture`, `loadSprite`, `loadFont` and `loadSound`.

You can even create your own textures with code using `loadRenderTexture`. This can come in handy when you want to do more
fancy things, like creating an outline around a sprite.

#### Components

- Texture `texture`
- Sprite `sprite`
  - Sub region of a texture for more efficient rendering
- Text `text`
  - Render text using a font file
- Physics `body`
  - Simple and fast, everything is a rectangle
- 2D point `point`
- 2D vector `vec`
  - A 2D point with many mathematical functions such as `add`, `subtract`, `scale` and `normalize`
- Rectangle `rect`
- Circle `circle`
- Polygon `polygon`
  - Create any shape using an array of 2D points
- Timer `timer`
- Tween `tween`
  - Tween a value using [easing](https://easings.net/) functions

#### Input

Supports mouse and keyboard (no support for controllers, yet) with `isInputPressed`, `isInputDown` and `isInputReleased`.

The mouse supports both screen space and world space:

- Screen space is used for UI, e.g. menu buttons
- World space is used for the game world, e.g. shooting a bullet from the player to the mouse position

#### Sounds

Simply play or stop a sound with `playSound` and `stopSound`

#### Camera

Follow an object with a smoothing effect (quite satisfying) and supports parallax scrolling.

#### Utils

A bunch of useful utility functions, such as:

- `clamp` to keep a value within a range.
- `randomInt` and `chance` for a random number or boolean, respectively.
- `toRadians` and `toDegrees` to convert angles from one to the other.
- `remove`, `shuffle` and `pick` for arrays.

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

class Entity {
  position = vec();
  texture = texture();
}

const player = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    // Load the image into memory.
    await loadTexture("player", "/textures/player.png");

    const settings = getSettings();

    // Set the player's texture component to reference the actual texture that
    // is loaded in memory.
    player.texture.id = "player";

    // Put the player in the center of the screen.
    player.position.x = settings.width / 2;
    player.position.y = settings.height / 2;
  },

  update: () => {
    if (isInputDown("ArrowLeft")) {
      player.position.x -= 2 * delta; // Use 'delta' to have FPS-independent updates.
    }

    if (isInputDown("ArrowRight")) {
      player.position.x += 2 * delta;
    }

    // Set the position of the texture to the player's position.
    // You could also use the texture's position directly but I like to have a
    // dedicated position vector that I can use for other components as well.
    player.texture.position.copy(player.position);

    // Draw the texture to the canvas after all logic is done and the position
    // is updated.
    player.texture.draw();
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

#### Input

- [play](https://patrickswijgman.github.io/ridder/input/index.html)
- [code](examples/input/index.ts)

#### Platformer

- [play](https://patrickswijgman.github.io/ridder/platformer/index.html)
- [code](examples/platformer/index.ts)

#### Polygon

- [play](https://patrickswijgman.github.io/ridder/polygon/index.html)
- [code](examples/polygon/index.ts)

#### Tween

- [play](https://patrickswijgman.github.io/ridder/tween/index.html)
- [code](examples/tween/index.ts)
