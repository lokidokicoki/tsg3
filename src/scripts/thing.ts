import Renderable from './renderable';
import Renderer from './renderer';
import * as utils from './utils'

export default class Thing {
  public health: number;
  public x: number;
  public y: number;
  public id: number;
  public speed: number;
  public gfx: Renderable;
  private angle: number;
  private spinCount: number;
  private dx: number;
  private dy: number;
  private dirty: boolean;
  private halfPi: number;
  private bbox: ClientRect | DOMRect;

  /**
   * Creates an instance of Thing.
   * @memberof Thing
   */
  constructor(x: number, y: number, d: number) {
    this.health = 100;
    this.x = x;
    this.y = y;
    this.id = 1;
    this.angle = d;
    this.spinCount = 0;
    this.dirty = true;
    this.speed = 1;
    this.halfPi = (Math.PI / 180);
    this.createGfx();
    this.bbox = this.gfx.svg.getBoundingClientRect();
  }

  public set direction(angle: number) {
    this.dirty = true;
    this.angle = angle;
  }
  public get direction(): number {
    return this.angle;
  }

  public move() {
    this.dirty = true;
    this.speed = 10;
    this.update();
  }
  /**
   * Update gfx
   *
   * @memberof Thing
   */
  public update(ignoreMove?: boolean) {

    if (this.angle > 360) {
      this.angle -= 360
    }

    if (this.dirty) {
      this.dx = this.speed * Math.cos(this.angle * this.halfPi)
      this.dy = this.speed * Math.sin(this.angle * this.halfPi)
      this.dirty = false;
    }

    let x = this.x
    let y = this.y
    if (ignoreMove === undefined) {
      x += this.dx;
      y += this.dy;
    }

    const rb = Renderer.getInstance().bbox;
    if (this.bbox.left < rb.left || this.bbox.right > rb.right || this.bbox.top < rb.top || this.bbox.bottom > rb.bottom) {
      this.tumble(rb);

    } else {
      this.spinCount = 0;
      this.x = x;
      this.y = y;
    }

    //console.log(this.dx, this.dy, this.x, this.y, this.angle);
    this.gfx.prop(`transform`, `translate(${this.x}, ${this.y}) rotate(${this.angle}, 15,15)`);
    this.bbox = this.gfx.svg.getBoundingClientRect();
  }

  private tumble(rb: (ClientRect | DOMRect)) {

    if (this.spinCount < 5) {
      this.direction = utils.getRandomInt(360);
      this.spinCount++;
    } else {
      this.spinCount = 0;
      if (this.bbox.left <= rb.left) {
        this.x += 10
      }
      if (this.bbox.right >= rb.right) {
        this.x -= 10
      }
      if (this.bbox.top <= rb.top) {
        this.y += 10
      }
      if (this.bbox.bottom >= rb.bottom) {
        this.y -= 10
      }
    }
  }

  /**
   * Create GFX for the thing
   *
   * @private
   * @memberof Thing
   */
  private createGfx() {
    this.gfx = new Renderable(`g`, { transform: `translate(${this.x}, ${this.y}) rotate(${this.angle}, 15, 15)` });
    const body = new Renderable(`rect`, { width: 30, height: 30, fill: `#00ff00`, x: 0, y: 0 });
    const eye = new Renderable(`rect`, { width: 10, height: 10, fill: `#000000`, x: 20, y: 10 });
    // const guide = new Renderable(`line`, { x1: 0, y1: 15, stroke: `black`, x2: 60, y2: 15 });
    this.gfx.append(body);
    this.gfx.append(eye);
    // this.gfx.append(guide);

    Renderer.getInstance().container.append(this.gfx);
  }
}
