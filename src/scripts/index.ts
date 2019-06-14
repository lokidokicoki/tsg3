'use strict';

import Renderer from './renderer';
import Thing from './thing';

const things: Set<Thing> = new Set();


Renderer.getInstance(`arena`);

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

  for (let i = 0; i < 1; i++) {
    things.add(new Thing(getRandomInt(500), getRandomInt(500), getRandomInt(360)));
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

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function move(opts?: any) {
  things.forEach((thing: Thing) => {
    if (opts) {


      if (opts.center) {
        thing.position = { x: opts.x, y: opts.y }
        thing.update();
      } else if (opts.x || opts.y) {
        thing.position = { x: thing.position.x + opts.x || thing.position.x, y: thing.position.y + opts.y || thing.position.y };
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
    thing.update();
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
