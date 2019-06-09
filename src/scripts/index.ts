"use strict";
import * as svgjs from 'svg.js';

class Thing {
  public health: number;
  public position: { x: number, y: number };
  public id: number;
  public direction: number;
  public speed: number;
  public gfx: any;

  /**
   * Creates an instance of Thing.
   * @param {svgjs.Doc} arena
   * @memberof Thing
   */
  constructor(arena: svgjs.Doc) {
    this.health = 100;
    this.position = { x: 100, y: 100 };
    this.id = 1;
    this.direction = 0;
    this.speed = 10;
    this.createGfx(arena);
  }

  /**
   *
   *
   * @memberof Thing
   */
  public update() {
    console.log(this.position);
    this.gfx.move(this.position.x, this.position.y);
  }

  /**
   * Create GFX for the thing
   *
   * @private
   * @param {svgjs.Doc} arena
   * @memberof Thing
   */
  private createGfx(arena: svgjs.Doc) {
    this.gfx = arena.rect(30, 30);
    this.gfx.fill(`#ff0000`);
    this.update();
  }
}

const things: Set<Thing> = new Set();

function run(): void {
  const arena = document.getElementById(`arena`);
  arena.innerHTML = `Hello, World! Things live here!`;
  const SVG = svgjs(`arena`);

  document.getElementById(`move`).addEventListener(`click`, move)

  things.add(new Thing(SVG));

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function move() {
  things.forEach((thing: Thing) => {
    thing.position = { x: getRandomInt(500), y: getRandomInt(500) };
    thing.update();
  });
}

document.addEventListener(`DOMContentLoaded`, run);
