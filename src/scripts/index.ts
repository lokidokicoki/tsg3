'use strict';

import Renderer from './renderer';
import Thing from './thing';

const things: Set<Thing> = new Set();


Renderer.getInstance(`arena`);
function run(): void {
  document.getElementById(`move`).addEventListener(`click`, move);
  document.getElementById(`rotate`).addEventListener(`click`, rotate);

  for (let i = 0; i < 5; i++) {
    things.add(new Thing());
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function move() {
  things.forEach((thing: Thing) => {
    thing.position = { x: getRandomInt(500), y: getRandomInt(500) };
    thing.update();
  });
}
function rotate() {
  things.forEach((thing: Thing) => {
    thing.direction = getRandomInt(360);
    thing.update();
  });
}


document.addEventListener(`DOMContentLoaded`, run);
