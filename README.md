# Ridder

A zero-dependency and simple data-oriented game engine for JavaScript that has everything you need to get started and to get things done.

There won't be extensive documentation as the game engine is intended to be simple, the [examples](#examples) should get you in the right direction.

## Getting started

You can get started instantly by copying the Ridder template [repo](https://github.com/patrickswijgman/ridder-template) with the following command, be sure to replace `<project-name>` with the name of your project.

```shell
npx degit patrickswijgman/ridder-template#main <project-name>
cd <project-name>
npm ci
npm start
```

or install manually with the following command.

```shell
npm install ridder
```

## Examples

See the table below for the code of each example or play it instantly (using Github Pages).

|                | Play                                                                            | Code                                     | Keywords                                                           |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------ |
| input          | [link](https://patrickswijgman.github.io/ridder/input/dist/index.html)          | [link](examples/input/index.ts)          | `keyboard` `mouse`                                                 |
| font           | [link](https://patrickswijgman.github.io/ridder/font/dist/index.html)           | [link](examples/font/index.ts)           | `ttf`                                                              |
| platformer     | [link](https://patrickswijgman.github.io/ridder/platformer/dist/index.html)     | [link](examples/platformer/index.ts)     | `collision` `gravity` `camera` `transforms`                        |
| polygon        | [link](https://patrickswijgman.github.io/ridder/polygon/dist/index.html)        | [link](examples/polygon/index.ts)        | `hitbox` `mouse`                                                   |
| render-texture | [link](https://patrickswijgman.github.io/ridder/render-texture/dist/index.html) | [link](examples/render-texture/index.ts) | `render-texture` `transforms`                                      |
| sprite         | [link](https://patrickswijgman.github.io/ridder/sprite/dist/index.html)         | [link](examples/sprite/index.ts)         | `sprite` `animation` `transforms`                                  |
| top-down       | [link](https://patrickswijgman.github.io/ridder/top-down/dist/index.html)       | [link](examples/top-down/index.ts)       | `top-down` `vectors` `depth-sorting` `render-texture` `transforms` |
| tween          | [link](https://patrickswijgman.github.io/ridder/tween/dist/index.html)          | [link](examples/tween/index.ts)          | `animation`                                                        |

Or you can clone this project and run an example from the examples folder like so:

```shell
# make sure to install the dependencies first, you only need to do this once:
npm ci

# run an example
npm start -w <example> # e.g. npm start -w platformer
```
