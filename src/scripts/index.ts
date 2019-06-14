'use strict';

import Renderer from './renderer';
import Thing from './thing';
import * as utils from './utils';

const things: Set<Thing> = new Set();


Renderer.getInstance(`arena`);
const MAX_THINGS = 1;
let running = null;

/**
 * Run up simulation
 */
function main(): void {
  document.getElementById(`move`).addEventListener(`click`, () => { move(null) });
  document.getElementById(`rotate`).addEventListener(`click`, rotate);
  document.getElementById(`rotzero`).addEventListener(`click`, rotzero);
  document.getElementById(`update`).addEventListener(`click`, update);
  document.getElementById(`down`).addEventListener(`click`, () => {
    move({ y: 10 });
  });
  document.getElementById(`up`).addEventListener(`click`, () => {
    move({ y: -10 });
  });
  document.getElementById(`right`).addEventListener(`click`, () => {
    move({ x: 10 });
  });
  document.getElementById(`left`).addEventListener(`click`, () => {
    move({ x: -10 });
  });
  document.getElementById(`center`).addEventListener(`click`, () => {
    move({ x: 250, y: 250, center: true });
  });
  document.getElementById(`run`).addEventListener(`click`, run);

  for (let i = 0; i < MAX_THINGS; i++) {
    things.add(new Thing(utils.getRandomInt(500), utils.getRandomInt(500), utils.getRandomInt(360)));
  }


}



function run() {
  if (running) {
    stop()
  } else {
    start()
  }
}
function start() {
  things.forEach((thing: Thing) => thing.update());
  running = requestAnimationFrame(start)
}

function stop() {
  cancelAnimationFrame(running);
  running = null;
}

function move(opts?: any) {
  things.forEach((thing: Thing) => {
    if (opts) {


      if (opts.center) {
        thing.x = opts.x;
        thing.y = opts.y;
        thing.update();
      } else if (opts.x || opts.y) {
        thing.x = thing.x + opts.x || thing.x;
        thing.y = thing.y + opts.y || thing.y;
        thing.update();
      }
    } else {
      thing.move()
    }
  });
}
function rotate() {
  things.forEach((thing: Thing) => {
    thing.direction += 5;
    thing.update(true);
  });
}
function rotzero() {
  things.forEach((thing: Thing) => {
    thing.direction = 0;

    thing.update(true);
  });
}
function update() {
  things.forEach((thing: Thing) => {
    thing.update();
  });
}



document.addEventListener(`DOMContentLoaded`, main);
